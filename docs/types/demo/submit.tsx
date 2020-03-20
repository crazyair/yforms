import React from 'react';
import { YForm } from 'father-doc-yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

export default () => {
  const onFinish = (values: any) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };
  return (
    <YForm {...layout} required onFinish={onFinish}>
      {[{ type: 'input', label: '姓名', name: 'name' }, { type: 'submit' }]}
    </YForm>
  );
};
