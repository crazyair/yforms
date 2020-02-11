---
title: 介绍
order: 0
---

## 前言

> 一个基于 antd@4 Form 封装简单配置化 Form 组件

## 特性

- 简单快速创建复杂表单。
- 兼容原生 `Antd Form API`。
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
