<template>
  <div>
    <h3>时间轴</h3>
    <brush-timeline :data="timelineData"></brush-timeline>
    <div style="margin-top:40px">
      <h3>时间轴2</h3>
      <brush-timeline :data="data2" render-type="json"></brush-timeline>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TimelinePage',
  props: {},
  data() {
    return {
      // 注意：JavaScript Date 对象中，月份是从0开始
      timelineData: [
        {
          tooltip: 'tooltip',
          content:
            '<div><p class="date">2010-11-18</p><a href="" target="_blank">第一个</a></div>',
        },
        {
          tooltip: '新适应症',
          content:
            '<div><p class="date">2011-11-18</p><a href="" target="_blank">新适应症</a></div>',
        },
        {
          tooltip: '新给药方案',
          content:
            '<div><p class="date">2014-11-18</p><a href="" target="_blank">新给药方案</a></div>',
        },
        {
          tooltip: '包装',
          content:
            '<div><p class="date">2013-11-18</p><a href="" target="_blank">包装</a></div>',
        },
        {
          tooltip: '审批',
          content:
            '<div><p class="date">2014-11-18</p><a href="" target="_blank">审批</a></div>',
        },
        {
          content:
            '<div><p class="date">2015-11-18</p><a href="" target="_blank">IPO</a></div>',
        },
        {
          content:
            '<div><p class="date">2016-11-18</p><a href="" target="_blank">准备上市</a></div>',
        },
        {
          content:
            '<div><p class="date">2017-11-18</p><a href="" target="_blank">上市</a></div>',
        },
      ],
      data2: [
        {
          date: '2008-8-18',
          tooltip: '牛市后金融危机',
          label: '牛市后金融危机',
        },
        { date: '2015-6-18', tooltip: '牛市', label: '牛市' },
        { date: '2018-6-18', tooltip: '震荡市', label: '震荡市' },
        { date: '2020-6-20', tooltip: '突破3000点', label: '突破3000点' },
        {
          date: '2020-8-20',
          tooltip: '3200点或许成为历史最低',
          label: '3200点或许成为历史最低',
        },
      ],
    }
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
</style>
