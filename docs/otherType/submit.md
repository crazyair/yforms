---
title: submit
order: 4
group:
  title: 特殊类型
---

# submit 类型

提交、保存、取消、编辑、返回按钮。

## 何时使用

- 列表页面新增、编辑情况下。
- `Modal Form` 情况下。

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
