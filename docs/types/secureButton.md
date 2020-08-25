---
title: secureButton
nav:
  title: Type
---

# secureButton

防连击按钮

## 何时使用

- 点击按钮请求接口时候使用

## 用例

<code src="./demo/secureButton.tsx" />

## API

| 参数              | 说明                  | 类型   | 默认值 |
| ----------------- | --------------------- | ------ | ------ |
| onLoaded          | 请求成功后的回调      | -      | true   |
| minBtnLoadingTime | 按钮最低 loading 时间 | number | 500    |

## FAQ

### `onLoaded` 什么时候执行

点击按钮后最低 0.5s，之后再调用 `onLoaded`。
