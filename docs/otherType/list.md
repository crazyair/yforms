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

# list 类型

动态增删单字段多字段或者一个组件。

## 何时使用

- 需要动态增减字段。

## 用例

```tsx
import React from 'react';
import { Card } from 'antd';
import { YForm } from 'father-doc-yform';
import { YFormListProps } from 'father-doc-yform/lib/YForm/component/List';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

export default () => {
  return (
    <YForm {...layout} initialValues={{ phones: [{}], card: [{}], users: [{}] }}>
      {[
        {
          type: 'list',
          name: 'phones',
          items: ({ index }): ReturnType<Extract<YFormListProps['items'], Function>> => {
            return [{ label: index === 0 && '手机号', type: 'input', name: [index, 'phone'] }];
          },
        },
        {
          type: 'list',
          name: 'card',
          label: 'card',
          componentProps: { showRightIcons: false },
          items: ({ index, icons }): ReturnType<Extract<YFormListProps['items'], Function>> => {
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
          items: ({ index }): ReturnType<Extract<YFormListProps['items'], Function>> => {
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

## API

### items

- 动态增删内容

items 参数

| 参数   | 说明                       | 类型                             | 默认值 |
| ------ | -------------------------- | -------------------------------- | ------ |
| index  | 当前索引                   | number                           | -      |
| add    | 添加一条数据               | ()=>void                         | -      |
| remove | 删除一条数据               | (index: number)=>void            | -      |
| move   | 移动一条数据               | (from: number, to: number)=>void | -      |
| icons  | 用于自定义显示右侧增删按钮 | React.ReactNode                  | -      |

items 返回为 YForm 返回类型

### componentProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| minNum | 最小条数 | number | - |
| maxNum | 最大条数 | number | - |
| showRightIcons | 是否显示右侧按钮 | boolean | true |
| showIcons | 控制右侧底部按钮是否显示（权重在 `showRightIcons` 之上） | [ShowIconsType](#ShowIconsType) | true |
| onShowIcons | 根据索引控制右侧按钮是否显示（权重在 `showIcons` 之上） | (p: { index: number }) =>showAdd \| showRemove | - |

### ShowIconsType

| 参数          | 说明                                        | 类型    | 默认值            |
| ------------- | ------------------------------------------- | ------- | ----------------- |
| showBottomAdd | 显示底部添加按钮（`text` 可以控制按钮文案） | boolean | { text?: string } | true |
| showAdd       | 显示右侧添加按钮                            | boolean | true              |
| showRemove    | 显示右侧删除按钮                            | boolean | true              |
