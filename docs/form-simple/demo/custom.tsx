import Input from 'antd/lib/input';
import React from 'react';
import { Form } from 'yforms-simple';

const initialValues = { demo: '12', list: [{ age: '10' }, { age: '12' }] };

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
      initialValues={initialValues}
    >
      {[
        { type: 'input', name: 'aaa', label: 'aaa' },
        {
          type: 'custom',
          noStyle: true,
          shouldUpdate: (prevValues, curValues) => prevValues.aaa !== curValues.aaa,
          isShow: (values) => values.aaa === '1',
          componentProps: {
            items: () => {
              return [
                { type: 'input', name: 'aa', label: 'aa' },
                { type: 'input', name: 'bb', label: 'bb' },
              ];
            },
          },
        },
        {
          type: 'custom',
          label: 'c',
          name: 'c',
          component: <Input />,
        },
        {
          type: 'input',
          label: 'aa',
          name: 'demo',
          initFormat: () => 'initFormat',
          format: () => 'format',
        },
        {
          type: 'button',
          ...tailLayout,
          componentProps: { children: '提交', htmlType: 'submit' },
        },
        {
          type: 'button',
          ...tailLayout,
          componentProps: {
            children: '重置',
            onClick: () => {
              form.resetFields();
              console.log('initialValues', initialValues);
            },
          },
        },
      ]}
    </Form>
  );
};
export default Demo;
