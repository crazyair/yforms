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
        {
          type: 'radio',
          name: 'radio',
          label: 'radio',
          componentProps: {
            options: [
              { id: '1', name: '男' },
              { id: '2', name: '女' },
            ],
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
              ];
            },
          },
        },
      ]}
    </Form>
  );
};
export default Demo;
