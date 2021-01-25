/**
 * title: list
 * desc: list 调试
 */

import { Button, Space } from 'antd';
import React, { useState } from 'react';
import { Form } from 'yforms-simple';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { layout, tailLayout } from './utils';

const initialValues = {
  demo: '12',
  list: [{ age: '10' }, { age: '12' }, {}, {}],
  new_list: [{ age: '10' }],
};

const Demo = () => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);

  return (
    <Form
      {...layout}
      form={form}
      plugins={{ placeholder: { enable: true }, required: { enable: true } }}
      onFinish={(values) => {
        console.log(JSON.stringify(values, null, 2));
      }}
      initialValues={initialValues}
    >
      {[
        { type: 'input', label: 'age', initFormat: () => '11', name: 'age' },
        {
          type: 'list',
          noStyle: true,
          componentProps: {
            name: 'list',
            children: (fields, { add, move, remove }) => (
              <>
                {fields.map((field, index) => {
                  return (
                    <Form.Items key={field.key}>
                      {[
                        {
                          type: 'input',
                          ...(index === 0 ? layout : tailLayout),
                          label: index === 0 ? 'age' : undefined,
                          ...field,
                          rules: [{ required: true }],
                          fieldKey: [field.fieldKey, 'age'],
                          name: [field.name, 'age'],
                          container: (children) => {
                            return (
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ flex: 1 }}>{children}</div>
                                {!disabled && (
                                  <div style={{ paddingLeft: 5 }}>
                                    <Space>
                                      <PlusCircleOutlined
                                        key="plus"
                                        onClick={() => {
                                          // 先增加一位
                                          add();
                                          // 再把最后一位移动到当前
                                          move(fields.length, index);
                                        }}
                                      />
                                      <MinusCircleOutlined
                                        key="minus"
                                        onClick={() => remove(index)}
                                      />
                                    </Space>
                                  </div>
                                )}
                              </div>
                            );
                          },
                          componentProps: { disabled },
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
            ),
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
