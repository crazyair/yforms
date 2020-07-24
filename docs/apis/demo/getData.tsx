/**
 * title: 获取数据
 * desc: 获取数据源
 */

import React from 'react';
import { YForm } from 'yforms';

const getOptions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1));
  return [
    { id: '1', name: '男' },
    { id: '2', name: '女' },
  ];
};

const Demo = () => {
  const onFinish = async (values: any) => {
    console.log('Success:', values);
  };

  return (
    <>
      <YForm initialValues={{ list: '1' }} onFinish={onFinish}>
        {[
          { type: 'input', name: 'demo', label: 'demo' },
          {
            type: 'radio',
            label: 'list',
            name: 'list',
            shouldUpdate: (prev, current) => prev.demo !== current.demo,
            componentProps: {
              getOptions: async (values: any) => {
                console.log('v', values);
                const data = await getOptions();
                data[0].name = values.demo;
                return data;
              },
            },
          },
        ]}
      </YForm>
    </>
  );
};

export default Demo;
