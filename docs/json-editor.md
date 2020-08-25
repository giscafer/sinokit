# JSON 编辑器

JSON 编辑器，基于 `codemirror` 实现

## 示例

```html
/*vue*/
<desc>
  `JsonEditor` 组件使用展示，`readonly` 控制是否可编辑
</desc>

<template>
  <div>
    <div class="wrapper">
      <el-button @click="handleToggleTheme">切换主题</el-button>
      <json-editor :value="jsonObject" :readonly="false" :theme="theme" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        theme: 'idea',
        jsonObject: {
          author: 'giscafer',
          email: 'test@outlook.com',
          github: 'https://github.com/giscafer'
        }
      };
    },
    methods: {
      handleToggleTheme() {
        if (this.theme === 'idea') {
          this.theme = 'rubyblue';
        } else {
          this.theme = 'idea';
        }
      }
    }
  };
</script>
```

## API

### Attributes

|    参数    | 说明                                          |   类型    | 默认值 |
| :--------: | --------------------------------------------- | :-------: | :----: |
|  `value`   | JSON 对象                                     | `Object`  |   -    |
| `readonly` | 是否可编辑                                    | `Boolean` | `true` |
|  `theme`   | 主题颜色，目前只支持两种：`rubyblue` 、`idea` | `String`  | `idea` |
