// import { Button } from 'antd';
import React from 'react';
// import { Form as AntdForm, Button, Input } from 'antd';
import { Form } from 'yforms-simple';

type Fields = {
  age?: string;
};

const Demo = () => {
  return (
    <div>
      {/* <Form
        onFinish={(values) => {
          console.log('v', values);
        }}
      >
        {[
          {
            label: '年龄',
            type: 'input',
            name: 'age',
            componentProps: { placeholder: '请输入年龄' },
          },
          { type: 'button', componentProps: { children: '测试', htmlType: 'submit' } },
        ]}
      </Form> */}

      {/* <div>1</div> */}
      {/* <Form>
        <Button />
        {[{ type: 'button', componentProps: { htmlType: 'submit' } }]}
      </Form> */}

      {/* <div>header</div> */}
      <Form<Fields>>
        <div>header</div>
        {[
          {
            label: '年龄',
            type: 'input',
            name: 'age',
            componentProps: { placeholder: '请输入年龄' },
          },
          {
            label: '年龄',
            type: 'input',
            name: 'age',
            componentProps: { placeholder: '请输入年龄' },
          },
          {
            label: '年龄',
            type: 'input',
            name: 'name',
            componentProps: { placeholder: '请输入年龄' },
          },
        ]}
        <div>footer</div>
      </Form>

      {/* <AntdForm<Fields>
        onValuesChange={(v) => {
          console.log('v', v);
        }}
      >
        <AntdForm.Item name="age">
          <Input />
        </AntdForm.Item>
      </AntdForm> */}
    </div>
  );
};
export default Demo;
