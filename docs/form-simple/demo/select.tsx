import React from 'react';
import { Form } from 'yforms-simple';

const initialValues = { demo: '12', list: [{ age: '10' }, { age: '12' }, {}, {}] };

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
        { type: 'input', label: 'age', name: 'age' },
        {
          type: 'input',
          label: 'age2',
          shouldUpdate: (prev, cur) => prev.age !== cur.age,
          isShow: (values) => values.age === '1',
          name: 'age2',
        },
        <Form.Item name="aaa" label="aaa" key="aaa" type="input" />,
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
