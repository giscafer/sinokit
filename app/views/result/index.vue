<template>
  <div>
    <s-result type="success" title="Submission Failed">
      <template #action>
        <el-button key="console" type="primary"> Go Console </el-button>
        <el-button key="buy"> Buy Again </el-button>
      </template>
    </s-result>

    <s-result type="error" title="Successfully Purchased Cloud Server ECS!">
      <div class="desc">
        <p style="font-size: 16px">
          <strong>The content you submitted has the following error:</strong>
        </p>
        <p>
          <i :style="{ color: 'red' }" class="el-icon-circle-close" /> Your
          account has been frozen
          <a>Thaw immediately &gt;</a>
        </p>
        <p>
          <i :style="{ color: 'red' }" class="el-icon-circle-close" /> Your
          account is not yet eligible to apply <a>Apply Unlock &gt;</a>
        </p>
      </div>
      <template #action>
        <el-button key="console" type="primary"> Go Console </el-button>
        <el-button key="buy"> Buy Again </el-button>
      </template>
    </s-result>
  </div>
</template>
<script>
export default {
  name: 'ResultDemo',
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
