/* eslint-disable @typescript-eslint/no-unused-vars */
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
      <YForm form={form}>
        <YForm.Item label="a" name="a" type="input" />
        <YForm.Item label="aa" name="aa">
          <Input />
        </YForm.Item>
        {/* <YForm.Item label="aa" name="aa" type="input" />
        <YForm.Item label="bb" name="bb" type="input" />
        <YForm.Item label="tt" name="tt" type="textarea" />
        <YForm.Item
          label="list"
          name="list"
          type="list"
          items={({ index }) => {
            return [{ type: 'input', name: [index, 'age'] }];
          }}
        /> */}
        {/* <YForm.Item label="a" name="a" type="input" /> */}
        {/* <YForm.Items offset={2}>
          <YForm.Item label="a" name="a" type="input" />
          <YForm.Item label="b" offset={2} name="b" type="input" />
          <YForm.Items offset={2}>
            <YForm.Item label="a1" name="a1" type="input" />
            <YForm.Item label="b1" offset={2} name="b1" type="input" />
          </YForm.Items>
        </YForm.Items>
        <YForm.Items offset={2}>
          <YForm.Item label="a" name="a" type="input" />
          <YForm.Item label="b" offset={2} name="b" type="input" />
          <YForm.Items offset={2}>
            <YForm.Item label="a1" name="a1" type="input" />
            <YForm.Item label="b1" offset={2} name="b1" type="input" />
          </YForm.Items>
        </YForm.Items> */}
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
