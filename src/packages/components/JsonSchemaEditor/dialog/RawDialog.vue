<template>
  <div>
    <el-dialog
      title="RAW源码查看"
      width="700px"
      v-bind="$attrs"
      v-on="$listeners"
      @open="onOpen"
      @close="onClose"
    >
      <div class="sourcecode">
        <vue-ace-editor
          :content="schemaJsonString"
          :font-size="14"
          height="420px"
          lang="json"
          theme="chrome"
          @init="editorInit"
          @onChange="editorChange"
        ></vue-ace-editor>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { VueAceEditor } from 'vue2x-ace-editor'
export default {
  name: 'TemplateDialog',
  components: { VueAceEditor },
  inheritAttrs: false,
  props: {
    schema: { type: Object, default: () => ({}) }
  },
  data() {
    return {}
  },
  computed: {
    schemaJsonString() {
      return JSON.stringify(this.schema, null, 2)
    }
  },
  created() {},
  methods: {
    onOpen() {},
    onClose() {},
    close() {
      this.$emit('update:visible', false)
    },
    editorInit() {
      require('brace/ext/language_tools')
      require('brace/mode/json')
      require('brace/theme/chrome')
    },
    editorChange(editor) {},
    onSchemaChange(v) {
      this.$nextTick(() => {
        this.schema = v
        this.$forceUpdate()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
