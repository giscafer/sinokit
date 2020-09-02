<template>
  <div class="overview-timeline-component" v-bind="$attrs" v-on="$listeners">
    <div
      v-for="(item, index) in timelineList"
      :key="index"
      class="timeline-item"
      :style="{'width':itemWidth+'px'}"
      :class="{'ellipsis':isEllipsis(index),'single':timelineList.length===1}"
    >
      <template v-if="!isEllipsis(index)">
        <div class="node">
          <div class="center"></div>
        </div>
        <div class="tail" v-if="timelineList.length>1"></div>
        <div class="content">
          <div class="title" v-text="item.title"></div>
          <div class="description" v-text="item.description"></div>
        </div>
      </template>
      <template v-if="isEllipsis(index)">
        <div class="ellipsis-item">
          <div class="node"></div>
          <div class="node"></div>
          <div class="node"></div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OverviewTimeline',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    itemWidth: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      timelineList: [],
    }
  },
  watch: {
    data() {
      const length = this.data.length || 0
      // TODO: 展示所有的时候删除这里的代码
      if (length > 0) {
        this.timelineList = this.data
      } else {
        this.timelineList.length = 0
      }
      console.table(this.timelineList)
    },
  },
  computed: {},
  created() {},
  mounted() {
    this.timelineList = this.data
  },
  methods: {
    isEllipsis(index) {
      return index !== 0 && index !== this.timelineList.length - 1
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
  align-items: center;
}
.node {
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
  .node {
    left: 0;
    margin: 0 auto;
  }
  .content {
    margin: 0 auto;
  }
}
.tail {
  position: absolute;
  bottom: 8px;
  right: 0;
  width: 100%;
  border-top: 2px solid $borderColor;
}
.ellipsis-item {
  display: flex;
  width: 30px;
  justify-content: space-between;
  background: transparent;
  > .node {
    position: relative;
    width: 8px;
    height: 8px;
    background: $borderColor;
  }
}
.timeline-item {
  position: relative;
  display: inline-block;
  // width: 200px;
  height: 20px;
  &.ellipsis {
    display: flex;
    align-items: center;
    width: 44px !important;
    left: 7px;
  }
  .content {
    position: absolute;
    width: 150px;
    top: 30px;
    text-align: center;
    font-size: 16px;
    .title {
      color: #333;
    }
    .description {
      margin-top: 10px;
      color: #a6aab8;
    }
  }

  &:last-child {
    .node {
      right: -10px;
    }
    .content {
      position: absolute;
      right: -75px;
    }
  }
  &:first-child {
    .content {
      position: absolute;
      left: -75px;
    }
  }
  /*
  &:last-child .tail {
    left: 0;
    width: 50%;
  } */
}
</style>
