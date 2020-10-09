# BackToTop 回到顶部

快速回到顶部按钮。

## 使用方式

按需加载引用方式：

```javascript
import { BackToTop } from '@sinokit/components';

export default {
  components: {
    BackToTop
  }
};
```

## 代码演示

```html
/*vue*/
<desc>
  `s-back-to-top` 组件使用展示
</desc>
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
    </div>
    <el-tooltip placement="top" content="回到顶部">
      <s-back-to-top
        :custom-style="myBackToTopStyle"
        :visibility-height="300"
        :back-position="50"
        transition-name="fade"
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
          background: '#e7eaf1' // 按钮的背景颜色 The background color of the button
        }
      };
    }
  };
</script>

<style scoped>
  .placeholder-container div {
    margin: 10px;
  }
</style>
```

## API

| 参数             | 说明                         | 类型   | 默认值                                                                                                                                   |
| ---------------- | ---------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| visibilityHeight | 滚动距离开始显示回到顶部按钮 | number | `400`                                                                                                                                    |
| backPosition     | 回到顶部位置                 | number | `0`                                                                                                                                      |
| transitionName   | 动画方式                     | string | `fade`                                                                                                                                   |
| appendTo         | 悬浮参照物，滚动的元素       | string | -                                                                                                                                        |
| customStyle      | 自定义 style 样式            | Object | `{ right: '50px', bottom: '50px', width: '40px', height: '40px', 'border-radius': '4px', 'line-height': '45px', background: '#e7eaf1' }` |
