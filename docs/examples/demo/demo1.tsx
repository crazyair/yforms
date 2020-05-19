/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { YForm } from 'yforms';
import { message } from 'antd';
import moment from 'moment';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

const Demo = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [form] = YForm.useForm();

  useEffect(() => {
    setTimeout(() => {
      setData({ name: '张三', age: '10', money: '10', date: moment() });
      setLoading(false);
    }, 10);
  }, []);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onSave = (values: any) => {
    console.log('values:', values);
  };

  return (
    <YForm
      {...layout}
      form={form}
      name="basic"
      initialValues={data}
      onFinish={onFinish}
      loading={loading}
      onFinishFailed={onFinishFailed}
      onSave={onSave}
      required
    >
      {[
        { type: 'input', label: 'name', name: 'name', format: ({ name }) => `${name} 修改了` },
        {
          type: 'datePicker',
          label: 'date',
          name: 'date',
          componentProps: { style: { width: '100%' } },
          format: ({ date }) => moment(date).format('YYYY-MM-DD'),
        },
        { type: 'money', label: 'money', name: 'money' },
        { type: 'submit' },
        {
          type: 'button',
          componentProps: {
            onClick: () => message.success(JSON.stringify(form.getFormatFieldsValue())),
            children: '获取提交前数据',
          },
        },
      ]}
    </YForm>
  );
};
export default Demo;
