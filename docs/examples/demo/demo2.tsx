/**
 * title: format unFormat 使用
 * desc: 日期场景下修改初始化值，提交修改提交值，数据对比也可以共享该配置。
 */

import React from 'react';
import { YForm } from 'yforms';
import moment from 'moment';

const Demo = () => {
  const [form] = YForm.useForm();
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <YForm
      name="basic"
      form={form}
      onFinish={onFinish}
      initialValues={{
        date: '1591943666',
        phones: [{ start: '1591943666', end: '1592116466' }],
      }}
      oldValues={{
        date: '1592030066',
        start: '1591943666',
        end: '1592030066',
        phones: [{ start: '1591943666', end: '1592030066' }],
      }}
      scenes={{ diff: true }}
      onCancel={({ type }) => {
        if (type === 'onCancel') {
          form.resetFields();
        }
      }}
      // params={{ type: 'view' }}
    >
      {[
        // {
        //   type: 'datePicker',
        //   label: '日期',
        //   name: 'date',
        //   unFormat: (value) => value && moment.unix(value),
        //   format: (value) => value && `${moment(value).unix()}`,
        // },
        // {
        //   type: 'rangePicker',
        //   label: '日期',
        //   name: ['range'],
        //   unFormat: (_, values) => values && [moment.unix(values.start), moment.unix(values.end)],
        //   format: [
        //     { name: ['range'], isOmit: true },
        //     {
        //       name: 'start',
        //       format: (value) => value && `${moment(value).unix()}`,
        //     },
        //     {
        //       name: 'end',
        //       format: (value) => value && `${moment(value).unix()}`,
        //     },
        //   ],
        // },
        // {
        //   type: 'list',
        //   label: 'phones',
        //   name: 'phones',
        //   items: ({ index }) => {
        //     return [
        //       {
        //         type: 'oneLine',
        //         // items: () => [{ type: 'rangePicker', label: '日期', name: [index, 'range'] }],
        //         items: () => [
        //           {
        //             type: 'rangePicker',
        //             label: '日期',
        //             name: [index, 'range'],
        //             unFormat: (_, values) =>
        //               values && [moment.unix(values.start), moment.unix(values.end)],
        //             format: [
        //               { name: [index, 'range'], isOmit: true },
        //               {
        //                 name: [index, 'start'],
        //                 format: (value) => value && `${moment(value).unix()}`,
        //               },
        //               {
        //                 name: [index, 'end'],
        //                 format: (value) => value && `${moment(value).unix()}`,
        //               },
        //             ],
        //           },
        //         ],
        //       },
        //     ];
        //   },
        // },
        {
          type: 'list',
          label: '日期',
          name: 'phones',
          componentProps: { useIconsStyle: false },
          items: ({ index }) => {
            return [
              {
                type: 'rangePicker',
                name: [index, 'range'],
                unFormat: (_, { start, end }) => {
                  return [start && moment.unix(start), end && moment.unix(end)];
                },
                format: [
                  { name: [index, 'range'], isOmit: true },
                  {
                    name: [index, 'start'],
                    format: (_, { range = [] }) => range[0] && `${moment(range[0]).unix()}`,
                  },
                  {
                    name: [index, 'end'],
                    format: (_, { range = [] }) => range[1] && `${moment(range[1]).unix()}`,
                  },
                ],
              },
            ];
          },
        },
        { type: 'submit' },
        {
          scenes: { disabled: false },
          type: 'space',
          items: [
            {
              type: 'button',
              componentProps: {
                onClick: () => console.log(form.getFieldsValue()),
                children: '获取表单当前数据',
              },
            },
            {
              type: 'button',
              componentProps: {
                onClick: () => console.log(form.getFormatFieldsValue()),
                children: '获取表单提交时候数据',
              },
            },
          ],
        },
      ]}
    </YForm>
  );
};
export default Demo;
