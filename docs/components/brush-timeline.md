# BrushTimeline 可缩放时间轴

基于 `d3-brush` 实现的时间轴，可缩放、拖动。

该组件使用频率较低，所以独立封装成组件

## 使用方式

安装 `npm i vue-brush-timeline -S`，然后代码引入：

```javascript
import SBrushTimeline from 'vue-brush-timeline';
Vue.use(SBrushTimeline);
```

## 示例

### 常规用法

尝试一下拉动伸缩滚动条长度，控制时间轴内容的缩放

```html
/*vue*/
<desc>
  `s-brush-timeline` 组件使用展示，`render-type="json"` 格式数据
</desc>

<template>
  <div>
    <s-brush-timeline
      :data="timelineData"
      render-type="json"
    ></s-brush-timeline>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 注意：JavaScript Date 对象中，月份是从0开始
        timelineData: [
          { date: '2008-8-18', label: '牛市后金融危机' },
          { date: '2015-6-18', label: '牛市' },
          { date: '2018-6-18', label: '震荡市' },
          { date: '2020-6-20', label: '突破3000点' },
          { date: '2020-8-20', label: '3200点或许成为历史最低' }
        ]
      };
    }
  };
</script>
```

### 自定义 HTML 模板渲染

```html
/*vue*/
<desc>
  `s-brush-timeline` 组件使用展示，`render-type="html"` 自定义 html 模板
</desc>

<template>
  <div>
    <s-brush-timeline
      :data="timelineData"
      render-type="html"
    ></s-brush-timeline>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 注意：JavaScript Date 对象中，月份是从0开始
        timelineData: [
          {
            content:
              '<div><p class="date">2010-11-18</p><a href="https://github.com/giscafer/sinokit" target="_blank">第一个</a></div>'
          },
          {
            content:
              '<div><p class="date">2011-11-18</p><a href="https://github.com/giscafer/sinokit" target="_blank">新适应症</a></div>'
          },
          {
            content:
              '<div><p class="date">2014-11-18</p><a href="https://github.com/giscafer/sinokit" target="_blank">新冠疫苗方案</a></div>'
          },
          {
            content:
              '<div><p class="date">2013-11-18</p><a href="https://github.com/giscafer/sinokit" target="_blank">包装</a></div>'
          },
          {
            content:
              '<div><p class="date">2014-11-18</p><a href="https://github.com/giscafer/sinokit" target="_blank">审批</a></div>'
          },
          {
            content:
              '<div><p class="date">2015-11-18</p><a href="https://github.com/giscafer/sinokit" target="_blank">IPO</a></div>'
          },
          {
            content:
              '<div><p class="date">2016-11-18</p><a href="https://github.com/giscafer/sinokit" target="_blank">准备上市</a></div>'
          },
          {
            content:
              '<div><p class="date">2017-11-18</p><a href="https://github.com/giscafer/sinokit" target="_blank">上市</a></div>'
          }
        ]
      };
    }
  };
</script>
```

### 缩放不换行

限制最大放大倍数，固定间距避免换行

```html
/*vue*/
<desc>
  `nowrap` 设置为true
</desc>

<template>
  <div>
    <s-brush-timeline
      :data="timelineData"
      render-type="json"
      :nowrap="true"
    ></s-brush-timeline>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 注意：JavaScript Date 对象中，月份是从0开始
        timelineData: [
          { date: '2008-8-18', label: '牛市后金融危机' },
          { date: '2015-6-18', label: '牛市' },
          { date: '2015-6-18', label: '牛市' },
          { date: '2015-6-18', label: '牛市' },
          { date: '2018-6-18', label: '震荡市' },
          { date: '2020-6-20', label: '突破3000点' },
          { date: '2020-8-20', label: '3200点或许成为历史最低' }
        ]
      };
    }
  };
</script>
```

## API

### Attributes

|      参数       | 说明                                                                |   类型    | 默认值  |
| :-------------: | ------------------------------------------------------------------- | :-------: | :-----: |
|  `render-type`  | 数据渲染方式，有两种：`html` 、`json`                               | `String`  | `html`  |
|     `data`      | 渲染的时间数据                                                      | `Object`  |    -    |
|    `height`     | 滚动条 brush 的高度                                                 | `Number`  |  `14`   |
|    `margin`     | 文字和时间轴之间的 margin 距离                                      | `Number`  |  `19`   |
|  `orientation`  | 文字朝向                                                            | `String`  |  `top`  |
|    `tooltip`    | 悬浮在节点上的 tooltip 文字展示                                     | `String`  |    -    |
|    `nowrap`     | 是否换行，本质是限制 brush resize 拉长的限制                        | `Boolean` | `false` |
| `brushMaxWidth` | Brush 最大宽度（对应控制 timeline 缩小)，当 nowrap 为 true 时才生效 | `Number`  |  `500`  |
