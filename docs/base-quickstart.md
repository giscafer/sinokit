# SinoUI

`SinoUI` 是基于 `Vue2.x` 与 `ElementUI` 构建封装的解决方案库，通过提供 **功能组件**、**区块**、**页面模板**，用以解决频繁开发业务组件的情况，目的是提效降本。

## 示例

<!--
<iframe width="100%" height="470" src="//jsfiddle.net/vecharts/ydkyhjv6/embedded/result,html,js/?bodyColor=fff" allowfullscreen="allowfullscreen" frameborder="0"></iframe> -->

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
