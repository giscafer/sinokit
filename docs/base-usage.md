# 开始使用

## 通过 npm 安装

我们提供了 `sino-ui` npm 包，通过下面命令即可完成安装，`sino-ui` 依赖于 `element` 与 `vue`，所以不要忘记安装依赖包。

```bash
npm i sino-ui -S
```

## 引入 SinoUI

安装完成后，即可使用 `import` 或 `require` 使用。

完整引入 `sino-ui`

```js
import Vue from 'vue';
import SinoUI from 'sino-ui';

Vue.use(SinoUI);
```

按需引入 `sino-ui`

```js
import Vue from 'vue';
import { VeBarChart } from 'sino-ui'; // 引入单个图表

Vue.component('VeBarChart', VeBarChart);
```

目前支持的单个引入图表列表如下：

| 组件名称 | 组件        |
| -------- | ----------- |
| 折线图   | VeLineChart |
| 柱状图   | VeBarChart  |

## 创建图表

```html
<ve-bar-chart :data="chartData" />
```

```js
export default {
  created() {
    this.chartData = {
      dimensions: {
        name: 'Week',
        data: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fir.', 'Sat.', 'Sun.'],
      },
      measures: [
        {
          name: 'PV',
          data: [256, 767, 1356, 2087, 803, 582, 432],
        },
        {
          name: 'UV',
          data: [287, 707, 1756, 1822, 987, 432, 322],
        },
      ],
    };
  },
};
```
