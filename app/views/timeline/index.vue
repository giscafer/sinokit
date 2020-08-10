<template>
  <div>
    <h3>时光轴</h3>
    <div id="visualization"></div>
  </div>
</template>
<script>
import { Timeline, DataSet } from 'vis-timeline/standalone'
export default {
  name: 'TimelinePage',
  props: {},
  data() {
    return { timeline: null }
  },
  created() {},
  mounted() {
    this.createTimeline()
  },
  methods: {
    createTimeline() {
      var container = document.getElementById('visualization')

      // note that months are zero-based in the JavaScript Date object
      var items = new DataSet([
        {
          start: new Date(2010, 1, 1),
          content:
            '<div><p class="date">2004-11-18</p><a href="" target="_blank">批准上市</a></div>',
        },
        {
          start: new Date(2011, 1, 1),
          content:
            '<div><p class="date">2004-11-18</p><a href="" target="_blank">新适应症</a></div>',
        },
        {
          start: new Date(2012, 1, 1),
          content:
            '<div><p class="date">2004-11-18</p><a href="" target="_blank">新给药方案</a></div>',
        },
        {
          start: new Date(2013, 1, 1),
          content:
            '<div><p class="date">2004-11-18</p><a href="" target="_blank">包装</a></div>',
        },
        {
          start: new Date(2014, 1, 1),
          content:
            '<div><p class="date">2004-11-18</p><a href="" target="_blank">审批</a></div>',
        },
        {
          start: new Date(2015, 1, 1),
          content:
            '<div><p class="date">2004-11-18</p><a href="" target="_blank">IPO</a></div>',
        },
        {
          start: new Date(2016, 1, 1),
          content:
            '<div><p class="date">2004-11-18</p><a href="" target="_blank">准备上市</a></div>',
        },
        {
          start: new Date(2017, 1, 1),
          content:
            '<div><p class="date">2004-11-18</p><a href="" target="_blank">上市</a></div>',
        },
      ])

      var options = {
        // zoomMin: 10,
        // zoomMax: 30,
        orientation: {
          axis: 'top',
          item: 'top',
        },
        margin: {
          item: 20,
          axis: 40,
        },
      }

      this.timeline = new Timeline(container, items, options)
    },
  },
}
</script>
<style lang="scss" >
.vis-timeline {
  border: none;
  // font-family: purisa, 'comic sans', cursive;
  font-size: 12pt;
  background: #ffecea;
  .vis-panel .vis-bottom {
    border: none !important;
  }
  .vis-minor {
    display: none;
  }
  .vis-range {
    display: none;
  }
  .vis-text {
    div {
      visibility: hidden;
    }
  }
  .vis-line {
    visibility: hidden;
  }
}

.vis-item {
  font-size: 15pt;
  color: transparent;
  background: transparent;
  border: 0;
  transform: translate(10px, 20px);
  .vis-item-content {
    .date {
      font-size: 16px;
      color: #333;
    }
    a {
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 24px;
      letter-spacing: 1px;
      color: #4865e9;
      text-decoration: none;
    }
  }
}

.vis-item,
.vis-item.vis-line {
  border-width: 3px;
}

.vis-item.vis-dot {
  border-width: 10px;
  border-radius: 10px;
  border-color: #f8b849;
  background-color: #f8b849;
}

.vis-item.vis-selected {
  border-color: green;
  background-color: lightgreen;
}

.vis-time-axis .vis-text {
  // color: purple;
  padding-top: 10px;
  padding-left: 10px;
}

.vis-time-axis .vis-text.vis-major {
  font-weight: bold;
}

.vis-time-axis .vis-grid.vis-minor {
  border-width: 2px;
}

.vis-time-axis .vis-grid.vis-major {
  border-width: 2px;
  border: 0;
}
</style>
