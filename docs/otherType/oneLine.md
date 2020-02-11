---
title: oneLine
order: -12
group:
  title: 特殊类型
---

# list 类型

一行多个字段。

## 何时使用

- 需要一行显示多个字段或者元素的时候。

## 用例

```tsx
import React from 'react';
import { YForm } from 'father-doc-yform';
import { YFormOneLineProps } from 'father-doc-yform/lib/YForm/component/OneLine';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

export default () => {
  return (
    <YForm {...layout} initialValues={{ phones: [{}], card: [{}], users: [{}, {}] }}>
      {[
        {
          label: '用户 1',
          type: 'oneLine',
          componentProps: { oneLineStyle: ['50%', 8, '50%'] },
          items: (): ReturnType<Required<YFormOneLineProps>['items']> => [
            { label: '姓名', type: 'input', name: 'name' },
            <span key="center" />,
            { label: '年龄', type: 'input', name: 'age' },
          ],
        },
        {
          label: '用户 2',
          type: 'oneLine',
          componentProps: { oneLineStyle: ['50%', 8, '50%'] },
          items: ({ style }): ReturnType<Required<YFormOneLineProps>['items']> => {
            return [
              { label: '姓名', type: 'input', name: 'name2' },
              <span key="center" />,
              {
                noStyle: true,
                shouldUpdate: true,
                children: () => {
                  return [{ style: style[2], label: '年龄', type: 'input', name: 'age2' }];
                },
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
