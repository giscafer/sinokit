<template>
  <div>
    <el-row type="flex" align="middle">
      <el-col :span="8" class="col-item name-item col-item-name" :style="tagPaddingLeftStyle">
        <el-row type="flex" justify="space-around" align="middle">
          <el-col :span="2" class="down-style-col">
            <span v-if="value.type === 'object'" class="down-style" @click="handleClickIcon">
              <Icon v-if="showIcon" class="icon-object" type="caret-bottom" />
              <Icon v-if="!showIcon" class="icon-object" type="caret-right" />
            </span>
          </el-col>
          <el-col :span="20">
            <input
              class="el-input el-input--medium el-input__inner"
              :class="{'is-disabled':value.disabled}"
              :value="name"
              :disabled="value.disabled"
              @change="handleNameChange"
            />
          </el-col>
          <el-col :span="2" style="text-align:center">
            <el-tooltip placement="top" content="是否必须">
              <el-checkbox
                :checked="(data.required && data.required.indexOf(name) != -1) || false"
                @change="handleEnableRequire"
              ></el-checkbox>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="3" class="col-item col-item-type">
        <el-select
          :value="value.type"
          :disabled="value.disabled && !value.canChangeType"
          class="type-select-style"
          @change="handleChangeType"
        >
          <el-option v-for="item in schemaTypes" :key="item" :value="item" :label="item"></el-option>
        </el-select>
      </el-col>

      <el-col v-if="isMock" :span="3" class="col-item col-item-mock">
        <MockSelect
          :schema="value"
          @showEdit="handleAction({eventType:'mock-edit'})"
          @change="handleChangeMock"
        />
      </el-col>

      <el-col v-if="showTitle" :span="isMock ? 4 : 5" class="col-item col-item-mock">
        <el-input v-model="value.title" :disabled="value.disabled" placeholder="标题">
          <Icon
            slot="append"
            type="edit"
            @click.native="handleAction({eventType:'show-edit',field:'title'})"
          />
        </el-input>
      </el-col>
      <!-- 默认值输入框 -->
      <el-col
        v-if="!showTitle && showDefaultValue"
        :span="isMock ? 4 : 5"
        class="col-item col-item-mock"
      >
        <el-input
          v-model.trim="value.default"
          placeholder="默认值"
          :disabled="value.type === 'object' || value.type === 'array' || value.disabled"
        >
          <Icon
            slot="append"
            type="edit"
            @click.native="handleAction({eventType:'show-edit',field:'default'})"
          />
        </el-input>
      </el-col>

      <el-col :span="isMock ? 4 : 5" class="col-item col-item-desc">
        <el-input v-model="value.description" :disabled="value.disabled" placeholder="备注">
          <Icon
            slot="append"
            type="edit"
            @click.native="handleAction({eventType:'show-edit',field:'description'})"
          />
        </el-input>
      </el-col>

      <el-col :span="isMock ? 2 : 3" class="col-item col-item-setting">
        <span class="adv-set" @click="handleAction({eventType:'setting', schemaType: value.type})">
          <el-tooltip placement="top" content="高级设置">
            <Icon type="setting" />
          </el-tooltip>
        </span>
        <span
          class="delete-item"
          :class="{'hidden':value.disabled}"
          @click="handleAction({eventType:'delete-field'})"
        >
          <Icon type="close" class="close" />
        </span>
        <DropPlus
          v-if="value.type === 'object'"
          :prefix="prefix"
          :name="name"
          @add-field="handleAction"
        />
        <span
          v-if="value.type !== 'object'"
          @click="handleAction({eventType:'add-field',isChild:false})"
        >
          <el-tooltip placement="top" content="添加兄弟节点">
            <Icon type="plus" class="plus" />
          </el-tooltip>
        </span>
      </el-col>
    </el-row>
    <div class="option-formStyle">
      <!-- {mapping(prefixArray, value, showEdit, showAdv)} -->
      <template v-if="value.type==='array'">
        <schema-array
          :prefix="prefixArray"
          :data="value"
          :is-mock="isMock"
          :show-title="showTitle"
          :show-default-value="showDefaultValue"
          :editor-id="editorId"
        />
      </template>
      <template v-if="value.type==='object' && showIcon">
        <schema-object
          :prefix="nameArray"
          :data="value"
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
import DropPlus from './DropPlus'
import SchemaObject from './SchemaObject'
import SchemaArray from './SchemaArray'
import { SCHEMA_TYPE } from '../utils'
export default {
  name: 'SchemaItem',
  components: {
    Icon,
    MockSelect,
    DropPlus,
    'schema-array': SchemaArray,
    'schema-object': SchemaObject
  },
  props: {
    isMock: {
      type: Boolean,
      default: true
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
    }
  },
  data() {
    return {
      showIcon: true,
      tagPaddingLeftStyle: {},
      schemaTypes: SCHEMA_TYPE,
      value: this.data.properties[this.name]
    }
  },

  computed: {
    nameArray() {
      const prefixArray = [].concat(this.prefix, this.name)
      return [].concat(prefixArray, 'properties')
    },
    prefixArray() {
      return [].concat(this.prefix, this.name)
      // return [].concat(this.prefix, 'items')
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

    handleAction(options) {
      const { prefix, name } = this
      this.$event.emit(`schema-update-${this.editorId}`, {
        eventType: 'add-field',
        prefix,
        name,
        ...options
      })
    },

    handleNameChange(e) {
      this.handleAction({
        eventType: 'update-field-name',
        value: e.target.value
      })
    },
    handleEnableRequire(e) {
      const { prefix, name } = this
      this.$event.emit(`schema-update-${this.editorId}`, {
        eventType: 'toggle-required',
        prefix,
        name,
        required: e
      })
    },
    handleChangeMock() {},
    handleChangeType(value) {
      this.handleAction({ eventType: 'schema-type', value })
    }
  }
}
</script>
