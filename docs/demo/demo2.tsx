/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { YForm } from 'father-doc-yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

const mockData = { params: { type: 'create' } };

interface Demo2Props {}
const Demo: React.FC<Demo2Props & RouteComponentProps> = props => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { match = mockData, history } = props;
  const [data, setData] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const { formatFieldsValue, onFormatFieldsValue } = YForm.useFormatFieldsValue();

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
      loading={loading}
      initialValues={data}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onSave={onSave}
      formatFieldsValue={formatFieldsValue}
      required
      disabled={disabled}
    >
      {[
        { type: 'input', label: 'name', name: 'name' },
        { type: 'input', label: 'age', name: 'age', componentProps: { suffix: '岁' } },
        { type: 'money', label: 'money', name: 'money' },
        {
          type: 'submit',
          componentProps: {
            history,
            showBtns: {
              showEdit: {
                onClick: e => {
                  e.preventDefault();
                  setDisabled(c => !c);
                },
              },
            },
          },
        },
      ]}
    </YForm>
  );
};
export default Demo;
