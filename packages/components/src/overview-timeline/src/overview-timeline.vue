<template>
  <div
    class="overview-timeline-component"
    v-bind="$attrs"
    v-on="$listeners"
    :style="{
      'justify-content': align,
    }"
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
      }"
    >
      <template v-if="!isEllipsis(index)">
        <div class="ov-timeline-node">
          <div class="center"></div>
        </div>
        <div class="ov-timeline-tail" v-if="timelineList.length > 1"></div>
        <div
          class="ov-timeline-content"
          :style="{
            left: collapse ? '' : (0.5 - (200 / itemWidth) * 0.5) * 100 + '%',
          }"
        >
          <div class="ov-timeline-title" v-text="item.title"></div>
          <div class="ov-timeline-description" v-text="item.description"></div>
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
    // 'left','center', 'right'
    align: {
      type: String,
      default: 'center',
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
  computed: {},
  created() {},
  mounted() {
    this.setTimelineList()
  },
  methods: {
    isHeadOrTail(index) {
      return index === 0 || index === this.timelineList.length - 1
    },
    isEllipsis(index) {
      /* if (!this.collapse) {
        return (
          index !== 0 &&
          index !== this.timelineList.length - 1 &&
          this.collapse &&
          this.timelineList.length > this.max
          // index !== 0 && index !== this.timelineList.length - 1 && this.collapse
        )
      } */
      const length = this.timelineList.length
      console.log(
        index,
        index !== 0,
        this.collapse,
        index === length - 2,
        length > this.max
      )
      if (index === length - 2) {
        console.log('index === length - 2', index)
      }
      return (
        index !== 0 &&
        this.collapse &&
        index === length - 2 &&
        this.data.length > this.max
      )
    },
    setTimelineList() {
      const length = this.data.length || 0
      let list = []
      if (this.collapse && length > this.max) {
        let count = -1
        while (count++ < this.max - 2) {
          list.push(this.data[count])
        }
        list.push(this.data[this.data.length - 1]) // last one
      } else {
        list = this.data
      }
      console.log(list)
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
.ov-timeline-tail {
  position: absolute;
  top: 8px;
  right: 0;
  width: 100%;
  border-top: 2px solid $borderColor;
}
.ov-timeline-ellipsis {
  display: flex;
  align-items: center;
  width: 44px !important;
  left: 7px;
  &-item {
    display: flex;
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

  &:last-child {
    .ov-timeline-node {
      right: -10px;
    }
    .ov-timeline-content {
      // position: absolute;
      right: -100px;
    }
  }
  // &:first-child {
  //   .ov-timeline-content {
  //     // position: absolute;
  //     // left: -100px;
  //   }
  // }
}
.collapse,
.expand {
  display: flex;
  width: 400px;
  height: 100px;
  justify-content: center;
  align-items: center;

  .ov-timeline-node {
    left: 50%;
  }
  /*  .ov-timeline-content {
    left: 25% !important;
  } */
  &:last-child {
    .ov-timeline-tail {
      left: 0;
      width: 50%;
    }
  }
  &:first-child {
    .ov-timeline-tail {
      left: 50%;
      width: 50%;
    }
  }
}
</style>
