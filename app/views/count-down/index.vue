<template>
  <div>
    <s-count-down
      :target="new Date().getTime() + 3000000"
      :on-end="onEndHandle"
    />
  </div>
</template>
<script>
export default {
  name: 'CountDown',
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    onEndHandle(e) {
      console.log(e)
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
