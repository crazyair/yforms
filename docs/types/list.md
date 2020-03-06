---
title: list
nav:
  title: Type
---

# list

动态增删单字段多字段或者一个组件。

## 何时使用

- 需要动态增减字段。

## 用例

<code src="./demo/list.tsx" />

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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| showBottomAdd | 显示底部添加按钮（`text` 可以控制按钮文案） | boolean \| { text?: string } | true |
| showAdd | 显示右侧添加按钮 | boolean | true |
| showRemove | 显示右侧删除按钮 | boolean | true |
