---
title: 类型
order: -3
---

<!--
- input
- [textarea](#textarea)
- [money](#money)
- checkbox
- switch
- checkboxGroup
- select
- radio
- text
- button
- oneLine
- list
- custom -->

## 基本类型

```tsx
import React from 'react';
import { YForm } from 'father-doc-yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

export default () => {
  return (
    <YForm {...layout}>
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

## 特殊类型

### list

```tsx
import React from 'react';
import { Card } from 'antd';
import { YForm } from 'father-doc-yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

export default () => {
  return (
    <YForm {...layout} initialValues={{ phones: [{}], card: [{}], users: [{}, {}] }}>
      {[
        {
          type: 'list',
          name: 'phones',
          items: ({ index }) => {
            return [{ label: index === 0 && '手机号', type: 'input', name: [index, 'phone'] }];
          },
        },
        {
          type: 'list',
          name: 'card',
          label: 'card',
          componentProps: { showRightIcons: false },
          items: ({ index, icons }) => {
            return [
              {
                dataSource: [
                  <Card key="card" size="small" title={`card_${index + 1}`} extra={icons}>
                    <YForm.Items>
                      {[{ label: '手机号', type: 'input', name: [index, 'phone'] }]}
                    </YForm.Items>
                  </Card>,
                ],
              },
            ];
          },
        },
        {
          label: '用户',
          type: 'list',
          name: 'users',
          items: ({ index }) => {
            return [
              {
                type: 'oneLine',
                componentProps: { oneLineStyle: ['50%', 8, '50%'] },
                items: () => [
                  { label: '姓名', type: 'input', name: [index, 'name'] },
                  <span key="center" />,
                  { label: '年龄', type: 'input', name: [index, 'age'] },
                ],
              },
            ];
          },
        },
      ]}
    </YForm>
  );
};
```

### oneLine

```tsx
import React from 'react';
import { YForm } from 'father-doc-yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

export default () => {
  return (
    <YForm {...layout} initialValues={{ phones: [{}], card: [{}], users: [{}, {}] }}>
      {[
        {
          label: '用户',
          type: 'oneLine',
          componentProps: { oneLineStyle: ['50%', 8, '50%'] },
          items: () => [
            { label: '姓名', type: 'input', name: 'name' },
            <span key="center" />,
            { label: '年龄', type: 'input', name: 'age' },
          ],
        },
      ]}
    </YForm>
  );
};
```
