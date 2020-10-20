# 开始使用

## 通过 npm 安装

我们提供了 `@sinokit/包名` npm 包，通过下面命令即可完成安装，`SinoKit` 依赖于 `element` 与 `vue`，所以不要忘记安装依赖包。

```bash
npm i @sinokit/components -S
```

## 引入 @sinokit/components

安装完成后，即可使用 `import` 或 `require` 使用。

完整引入 `@sinokit/components`

```js
import Vue from 'vue';
import SinoKitComponents from '@sinokit/components';

Vue.use(SinoKitComponents);
```

按需引入 `@sinokit/components`

```js
import Vue from 'vue';
import { JsonEditor } from '@sinokit/components'; // 引入单个组件，如 JsonEditor

Vue.component('JsonEditor', JsonEditor);
```

## @sinokit/cli

安装工具，即可全局使用 `sino` 命令

```
npm i @sinokit/cli -g
```

使用 `sino create` 命令从模板创建工程

```bash
sino create vue-demo
cd vue-demo
npm run dev
```

> 更多功能开发中…

## @sinokit/utils

安装

```
npm i @sinokit/utils -S
```

vue 相关函数使用

```js
import CustomEventPlugin from '@sinokit/utils/dist/vue/event';
```

string 相关函数使用

```js
import { getStrFullLength } from '@sinokit/utils/dist/string-util';

const fullLength = getStrFullLength('演示如何使用utils工具函数');
console.log(fullLength);
```

> 持续迭代更新……
