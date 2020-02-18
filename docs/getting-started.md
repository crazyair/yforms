---
title: 快速上手
order: 9
nav:
  order: 10
---

# 快速上手

## 安装

在项目目录下执行以下命令进行安装：

```bash
$ yarn add father-doc-yform
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
