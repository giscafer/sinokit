<template>
  <div>
    <el-tooltip v-if="tooltip && fullLength > length" placement="top">
      <div slot="content" v-text="str"></div>
      <span>
        {{ getText() }}
      </span>
    </el-tooltip>
    <span v-else>
      {{ getText() }}
    </span>
  </div>
</template>

<script>
import {
  cutStrByFullLength,
  getStrFullLength,
} from '@sinokit/utils/dist/string-util'

export default {
  name: 'SEllipsis',
  props: {
    prefixCls: {
      type: String,
      default: 's-ellipsis',
    },
    tooltip: {
      type: Boolean,
    },
    length: {
      type: Number,
      required: true,
    },
    lines: {
      type: Number,
      default: 1,
    },
    fullWidthRecognition: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    if (!this.str) {
      this.str = this.$slots.default.map((vNode) => vNode.text).join('')
    }
    return {
      str: this.str,
    }
  },
  computed: {
    fullLength() {
      const fullLength = getStrFullLength(this.str)
      console.log(this.str, fullLength)
      return fullLength
    },
  },
  mounted() {
    // this.str = this.$slots.default.map((vNode) => vNode.text).join('')
    console.log(this.tooltip && this.fullLength > length)
  },
  methods: {
    getText() {
      return (
        cutStrByFullLength(this.str, this.length) +
        (this.fullLength > this.length ? '...' : '')
      )
    },
  },
}
</script>
