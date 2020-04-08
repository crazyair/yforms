---
title: 介绍
nav:
  title: 指南
  order: 1
---

## 什么是 yform

yform 是一个基于 antd v4 开发，为 Form 场景提供可 DIY 配置的表单库，用户可在全局设置每个字段类型的默认行为。

## 为什么做 yform

- 前端项目中对代码统一有了 eslint、prettier、tslint。而表单在系统中各有各的样，而现在为了解决各个业务模块表单交互不统一 `yform` 诞生了。
- 常常遇到有个表单中 `placeholder` 文案不统一，有的是：请输入姓名，而有的是：姓名必填、`rules` 中有的有 `whitespace` 有的则没有。
- 同样一个字段，在表单中需要添加 `{label:'姓名' placeholder:'请输入姓名'}`，而搜索场景下就变成只需要 `{placeholder:'姓名'}`。
- 开发项目中表单字段有太多例如：input、select、radio、switch、upload 等，每个表单单独引入 Input、Upload，慢慢的一个表单中引用多个版本的组件展现形式、api、以及交互不统一。

## yform 解决了什么问题

- 减少模板代码，一个表单中的字段可无缝应用于表单和搜索场景，2 种场景下的区别交给全局配置。
- 表单交互可全局自定义配置一套，其他人使用时候不用写 placeholder。
- 比如搜索场景下产品突然有一天需要每个字段要加可清空功能，这时只需要改全局配置。

## 使用 Form 和 YForm 对比

一个字段从表单中复制到搜索中的场景

> Form 用法

- 表单代码

```jsx | pure
<Form>
  <Form.Item label="name" name="name" rules={[{ required: true, message: '请输入 name' }]}>
    <Input />
  </Form.Item>
</Form>
```

- 搜索代码

```jsx | pure
<Form>
  <Form.Item name="name" rules={[{ required: true, message: 'name' }]}>
    <Input />
  </Form.Item>
</Form>
```

按照正常使用情况，当 name 字段复制到搜索场景下需要把 label 删掉，required 删掉，message 中的请输入删掉，非常麻烦。

> YForm 用法

- 表单代码

```jsx | pure
<YForm>{[{ type: 'input', label: 'name', name: 'name' }]}</YForm>
```

- 搜索代码

```jsx | pure
<YForm scene="search">{[{ type: 'input', label: 'name', name: 'name' }]}</YForm>
```

只需要 YForm 设置相关参数即可，name 字段完全一样。可定制个`search`场景并使用该场景。

> 当然这只是个示例，其它更多可自行 DIY。

## FAQ

###
