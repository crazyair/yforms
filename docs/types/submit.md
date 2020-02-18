---
title: submit
order: 4
nav:
  title: Type
  order: 7
---

# submit

提交、保存、取消、编辑、返回按钮。

## 何时使用

- 列表页面新增、编辑情况下。
- `Modal Form` 情况下。

## 用例

```tsx
import React from 'react';
import { YForm } from 'father-doc-yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

export default () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <YForm {...layout} required onFinish={onFinish}>
      {[{ type: 'input', label: '姓名', name: 'name' }, { type: 'submit' }]}
    </YForm>
  );
};
```

## API

| 参数     | 说明     | 类型                             | 默认值 |
| -------- | -------- | -------------------------------- | ------ |
| showBtns | 按钮控制 | [showBtns](#showBtns) \| boolean | true   |

### showBtns

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| showSubmit | 提交按钮 | ButtonProps | - |
| showSave | 保存按钮 | <a href="#/other-type/secure-button?anchor=api">YFormSecureButtonProps</a> | - |
| showCancel | 取消按钮 | ButtonProps | - |
| showEdit | 编辑按钮 | ButtonProps | - |
| showBack | 返回按钮 | ButtonProps | - |

## FAQ

### 按钮显示与交互规则

- `disabled` 为 `true` 显示 编辑、返回
- `disabled` 为 `false` 显示 提交、保存、取消
- `create` 页面下点击提交、保存，成功后会返回上一页面
- `create` 页面下点击取消，会返回上一页面
- `edit` 页面下点击提交、保存，成功后会设置 `disabled=true`
- `edit` 页面下点击返回，会返回上一页面
- `view` 页面下点击编辑，会设置 `disabled=false`
- `view` 页面下点击返回，会返回上一页面
