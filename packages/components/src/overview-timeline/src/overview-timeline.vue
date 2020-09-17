<template>
  <div class="overview-timeline-component" v-bind="$attrs" v-on="$listeners">
    <div
      v-for="(item, index) in timelineList"
      :key="index"
      class="ov-timeline-item"
      :style="{'width':itemWidth+'px'}"
      :class="{'ov-timeline-ellipsis':isEllipsis(index),'single':timelineList.length===1,'expand':!collapse}"
    >
      <template v-if="!isEllipsis(index)">
        <div class="ov-timeline-node">
          <div class="center"></div>
        </div>
        <div class="ov-timeline-tail" v-if="timelineList.length>1"></div>
        <div
          class="ov-timeline-content"
          :style="{'left':collapse?'':((0.5-( 200/itemWidth)*0.5)*100+'%')}"
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
      return (
        index !== 0 && index !== this.timelineList.length - 1 && this.collapse
      )
    },
    setTimelineList() {
      const length = this.data.length || 0
      if (this.collapse && length > 2) {
        this.timelineList = [this.data[0], this.data[1], this.data[2]]
      } else {
        this.timelineList = this.data
      }
    },
  },
}
</script>
<style lang="scss" scoped>
$nodeColor: rgba(72, 101, 233, 1);
$borderColor: rgba(72, 101, 233, 0.5);
$prefix: 'ov-timeline';
.overview-timeline-component {
  display: flex;
  justify-content: center;
  min-height: 100px;
  padding-top: 10px;
}
.#{$prefix}-node {
  display: flex;
  position: absolute;
  bottom: 0;
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
.single {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  position: relative;
  .#{$prefix}-node {
    left: 0;
    margin: 0 auto;
  }
  .#{$prefix}-content {
    margin: 0 auto;
  }
}
.#{$prefix}-tail {
  position: absolute;
  bottom: 8px;
  right: 0;
  width: 100%;
  border-top: 2px solid $borderColor;
}
.#{$prefix}-ellipsis {
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
    > .#{$prefix}-node {
      position: relative;
      width: 8px;
      height: 8px;
      background: $borderColor;
    }
  }
}
.#{$prefix}-item {
  position: relative;
  display: inline-block;
  // width: 200px;
  height: 20px;
  .#{$prefix}-content {
    position: absolute;
    width: 200px;
    top: 30px;
    text-align: center;
    font-size: 16px;
    .#{$prefix}-title {
      color: #333;
    }
    .#{$prefix}-description {
      margin-top: 10px;
      color: #a6aab8;
    }
  }

  &:last-child {
    .#{$prefix}-node {
      right: -10px;
    }
    .#{$prefix}-content {
      position: absolute;
      right: -100px;
    }
  }
  &:first-child {
    .#{$prefix}-content {
      position: absolute;
      left: -100px;
    }
  }
}

.expand {
  .#{$prefix}-node {
    left: 50%;
  }
  /*  .#{$prefix}-content {
    left: 25% !important;
  } */
  &:last-child {
    .#{$prefix}-tail {
      left: 0;
      width: 50%;
    }
  }
  &:first-child {
    .#{$prefix}-tail {
      left: 50%;
      width: 50%;
    }
  }
}
</style>
