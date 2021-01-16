import React from 'react';
import { Form } from 'yforms-simple';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const Demo = () => {
  const [form] = Form.useForm();

  return (
    <Form
      {...layout}
      form={form}
      onFinish={(values) => {
        console.log(JSON.stringify(values, null, 2));
      }}
      initialValues={{ list: [{ age: '10' }, { age: '12' }] }}
    >
      {[
        {
          label: 'list',
          type: 'list',
          name: 'list',
          componentProps: {
            items: ({ index }) => {
              return [
                {
                  type: 'input',
                  rules: [{ required: true }],
                  initFormat: (value) => {
                    console.log('c', value);
                    return `${value}+1`;
                  },
                  format: () => 111,
                  name: [index, 'age'],
                },
              ];
            },
          },
        },
        {
          type: 'button',
          ...tailLayout,
          componentProps: { children: '提交', htmlType: 'submit' },
        },
      ]}
    </Form>
  );
};
export default Demo;
