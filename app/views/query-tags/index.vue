<template>
  <div>
    <h3>Query Tags</h3>

    <s-query-tags :data="queryFieldList">中等标签</s-query-tags>
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
          label: '原研商品名',
          field: 'tradeName',
          value: '莫德凯撒',
        },
        {
          label: '原研商品名',
          field: 'tradeName1',
          value: '莫德凯撒',
        },
        {
          label: '原研商品名',
          field: 'tradeName2',
          value: '莫德凯撒',
        },
        {
          label: '原研商品名',
          field: 'tradeName3',
          value: '莫德凯撒',
        },
        {
          label: '原研商品名',
          field: 'tradeName4',
          value: '莫德凯撒',
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
.margin-top-130 {
  margin-top: 130px;
}
</style>
