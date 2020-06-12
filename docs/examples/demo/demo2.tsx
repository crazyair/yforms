/**
 * title: format unFormat 使用
 * desc: 日期场景下修改初始化值，提交修改提交值，数据对比也可以共享该配置。
 */

import React from 'react';
import { YForm } from 'yforms';
import moment from 'moment';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

const Demo = () => {
  const [form] = YForm.useForm();
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <YForm
      {...layout}
      name="basic"
      form={form}
      initialValues={{ date: '1591943666' }}
      onFinish={onFinish}
      onCancel={({ type }) => {
        if (type === 'onCancel') {
          form.resetFields();
        }
      }}
      oldValues={{ date: '1592030066' }}
      scenes={{ diff: true }}
      params={{ type: 'create' }}
    >
      {[
        {
          type: 'datePicker',
          label: '日期',
          name: 'date',
          unFormat: (value) => value && moment.unix(value),
          format: (value) => value && `${moment(value).valueOf() / 1000}`,
        },
        { type: 'submit' },
        {
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
