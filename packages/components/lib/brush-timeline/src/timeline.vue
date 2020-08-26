<template>
  <div class="brush-timeline" :id="id">
    <div id="vis-timeline"></div>
    <svg width="100%" :height="height" />
  </div>
</template>
<script>
/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2020-08-14 10:04:44
 * @description: 基于 d3-brush 和 vis-timeline 实现时间轴效果（创新药系统UI设计的效果)
 * // https://observablehq.com/@d3/focus-context?collection=@d3/d3-brush
 */

import { Timeline, DataSet } from 'vis-timeline/standalone'
import { brushX, select, extent, event, scaleTime, axisBottom } from 'd3'
import { drawHandle, brushHandle, transformHandle } from './utils'

export default {
  name: 'BrushTimeline',
  props: {
    renderType: {
      type: String,
      default: 'html',
    },
    data: {
      type: Array,
      default: () => [],
    },
    height: { type: Number, default: 14 },
    margin: { type: Number, default: 19 },
    orientation: { type: String, default: 'top' },
  },
  data() {
    return {
      id: `vis-timeline-${Math.random().toString(16).substr(2)}`,
      timeline: null,
      brushRange: 0,
      startDate: new Date(),
      endDate: new Date(),
    }
  },
  created() {},
  mounted() {
    this.createTimeline()
  },
  methods: {
    createTimeline() {
      const pcontainer = document.querySelector(`#${this.id}`)
      const container = pcontainer.querySelector('#vis-timeline')
      // 注意：JavaScript Date 对象中，月份是从0开始
      const length = this.data.length
      if (length === 0) return
      // 重新年份计算，为了等间距
      let dataSet
      let dataSetData
      if (this.renderType === 'html') {
        this.data.forEach((item, index) => {
          item.start = new Date(`${2000 + index}-01-01`)
        })
        dataSetData = this.data
        dataSet = new DataSet(this.data)
      } else if (this.renderType === 'json') {
        const items = []
        this.data.forEach((item, index) => {
          const obj = {
            start: new Date(`${2000 + index}-01-01`),
            content: `<div><p class="date">${item.date}</p><a href="" target="_blank">${item.label}</a></div>`,
          }
          items.push(obj)
        })
        dataSetData = items
        dataSet = new DataSet(items)
      }
      const minDate = new Date(
        `${dataSetData[0].start.getFullYear() - 1}/01/01`
      )
      const maxDate = new Date(
        `${dataSetData[length - 1].start.getFullYear() + 1}/01/01`
      )
      const zoomMax = maxDate.getTime() - minDate.getTime()
      const zoomMin = 31104000000 // 月为缩放单位
      // const zoomMin = 31104000000 * 3 // 季度为缩放单位
      this.startDate = minDate
      this.endDate = maxDate

      const options = {
        zoomMin,
        zoomMax,
        orientation:
          this.orientation === 'top'
            ? {
                axis: 'top',
                item: 'top',
              }
            : {
                axis: 'bottom',
                item: 'bottom',
              },
        margin: {
          item: this.margin,
          axis: this.margin,
        },
        // zoomFriction: 10,
        zoomable: false,
        horizontalScroll: false,
        moveable: false,
        max: maxDate,
        min: minDate,
        timeAxis: { scale: 'year', step: 1 },
      }
      this.timeline = new Timeline(container, dataSet, options)
      // 用来全局调试而已
      window.brushTimeline = this.timeline
      this.brushInit(container)
    },
    brushInit(container) {
      const height = this.height
      const targetRect = container.getBoundingClientRect()
      const svg = select(`#${this.id}>svg`)
      svg.attr('width', targetRect.width)
      const width = targetRect.width
      const x = scaleTime().range([0, width])
      const xAxis2 = axisBottom(x)
      const context = svg.append('g').attr('class', 'context')
      let brushHandleLeft = null
      let brushHandleRight = null
      const brushed = () => {
        if (event.sourceEvent && event.sourceEvent.type === 'zoom') return // ignore brush-by-zoom
        const s = event.selection
        // console.log(s.map(x.invert, x).map((d) => timeFormat('%Y-%m')(d)))
        // 根据 brush 位置渲染 缩放和定位timeline
        const timeX = s.map(x.invert, x)
        this.timeline.setWindow(timeX[0], timeX[1])

        transformHandle(brushHandleLeft, s[0], 'w')
        transformHandle(brushHandleRight, s[1], 'e')

        brushHandle(svg, s, height)
      }
      // 创建 brush
      const brush = brushX()
        .extent([
          [0, 0],
          [width, height],
        ])
        .on('start brush end', brushed)

      this.brushRange = x.range()

      // 渲染brush
      context
        .append('g')
        .attr('class', 'brush')
        .call(brush)
        .call(brush.move, [this.brushRange[0], this.brushRange[1] / 2])

      brushHandleLeft = drawHandle(svg, 0, 'w')
      brushHandleRight = drawHandle(svg, this.brushRange[1] / 2, 'e')
      // 日期坐标添加到brush作为参考依据
      x.domain(
        extent(
          [{ start: this.startDate }, ...this.data, { start: this.endDate }],
          function (d) {
            return d.start
          }
        )
      )
      context
        .append('g')
        .attr('class', 'axis axis--x brush-axis')
        .attr('style', 'display:none;')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis2)

      // 将 brush handle 移动偏移量配合复制三角形控制效果
      const handleE = document.querySelector('.handle--e')
      const handleW = document.querySelector('.handle--w')
      handleE.setAttribute('transform', 'translate(-20,0)')
      handleW.setAttribute('transform', 'translate(20,0)')
      // 圆角样式
      document.querySelector('.overlay').setAttribute('rx', 7)
      document.querySelector('.overlay').setAttribute('ry', 7)
      document.querySelector('.selection').setAttribute('rx', 7)
      document.querySelector('.selection').setAttribute('ry', 7)
      document.querySelector('.selection').setAttribute('stroke', '#dbdded')
      // 首次初始化
      const timeX = [this.brushRange[0], this.brushRange[1] / 2].map(
        x.invert,
        x
      )
      this.timeline.setWindow(timeX[0], timeX[1])
    },
  },
}
</script>
<style lang="scss" >
$dotColor: #738dff;
$textColor: #4865e9;
$bgColor: #fff;

.brush-timeline {
  .vis-timeline {
    border: none;
    // font-family: purisa, 'comic sans', cursive;
    font-size: 14pt;
    background: $bgColor;
    .vis-panel.vis-bottom {
      border: none !important;
    }
    .vis-panel.vis-top {
      border-bottom: 1px solid #ededed !important;
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

  .vis-box {
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
        line-height: 14px;
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
}
</style>

