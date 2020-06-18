/**
 * title: jsx 写法
 * desc: 原生方式
 */

import React from 'react';
import { YForm } from 'yforms';
import { Input, Button } from 'antd';

const Demo = () => {
  const [form] = YForm.useForm();
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div>
      <YForm form={form} onFinish={onFinish} initialValues={{ list: [{ age: '10' }] }}>
        <YForm.Item label="使用 type" name="input" type="input" />
        <YForm.Item label="children type 共用" name="input_text-area" type="input">
          <Input.TextArea placeholder="请输入这里" />
        </YForm.Item>
        <YForm.Item
          label="数组"
          name="list"
          type="list"
          items={({ index }) => {
            return [{ type: 'input', name: [index, 'age'] }];
          }}
        />
        <YForm.Item>
          <Button onClick={form.submit}>提交</Button>
        </YForm.Item>
      </YForm>
    </div>
  );
};
export default Demo;
