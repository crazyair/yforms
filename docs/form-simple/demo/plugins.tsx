import React from 'react';
import { Form } from 'yforms-simple';

const initialValues = { demo: '12', list: [{ age: '10' }, { age: '12' }, {}, {}] };

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 16 } };
const layout2 = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
const tailLayout = { wrapperCol: { offset: 4, span: 16 } };

const Demo = () => {
  const [form] = Form.useForm();

  return (
    <Form
      {...layout}
      form={form}
      // config={{
      //   plugins: {
      //     placeholder: {
      //       item: ({ itemProps }) => {
      //         return { componentProps: { placeholder: `${itemProps.label}-必填` } };
      //       },
      //     },
      //   },
      // }}
      plugins={{ placeholder: true, required: true }}
      onFinish={(values) => {
        console.log(JSON.stringify(values, null, 2));
      }}
      initialValues={initialValues}
    >
      {[
        {
          type: 'input',
          label: 'age',
          name: 'age',
          rules: [{ max: 10 }, { required: true }],
        },
        {
          type: 'radio',
          label: '状态',
          name: 'radio',
          rules: [{ required: true }],
          componentProps: { options: [{ id: '1', name: '男' }] },
        },
        {
          type: 'space',
          label: 'ss',
          componentProps: {
            items: () => {
              return [
                { type: 'input', name: 's1', rules: [{ required: true }], label: 's1' },
                { type: 'input', name: 's1', rules: [{ required: true }], label: 's1' },
              ];
            },
          },
        },
        {
          type: 'custom',
          label: '集合',
          componentProps: {
            items: () => [
              {
                ...layout2,
                type: 'input',
                name: 'aa',
                rules: [{ required: true }],
                label: '选择的班级',
              },
              {
                ...layout2,
                type: 'input',
                name: 'bb',
                rules: [{ required: true }],
                label: '选择的班级的',
              },
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
