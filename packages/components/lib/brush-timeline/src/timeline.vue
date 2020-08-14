<template>
  <div class="brush-timeline">
    <div id="vis-timeline"></div>
    <svg width="100%" height="14" />
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

export const brushHandle = (context, selection, height) => {
  document.querySelector('.overlay').setAttribute('fill', '#EBEDF8')
  document.querySelector('.selection').setAttribute('fill', '#B4B9D2')
  document.querySelector('.overlay').setAttribute('fill', '#EBEDF8')
  document.querySelector('.handle--w').setAttribute('stroke-width', 1.5)
  // document.querySelector('.handle--w').setAttribute('d', createArc(height));
  // document.querySelector('.handle--e').setAttribute('d', createArc(height));

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

export default {
  name: 'BrushTimeline',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
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
      var container = document.getElementById('vis-timeline')
      // 注意：JavaScript Date 对象中，月份是从0开始
      const items = new DataSet(this.data)
      const minDate = new Date(2009, 0, 1)
      const maxDate = new Date(2018, 0, 1)
      const zoomMax = maxDate.getTime() - minDate.getTime()
      const zoomMin = 31104000000 // 月为缩放单位
      // const zoomMin = 31104000000 * 3 // 季度为缩放单位
      this.startDate = minDate
      this.endDate = maxDate

      var options = {
        zoomMin,
        zoomMax,
        orientation: {
          axis: 'top',
          item: 'top',
        },
        margin: {
          item: 19,
          axis: 19,
        },
        // zoomFriction: 10,
        zoomable: false,
        horizontalScroll: false,
        moveable: false,
        max: maxDate,
        min: minDate,
        timeAxis: { scale: 'year', step: 1 },
      }
      this.timeline = new Timeline(container, items, options)
      // 用来全局调试而已
      window.timeline = this.timeline
      this.brushInit()
    },
    brushInit() {
      const height = 14
      const svg = select('svg')
      const targetRect = document
        .getElementById('vis-timeline')
        .getBoundingClientRect()
      svg.attr('width', targetRect.width)
      const width = targetRect.width
      const x = scaleTime().range([0, width])
      const xAxis2 = axisBottom(x)
      const context = svg.append('g').attr('class', 'context')

      const brushed = () => {
        if (event.sourceEvent && event.sourceEvent.type === 'zoom') return // ignore brush-by-zoom
        const s = event.selection
        // console.log(s.map(x.invert, x).map((d) => timeFormat('%Y-%m')(d)))
        // 根据 brush 位置渲染 缩放和定位timeline
        const timeX = s.map(x.invert, x)
        this.timeline.setWindow(timeX[0], timeX[1])

        select('svg').call((context, selection) => {
          brushHandle(context, selection, height)
        }, s)
      }
      // 创建 brush
      const brush = brushX()
        .extent([
          [0, 0],
          [width, height],
        ])
        .on('brush end', brushed)
      this.brushRange = x.range()

      // 渲染brush
      context
        .append('g')
        .attr('class', 'brush')
        .call(brush)
        .call(brush.move, [this.brushRange[0], this.brushRange[1] / 2])

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
      document
        .querySelector('.overlay')
        .setAttribute('style', 'border-radius:6px;')
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

