# BrushTimeline 时间轴

基于 `d3-brush` 实现的时间轴，可缩放、拖动

## 示例

```html
/*vue*/
<desc>
  `BrushTimeline` 组件使用展示，通过控制滚动条缩短和拉长来缩放时间轴
</desc>

<template>
  <div>
    <h3>时间轴</h3>
    <brush-timeline :data="timelineData"></brush-timeline>
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
              '<div><p class="date">2010-11-18</p><a href="" target="_blank">第一个</a></div>'
          },
          {
            content:
              '<div><p class="date">2011-11-18</p><a href="" target="_blank">新适应症</a></div>'
          },
          {
            content:
              '<div><p class="date">2014-11-18</p><a href="" target="_blank">新给药方案</a></div>'
          },
          {
            content:
              '<div><p class="date">2013-11-18</p><a href="" target="_blank">包装</a></div>'
          },
          {
            content:
              '<div><p class="date">2014-11-18</p><a href="" target="_blank">审批</a></div>'
          },
          {
            content:
              '<div><p class="date">2015-11-18</p><a href="" target="_blank">IPO</a></div>'
          },
          {
            content:
              '<div><p class="date">2016-11-18</p><a href="" target="_blank">准备上市</a></div>'
          },
          {
            content:
              '<div><p class="date">2017-11-18</p><a href="" target="_blank">上市</a></div>'
          }
        ]
      };
    }
  };
</script>
```

## API

### Attributes

|     参数      | 说明                           |   类型   | 默认值 |
| :-----------: | ------------------------------ | :------: | :----: |
|    `data`     | 渲染的时间数据                 | `Object` |   -    |
|   `height`    | 滚动条 brush 的高度            | `Number` |  `14`  |
|   `margin`    | 文字和时间轴之间的 margin 距离 | `Number` |  `19`  |
| `orientation` | 文字朝向                       | `String` | `top`  |
