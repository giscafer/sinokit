<template>
  <div>
    <h3>时间轴</h3>
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
          axis: 20,
        },
      }

      this.timeline = new Timeline(container, items, options)

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
      console.log(width, height)
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

      const brushed = () => {
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') return // ignore brush-by-zoom
        var s = d3.event.selection
        console.log(s)
        /*  x.domain(s.map(x2.invert, x2))

        focus.select('.area').attr('d', area)
        focus.select('.axis--x').call(xAxis)

        svg.call(
          zoom.transform,
          d3.zoomIdentity.scale(width / (s[1] - s[0])).translate(-s[0], 0)
        ) */

        d3.select('svg').call(brushHandle, s)
      }

      const brush = d3
        .brushX()
        .extent([
          [0, 0],
          [width, height],
        ])
        .on('brush end', brushed)

      context
        .append('g')
        .attr('class', 'brush')
        .call(brush)
        .call(brush.move, x.range())

      /*  context
        .select('.brush')
        .append('path')
        .attr('class', 'handle--custom')
        .attr('fill', '#666')
        .attr('fill-opacity', 0.8)
        .attr('stroke', '#000')
        .attr('stroke-width', 1.5)
        .attr('cursor', 'ew-resize')
        .attr('d', arc()) */
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
