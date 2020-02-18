---
title: secureButton
order: 3
nav:
  title: Type
  order: 7
---

# secureButton

防连击按钮

## 何时使用

- 点击按钮请求接口时候使用

## 用例

```tsx
import React from 'react';
import { YForm } from 'father-doc-yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

export default () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onClick = () => {
    console.log('ok');
  };
  return (
    <YForm {...layout} required onFinish={onFinish}>
      {[{ type: 'secureButton', componentProps: { children: '测试', onClick } }]}
    </YForm>
  );
};
```

## API

| 参数     | 说明             | 类型 | 默认值 |
| -------- | ---------------- | ---- | ------ |
| onLoaded | 请求成功后的回调 | -    | true   |

## FAQ

### `onLoaded` 什么时候执行

点击按钮后最低 0.5s，之后再调用 `onLoaded`。
