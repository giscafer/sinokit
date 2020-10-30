<template>
  <div>
    <h3>概览时间轴</h3>
    <br />
    <div>
      <s-overview-timeline :data="timelineList"></s-overview-timeline>
    </div>
    <div class="margin-top-130">
      <s-overview-timeline :data="timelineList2"></s-overview-timeline>
    </div>
    <div class="margin-top-130">
      <s-overview-timeline :data="timelineList3" :itemWidth="300">
      </s-overview-timeline>
    </div>
    <div
      class="margin-top-130"
      style="width: 900px; overflow: auto; margin: 0 auto; padding-bottom: 20px"
    >
      <s-overview-timeline
        :data="timelineList5"
        :infinite="true"
        :showContentLine="true"
        line-type="dashed"
        color="#ffa45f"
        contentAlign="top"
        :customContent="true"
      >
        <template #default="{ item }">
          <p>{{ item.title }}</p>
          <p>{{ item.description }}</p>
        </template>
      </s-overview-timeline>
    </div>
    <div class="margin-top-130">
      <s-overview-timeline :data="timelineList5" :collapse="false">
      </s-overview-timeline>
    </div>
    <div class="margin-top-130">
      <s-overview-timeline :data="timelineList5"></s-overview-timeline>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OverviewTimelineDemo',
  props: {},
  data() {
    return {
      timelineList: [{ title: '1997年', description: '美国第一次上市' }],
      timelineList2: [
        { title: '1997年', description: '美国第一次上市' },
        { title: '2000年', description: '香港第一次上市' },
      ],
      timelineList3: [
        { title: '1997年', description: '美国第一次上市' },
        { title: '2000年', description: '香港第一次上市' },
        { title: '2000年', description: '香港第一次上市' },
      ],
      timelineList4: [
        { title: '1997年', description: '美国第一次上市' },
        { title: '2000年', description: '香港第一次上市' },
        { title: '2000年', description: '香港第一次上市' },
        { title: '2007年', description: '中国第一次上市' },
      ],
      timelineList5: [
        { title: '1997年', description: '美国第一次上市' },
        { title: '2000年', description: '香港第一次上市' },
        { title: '2007年', description: '中国第一次上市' },
        { title: '2017年', description: '中国第2次上市' },
        { title: '2017年', description: '中国第2次上市' },
        { title: '2017年', description: '中国第xxx次上市' },
      ],
    }
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
.margin-top-130 {
  margin-top: 130px;
}
</style>
