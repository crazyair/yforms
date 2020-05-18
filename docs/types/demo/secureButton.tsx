import React from 'react';
import { YForm } from 'yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

export default () => {
  const onFinish = (values: any) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onClick = () => {
    // eslint-disable-next-line no-console
    console.log('ok');
  };
  return (
    <YForm {...layout} required onFinish={onFinish}>
      {[{ type: 'secureButton', componentProps: { children: '测试', onClick } }]}
    </YForm>
  );
};
