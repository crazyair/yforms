/**
 * title: 获取数据
 * desc: 获取数据源
 */

import React from 'react';
import { YForm } from 'yforms';

const Demo = () => {
  const onFinish = async (values: any) => {
    console.log('Success:', values);
  };

  return (
    <>
      <YForm initialValues={{ name: '张三', age: '10' }} name="basic" onFinish={onFinish}>
        {[
          { type: 'input', label: 'name', name: 'name' },
          { type: 'input', label: 'age', name: 'age' },
          { type: 'submit' },
        ]}
      </YForm>
    </>
  );
};

export default Demo;
