<template>
  <div style="margin:16px 16px 32px 16px">
    <div style="margin-top:40px">
      <h3>时间轴2</h3>
      <s-brush-timeline :data="data2" render-type="json" :nowrap="true"></s-brush-timeline>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TimelinePage',
  props: {},
  data() {
    return {
      data2: [
        {
          date: '2008-8-18',
          tooltip: '牛市后金融危机1',
          label: '牛市后金融危机',
        },
        { date: '2015-6-18', tooltip: '牛市2', label: '牛市' },
        { date: '2018-6-18', tooltip: '震荡市3', label: '震荡市' },
        {
          date: '2018-6-18',
          tooltip: '突破3000点4',
          label:
            '突破3000点4突破3000点4突破3000点4突破3000点4突破3000点4突破3000点4突破3000点4突破3000点4突破3000点4突破3000点4突破3000点4突破3000点4突破3000点4突破3000点4突破3000点4突破3000点4突破3000点4突破3000点4突破3000点4突破3000点4',
        },
        {
          date: '2018-6-18',
          tooltip: '突破3000点4',
          label:
            'Efficacy-Labeling Change Width Clinical Data Efficacy-Labeling Change Width Clinical Data Efficacy-Labeling Clinical Data',
        },
        {
          date: '2018-6-18',
          tooltip: '突破3000点4',
          label: 'Efficacy-Labeling Change Width Clinical Data Clinical',
        },
        { date: '2018-6-18', tooltip: '突破3000点4', label: '突破3000点4' },
        {
          date: '2018-6-18',
          tooltip: '突破3000点4',
          label: 'Efficacy-Labeling Change Width Clinical Data',
        },
        { date: '2018-6-18', tooltip: '突破3000点4', label: '突破3000点4' },
        {
          date: '2018-6-18',
          tooltip: '突破3000点4',
          label: 'Efficacy-Labeling Change Width Clinical Data',
        },
        { date: '2018-6-18', tooltip: '突破3000点4', label: '突破3000点4' },
        {
          date: '2018-6-18',
          tooltip: '突破3000点4',
          label: '3200点或许成为历史最低',
        },
        {
          date: '2018-6-18',
          tooltip: '突破3000点4',
          label: 'Efficacy-Labeling Change Width Clinical Data',
        },
        { date: '2018-6-18', tooltip: '突破3000点4', label: '突破3000点4' },
        {
          date: '2020-6-20',
          tooltip: '突破3000点4',
          label: '3200点或许成为历史最低',
        },
        {
          date: '2020-8-20',
          tooltip: '3200点或许成为历史最低5',
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
