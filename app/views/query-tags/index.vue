<template>
  <div>
    <h3>Query Tags</h3>

    <s-query-tags :data="queryFieldList" @toggleChange="handleToggleChange">查询条件：</s-query-tags>
  </div>
</template>
<script>
export default {
  name: 'QueryTagDemo',
  props: {},
  data() {
    return {
      queryFieldList: [
        {
          label: '姓名',
          field: 'name',
          value: '莫德凯撒',
        },
        {
          label: '年龄',
          field: 'age',
          value: 29,
        },
        {
          label: '国籍',
          field: 'country',
          value: '中国',
        },
        {
          label: '性别',
          field: 'sex',
          value: '男',
        },
        {
          label: '爱好',
          field: 'hobby',
          value: '游戏',
        },
        {
          label: '住址',
          field: 'address',
          value: '广东省广州市天河区石牌桥',
        },
        {
          label: '学历',
          field: 'education',
          value: '博士',
        },
        {
          label: '公司',
          field: 'company',
          value: 'League of Legends',
        },
      ],
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleChange(e) {
      console.log(e)
    },
    handleToggleChange(e) {
      console.log(e)
    },
  },
}
</script>
<style lang="scss" scoped>
.margin-top-130 {
  margin-top: 130px;
}
</style>
