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
        v-show="!item.hide"
      >{{item.label}}：{{item.value}}</s-tag>
    </div>
    <div class="item">
      <button class="tag-operate" v-text="isCollapse?'展开':'收起'" @click="handleToggle"></button>
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
  },
  created() {},
  mounted() {
    console.log(this.$refs.tagHostRef)
    const tagRect = this.$refs.tagHostRef.getBoundingClientRect()
    this.countOneRow = Math.floor(tagRect.width / 168)
    const newData = this.data.map((item, index) => {
      if (index >= this.countOneRow) {
        item.hide = true
      }
      return item
    })
    this.tagList = newData
  },
  methods: {
    handleToggle() {
      this.tagList.forEach((item) => {
        // item
      })
    },
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
  background: #a3b2f4;
  border-radius: 4px;
  color: #4865e9;
  font-size: 16px;
  outline: none;
  border: 0;
  cursor: pointer;
  margin-top: 6px;
}
</style>
