---
title: 基础类型
order: 100
nav:
  title: Type
  order: 7
---

# 基础类型

```tsx
import React from 'react';
import { Input } from 'antd';
import { YForm } from 'father-doc-yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

export default () => {
  return (
    <YForm {...layout} required>
      {[
        { type: 'input', label: '文本', name: 'input' },
        { type: 'money', label: '金额', name: 'money' },
        {
          type: 'textarea',
          label: '文本域',
          name: 'textarea',
          extra: '有长度校验（中文为 2 个字符）',
          componentProps: { inputMax: 2 },
        },
        {
          type: 'checkbox',
          label: '单选',
          name: '单选',
          componentProps: { children: '已阅读' },
        },
        {
          type: 'checkboxGroup',
          label: '多选',
          name: '多选',
          componentProps: {
            options: [
              { id: '1', name: '开' },
              { id: '2', name: '关' },
            ],
          },
        },
        {
          type: 'switch',
          label: '开关',
          name: '开关',
          componentProps: { checkedChildren: '开', unCheckedChildren: '关' },
        },
        {
          type: 'select',
          label: '下拉框',
          name: '下拉框',
          componentProps: {
            optionLabelProp: 'checkedValue',
            onAddProps: item => ({ checkedValue: `(${item.name})` }),
            showField: record => (
              <div>
                <div>{record.id}</div>-{record.name}
              </div>
            ),
            options: [
              {
                id: '1',
                name: '开',
                onChange: e => {
                  console.log(e);
                },
              },
              { id: '2', name: '关' },
            ],
          },
        },
        {
          type: 'radio',
          label: '开关',
          name: '开关',
          componentProps: {
            showField: record => `${record.id}-${record.name}`,
            postField: 'id',
            options: [
              { id: '1', name: '开' },
              { id: '2', name: '关' },
            ],
          },
        },
        { label: '文本', name: 'text', type: 'text' },
        { label: '自定义渲染', type: 'custom', name: 'custom', component: <Input /> },
        {
          dataSource: [
            {
              type: 'button',
              noStyle: true,
              plugins: { disabled: false },
              componentProps: { type: 'primary', htmlType: 'submit', children: 'submit' },
            },
          ],
        },
      ]}
    </YForm>
  );
};
```

## API

### 共同的 API

- 以下 API 为 `checkboxGroup` `radio` `select` 共享的 API。

### componentProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 数据源，说明[见下](#options) | Array | - |
| showField | 默认显示字段（为 `function` 则为返回值） | string \| ((record: T, index: number) => React.ReactNode) | id |
| postField | 默认提交字段（为 `function` 则为返回值） | string \| ((record: T, index: number) => React.ReactNode) | name |
| renderOption | 自定义显示内容 | (item: any) => any | - |
| onAddProps | 对每一项追加参数 | (item: T, index: number) => { disabled?: boolean; [key: string]: React.ReactNode } | - |

### options

- `id` `name` 为默认字段，可以使用 `showField` `postField` 修改默认字段。

| 参数     | 说明     | 类型            | 默认值 |
| -------- | -------- | --------------- | ------ |
| id       | 提交字段 | React.ReactNode | -      |
| name     | 显示字段 | React.ReactNode | -      |
| disabled | 禁用当前 | boolean         | -      |
