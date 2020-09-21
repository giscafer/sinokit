<template>
  <div class="brush-timeline" :id="id">
    <div id="vis-timeline"></div>
    <svg width="100%" :height="height" />
    <div
      class="timeline-tooltip timeline-tooltip-placement-top"
      style="left: -1000px; top:0; transform-origin: 50% 45px;display:none"
    >
      <div class="timeline-tooltip-content">
        <div class="timeline-tooltip-arrow"></div>
        <div role="tooltip" class="timeline-tooltip-inner">prompt text</div>
      </div>
    </div>
    <div class="timeline-border-start" style="display:block"></div>
    <div
      class="timeline-border-end"
      style="left: -1000px; top:0; transform-origin: 50% 45px;display:none"
    ></div>
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
import {
  drawHandle,
  brushHandle,
  transformHandle,
  handleTooltip,
} from './utils'

export default {
  name: 'SBrushTimeline',
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
    nowrap: {
      type: Boolean,
      default: false,
    },
    brushWidth: {
      // brush 最大可缩放的宽度
      type: Number,
      default: 700,
    },
  },
  data() {
    return {
      id: `vis-timeline-${Math.random().toString(16).substr(2)}`,
      timeline: null,
      brushRange: 0,
      startDate: new Date(),
      endDate: new Date(),
      brushMaxWidth: 400,
      titleLength: 52,
      gap: 380, // 两个节点之间的距离，原来计算当行最多可以展示多少个，以便确定不换行时brush 的宽度
      monthTimeStramp: 60 * 60 * 1000 * 24 * 30 * 12,
    }
  },
  watch: {
    brushWidth(val) {
      this.brushMaxWidth = val
    },
  },
  created() {
    this.brushMaxWidth = this.brushWidth
  },
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
          const cutLabel = item.label && item.label.length > this.titleLength
          const label = cutLabel
            ? item.label.substr(0, this.titleLength - 2) + '..'
            : item.label
          const titleStr = cutLabel ? `title="${item.label}"` : ''
          const obj = {
            start: new Date(`${2000 + index}-01-01`),
            content: `<div><p class="date">${item.date}</p>${
              item.url
                ? `<a href="${item.url}" ${titleStr} target="_blank">${label}</a></div>`
                : `<span ${titleStr} style="color:#333333e6">${label}</span>`
            }`,
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
      const zoomMax = (maxDate.getTime() - minDate.getTime()) / 1
      const zoomMin = 31104000000 // 月为缩放单位
      // const zoomMin = 31104000000 * 3 // 季度为缩放单位
      this.startDate = minDate
      this.endDate = maxDate

      const options = {
        zoomMin,
        zoomMax,
        start: minDate,
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
        showCurrentTime: false,
        max: maxDate,
        min: minDate,
        timeAxis: { scale: 'year', step: 1 },
        tooltip: {
          overflowMethod: 'cap',
        },
      }
      this.timeline = new Timeline(container, dataSet, options)
      // 用来全局调试而已
      window.brushTimeline = this.timeline
      this.brushInit(container)

      // tooltip
      setTimeout(() => {
        handleTooltip(pcontainer, this.data)
        // handleBorderStartEnd(pcontainer)
      }, 200)
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
      let brush = null
      let slider = null
      let startSelection = []
      let preSelection = [-1, -1] // 缓存上一次位置
      let direction = 1 // 判断resize 方向，左边1，右边2
      // let setWindowTimer = null

      // let frstBrush
      const brushed = () => {
        const s = event.selection
        // console.log(event.type, s)
        let wx = s[0]
        let ex = s[1]
        if (event.type === 'start') {
          startSelection = s
          preSelection = s
        }
        if (this.nowrap) {
          if (startSelection[0] === s[0]) {
            direction = 2
          } else if (startSelection[1] === s[1]) {
            direction = 1
          }

          if (startSelection.join(',') === s.join(',')) {
            wx = preSelection[0]
            ex = preSelection[1]
          }

          // 控制超过最大宽度的时候，不能再伸长（解决产品要求的换行问题）
          if (s[1] - s[0] > this.brushMaxWidth) {
            wx = direction === 2 ? s[1] - this.brushMaxWidth : s[0]
            ex = direction === 2 ? s[1] : s[0] + this.brushMaxWidth
            console.log(event.type, wx, ex, this.brushMaxWidth)
            // 控制 brush 和 handle 的位置
            svg.select('.selection').attr('x', wx)
            svg.select('.selection').attr('width', this.brushMaxWidth)
            if (event.type !== 'start' && slider) {
              slider.call(brush.move, [wx, ex])
              preSelection = [wx, ex]
            }
          }
        }
        // 根据 brush 位置渲染 缩放和定位timeline
        /*    if (event.type === 'end') { */
        const timeX = [wx, ex].map(x.invert, x)
        this.timeline.setWindow(timeX[0], timeX[1])
        /*  } else {
          if (setWindowTimer) {
            clearTimeout(setWindowTimer)
            setWindowTimer = null
          }
          setWindowTimer = setTimeout(() => {
            const timeX = [wx, ex].map(x.invert, x)
            this.timeline.setWindow(timeX[0], timeX[1])
            if (setWindowTimer) {
              clearTimeout(setWindowTimer)
              setWindowTimer = null
            }
          }, 100)
        } */
        transformHandle(brushHandleLeft, wx, 'w')
        transformHandle(brushHandleRight, ex, 'e')

        brushHandle(this.id)
      }
      // 创建 brush
      brush = brushX()
        .extent([
          [0, 0],
          [width, height],
        ])
        .on('start', brushed)
        .on('brush', brushed)
        .on(' end', brushed)

      this.brushRange = x.range()

      // 渲染brush
      // 初始化长度
      const { length } = this.data
      const brushWidth = this.brushRange[1]
      let initLen = brushWidth / 2

      if (length <= 3) {
        initLen = brushWidth
        if (this.nowrap) {
          this.brushMaxWidth = initLen
        }
      } else if (this.nowrap) {
        // 动态计算brush 不换行时最大应该设置多长
        const years = this.data.length
        const gapCount = Math.floor(brushWidth / this.gap)
        // console.log(gapCount, years)
        if (gapCount >= years) {
          this.brushMaxWidth = brushWidth
        } else {
          this.brushMaxWidth = Math.ceil(brushWidth * (gapCount / years))
        }
        initLen = this.brushMaxWidth
      }

      slider = context
        .append('g')
        .attr('class', 'brush')
        .call(brush)
        // 初始化拉伸brush
        .call(brush.move, [this.brushRange[0], initLen])

      brushHandleLeft = drawHandle(svg, 0, 'w')
      brushHandleRight = drawHandle(svg, initLen, 'e')
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
      const handleE = document.querySelector(`#${this.id}>svg .handle--e`)
      const handleW = document.querySelector(`#${this.id}>svg .handle--w`)
      handleE.setAttribute('transform', 'translate(-20,0)')
      handleW.setAttribute('transform', 'translate(20,0)')
      // 圆角样式
      document.querySelector(`#${this.id}>svg .overlay`).setAttribute('rx', 7)
      document.querySelector(`#${this.id}>svg .overlay`).setAttribute('ry', 7)
      document.querySelector(`#${this.id}>svg .selection`).setAttribute('rx', 7)
      document.querySelector(`#${this.id}>svg .selection`).setAttribute('ry', 7)
      document
        .querySelector(`#${this.id}>svg .selection`)
        .setAttribute('stroke', '#dbdded')
      // 首次初始化
      const timeX = [this.brushRange[0], initLen].map(x.invert, x)
      this.timeline.setWindow(timeX[0], timeX[1])
    },
  },
  beforeDestroy() {
    document
      .querySelectorAll(`#${this.id} .vis-group>.vis-item.vis-dot`)
      .forEach((element) => {
        element.onmouseenter = null
        element.onmouseleave = null
      })
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
  .vis-item-content {
    max-width: 250px;
    white-space: pre-wrap;
    // border: 1px solid #333;
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
  // tooltip
  .timeline-tooltip {
    position: fixed;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: 'tnum';
    z-index: 1060;
    display: block;
    max-width: 250px;
    visibility: visible;
  }
  .timeline-tooltip-placement-top {
    padding-bottom: 8px;
  }

  .timeline-tooltip-inner {
    min-width: 30px;
    min-height: 24px;
    padding: 6px 8px;
    color: #fff;
    text-align: left;
    text-decoration: none;
    word-wrap: break-word;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .timeline-tooltip-arrow {
    position: absolute;
    bottom: -1px;
    display: block;
    width: 0;
    height: 0;
    overflow: hidden;
    border: 5px solid;
    border-color: #333 transparent transparent transparent;
  }

  .timeline-tooltip-placement-top .timeline-tooltip-arrow {
    left: 20px;
    // left: 50%;
    transform: translateX(-50%);
  }

  .timeline-tooltip-arrow:before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    width: 5px;
    height: 5px;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.75);
    content: '';
    pointer-events: auto;
  }

  .timeline-border-start {
    position: fixed;
    border-top: 4px solid red;
    height: 0;
  }
}
</style>

