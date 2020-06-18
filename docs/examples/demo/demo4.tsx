/**
 * title: jsx 写法
 * desc: 日期场景下修改初始化值，提交修改提交值，数据对比也可以共享该配置。
 */

import React from 'react';
import { YForm } from 'yforms';
import { Input, Button } from 'antd';

const Demo = () => {
  const [form] = YForm.useForm();

  return (
    <div>
      <YForm form={form} initialValues={{ list: [{ age: '10' }] }}>
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
      </YForm>
      <Button
        onClick={() => {
          console.log(form.getFormatFieldsValue());
        }}
      >
        提交
      </Button>
    </div>
  );
};
export default Demo;
