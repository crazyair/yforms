import React from 'react';
import { YForm } from 'yforms';

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
    <YForm onFinish={onFinish}>
      {[{ type: 'secureButton', componentProps: { children: '测试', onClick } }]}
    </YForm>
  );
};
