<template>
  <div class="array-type">
    <el-row type="flex" align="middle">
      <el-col :span="8" class="col-item name-item col-item-name" :style="tagPaddingLeftStyle">
        <el-row type="flex" justify="space-around" align="middle">
          <el-col :span="2" class="down-style-col">
            <span v-if="items.type === 'object'" class="down-style" @click="handleClickIcon">
              <Icon v-if="showIcon" class="icon-object" type="caret-bottom" />
              <Icon v-else class="icon-object" type="caret-right" />
            </span>
          </el-col>
          <el-col :span="20">
            <el-input disabled value="Items" />
          </el-col>
          <el-col :span="2" style="text-align:center">
            <el-tooltip placement="top" content="全选">
              <el-checkbox disabled />
            </el-tooltip>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="3" class="col-item col-item-type">
        <el-select :value="items.type" class="type-select-style" @change="handleChangeType">
          <el-option v-for="item in schemaTypes" :key="item" :value="item" :label="item"></el-option>
        </el-select>
      </el-col>

      <el-col v-if="isMock" :span="3" class="col-item col-item-mock">
        <MockSelect
          :schema="items"
          @showEdit="handleAction({eventType:'mock-edit'})"
          @change="handleChangeMock"
        />
      </el-col>

      <el-col v-if="showTitle" :span="isMock ? 4 : 5" class="col-item col-item-mock">
        <el-input v-model="items.title" placeholder="标题">
          <Icon
            slot="append"
            type="edit"
            @click.native="handleAction({eventType:'show-edit',field:'title'})"
          />
        </el-input>
      </el-col>
      <el-col
        v-if="!showTitle && showDefaultValue"
        :span="isMock ? 4 : 5"
        class="col-item col-item-mock"
      >
        <el-input v-model="items.default" placeholder="默认值">
          <Icon
            slot="append"
            type="edit"
            @click.native="handleAction({eventType:'show-edit',field:'default'})"
          />
        </el-input>
      </el-col>

      <el-col :span="isMock ? 4 : 5" class="col-item col-item-desc">
        <el-input v-model="items.description" placeholder="备注">
          <Icon
            slot="append"
            type="edit"
            @click.native="handleAction({eventType:'show-edit',field:'description'})"
          />
        </el-input>
      </el-col>
      <el-col :span="isMock ? 2 : 3" class="col-item col-item-setting">
        <span class="adv-set" @click="handleAction({eventType:'setting', schemaType: items.type})">
          <el-tooltip placement="top" content="高级设置">
            <Icon type="setting" />
          </el-tooltip>
        </span>

        <span
          v-if="items.type === 'object'"
          @click="handleAction({eventType:'add-field',isChild:true})"
        >
          <el-tooltip placement="top" content="添加子节点">
            <Icon type="plus" class="plus" />
          </el-tooltip>
        </span>
      </el-col>
    </el-row>

    <div class="option-formStyle">
      <template v-if="items.type==='array'">
        <SchemaArray
          :prefix="prefixArray"
          :data="items"
          :is-mock="isMock"
          :show-title="showTitle"
          :show-default-value="showDefaultValue"
          :editor-id="editorId"
        />
      </template>
      <template v-if="items.type==='object'">
        <SchemaObject
          :prefix="nameArray"
          :data="items"
          :is-mock="isMock"
          :show-title="showTitle"
          :show-default-value="showDefaultValue"
          :editor-id="editorId"
        />
      </template>
    </div>
  </div>
</template>
<script>
import isUndefined from 'lodash/isUndefined'
import Icon from '../../Icon'
import MockSelect from '../MockSelect'
import SchemaObject from './SchemaObject'
import { SCHEMA_TYPE } from '../utils'
export default {
  name: 'SchemaArray',
  components: { Icon, MockSelect, SchemaObject },
  props: {
    isMock: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    showDefaultValue: { type: Boolean, default: false },
    editorId: {
      type: String,
      default: 'editor_id'
    },
    name: {
      type: String,
      default: ''
    },
    prefix: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => {}
    },
    action: {
      type: Function,
      default: () => () => {}
    }
  },
  data() {
    return {
      tagPaddingLeftStyle: {},
      schemaTypes: SCHEMA_TYPE,
      items: this.data.items,
      showIcon: false
    }
  },

  computed: {
    nameArray() {
      return [].concat(this.prefixArray, 'properties')
    },
    prefixArray() {
      return [].concat(this.prefix, 'items')
    }
  },
  beforeMount() {
    const length = this.prefix.filter(name => name !== 'properties').length
    this.tagPaddingLeftStyle = {
      paddingLeft: `${20 * (length + 1)}px`
    }
  },
  methods: {
    isUndefined() {
      return isUndefined
    },
    handleClickIcon() {
      this.showIcon = !this.showIcon
    },
    handleAction(opts) {
      const { prefix, name } = this
      this.$event.emit(`schema-update-${this.editorId}`, {
        prefix,
        name: name || 'items',
        ...opts
      })
    },
    handleChangeMock() {},
    handleChangeType(value) {
      console.log(value)
      this.handleAction({ eventType: 'schema-type', value })
    }
  }
}
</script>
