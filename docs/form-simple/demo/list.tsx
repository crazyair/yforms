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
        {
          type: 'input',
          label: 'aa',
          name: 'demo',
          initFormat: () => 'initFormat',
          format: () => 'format',
        },
        {
          label: 'list',
          type: 'list',
          name: 'list',
          // noStyle: true,
          componentProps: {
            items: ({ field, index, icons }) => {
              return [
                {
                  type: 'input',
                  rules: [{ required: true }],
                  initFormat: (value) => value && `${value}+initFormat`,
                  componentProps: { suffix: icons },
                  // componentProps: { style: { width: '90%' } },
                  format: (value) => value && `${value}+format`,
                  ...field,
                  name: [index, 'age'],
                },
              ];
              // return (
              //   <Form.Item label="list" key={field.key}>
              //     <Form.Items>
              //       {[
              //         {
              //           type: 'input',
              //           noStyle: true,
              //           rules: [{ required: true }],
              //           initFormat: (value) => value && `${value}+initFormat`,
              //           componentProps: { style: { width: '90%' } },
              //           format: () => 111,
              //           ...field,
              //           fieldKey: [field.fieldKey, 'age'],
              //           name: [index, 'age'],
              //         },
              //       ]}
              //       <>{icons}</>
              //     </Form.Items>
              //   </Form.Item>
              // );
            },
          },
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
