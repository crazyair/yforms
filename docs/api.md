---
title: 文档
order: -1
---

# 文档

### 共同的 API

- 以下 API 为 `YForm` `YForm.Items` 及字段共享的 API。

| 参数     | 说明                           | 类型                        | 默认值 |
| -------- | ------------------------------ | --------------------------- | ------ |
| isShow   | 是否渲染                       | boolean                     | -      |
| disabled | 字段是否全部禁用               | boolean                     | -      |
| required | 字段是否全部必填               | boolean                     | -      |
| plugins  | 插件开关，说明[见下](#plugins) | YFormPluginsType \| boolean | -      |
| children | 数据源                         | YFormItemProps['children']  | -      |

## YForm

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 为 `true` 则显示加载效果，用于判断初始化数据是否加载完成再渲染 `Form` | boolean | - |
| itemsType | 追加类型 | YFormItemsType | - |
| formatFieldsValue | 表单提交前格式化，说明[见下](#formatFieldsValue) | FormatFieldsValue[] | - |

## YForm.Items

| 参数    | 说明                          | 类型    | 默认值 |
| ------- | ----------------------------- | ------- | ------ |
| offset  | 相对 `YForm` 的 `layout` 位移 | number  | -      |
| noStyle | 是否添加 `yform-items` 样式   | boolean | -      |

## plugins

| 参数          | 说明                             | 类型    | 默认值 |
| ------------- | -------------------------------- | ------- | ------ |
| placeholder   | 是否追加占位符                   | boolean | true   |
| disabled      | 是否禁用                         | boolean | true   |
| noLabelLayout | 是否无 `label` 添加 `label` 位移 | boolean | true   |

## YForm.useFormatFieldsValue

- 表单提交前格式化字段 hook

### formatFieldsValue

- 在 `YForm` 添加该属性

### onFormatFieldsValue

- 处理需要格式化的字段
- 例： `onFormatFieldsValue([{ name: ['demo'], format: value => value.demo.split('|') }]);`

## 字段 dataSource

- 无类型，无 `type`，用于渲染多个字段或元素

```tsx | pure
{
  dataSource: [
    {
      type: 'button',
      noStyle: true,
      componentProps: { type: 'primary', htmlType: 'submit', children: '提交' },
    },
    {
      type: 'button',
      noStyle: true,
      componentProps: { children: '取消' }
    },
  ],
}
```
