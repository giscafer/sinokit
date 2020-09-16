<template>
  <div class="query-tags">
    <div class="item start">
      <s-tag :border="false" style="width:80px">
        <slot></slot>
      </s-tag>
    </div>
    <div class="item tags" ref="tagHostRef">
      <s-tag
        v-for="item of tagList"
        :key="item.field"
        :closable="true"
        :field="item.field"
        v-show="!item.hide"
        @close="handleRemove"
      >
        <el-tooltip placement="top" effect="dark" :content="tooltipContent(item)">
          <span>{{item.label}}：{{formatValue(item.value)}}</span>
        </el-tooltip>
      </s-tag>
    </div>
    <div class="item end">
      <button
        v-if="showToggleBtn"
        class="tag-operate"
        v-text="collapsed?'展开':'收起'"
        @click="handleToggle"
      ></button>
    </div>
  </div>
</template>
<script>
import STag from './tag'
export default {
  name: 'SQueryTags',
  components: { STag },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      tagWidth: 200, // 每个tag宽度（样式写死）
      countOneRow: 4,
      collapsed: true,
      tagList: [],
    }
  },
  watch: {
    data() {
      this.renderTag(true, true)
    },
  },
  computed: {
    isCollapse() {
      return this.tagList.some((item) => item.hide)
    },
    showToggleBtn() {
      return this.tagList.length > this.countOneRow
    },
  },
  created() {},
  mounted() {
    this.renderTag(true, true)
    window.addEventListener('resize', this.renderTag)
  },
  methods: {
    tooltipContent(item) {
      return `${item.label}：${this.formatValue(item.value)}`
    },
    formatDate(date, seperator = '/') {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      return [year, month, day]
        .map((n) => {
          const m = n.toString()
          return m[1] ? m : '0' + m
        })
        .join(seperator)
    },
    formatValue(val) {
      if (Array.isArray(val)) {
        if (val[0] instanceof Date || val[0].format) {
          return val.map((d) => this.formatDate(d)).join(',')
        }
        return val.join(',')
      } else if (val === 'ASC' || val === 'DESC') {
        return val === 'ASC' ? '升序' : '降序'
      } else if (typeof val === 'boolean') {
        return val ? '是' : '否'
      }
      return val
    },
    handleToggle() {
      this.collapsed = !this.collapsed
      this.renderTag(this.collapsed)
      if (this.showToggleBtn) {
        this.$emit('toggleChange', this.collapsed)
      }
    },
    handleRemove(field) {
      if (field) {
        for (let i = 0; i < this.tagList.length; i++) {
          const item = this.tagList[i]
          if (item.field === field) {
            this.tagList.splice(i, 1)
            // this.renderTag()
            this.checkCollapse()
            this.$emit('change', { item, collapsed: this.collapsed })
            return
          }
        }
      }
    },
    renderTag(hide = true, first = false) {
      const data = first ? this.data : this.tagList
      const tagRect = this.$refs.tagHostRef.getBoundingClientRect()
      const count = Math.floor(tagRect.width / this.tagWidth)
      this.countOneRow = Math.floor(
        (tagRect.width - count * 10) / this.tagWidth
      )
      const newData = data.map((item, index) => {
        item.hide = false
        if (index >= this.countOneRow && this.collapsed) {
          item.hide = hide
        }
        return item
      })
      this.tagList = newData
      this.checkCollapse()
    },
    checkCollapse() {
      this.collapsed = this.tagList.some((item) => item.hide)
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.renderTag)
  },
}
</script>
<style lang="scss" scoped>
.query-tags {
  display: flex;
  div.item {
    display: inline-block;
  }
  .tags {
    width: 100%;
  }
}
.tag-operate {
  width: 60px;
  height: 30px;
  background: #a3b2f44d;
  border-radius: 4px;
  color: #4865e9;
  font-size: 16px;
  outline: none;
  border: 0;
  cursor: pointer;
  margin-top: 6px;
}
</style>
