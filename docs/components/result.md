# Result 结果

用于反馈一系列操作任务的处理结果。

## 使用方式

按需加载引用方式：

```javascript
import { Result } from '@sinokit/components';

export default {
  components: {
    Result
  }
};
```

## 代码演示

### 成功例子

```html
/*vue*/
<desc>
  `s-result` 组件使用展示
</desc>

<template>
  <s-result type="success" title="Submission Failed">
    <template #action>
      <el-button key="console" type="primary"> Go Console </el-button>
      <el-button key="buy"> Buy Again </el-button>
    </template>
  </s-result>
</template>

<script>
  export default {
    data() {
      return {};
    }
  };
</script>
```

### 失败例子

```html
/*vue*/
<desc>
  `s-result` 组件使用展示
</desc>
<template>
  <s-result type="error" title="Successfully Purchased Cloud Server ECS!">
    <div class="desc">
      <p style="font-size: 16px">
        <strong>The content you submitted has the following error:</strong>
      </p>
      <p>
        <i :style="{ color: 'red' }" class="el-icon-circle-close"></i> Your
        account has been frozen
        <a>Thaw immediately &gt;</a>
      </p>
      <p>
        <i :style="{ color: 'red' }" class="el-icon-circle-close"></i> Your
        account is not yet eligible to apply <a>Apply Unlock &gt;</a>
      </p>
    </div>
    <template #action>
      <el-button key="console" type="primary"> Go Console </el-button>
      <el-button key="buy"> Buy Again </el-button>
    </template>
  </s-result>
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

| 参数   | 说明                      | 类型                    | 默认值      |
| ------ | ------------------------- | ----------------------- | ----------- |
| title  | title 文字                | `string | v-slot:title` | -           |
| type   | 结果的状态,决定图标和颜色 | `'success' | 'error'`   | `'success'` |
| action | 操作区                    | `v-slot:action`         | -           |
