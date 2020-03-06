---
title: oneLine
nav:
  title: Type
---

# oneLine

一行多个字段。

## 何时使用

- 需要一行显示多个字段或者元素的时候。

## 用例

<code src="./demo/oneLine.tsx" />

## API

### items

- 动态增删内容

items 参数

| 参数  | 说明               | 类型                  | 默认值 |
| ----- | ------------------ | --------------------- | ------ |
| style | 注入每个元素的样式 | React.CSSProperties[] | -      |

items 返回为 YForm 返回类型

### componentProps

| 参数         | 说明               | 类型                 | 默认值 |
| ------------ | ------------------ | -------------------- | ------ |
| oneLineStyle | 设置每个元素的宽度 | (string \| number)[] | -      |

`oneLineStyle` 设置说明

- 计算每个元素的占比使用的是 [css calc 函数](<https://www.html.cn/book/css/values/functional/calc().htm>)
- 带`%` 的所有加起来和不大于 `100%`

- 例：`oneLineStyle: ['50%', 8, '50%']` 左边`50%` 中间`8px` 右边 `50%`
