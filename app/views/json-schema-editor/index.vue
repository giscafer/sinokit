<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-button size="mini" type="primary" @click="handleChangeSchema">changeSchema2</el-button>
        <el-button size="mini" type="info" @click="handlePageParams">Toggle Page Params</el-button>
        <s-json-editor :value="schema" :readOnly="false"></s-json-editor>
      </el-col>
      <el-col :span="18">
        <s-json-schema-editor
          :key="schemaKey"
          :schema.sync="schema"
          :show-raw="true"
          :show-default-value="true"
          :is-mock="false"
          @schema-change="onSchemaChange"
        ></s-json-schema-editor>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep'
import { warningToast } from '@sinokit/utils'
export default {
  name: 'BasicDialog',
  props: {},
  data() {
    return {
      schemaKey: '1222',
      schema2: {
        type: 'object',
        title: 'title',
        properties: {
          field_1: {
            type: 'string',
          },
        },
      },
      schema: {
        type: 'object',
        title: 'title',
        properties: {
          field_1: {
            type: 'string',
          },
          field_2: {
            type: 'object',
            properties: {
              field_3: {
                type: 'object',
                properties: {
                  field_4: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        field_1fca9: {
                          type: 'string',
                        },
                        field_21b59: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
                required: ['field_4'],
              },
            },
            required: ['field_3'],
          },
        },
        required: ['field_1', 'field_2'],
      },
    }
  },
  created() {},
  mounted() {
    this.schemaCopy = this.schema
  },
  methods: {
    handleChangeSchema() {
      this.schema = Object.assign({}, this.schema2)
      this.schemaCopy = this.schema
      this.schemaKey = Date.now()
    },
    /**
     * 分页参数添加&删除
     */
    handlePageParams() {
      if (this.schema.type !== 'object') {
        return warningToast('当前 Schema 不是对象类型，不能添加分页属性', 2000)
      }
      const cloneSchema = cloneDeep(this.schema)
      if (cloneSchema.properties.page) {
        delete cloneSchema.properties.page
        delete cloneSchema.properties.size
        this.$nextTick(() => {
          this.schema = cloneSchema
          this.schemaKey = Date.now() + ''
        })
        return
      }
      const pageInfo = {
        page: {
          type: 'number',
          default: 1,
          description: '第几页',
        },
        size: {
          type: 'number',
          default: 10,
          description: '每页记录数量',
        },
      }
      Object.assign(cloneSchema.properties, pageInfo)
      this.schema = cloneSchema
      this.schemaKey = Date.now() + ''
    },
    onSchemaChange(v) {
      this.schemaJsonString = JSON.stringify(v, null, 2)
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
