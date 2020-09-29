<template>
  <div class="components-container">
    <aside>页面滚动到指定位置会在右下角出现返回顶部按钮</aside>
    <aside>
      可自定义按钮的样式、show/hide、出现的高度、返回的位置
      如需文字提示，可在外部使用Element的el-tooltip元素
    </aside>
    <div class="placeholder-container">
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
    </div>
    <!-- you can add element-ui's tooltip -->
    <el-tooltip placement="top" content="tooltip">
      <s-back-to-top
        :custom-style="myBackToTopStyle"
        :visibility-height="300"
        :back-position="50"
        transition-name="fade"
        append-to=".main-content"
      />
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'BackToTopDemo',
  data() {
    return {
      // customizable button style, show/hide critical point, return position
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1', // 按钮的背景颜色 The background color of the button
      },
    }
  },
}
</script>

<style scoped>
.placeholder-container div {
  margin: 10px;
}
</style>
