# OverviewTimeline 概览时间轴

概览时间轴，默认折叠，可收起的时间轴

## 示例

### 常规用法

```html
/*vue*/
<desc>
  `s-overview-timeline` 组件使用展示，`itemWidth` 控制每个节点宽度，默认收起节点
</desc>

<template>
  <div style="min-height:400px">
    <div>
      <s-overview-timeline :data="timelineList"></s-overview-timeline>
    </div>
    <div style="margin-top:130px">
      <s-overview-timeline :data="timelineList2"></s-overview-timeline>
    </div>
    <div style="margin-top:130px">
      <s-overview-timeline
        :data="timelineList3"
        :itemWidth="300"
      ></s-overview-timeline>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        timelineList: [{ title: '1997年', description: '美国第一次上市' }],
        timelineList2: [
          { title: '1997年', description: '美国第一次上市' },
          { title: '2000年', description: '香港第一次上市' }
        ],
        timelineList3: [
          { title: '1997年', description: '美国第一次上市' },
          { title: '2000年', description: '香港第一次上市' },
          { title: '2000年', description: '香港第一次上市' },
          { title: '2007年', description: '中国第一次上市' },
          { title: '2008年', description: '中国第8次上市' }
        ]
      };
    }
  };
</script>
```

### 展开所有节点

```html
/*vue*/
<desc>
  `s-overview-timeline` 组件使用展示，`collapse` 控制是否展开隐藏节点
</desc>

<template>
  <div style="min-height:200px;width:1100px;padding-top:30px;overflow-x:auto">
    <s-overview-timeline
      :data="timelineList"
      :collapse="false"
    ></s-overview-timeline>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        timelineList: [
          { title: '1997年', description: '美国第一次上市' },
          { title: '2000年', description: '香港第一次上市' },
          { title: '2002年', description: '香港第一次上市' },
          { title: '2003年', description: '香港第一次上市' },
          { title: '2003年', description: '香港第一次上市' },
          { title: '200x年', description: '香港第x次上市' }
        ]
      };
    }
  };
</script>
```

## API

### Attributes

|    参数     | 说明                                                |   类型    |  默认值  |
| :---------: | --------------------------------------------------- | :-------: | :------: |
|   `data`    | 渲染数据                                            |  `Array`  |    -     |
| `collapse`  | 控制是否展开隐藏节点                                | `Boolean` |  `true`  |
| `itemWidth` | 节点宽度                                            | `Number`  |  `200`   |
|    `max`    | 节点展示数量（当 collapse 为 true 时有效）          | `Number`  |   `4`    |
|   `align`   | flex`justify-content`布局方向，靠左对齐、居中、靠右 | `String`  | `center` |
