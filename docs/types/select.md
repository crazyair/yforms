---
title: select|radio|checkboxGroup
nav:
  title: Type
---

# select|radio|checkboxGroup

下拉、单选、多选类型

## 用例

<code src="./demo/select.tsx" />

## getOptions

<code src="./demo/getOptions.tsx" />

### 共同的 API

- 以下 API 为 `checkboxGroup` `radio` `select` 共享的 API。

### componentProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 数据源，说明[见下](#options) | Array | - |
| getOptions | 动态获取 options | (value:any, parentValues: any, values: any) => OptionsType[] | - |
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
