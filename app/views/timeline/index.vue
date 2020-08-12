<template>
  <div>
    <h3>时间轴</h3>
    <el-button type="primary" @click="handleZoom">缩放</el-button>
    <div id="visualization"></div>
    <svg width="960" height="50" />
  </div>
</template>
<script>
// https://observablehq.com/@d3/focus-context?collection=@d3/d3-brush
import { Timeline, DataSet } from 'vis-timeline/standalone'
import * as d3 from 'd3'
export default {
  name: 'TimelinePage',
  props: {},
  data() {
    return {
      timeline: null,
      zoomRange: 0,
      brushRange: 0,
      startDate: new Date(),
      endDate: new Date(),
      toggle: false,
    }
  },
  created() {},
  mounted() {
    this.createTimeline()
  },
  methods: {
    handleZoom() {
      let percent = Math.random().toFixed(2)
      if (this.toggle) {
        this.timeline.zoomIn(+percent)
      } else {
        this.timeline.zoomOut(+percent)
      }
      console.log(this.toggle)
      this.toggle = !this.toggle
    },
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
      const minDate = new Date(2009, 1, 1)
      const maxDate = new Date(2018, 1, 1)
      const zoomMax = maxDate.getTime() - minDate.getTime()
      const zoomMin = 31104000000 * 3 // 季度为缩放单位
      this.startDate = minDate
      this.endDate = maxDate
      console.log(zoomMax)
      var options = {
        zoomMin,
        zoomMax,
        orientation: {
          axis: 'top',
          item: 'top',
        },
        margin: {
          item: 20,
          axis: 20,
        },
        // zoomFriction: 10,
        // zoomable: false,
        max: maxDate,
        min: minDate,
        timeAxis: { scale: 'year', step: 1 },
      }
      this.timeline = new Timeline(container, items, options)
      window.timeline = this.timeline
      this.zoomRange = zoomMax - zoomMin
      console.log('this.zoomRange=', this.zoomRange)

      // timeline.fit() 自适应
      // timeline.zoomIn() // 放大
      // timeline.zoomOut() // 缩小
      // timeline.moveTo() // 移动到
      this.brushInit()
    },
    brushInit() {
      const svg = d3.select('svg')
      const targetRect = document
        .querySelector('#visualization')
        .getBoundingClientRect()
      svg.attr('width', targetRect.width)
      console.log(svg, svg.attr('width'))
      const width = targetRect.width
      // const x2 = d3.scaleTime().range([0, width]);
      const height = 20
      // console.log(width, height)
      const x = d3.scaleTime().range([0, width])
      const context = svg.append('g').attr('class', 'context')

      const arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(height / 2)
        .startAngle(0)
        .endAngle((d, i) => (i ? Math.PI : -Math.PI))

      const brushHandle = (context, selection) => {
        document.querySelector('.overlay').setAttribute('fill', '#EBEDF8')
        document.querySelector('.selection').setAttribute('fill', '#B4B9D2')
        document.querySelector('.overlay').setAttribute('fill', '#EBEDF8')
        document.querySelector('.handle--w').setAttribute('stroke-width', 1.5)
        document.querySelector('.handle--w').setAttribute('d', arc())
        document.querySelector('.handle--e').setAttribute('d', arc())

        context
          .select('.brush')
          .select('path')
          .attr('display', selection === null ? 'none' : null)
          .attr(
            'transform',
            selection === null
              ? null
              : (d, i) => `translate(${selection[i]},${height / 2})`
          )
      }
      let brushedSelection = this.brushRange[1] / 2

      const moveTo = ({ selection, type }) => {
        // brush 宽度变化时动态缩放时间轴
        if (type === 'brush') {
          const w = selection[1] - selection[0]
          const rate = +(w / width).toFixed(2)
          if (w < brushedSelection) {
            this.timeline.zoomOut(rate)
            console.info('zoomOut', rate)
          } else if (w > brushedSelection) {
            this.timeline.zoomIn(rate)
            console.info('zoomIn', rate)
          }
          brushedSelection = w
        }
        const position = selection[1]
        const newPosigion = this.zoomRange * (position / this.brushRange[1])
        console.log(position, newPosigion, this.brushRange[1], this.zoomRange)
        const date = new Date(this.startDate.getTime() + newPosigion)
        console.log(date)
        setTimeout(() => {
          // 需要区分 宽度变化还是滑动，只能执行一个方法，不然 zoomIn 和 zoomOut 不生效
          // this.timeline.moveTo(date)
        })
      }
      const brushed = () => {
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') return // ignore brush-by-zoom
        var s = d3.event.selection
        // console.log('evt=', d3.event)

        moveTo(d3.event)

        d3.select('svg').call(brushHandle, s)
      }

      const brush = d3
        .brushX()
        .extent([
          [0, 0],
          [width, height],
        ])
        .on('brush end', brushed)
      this.brushRange = x.range()
      const brushWidth = this.brushRange[1] / 2 // 初始化的长度
      context
        .append('g')
        .attr('class', 'brush')
        .call(brush)
        .call(brush.move, [this.brushRange[0], this.brushRange[1] / 2])
      this.timeline.zoomIn(brushWidth / this.brushRange[1])
    },
  },
}
</script>
<style lang="scss" >
$dotColor: #738dff;
$textColor: #4865e9;
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
      color: $textColor;
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
  border-color: $dotColor;
  background-color: $dotColor;
}

.vis-item.vis-dot.vis-selected {
  border-color: $dotColor;
}
.vis-item.vis-selected {
  border-color: transparent;
  background-color: transparent;
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
.brush {
  background: #777;
}
</style>
