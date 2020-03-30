/**
 * title: edit 源码
 * desc: 上方点击按钮进入详情页面代码
 */

/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { YForm } from 'father-doc-yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

const Demo: React.FC<RouteComponentProps> = props => {
  const { match = {} as RouteComponentProps['match'] } = props;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const [form] = YForm.useForm();
  const { formatFieldsValue, onFormatFieldsValue } = YForm.useFormatFieldsValue();

  const {
    params: { typeName },
  } = YForm.useSubmit({ params: match.params });

  useEffect(() => {
    setTimeout(() => {
      setData({ name: '张三', age: '10' });
      setLoading(false);
    }, 10);
  }, []);

  onFormatFieldsValue([
    { name: 'append_field', format: () => '提交前追加字段' },
    { name: 'name', format: ({ name }) => `${name}_改变了` },
  ]);

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    await new Promise(resolve => setTimeout(resolve, 500));
    await new Promise((resolve, reject) => {
      // 请求随机成功或者失败
      if (Math.round(Math.random()) === 0) {
        reject();
        message.error('提交错误', 0.5);
      } else {
        resolve();
        message.success('提交成功', 0.5);
      }
    });
  };

  const onSave = async (values: any) => {
    console.log('values:', values);
    await new Promise(resolve => setTimeout(resolve, 500));
    await message.success('保存成功', 0.5);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h2>{typeName}</h2>
      <YForm
        {...layout}
        form={form}
        initialValues={data}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        required
        formatFieldsValue={formatFieldsValue}
        loading={loading}
        onSave={onSave}
        params={match.params}
      >
        {[
          { type: 'input', label: 'name', name: 'name' },
          { type: 'input', label: 'age', name: 'age', componentProps: { suffix: '岁' } },
          { type: 'money', label: 'money', name: 'money' },
          { type: 'submit' },
        ]}
      </YForm>
    </>
  );
};
export default Demo;
