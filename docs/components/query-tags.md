# QueryTags 查询条件 Tags

用于复杂列表查询过滤的条件展示

## 示例

### 常规用法

```html
/*vue*/
<desc>
  `s-query-tags` 组件使用展示
</desc>

<template>
  <div style="min-height:130px">
    <s-query-tags :data="queryFieldList">查询条件：</s-query-tags>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        queryFieldList: [
          {
            label: '姓名',
            field: 'name',
            value: '莫德凯撒'
          },
          {
            label: '年龄',
            field: 'age',
            value: 29
          },
          {
            label: '国籍',
            field: 'country',
            value: '中国'
          },
          {
            label: '性别',
            field: 'sex',
            value: '男'
          },
          {
            label: '爱好',
            field: 'hobby',
            value: '游戏'
          },
          {
            label: '住址',
            field: 'address',
            value: '广东省广州市天河区石牌桥'
          },
          {
            label: '学历',
            field: 'education',
            value: '博士'
          },
          {
            label: '公司',
            field: 'company',
            value: 'League of Legends'
          }
        ]
      };
    }
  };
</script>
```

## API

### Attributes

|    参数    | 说明               |   类型    | 默认值 |
| :--------: | ------------------ | :-------: | :----: |
|   `data`   | 渲染数据           |  `Array`  |   -    |
| `collapse` | 控制是否展开、收起 | `Boolean` | `true` |

### Events

|    事件名称     | 说明                  |       回调参数        |
| :-------------: | --------------------- | :-------------------: |
|    `change`     | tags 移除时的回调函数 | 被移除的 tag 数据对象 |
| `toggle-change` | 收起、展开状态改变    |     `true\false`      |
