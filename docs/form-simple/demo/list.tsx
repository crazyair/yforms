import { Button } from 'antd';
import React, { useState } from 'react';
import { Form } from 'yforms-simple';

const initialValues = { demo: '12', list: [{ age: '10' }, { age: '12' }, {}, {}] };

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 14 },
};

const Demo = () => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);

  return (
    <Form
      {...layout}
      form={form}
      plugins={{ placeholder: { enable: true } }}
      onFinish={(values) => {
        console.log(JSON.stringify(values, null, 2));
      }}
      initialValues={initialValues}
    >
      {[
        { type: 'input', label: 'age', name: 'age' },
        {
          type: 'list',
          noStyle: true,
          componentProps: {
            name: 'list',
            children: (fields, { add, move, remove }, _, lineStyle) => {
              return (
                <>
                  {fields.map((field, index) => {
                    const { icons } = lineStyle(fields, { add, move, remove }, index);
                    return (
                      <Form.Items key={field.key}>
                        {[
                          {
                            type: 'custom',
                            ...(index === 0 ? layout : tailLayout),
                            label: index === 0 ? 'age' : undefined,
                            componentProps: {
                              items: () => {
                                return [
                                  {
                                    type: 'input',
                                    ...field,
                                    label: 'age',
                                    rules: [{ required: true }],
                                    fieldKey: [field.fieldKey, 'age'],
                                    name: [field.name, 'age'],
                                    noStyle: true,
                                    componentProps: { disabled },
                                  },
                                  {
                                    type: 'custom',
                                    noStyle: true,
                                    isShow: !disabled,
                                    children: (
                                      <span
                                        style={{ position: 'absolute', paddingLeft: 5, top: 4 }}
                                      >
                                        {icons}
                                      </span>
                                    ),
                                  },
                                ];
                              },
                            },
                          },
                        ]}
                      </Form.Items>
                    );
                  })}
                  <Form.Item {...tailLayout}>
                    <Button block onClick={() => add()}>
                      添加
                    </Button>
                  </Form.Item>
                </>
              );
            },
          },
        },
        {
          type: 'space',
          ...tailLayout,
          componentProps: {
            items: () => {
              return [
                {
                  type: 'button',
                  componentProps: { children: '提交', type: 'primary', htmlType: 'submit' },
                },
                {
                  type: 'button',
                  componentProps: { children: '重置', onClick: () => form.resetFields() },
                },
                {
                  type: 'button',
                  componentProps: { children: '切换状态', onClick: () => setDisabled((c) => !c) },
                },
              ];
            },
          },
        },
      ]}
    </Form>
  );
};
export default Demo;
