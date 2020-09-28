# CountDown 倒计时

倒计时组件。

按需加载引用方式：

```javascript
import CountDown from '@sinokit/components/count-down';

export default {
  components: {
    CountDown
  }
};
```

## 代码演示

```html
/*vue*/
<desc>
  `s-count-down` 组件使用展示
</desc>

<s-count-down :target="new Date().getTime() + 3000000" />
```

## API

| 参数   | 说明           | 类型    | 默认值 |
| ------ | -------------- | ------- | ------ |
| target | 目标时间       | Date    | -      |
| onEnd  | 倒计时结束回调 | funtion | -      |
