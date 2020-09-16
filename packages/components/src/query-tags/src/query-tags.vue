<template>
  <div class="query-tags">
    <div class="item">
      <s-tag :border="false" style="width:80px">查询条件：</s-tag>
    </div>
    <div class="item tags" ref="tagHostRef">
      <s-tag
        v-for="item of tagList"
        :key="item.field"
        :closable="true"
        :field="item.field"
        v-show="!item.hide"
        @close="handleRemove"
      >{{item.label}}：{{item.value}}</s-tag>
    </div>
    <div class="item">
      <button
        v-if="showToggleBtn"
        class="tag-operate"
        v-text="isCollapse?'展开':'收起'"
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
  },
  data() {
    return {
      tagWidth: 168, // 每个tag宽度（样式写死）
      countOneRow: 4,
      tagList: [],
    }
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
    handleToggle() {
      this.renderTag(!this.isCollapse)
      if (this.showToggleBtn) {
        this.$emit('toggleChange', this.isCollapse)
      }
    },
    handleRemove(field) {
      if (field) {
        for (let i = 0; i < this.tagList.length; i++) {
          const item = this.tagList[i]
          if (item.field === field) {
            console.log(field, i)
            this.tagList.splice(i, 1)
            // this.renderTag()
            this.$emit('change', item)
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
        if (index >= this.countOneRow) {
          item.hide = hide
        }
        return item
      })
      this.tagList = newData
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
