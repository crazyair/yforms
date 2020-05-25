---
title: 更新日志
nav:
  title: 更新日志
  order: 5
---

## [0.8.5](https://github.com/crazyair/yforms/compare/v0.8.4...v0.8.5) (2020-05-25)

### Features

- 重构 ([#20](https://github.com/crazyair/yforms/issues/20)) ([3c5309e](https://github.com/crazyair/yforms/commit/3c5309ea6394c99b05d78200c51d222cee9bf3b5))

## [0.8.4](https://github.com/crazyair/yforms/compare/v0.8.3...v0.8.4) (2020-05-20)

### Bug Fixes

- `moment` value 为空直接 return ([#18](https://github.com/crazyair/yforms/issues/18)) ([9882bf3](https://github.com/crazyair/yforms/commit/9882bf3c103fc809b45f883c31d6e895c03d5d0b))

## [0.8.3](https://github.com/crazyair/yforms/compare/v0.8.1...v0.8.3) (2020-05-20)

### Bug Fixes

- 修复依赖问题 ([#15](https://github.com/crazyair/yforms/issues/15)) ([4772dc0](https://github.com/crazyair/yforms/commit/4772dc0b9f4a5f2fc4805e6bb86d4331f01c63df))

## [0.8.1](https://github.com/crazyair/yforms/compare/v0.6.0...v0.8.1) (2020-05-20)

- 改名 yforms ([#14](https://github.com/crazyair/yforms/issues/14)) ([1c20a9f](https://github.com/crazyair/yforms/commit/1c20a9fb96aa532750a628a1befde8d6ef6bbf40))
- 新增 `format` 功能
- `useForm` 添加 `getFormatFieldsValue`

## [0.6.0](https://github.com/crazyair/yforms/compare/v0.5.9...v0.6.0) (2020-05-16)

- submitFormatValues 根据 name 长度排序 ([#13](https://github.com/crazyair/yforms/issues/13)) ([fc1c411](https://github.com/crazyair/yforms/commit/fc1c41107d10fa798e9298266f7144e2cc5697f8))

## 0.5.9

`2020-04-29`

- 修复 `Submit` 默认按钮显示逻辑

## 0.5.8

`2020-04-25`

- 修复 `disabled` 覆盖逻辑

## 0.5.7

`2020-04-16`

- `onCancel` 添加 `type` 参数
- `YForm` 参数梳理

## 0.5.5

`2020-04-14`

- 修复 `component props` 权重问题

## 0.5.4

`2020-04-13`

- 修复 `component props` 未使用问题

## 0.5.3

`2020-04-12`

- `useSubmit` 返回 `params` 类型修改

## 0.5.2

`2020-04-08`

- `submit` 点击取消默认执行 `resetFields`

## 0.5.1

`2020-04-08`

- `submit` 样式修改

## 0.5.0

`2020-04-08`

- 添加 `scene` 功能，可以自定义展示场景
- 优化 `items` 代码逻辑

## 0.4.3

`2020-02-28`

- `oneLine` 样式修改
- 更新 `antd`、`dumi` 版本

## 0.4.2

`2020-02-27`

- 添加 `password` 类型
- `type` `isShow` 参数增加 `function` 类型，更方便写隐藏显示字段代码

## 0.4.0

`2020-02-18`

- 添加 `Modal Form` 场景示例
- 更改文档模式

## 0.3.0

`2020-02-14`

- 添加 `submit` 类型
- 添加 `secureButton` 类型
- 添加 `useSubmit` 钩子
