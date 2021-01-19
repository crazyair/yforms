import { Input, Button, Space } from 'antd';
import React from 'react';
import { Form } from 'yforms-simple';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...field}
                  name={[field.name, 'first']}
                  fieldKey={[field.fieldKey, 'first']}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'last']}
                  fieldKey={[field.fieldKey, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      {[
        { type: 'input', label: 'age', name: 'age' },
        {
          type: 'list',
          componentProps: {
            name: 'list',
            children: (fields, { remove }) => {
              return fields.map((field) => {
                // return (
                //   <Form.Items key={field.key}>
                //     {[
                //       {
                //         type: 'custom',
                //         componentProps: {
                //           items: () => {
                //             return [
                //               {
                //                 type: 'custom',
                //                 noStyle: true,
                //                 componentProps: {
                //                   items: () => {
                //                     return [
                //                       {
                //                         type: 'input',
                //                         // noStyle: true, // 错误会重叠
                //                         rules: [{ required: true }],
                //                         componentProps: { style: { width: '85%' } },
                //                         ...field,
                //                         fieldKey: [field.fieldKey, 'age'],
                //                         name: [field.name, 'age'],
                //                       },
                //                     ];
                //                   },
                //                 },
                //               },
                //               {
                //                 type: 'custom',
                //                 noStyle: true,
                //                 component: <span onClick={() => remove(field.name)}>remove</span>,
                //               },
                //             ];
                //           },
                //         },
                //       },
                //     ]}
                //   </Form.Items>
                // );
                // return (
                //   <Form.Items key={field.key}>
                //     {[
                //       {
                //         type: 'custom',
                //         componentProps: {
                //           items: () => {
                //             return [
                //               {
                //                 type: 'input',
                //                 noStyle: true, // 错误会重叠
                //                 rules: [{ required: true }],
                //                 componentProps: { style: { width: '85%' } },
                //                 ...field,
                //                 fieldKey: [field.fieldKey, 'age'],
                //                 name: [field.name, 'age'],
                //               },
                //               <span key="remove" onClick={() => remove(field.name)}>
                //                 remove
                //               </span>,
                //             ];
                //           },
                //         },
                //       },
                //     ]}
                //   </Form.Items>
                // );
                // return (
                //   <Form.Item key={field.key}>
                //     <Form.Items>
                //       {[
                //         {
                //           type: 'input',
                //           noStyle: true, // 错误会重叠
                //           rules: [{ required: true }],
                //           componentProps: { style: { width: '85%' } },
                //           ...field,
                //           fieldKey: [field.fieldKey, 'age'],
                //           name: [field.name, 'age'],
                //         },
                //         <span key="remove" onClick={() => remove(field.name)}>
                //           remove
                //         </span>,
                //       ]}
                //     </Form.Items>
                //   </Form.Item>
                // );
                // return (
                //   <Form.Item key={field.key}>
                //     <Form.Item
                //       noStyle
                //       {...field}
                //       rules={[{ required: true }]}
                //       fieldKey={[field.fieldKey, 'age']}
                //       name={[field.name, 'age']}
                //     >
                //       <Input />
                //     </Form.Item>
                //     <span key="remove" onClick={() => remove(field.name)}>
                //       remove
                //     </span>
                //   </Form.Item>
                // );
                return (
                  <Form.Item key={field.key}>
                    <Form.Item
                      noStyle
                      {...field}
                      rules={[{ required: true }]}
                      fieldKey={[field.fieldKey, 'age']}
                      name={[field.name, 'age']}
                    >
                      <Input />
                    </Form.Item>
                    <span key="remove" onClick={() => remove(field.name)}>
                      remove
                    </span>
                  </Form.Item>
                );
                // return (
                //   <Form.Items key={field.key}>
                //     {[
                //       {
                //         type: 'input',
                //         // noStyle: true, // 错误会重叠
                //         rules: [{ required: true }],
                //         componentProps: {
                //           style: { width: '85%' },
                //           addonAfter: <span onClick={() => remove(field.name)}>remove</span>,
                //         },
                //         ...field,
                //         fieldKey: [field.fieldKey, 'age'],
                //         name: [field.name, 'age'],
                //       },
                //     ]}
                //   </Form.Items>
                // );
              });
            },
          },
        },
        // {
        //   label: 'list',
        //   type: 'list',
        //   name: 'list',
        //   componentProps: {
        //     name: 'list',
        //     children: () => {
        //       return 1;
        //     },
        //     items: ({ field, icons }) => {
        //       return [
        //         {
        //           type: 'custom',
        //           componentProps: {
        //             items: () => {
        //               return [
        //                 {
        //                   type: 'custom',
        //                   noStyle: true,
        //                   componentProps: {
        //                     items: () => {
        //                       return [
        //                         {
        //                           type: 'input',
        //                           noStyle: true, // 错误会重叠
        //                           rules: [{ required: true }],
        //                           componentProps: { style: { width: '85%' } },
        //                           ...field,
        //                           name: [field.name, 'age'],
        //                           fieldKey: [field.fieldKey, 'age'],
        //                         },
        //                       ];
        //                     },
        //                   },
        //                 },
        //                 {
        //                   type: 'custom',
        //                   noStyle: true,
        //                   component: <span style={{ paddingLeft: 5 }}>{icons}</span>,
        //                 },
        //               ];
        //             },
        //           },
        //         },
        //       ];
        //     },
        //   },
        // },
        // {
        //   label: 'list',
        //   type: 'list',
        //   name: 'list',
        //   // noStyle: true,
        //   componentProps: {
        //     items: ({ field, index, icons }) => {
        //       // return [
        //       //   {
        //       //     type: 'input',
        //       //     rules: [{ required: true }],
        //       //     initFormat: (value) => value && `${value}+initFormat`,
        //       //     componentProps: { suffix: icons },
        //       //     // componentProps: { style: { width: '90%' } },
        //       //     format: (value) => value && `${value}+format`,
        //       //     ...field,
        //       //     name: [index, 'age'],
        //       //   },
        //       // ];
        //       // return [
        //       //   {
        //       //     type: 'custom',
        //       //     key: field.key,
        //       //     componentProps: {
        //       //       items: () => {
        //       //         return [
        //       //           {
        //       //             type: 'input',
        //       //             noStyle: true, // 错误会重叠
        //       //             rules: [{ required: true }],
        //       //             initFormat: (value) => value && `${value}+initFormat`,
        //       //             componentProps: { style: { width: '90%' } },
        //       //             format: () => 111,
        //       //             ...field,
        //       //             fieldKey: [field.fieldKey, 'age'],
        //       //             name: [index, 'age'],
        //       //           },
        //       //           { type: 'custom', noStyle: true, component: <>{icons}</> },
        //       //           // <>{icons}</>,
        //       //         ];
        //       //       },
        //       //     },
        //       //   },
        //       // ];
        //       return [
        //         {
        //           type: 'custom',
        //           key: field.key,
        //           componentProps: {
        //             items: () => {
        //               return [
        //                 {
        //                   type: 'custom',
        //                   noStyle: true,
        //                   ...field,
        //                   componentProps: {
        //                     items: () => {
        //                       return [
        //                         {
        //                           type: 'input',
        //                           noStyle: true, // 错误会重叠
        //                           rules: [{ required: true }],
        //                           componentProps: { style: { width: '90%' } },
        //                           ...field,
        //                           name: [index, 'age'],
        //                         },
        //                       ];
        //                     },
        //                   },
        //                 },
        //                 { type: 'custom', noStyle: true, component: <>{icons}</> },
        //               ];
        //             },
        //           },
        //         },
        //       ];

        //       // return (
        //       //   <Form.Item label="list" key={field.key}>
        //       //     <Form.Items>
        //       //       {[
        //       //         {
        //       //           type: 'input',
        //       //           noStyle: true,
        //       //           rules: [{ required: true }],
        //       //           initFormat: (value) => value && `${value}+initFormat`,
        //       //           componentProps: { style: { width: '90%' } },
        //       //           format: () => 111,
        //       //           ...field,
        //       //           fieldKey: [field.fieldKey, 'age'],
        //       //           name: [index, 'age'],
        //       //         },
        //       //       ]}
        //       //       <>{icons}</>
        //       //     </Form.Items>
        //       //   </Form.Item>
        //       // );
        //     },
        //   },
        // },
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
