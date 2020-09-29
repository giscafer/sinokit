# JSON Schema 编辑器

一个高效易用的基于 Vue 的 json-schema 编辑器。 模仿 Yapi React 版本 [json-schema-editor-visual](https://github.com/YMFE/json-schema-editor-visual) 实现

## 示例

### 基本用法

```html
/*vue*/
<desc>
  `JsonSchemaEditor` 简单用法演示
</desc>

<template>
  <s-json-schema-editor
    :schema.sync="schema"
    :is-mock="false"
  ></s-json-schema-editor>
</template>
<script>
  export default {
    data() {
      return {
        // schema 对象
        schema: {
          type: 'object',
          title: 'title',
          properties: {
            field_1: {
              type: 'string'
            }
          }
        }
      };
    }
  };
</script>
```

### 配合 JsonEditor 组件

```html
/*vue*/
<desc>
  `JsonSchemaEditor` 组件 结合 `JsonEditor` 组件演示
</desc>

<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-button size="mini" type="primary" @click="handleToggleSchema"
          >改变Schema</el-button
        >
        <el-button size="mini" type="info" @click="handlePageParams"
          >Toggle 分页参数</el-button
        >
        <s-json-editor :value="schema" :readonly="false"></s-json-editor>
      </el-col>
      <el-col :span="18">
        <s-json-schema-editor
          :key="schemaKey"
          :schema.sync="schema"
          :show-default-value="true"
          :is-mock="false"
          @schema-change="onSchemaChange"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script>
  // demo解释器无法兼容 import
  // import { warningToast, deepClone } from '@sinokit/utils';
  export default {
    data() {
      return {
        schemaKey: '1222',
        // schema 对象
        schema: {},
        schema2: {
          type: 'object',
          title: 'title',
          properties: {
            field_1: {
              type: 'string'
            }
          }
        },
        schema3: {
          type: 'object',
          title: 'title',
          properties: {
            field_1: {
              type: 'string'
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
                            type: 'string'
                          },
                          field_21b59: {
                            type: 'string'
                          }
                        }
                      }
                    }
                  },
                  required: ['field_4']
                }
              },
              required: ['field_3']
            }
          },
          required: ['field_1', 'field_2']
        }
      };
    },
    created() {},
    mounted() {
      this.schema = this.schema3;
      this.schemaKey = Date.now();
    },
    methods: {
      handleToggleSchema() {
        if (JSON.stringify(this.schema) === JSON.stringify(this.schema2)) {
          this.schema = Object.assign({}, this.schema3);
        } else {
          this.schema = this.schema2;
          this.schema = Object.assign({}, this.schema2);
        }
        this.schemaKey = Date.now();
      },
      /**
       * 分页参数添加&删除
       */
      handlePageParams() {
        if (this.schema.type !== 'object') {
          /*  return warningToast(
            '当前 Schema 不是对象类型，不能添加分页属性',
            2000
          ); */
        }
        const cloneSchema = this.schema;
        // const cloneSchema = deepClone(this.schema);
        if (cloneSchema.properties.page) {
          delete cloneSchema.properties.page;
          delete cloneSchema.properties.size;
          this.$nextTick(() => {
            this.schema = cloneSchema;
            this.schemaKey = Date.now() + '';
          });
          return;
        }
        const pageInfo = {
          page: {
            type: 'number',
            default: 1,
            description: '第几页'
          },
          size: {
            type: 'number',
            default: 10,
            description: '每页记录数量'
          }
        };
        Object.assign(cloneSchema.properties, pageInfo);
        this.schema = cloneSchema;
        this.schemaKey = Date.now() + '';
      },
      onSchemaChange(v) {
        this.schemaJsonString = JSON.stringify(v, null, 2);
      }
    }
  };
</script>
```

## API

### Attributes

|         参数         | 说明                                  |   类型    | 默认值  |
| :------------------: | ------------------------------------- | :-------: | :-----: |
|       `schema`       | json schema 对象                      | `Object`  |    -    |
|      `show-raw`      | 是否显示 RAW 弹窗，可查看 json schema | `Boolean` | `false` |
|      `is-mock`       | 是否支持 mock （WIP）                 | `Boolean` | `false` |
| `show-default-value` | 是否展示默认值输入框                  | `Boolean` | `false` |

### Events

|    事件名称     | 说明                        |       回调参数        |
| :-------------: | --------------------------- | :-------------------: |
| `schema-change` | schema 发生变化时的回调函数 | 新的 json schema 对象 |
