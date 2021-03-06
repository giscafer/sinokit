<template>
  <div
    class="overview-timeline-component"
    v-bind="$attrs"
    v-on="$listeners"
    :style="{
      'justify-content': align,
    }"
    :class="{ infinite: infinite }"
  >
    <div
      v-for="(item, index) in timelineList"
      :key="index"
      class="ov-timeline-item"
      :style="{ width: itemWidth + 'px' }"
      :class="{
        'ov-timeline-ellipsis': isEllipsis(index),
        single: timelineList.length === 1,
        expand: !collapse,
        collapse: collapse && !isEllipsis(index),
        'algin-top': contentAlign === 'top',
      }"
    >
      <template v-if="!isEllipsis(index)">
        <div class="ov-timeline-node" :style="{ 'background-color': color }">
          <div class="center"></div>
        </div>
        <div
          v-if="showContentLine"
          class="dashed-line"
          :style="{
            'background-image': `linear-gradient(0deg, ${color} 0%, ${color} 50%, transparent 50%)`,
          }"
        ></div>
        <div
          v-if="timelineList.length > 1"
          class="ov-timeline-tail"
          :class="{ dashed: lineType === 'dashed', infinite: infinite }"
          :style="tailStyle"
        ></div>
        <div
          class="ov-timeline-content"
          :style="{
            left: collapse ? '' : (0.5 - (200 / itemWidth) * 0.5) * 100 + '%',
          }"
        >
          <div
            v-if="!customContent"
            class="ov-timeline-title"
            v-text="item.title"
          ></div>
          <div
            v-if="!customContent"
            class="ov-timeline-description"
            v-text="item.description"
          ></div>
          <slot :item="item"></slot>
        </div>
      </template>
      <template v-if="isEllipsis(index)">
        <div class="ov-timeline-ellipsis-item">
          <div class="ov-timeline-node"></div>
          <div class="ov-timeline-node"></div>
          <div class="ov-timeline-node"></div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SOverviewTimeline',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    itemWidth: {
      type: Number,
      default: 200,
    },
    collapse: {
      type: Boolean,
      default: true,
    },
    max: {
      type: Number,
      default: 4,
    },
    align: {
      type: String,
      default: 'center',
    },
    lineType: {
      type: String,
      default: 'solid',
    },
    color: {
      type: String,
      default: 'rgba(72, 101, 233, 1)',
    },
    // 首位线是否延伸
    infinite: {
      type: Boolean,
      default: false,
    },
    // 内容位置方向 bottom/top
    contentAlign: {
      type: String,
      default: 'bottom',
    },
    // 内容虚线
    showContentLine: {
      type: Boolean,
      default: false,
    },
    // 自定义渲染内容
    customContent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timelineList: [],
    }
  },
  watch: {
    data() {
      this.setTimelineList()
    },
  },
  computed: {
    tailStyle() {
      const c = {
        opacity: 0.5,
      }
      if (this.lineType === 'dashed') {
        c[
          'background-image'
        ] = `linear-gradient(to right, ${this.color} 0%, ${this.color} 50%, transparent 50%)`
      } else {
        c['background-color'] = this.color
      }
      return c
    },
  },
  created() {},
  mounted() {
    this.setTimelineList()
  },
  methods: {
    isHeadOrTail(index) {
      return index === 0 || index === this.timelineList.length - 1
    },
    isEllipsis(index) {
      const length = this.timelineList.length
      return (
        index !== 0 &&
        this.collapse &&
        index === length - 2 &&
        this.data.length > this.max &&
        !this.infinite
      )
    },
    setTimelineList() {
      const length = this.data.length || 0
      let list = []
      if (this.collapse && length > this.max && !this.infinite) {
        let count = -1
        while (count++ < this.max - 2) {
          list.push(this.data[count])
        }
        list.push(this.data[this.data.length - 1]) // last one
      } else {
        list = this.data
      }
      this.timelineList = list
    },
  },
}
</script>
<style lang="scss" scoped>
$nodeColor: rgba(72, 101, 233, 1);
$borderColor: rgba(72, 101, 233, 0.5);
.overview-timeline-component {
  display: flex;
  justify-content: center;
  min-height: 100px;
  padding-top: 10px;
  &.infinite {
    // max-width: 900px;
    // overflow: auto;
    min-width: 1200px;
  }
}
.ov-timeline-node {
  display: flex;
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  background-color: $nodeColor;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  z-index: 100;
  > .center {
    background-color: #fff;
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
}
.ov-timeline-item.single-node {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  position: relative;
  .ov-timeline-node {
    left: 0 !important;
    margin: 0 auto;
  }
  .ov-timeline-content {
    width: 100%;
    margin: 0 auto;
  }
}

.ov-timeline-item.ov-timeline-ellipsis {
  display: flex;
  height: 16px;
}
.ov-timeline-ellipsis {
  display: flex;
  align-items: center;
  width: 44px !important;
  left: 4px;
  &-item {
    display: flex !important;
    width: 30px;
    justify-content: space-between;
    background: transparent;
    margin: 0 auto;
    > .ov-timeline-node {
      position: relative;
      width: 8px;
      height: 8px;
      background: $borderColor;
    }
  }
}
.ov-timeline-item {
  position: relative;
  display: inline-block;
  // width: 200px;
  height: 20px;
  .ov-timeline-content {
    // position: absolute;
    width: 200px;
    margin-top: 20px;
    text-align: center;
    font-size: 16px;
    .ov-timeline-title {
      color: #333;
    }
    .ov-timeline-description {
      margin-top: 10px;
      color: #a6aab8;
    }
  }

  &.algin-top {
    .ov-timeline-node {
      top: calc(90% - 8px);
    }
    .ov-timeline-tail {
      top: calc(90%);
    }
    .dashed-line {
      bottom: 16px;
    }
    .ov-timeline-content {
      position: absolute;
      bottom: 50px;
      right: 0 !important;
    }
  }

  &:last-child {
    .ov-timeline-node {
      right: -10px;
    }
    .ov-timeline-content {
      // position: absolute;
      right: -100px;
    }
  }
}
.collapse,
.expand {
  display: flex;
  width: 400px;
  height: 150px;
  justify-content: center;
  align-items: center;

  .ov-timeline-node {
    left: 50%;
  }

  &:last-child {
    .ov-timeline-tail {
      left: 0;
      width: 50%;
      &.infinite {
        width: 150%;
        &:before {
          content: '';
          position: absolute;
          top: -3px;
          right: -1px;
          width: 7px;
          height: 7px;
          border-top: 2px solid #ffa45f;
          border-right: 2px solid #ffa45f;
          transform: rotate(45deg);
        }
      }
    }
  }
  &:first-child {
    .ov-timeline-tail {
      left: 50%;
      width: 50%;
      &.infinite {
        left: -50%;
        width: 150%;
      }
    }
  }
}

.ov-timeline-tail {
  position: absolute;
  top: 8px;
  right: 0;
  width: 100%;
  border-top: 2px solid $borderColor;
}
.ov-timeline-tail.dashed {
  border-radius: 1px;
  width: 100%;
  height: 2px;
  background-image: linear-gradient(
    to right,
    $borderColor 0%,
    $borderColor 50%,
    transparent 50%
  );
  background-size: 12px 2px;
  background-repeat: repeat-x;
  border-top: 0;
}
.dashed-line {
  position: absolute;
  bottom: 100px;
  width: 2px;
  height: 40px;
  opacity: 0.5;
  background-size: 2px 12px;
  background-repeat: repeat-y;
}
</style>
