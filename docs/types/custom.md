---
title: custom
order: 5
nav:
  title: Type
  order: 7
---

# custom

自定义渲染元素。

## 何时使用

- 需要自定义渲染元素的时候用到。
- 多用于用户自己封装的字段组件（参数有 `value` `onChange`）。

## 用例

```tsx
import React from 'react';
import { YForm } from 'father-doc-yform';
import { YFormOneLineProps } from 'father-doc-yform/lib/YForm/component/OneLine';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

export default () => {
  return (
    <YForm {...layout}>
      {[
        {
          label: '自定义渲染',
          type: 'custom',
          name: 'custom',
          component: <div>这是自定义渲染</div>,
        },
      ]}
    </YForm>
  );
};
```
