---
title: 文档
order: 10
---

## 前言

> 一个基于 antd@4 Form 封装简单配置化 Form 组件

## 特性

- 简单快速创建复杂表单。
- 原生 `antd form api`。
- 可自行添加 `type`。
- 使用 `TypeScript` 开发，提供完整的类型定义文件。

## 📦 Install

```bash
npm install father-doc-yform
```

```bash
yarn add father-doc-yform
```

## 示例

```jsx | pure
import React from 'react';
import { YForm } from 'father-doc-yform';

const Demo = () => {
  return (
    <YForm>
      {[
        { type: 'input', label: 'name', name: 'name' },
        { type: 'money', label: 'money', name: 'money' },
        {
          dataSource: [
            {
              type: 'button',
              noStyle: true,
              plugins: { disabled: false },
              componentProps: { type: 'primary', htmlType: 'submit', children: 'submit' },
            },
          ],
        },
      ]}
    </YForm>
  );
};
export default Demo;
```

## API

对 `Form` 不熟悉的请移步 [Antd Form API 地址](https://next.ant.design/components/form-cn/#API)

### YForm

| 参数      | 说明                   | 类型    | 默认值 |
| --------- | ---------------------- | ------- | ------ |
| loading   | 设置 Form 是否可以加载 | boolean | -      |
| itemsType | 自定义添加类型         | -       | -      |

### 共享 API（YForm、YForm.Items）

| 参数       | 说明                           | 类型               | 默认值 |
| ---------- | ------------------------------ | ------------------ | ------ |
| plugins    | 工具开关，说明[见下](#plugins) | -                  | -      |
| required   | 是否必填                       | boolean            | -      |
| addonAfter | FormItem Children 后面追加元素 | React.ReactElement | -      |
| isShow     | 是否渲染当期                   | boolean            | -      |

### plugins

| 参数          | 说明                                     | 类型    | 默认值              |
| ------------- | ---------------------------------------- | ------- | ------------------- |
| placeholder   | 自动推算出 placeholder                   | -       | '请输入'            |
| required      | 自动追加必填校验                         | -       | `[{required:true}]` |
| disabled      | 字段禁用状态                             | boolean | -                   |
| noLabelLayout | 没有 label 下，自动 push 当前 label 的值 | -       | -                   |

```jsx | pure
const dataSource = [{ label: '年龄', type: 'input', name: 'age' }];
```

### 其它类型说明

| 类型    | 说明                |
| ------- | ------------------- |
| list    | [items](#items)     |
| oneLine | [oneLine](#oneLine) |

### items

| 参数           | 说明                                                         | 类型 | 默认值 |
| -------------- | ------------------------------------------------------------ | ---- | ------ |
| onShowIcons    | 控制当前索引是否显示添加删除按钮                             | -    | -      |
| componentProps | maxNum 最大数量、minNum 最小数量、showIcons 控制是否显示按钮 | -    | -      |

- showIcons.showBottomAdd 可为字符串控制显示内容 `{ text: '添加 xxx' }`

### oneLine

| 参数           | 说明                          | 类型 | 默认值 |
| -------------- | ----------------------------- | ---- | ------ |
| items          | 一行显示的字段                | -    | -      |
| componentProps | oneLineStyle 控制每个元素宽度 | -    | -      |

- oneLineStyle `['50%', 10, '50%']`
