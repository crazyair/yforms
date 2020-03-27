---
title: 文档
nav:
  title: 文档
  order: 2
---

# 文档

- 以下内容不包含 `Antd Form API` 如需查看请[点击此处](https://next.ant.design/components/form-cn/#API)

## 共同的 API

- 以下 API 为 `YForm`、`YForm.Items`、`type` 共享的 API。

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
| onSave | 保存方法，不校验表单数据（需用到 `submit` 类型） | (values: { [key: string]: any }) => void | - |
| onCancel | 点击取消、返回调用的方法（需用到 `submit` 类型） | () => void | - |
| params | 当前表单状态（需用到 `submit` 类型） | <a href="/apis/hooks#paramsobjtype">ParamsObjType</a> | - |
| submitComponentProps | 与 `submit` 类型参数结合使用（用户无需传） | <a href="/types/submit#api">YFormSubmitProps</a> | - |

## YForm.Items

| 参数    | 说明                          | 类型    | 默认值 |
| ------- | ----------------------------- | ------- | ------ |
| offset  | 相对 `YForm` 的 `layout` 位移 | number  | -      |
| noStyle | 是否添加 `yform-items` 样式   | boolean | -      |

## type

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| isShow | 是否隐藏， `isShow` 为 `function` 情况下实现该功能 <a href="/examples#依赖使用">查看</a> | boolean \|(values: any) => boolean | - |
| componentProps | 当前类型下组件的参数 | - | - |

### plugins

| 参数          | 说明                             | 类型    | 默认值 |
| ------------- | -------------------------------- | ------- | ------ |
| placeholder   | 是否追加占位符                   | boolean | true   |
| disabled      | 是否禁用                         | boolean | true   |
| noLabelLayout | 是否无 `label` 添加 `label` 位移 | boolean | true   |

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

## 添加自定义类型

- 可以在项目 `src/index.ts` 添加类型，之后全局使用。
- 自定义类型推荐添加前缀或后缀，方便与默认区分。

```tsx | pure
import { YForm } from 'father-doc-yform';
import { YFormItemsType } from 'father-doc-yform/lib/YForm/ItemsType';

declare module 'father-doc-yform/lib/YForm/ItemsType' {
  export interface YFormItemsTypeDefine {
    my_demo: { componentProps?: { str?: string } };
  }
}

export const itemsType: YFormItemsType = {
  my_demo: { component: <div>demo string</div> },
};
YForm.Config({ itemsType });
```
