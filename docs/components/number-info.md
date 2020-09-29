# NumberInfo 数据文本

常用在数据卡片中，用于突出展示某个业务数据。

按需加载引用方式：

```javascript
import { NumberInfo } from '@sinokit/components';

export default {
  components: {
    NumberInfo
  }
};
```

## 代码演示

```html
<template>
  <s-number-info
    :sub-title="() => { return 'Visits this week' }"
    :total="12321"
    status="up"
    :sub-total="17.1"
  ></s-number-info>
</template>
<script>
  export default {
    data() {
      return {};
    }
  };
</script>
```

## API

| 参数     | 说明                             | 类型              | 默认值  |
| -------- | -------------------------------- | ----------------- | ------- |
| title    | 标题                             | ReactNode\|string | -       |
| subTitle | 子标题                           | ReactNode\|string | -       |
| total    | 总量                             | ReactNode\|string | -       |
| subTotal | 子总量                           | ReactNode\|string | -       |
| status   | 增加状态                         | 'up \| down'      | -       |
| theme    | 状态样式                         | string            | 'light' |
| gap      | 设置数字和描述之间的间距（像素） | number            | 8       |
