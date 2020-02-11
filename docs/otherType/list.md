---
title: list
order: -11
group:
  title: 特殊类型
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

# list

## 用例

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
