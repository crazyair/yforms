---
title: 更新日志
nav:
  title: 更新日志
  order: 5
---

## [1.3.5](https://github.com/crazyair/yforms/compare/v1.3.5...v1.3.7) (2020-12-09)

### Chore

- 升级 antd 版本

## [1.3.5](https://github.com/crazyair/yforms/compare/v1.3.4...v1.3.5) (2020-09-27)

### Bug Fixes

- 删除 Space 特殊判断 ([446b376](https://github.com/crazyair/yforms/commit/446b3765a62731b2f952fd85f84a0d13c8532403))

## [1.3.4](https://github.com/crazyair/yforms/compare/v1.3.0...v1.3.4) (2020-09-27)

### Bug Fixes

- 修复 deFormat 对数据处理失效 ([5972e6f](https://github.com/crazyair/yforms/commit/5972e6f415fdf9b60d0f6146c1a146fabb45c06a))
- sideEffects ([f5d86d7](https://github.com/crazyair/yforms/commit/f5d86d70ca2b0eb1818867b39a2adf8d2f13bd22))
- 修复部署丢失样式 ([07ff570](https://github.com/crazyair/yforms/commit/07ff570841491c7bc4012a3172512daf1ce5a050))

## [1.3.0](https://github.com/crazyair/yforms/compare/v1.2.9...v1.3.0) (2020-08-27)

### Features

- getInitialValues 方法添加提交成功后的 reload 操作 ([09c1f27](https://github.com/crazyair/yforms/commit/09c1f27b11f93ba40d058ddedc920df338b41bde))
- 修改 loadData 执行位置 ([0164a5c](https://github.com/crazyair/yforms/commit/0164a5c83978bc7b744753ccae3d2b4719bda863))

## [1.2.9](https://github.com/crazyair/yforms/compare/v1.2.8...v1.2.9) (2020-08-26)

### Features

- form 添加 getInitialValues 方法 ([#45](https://github.com/crazyair/yforms/issues/45)) ([c1a17ed](https://github.com/crazyair/yforms/commit/c1a17edfff84f22f6f9ef3166c93e8297f21efce))

## [1.2.8](https://github.com/crazyair/yforms/compare/v1.2.7...v1.2.8) (2020-08-25)

### Features

- 添加 card 类型、提交按钮添加时间控制 ([#44](https://github.com/crazyair/yforms/issues/44)) ([e44595e](https://github.com/crazyair/yforms/commit/e44595eded7853538ebb6125a4038403abd32ba7))

## [1.2.7](https://github.com/crazyair/yforms/compare/v1.2.6...v1.2.7) (2020-08-24)

### Bug Fixes

- 修复 required 合并问题 ([a889e6d](https://github.com/crazyair/yforms/commit/a889e6d14e40f7a9c2a892db93a08254157b57af))

## [1.2.6](https://github.com/crazyair/yforms/compare/v1.2.5...v1.2.6) (2020-08-20)

### Bug Fixes

- 获取上级数据没有则返回 undefined ([cb95d15](https://github.com/crazyair/yforms/commit/cb95d158a9d0dd512deeca535d58a99423b703b8))

## [1.2.5](https://github.com/crazyair/yforms/compare/v1.2.4...v1.2.5) (2020-08-19)

### Bug Fixes

- deFormat 可以在 scenes 使用 ([528da40](https://github.com/crazyair/yforms/commit/528da401c1c8ef7aff223c766ae75fa2cc99f99c))

## [1.2.4](https://github.com/crazyair/yforms/compare/v1.2.3...v1.2.4) (2020-08-06)

### Bug Fixes

- 修复数组 format 为空 ([#42](https://github.com/crazyair/yforms/issues/42)) ([bcc91d9](https://github.com/crazyair/yforms/commit/bcc91d91bf1fc2a2aa816c57eeac697668c3a4b6))

## [1.2.2](https://github.com/crazyair/yforms/compare/v1.2.1...v1.2.2) (2020-08-06)

### Refactor

- refactor: unFormat 更改为 deFormat ([6af5ce8](https://github.com/crazyair/yforms/commit/6af5ce8c74828ccf8e0e4784c14b34c6e827e5f4))

## [1.2.1](https://github.com/crazyair/yforms/compare/v1.2.0...v1.2.1) (2020-08-04)

### Bug Fixes

- 过滤 initialValues 的 merge 处理 ([b9fc580](https://github.com/crazyair/yforms/commit/b9fc580056f18c6fa9ba5fe8a2f72c64420c41ef))

## [1.2.0](https://github.com/crazyair/yforms/compare/v1.1.8...v1.2.0) (2020-07-29)

### Bug Fixes

- 修复 getOptions 每次变更都会调用请求 ([#40](https://github.com/crazyair/yforms/issues/40)) ([5dc1313](https://github.com/crazyair/yforms/commit/5dc131305feb714824b9f3588280fbc8ac351f98))

## [1.1.8](https://github.com/crazyair/yforms/compare/v1.1.7...v1.1.8) (2020-07-28)

### Bug Fixes

- 修复 money 类型不能改值 ([#39](https://github.com/crazyair/yforms/issues/39)) ([25a13c5](https://github.com/crazyair/yforms/commit/25a13c57a410cc9f65c61c0a76d5374df2088f77))

## [1.1.7](https://github.com/crazyair/yforms/compare/v1.1.6...v1.1.7) (2020-07-25)

### Features

- Select、Radio 添加 getOptions ([#38](https://github.com/crazyair/yforms/issues/38)) ([d9a2175](https://github.com/crazyair/yforms/commit/d9a21752db6ac886cf20e008db8d56089329e7c1))

## [1.1.6](https://github.com/crazyair/yforms/compare/v1.1.5...v1.1.6) (2020-07-05)

### Bug Fixes

- 修复 isShow 中 getFieldsValue 未拿 Store ([#36](https://github.com/crazyair/yforms/issues/36)) ([b3be944](https://github.com/crazyair/yforms/commit/b3be9444951d3cc7bbca81eb85984916304486b0))

## [1.1.5](https://github.com/crazyair/yforms/compare/v1.1.4...v1.1.5) (2020-07-03)

### Features

- 表单组件添加 ref ([#35](https://github.com/crazyair/yforms/issues/35)) ([d7aa4e3](https://github.com/crazyair/yforms/commit/d7aa4e3820dac562ff87156ca7df5ae0db21c2cf))

## [1.1.4](https://github.com/crazyair/yforms/compare/v1.1.3...v1.1.4) (2020-07-03)

### Bug Fixes

- 修复 form 类型 ([#34](https://github.com/crazyair/yforms/issues/34)) ([269caec](https://github.com/crazyair/yforms/commit/269caecb7266a432350502df1393d6a7c52791ed))

## [1.1.2](https://github.com/crazyair/yforms/compare/v1.1.1...v1.1.2) (2020-06-21)

### Bug Fixes

- 修复 children 类型

## [1.1.1](https://github.com/crazyair/yforms/compare/v1.1.0...v1.1.1) (2020-06-20)

### Features

- 添加 mergeWithDom 碰到 dom 情况下使用原值 ([#32](https://github.com/crazyair/yforms/issues/32)) ([ccfd34f](https://github.com/crazyair/yforms/commit/ccfd34f94c2b86e148da684a74f13442f3e073eb))

# [1.1.0](https://github.com/crazyair/yforms/compare/v1.0.7...v1.1.0) (2020-06-18)

### Features

- hash ([f4d1054](https://github.com/crazyair/yforms/commit/f4d10540ee13399887c4adf0d4fa102f25bde5a3))
- 搜索场景优化、type 组件从 Context 获取 Props ([#31](https://github.com/crazyair/yforms/issues/31)) ([cbe40c1](https://github.com/crazyair/yforms/commit/cbe40c14f849dad2e462b0d9cc3dd4e0190fb145))
- 优化 deFormat 逻辑 ([dcbaddc](https://github.com/crazyair/yforms/commit/dcbaddc66269921bbad97d675b4a3f5c8ff079a2))
- 优化代码 ([ba4e6cb](https://github.com/crazyair/yforms/commit/ba4e6cb6c05a7415894eb43e61c4987373778cef))
- 支持 jsx 方式配置表单 ([#30](https://github.com/crazyair/yforms/issues/30)) ([137dcd0](https://github.com/crazyair/yforms/commit/137dcd05433f4b962da9588860382669ceb565d7))

## [1.0.7](https://github.com/crazyair/yforms/compare/v1.0.6...v1.0.7) (2020-06-13)

### Features

- 优化 Space 对于空内容显示、YForm 添加默认 layout ([#29](https://github.com/crazyair/yforms/issues/29)) ([8b6a86d](https://github.com/crazyair/yforms/commit/8b6a86dd51fce5d94d51b56a907c91093ce05518))

## [1.0.6](https://github.com/crazyair/yforms/compare/v1.0.5...v1.0.6) (2020-06-12)

### Features

- 添加 format deFormat ([#28](https://github.com/crazyair/yforms/issues/28)) ([a866a14](https://github.com/crazyair/yforms/commit/a866a1468615cf911c8b2ee56b0525e7568a5df3))

## [1.0.5](https://github.com/crazyair/yforms/compare/v1.0.4...v1.0.5) (2020-06-11)

### Bug Fixes

- 修复提交按钮 loading 状态闪一下 ([13bf16c](https://github.com/crazyair/yforms/commit/13bf16c844f9f8d1b1d69fcf6b83832e347e1b07))

## [1.0.4](https://github.com/crazyair/yforms/compare/v1.0.3...v1.0.4) (2020-06-11)

### Bug Fixes

- 修复编辑按钮未改变 disabled ([760ddaa](https://github.com/crazyair/yforms/commit/760ddaa2ad42cb2c738c6ac02e3a42daa04b5e0f))

## [1.0.3](https://github.com/crazyair/yforms/compare/v1.0.2...v1.0.3) (2020-06-11)

### Features

- 重新整理 useSubmit 逻辑、优化组件 TypeScript 定义 ([#27](https://github.com/crazyair/yforms/issues/27)) ([2ca1a06](https://github.com/crazyair/yforms/commit/2ca1a06762835e2d3c0a9c898c0b3747885664aa))

## [1.0.2](https://github.com/crazyair/yforms/compare/v1.0.1...v1.0.2) (2020-06-10)

### Features

- 添加 FormModal ([#26](https://github.com/crazyair/yforms/issues/26)) ([12a7816](https://github.com/crazyair/yforms/commit/12a7816219a3d25bc1cd44221e9e75f59c806b5b))

## [1.0.1](https://github.com/crazyair/yforms/compare/v1.0.0...v1.0.1) (2020-06-08)

### Bug Fixes

- submit typescript ([#25](https://github.com/crazyair/yforms/issues/25)) ([96462f7](https://github.com/crazyair/yforms/commit/96462f7d42e9d78496d761be8c14094691a06cda))
- 修复 now ([75259f7](https://github.com/crazyair/yforms/commit/75259f714196aa07f7773f42e8a59089edc2496a))

## [1.0.0](https://github.com/crazyair/yforms/compare/v0.8.7...v1.0.0) (2020-06-08)

### Features

- add view ([#23](https://github.com/crazyair/yforms/issues/23)) ([0643144](https://github.com/crazyair/yforms/commit/06431449e6b6ab7b5b8d95143f39bfb97cf01845))
- now ([#22](https://github.com/crazyair/yforms/issues/22)) ([7e1939a](https://github.com/crazyair/yforms/commit/7e1939a8bc84bbcdaee87fd909fb360aedc70db2))

## [0.8.7](https://github.com/crazyair/yforms/compare/v0.8.5...v0.8.7) (2020-05-25)

### Bug Fixes

- 修复搜索样式 ([#21](https://github.com/crazyair/yforms/issues/21)) ([a28e214](https://github.com/crazyair/yforms/commit/a28e21436b43eb9e514d939a88598e585f5de075))

## [0.8.5](https://github.com/crazyair/yforms/compare/v0.8.4...v0.8.5) (2020-05-25)

### Features

- 重构 ([#20](https://github.com/crazyair/yforms/issues/20)) ([3c5309e](https://github.com/crazyair/yforms/commit/3c5309ea6394c99b05d78200c51d222cee9bf3b5))
- 删除 plugins 改而使用 scenes

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
