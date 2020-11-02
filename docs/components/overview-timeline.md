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

### 自定义渲染样式

```html
/*vue*/
<desc>
  `s-overview-timeline` 自定义渲染样式
</desc>

<template>
  <div
    style="min-height:200px;width: 900px; overflow: auto; margin: 0 auto; padding-bottom: 20px"
  >
    <s-overview-timeline
      :data="timelineList"
      :infinite="true"
      :show-content-line="true"
      :custom-content="true"
      line-type="dashed"
      color="#ffa45f"
      content-align="top"
    >
      <template #default="{ item }">
        <p>{{ item.title }}</p>
        <p>{{ item.description }}</p>
      </template>
    </s-overview-timeline>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        timelineList: [
          { title: '2020年08月', description: '🐥 韭菜盒子插件发布' },
          { title: '2020年08月10日', description: '盒子下载量突破5k' },
          { title: '2020年09月20日', description: '盒子下载量破万' },
          { title: '2020年10月24日', description: '盒子下载量>12k' },
          {
            title: '2020年10月31日',
            description: '发布v1.6.7版本🚀'
          },
          { title: '未来', description: '什么时候回本？' }
        ]
      };
    }
  };
</script>
```

## API

### Attributes

|      参数       | 说明                                                      |   类型    |  默认值  |
| :-------------: | --------------------------------------------------------- | :-------: | :------: |
|     `data`      | 渲染数据                                                  |  `Array`  |    -     |
|   `collapse`    | 控制是否展开隐藏节点                                      | `Boolean` |  `true`  |
|   `itemWidth`   | 节点宽度                                                  | `Number`  |  `200`   |
|      `max`      | 节点展示数量（当 collapse 为 true 时有效）                | `Number`  |   `4`    |
|     `align`     | flex 布局 `justify-content`布局方向，靠左对齐、居中、靠右 | `String`  | `center` |
| `customContent` | 是否自定义 content 内容，配合默认的 slot 槽做判断         | `Boolean` | `false`  |

## TODO

`this.$slots` 获取不到东西很奇怪，故多加了 `customContent` 属性判断，优化时可以去掉
