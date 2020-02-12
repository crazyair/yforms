import React, { useState, useEffect } from 'react';
import { YForm } from 'father-doc-yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

const Demo = () => {
  const [disabled, setDisabled] = useState(false);
  const [form] = YForm.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    setTimeout(() => {
      setData({ name: '张三', age: '10' });
      setLoading(false);
    }, 10);
  }, []);
  return (
    <YForm
      {...layout}
      loading={loading}
      initialValues={data}
      name="basic"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      required
      disabled={disabled}
    >
      {[
        { type: 'input', label: 'name', name: 'name' },
        { type: 'input', label: 'age', name: 'age', componentProps: { suffix: '岁' } },
        { type: 'money', label: 'money', name: 'money' },
        { type: 'submit', componentProps: { form, children: '提交' } },
        {
          className: 'button-more-left',
          dataSource: [
            {
              type: 'button',
              noStyle: true,
              plugins: { disabled: false },
              componentProps: {
                type: 'primary',
                onClick: () => setDisabled(c => !c),
                children: '状态',
              },
            },
          ],
        },
      ]}
    </YForm>
  );
};
export default Demo;
