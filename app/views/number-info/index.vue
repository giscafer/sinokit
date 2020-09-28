<template>
  <s-number-info
    :sub-title="
      () => {
        return 'Visits this week'
      }
    "
    :total="12321"
    status="up"
    :sub-total="17.1"
  ></s-number-info>
</template>
<script>
export default {
  name: 'NumberInfoDemo',
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
</style>
