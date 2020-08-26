/**
 * title: getInitialValues 使用
 * desc: 快捷方式用来获取表单初始化数据
 */
import React from 'react';
import { YForm } from 'yforms';

export default () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <YForm
      onFinish={onFinish}
      getInitialValues={async () => Promise.resolve({ name: '张飞', money: '99' })}
    >
      {[
        { type: 'input', label: '姓名', name: 'name' },
        { type: 'money', label: '金额', name: 'money' },
        { type: 'submit' },
      ]}
    </YForm>
  );
};
