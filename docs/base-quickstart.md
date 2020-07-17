# VeCharts

`VeCharts` 是基于 `Vue2.x` 与 `ECharts4.x` 构建封装的组件库，用以解决繁杂的 ECharts 配置项以及数据转化带来的烦恼。`VeCharts` 生成一个 ECharts 图表时，用户只需关心 **数据** 与 **配置项**，甚至无需配置项，即可生成一个默认的图表，使用 `VeCharts` 助你快捷、高效地构建图表。

## 示例

<iframe width="100%" height="470" src="//jsfiddle.net/vecharts/ydkyhjv6/embedded/result,html,js/?bodyColor=fff" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## Test

```html
/*vue*/
<desc>
  Hello `world` - a - b
</desc>

<style>
  .wrapper {
    font-size: 20px;
  }
</style>

<template>
  <div>
    <div class="wrapper">
      <div>
        <p>author: {{ globalVariable }}</p>
        <button :style="style" @click="onClick">test</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        globalVariable: '',
        style: {
          color: 'blue',
        },
      };
    },
    methods: {
      onClick() {
        alert('author: ' + this.globalVariable);
        this.style.color = 'red';
      },
    },
  };
</script>
```
