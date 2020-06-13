/* eslint-disable no-console */
import React from 'react';
import { YForm } from 'yforms';

export default () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <YForm onFinish={onFinish}>
      {[{ type: 'input', label: '姓名', name: 'name' }, { type: 'submit' }]}
    </YForm>
  );
};
