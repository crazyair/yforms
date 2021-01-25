---
title: 简单 Form
nav:
  title: 简单 Form
  order: 4
---

# 文档

## 基础使用

<code src="./demo/index.tsx" />

## plugins

<code src="./demo/plugins.tsx" />

## formModal

<code src="./demo/formModal.tsx" />

<!-- 测试 -->
<code src="./demo/debug.tsx" debug />

## API

### Form

| 参数      | 说明                                                 | 类型    | 默认值 |
| --------- | ---------------------------------------------------- | ------- | ------ |
| loading   | 数据加载完毕后初始化 Form，避免`initialValues`值为空 | boolean | -      |
| children  | 各个类型表单字段配置                                 | -       | -      |
| plugins   | 修改默认值插件全局开关                               | -       | -      |
| itemsType | 补充当前表单自定义`type`                             | -       | -      |

### Form.Items Form.Item 共同类型

| 参数         | 说明                             | 类型    | 默认值 |
| ------------ | -------------------------------- | ------- | ------ |
| shouldUpdate | 字段变更依赖                     | -       | -      |
| isShow       | 是否显示，结合`shouldUpdate`使用 | boolean | -      |

### Form.Item

| 参数       | 说明                | 类型                                               | 默认值 |
| ---------- | ------------------- | -------------------------------------------------- | ------ |
| container  | 包裹 `children`     | (c: React.ReactNode) => React.ReactElement         | -      |
| before     | `children` 之后元素 | ReactNode                                          | -      |
| after      | `children` 之后元素 | ReactNode                                          | -      |
| initFormat | 字段初始格式化      | FormatFieldsValue\['format'\]                      | -      |
| format     | 字段提交前格式化    | FormatFieldsValue\['format'\]\|FormatFieldsValue[] | -      |
| plugins    | 同`Form`            | -                                                  | -      |

### FormatFieldsValue

| 参数        | 说明                   | 类型                                        | 默认值 |
| ----------- | ---------------------- | ------------------------------------------- | ------ |
| name        | 要格式化的字段         | FormItem `name`                             | -      |
| removeField | 提交时是否要移除该字段 | boolean                                     | -      |
| format      | 格式化方法             | (thisValue: any, values: Values) => unknown | -      |

### plugins

| 参数        | 说明                                | 类型 | 默认值 |
| ----------- | ----------------------------------- | ---- | ------ |
| placeholder | 根据`label`生成默认提示语           | -    | -      |
| required    | 根据`placeholder`生成默认校验提示语 | -    | -      |

### itemsType 内置字段类型

| 参数        | 说明                          |
| ----------- | ----------------------------- |
| input       | `Input` 组件                  |
| radio       | `Radio.Group` 组件            |
| button      | `Button` 组件                 |
| password    | `Input.Password` 组件         |
| rangePicker | `DatePicker.RangePicker` 组件 |
| datePicker  | `DatePicker` 组件             |
| list        | `Form.List` 组件              |
| space       | `Space` 组件                  |
| custom      | 自定义组件                    |
