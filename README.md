## yform-demo

antd v4 配置化 Form

## 📦 Install

```bash
npm install yform-demo
```

```bash
yarn add yform-demo
```

## 示例

```jsx
import React from 'react';
import { YForm } from 'yform-demo';

const Demo = () => {
    return (
        <YForm>
            {[
                { type: 'input', label: '姓名', name: 'name' },
                {
                    type: 'radio',
                    label: '性别',
                    name: 'gender',
                    componentProps: {
                        options: [
                            { id: true, name: '男' },
                            { id: false, name: '女' },
                        ],
                    },
                },
            ]}
        </YForm>
    );
};
export default Demo;
```

## API

[antd form API 地址](https://next.ant.design/components/form-cn/#API)

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

```jsx
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

-   showIcons.showBottomAdd 可为字符串控制显示内容 `{ text: '添加 xxx' }`

### oneLine

| 参数           | 说明                          | 类型 | 默认值 |
| -------------- | ----------------------------- | ---- | ------ |
| items          | 一行显示的字段                | -    | -      |
| componentProps | oneLineStyle 控制每个元素宽度 | -    | -      |

-   oneLineStyle `['50%', 10, '50%']`
