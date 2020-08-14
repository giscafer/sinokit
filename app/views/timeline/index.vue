<template>
  <div>
    <brush-timeline :data="timelineData"></brush-timeline>
  </div>
</template>
<script>
export default {
  name: 'BasicDialog',
  props: {},
  data() {
    return {
      // 注意：JavaScript Date 对象中，月份是从0开始
      timelineData: [
        {
          start: new Date(2010, 0, 1),
          content:
            '<div><p class="date">2010-11-18</p><a href="" target="_blank">第一个</a></div>',
        },
        {
          start: new Date(2011, 1, 1),
          content:
            '<div><p class="date">2011-11-18</p><a href="" target="_blank">新适应症</a></div>',
        },
        {
          start: new Date(2012, 0, 1),
          content:
            '<div><p class="date">2014-11-18</p><a href="" target="_blank">新给药方案</a></div>',
        },
        {
          start: new Date(2013, 0, 1),
          content:
            '<div><p class="date">2013-11-18</p><a href="" target="_blank">包装</a></div>',
        },
        {
          start: new Date(2014, 0, 1),
          content:
            '<div><p class="date">2014-11-18</p><a href="" target="_blank">审批</a></div>',
        },
        {
          start: new Date(2015, 0, 1),
          content:
            '<div><p class="date">2015-11-18</p><a href="" target="_blank">IPO</a></div>',
        },
        {
          start: new Date(2016, 0, 1),
          content:
            '<div><p class="date">2016-11-18</p><a href="" target="_blank">准备上市</a></div>',
        },
        {
          start: new Date(2017, 0, 1),
          content:
            '<div><p class="date">2017-11-18</p><a href="" target="_blank">上市</a></div>',
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
