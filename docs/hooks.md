---
title: hooks
order: 8
---

# Hooks

- `YForm` 中的钩子

## useFormatFieldsValue

- 表单提交前处理数据

### 用例

```tsx
import React from 'react';
import { Input } from 'antd';
import { YForm } from 'father-doc-yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

export default () => {
  const { formatFieldsValue, onFormatFieldsValue } = YForm.useFormatFieldsValue();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  onFormatFieldsValue([
    { name: 'append_field', format: () => '追加字段' },
    { name: 'name', format: ({ name }) => `${name}_改变字段值` },
  ]);

  return (
    <YForm {...layout} onFinish={onFinish} formatFieldsValue={formatFieldsValue}>
      {[
        { type: 'input', label: '姓名', name: 'name' },
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
```

### API

| 参数                | 说明                  | 类型 | 默认值 |
| ------------------- | --------------------- | ---- | ------ |
| formatFieldsValue   | 在 `YForm` 添加该属性 | -    | -      |
| onFormatFieldsValue | 添加需要格式化的字段  | -    | -      |

## useSubmit

- 提交表单相关联的按钮
- 提交、保存按钮防连点
- 需要与 `submit` 类型结合使用

### 用例

```tsx
import React from 'react';
import { Input } from 'antd';
import { YForm } from 'father-doc-yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

const mockData = { params: { type: 'create' } };
const history = { goBack: () => {} };

export default () => {
  const [form] = YForm.useForm();
  const { submit, disabled } = YForm.useSubmit({ params: mockData.params, history, form });

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <YForm {...layout} required submit={submit} disabled={disabled} onFinish={onFinish}>
      {[{ type: 'input', label: '姓名', name: 'name' }, { type: 'submit' }]}
    </YForm>
  );
};
```

### API

- `useSubmit` 参数

| 参数    | 说明                         | 类型                           | 默认值 |
| ------- | ---------------------------- | ------------------------------ | ------ |
| params  | 页面参数，包括 `id`、`type`  | { id?: string; type?: 'create' | 'edit' | 'view';} | - |
| history | 主要使用 `goBack` 返回上一页 | RouteComponentProps['history'] | -      |
| form    | `Form` 实例                  | FormInstance                   | -      |

- `useSubmit` 返回

| 参数     | 说明             | 类型                            | 默认值 |
| -------- | ---------------- | ------------------------------- | ------ |
| submit   | 统筹提交逻辑     | [submit](#submit)               | -      |
| params   | 表单状态         | [ParamsObjType](#ParamsObjType) | -      |
| disabled | 控制表单禁用状态 | boolean                         | -      |

#### submit

| 参数                 | 说明                         | 类型                        | 默认值 |
| -------------------- | ---------------------------- | --------------------------- | ------ |
| onFinishLoading      | 获取表单提交状态             | (loading?: boolean) => void | -      |
| onFinishCallback     | 表单提交成功回调             | () => void                  | -      |
| submitComponentProps | 为 `submit` 增加属性实现关联 | YFormSubmitProps            | -      |

#### ParamsObjType

| 参数     | 说明         | 类型    | 默认值 |
| -------- | ------------ | ------- | ------ |
| id       | id           | string  | -      |
| create   | 新建         | boolean | -      |
| edit     | 编辑         | boolean | -      |
| view     | 查看         | boolean | -      |
| typeName | 当前状态文案 | string  | -      |
