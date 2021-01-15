import { Input } from 'antd';
import React from 'react';
import { Form } from 'yforms-simple';

type Fields = {
  age?: string;
};
declare module 'yforms-simple/lib/itemsType' {
  export interface FormItemsTypeDefine {
    demo?: BaseItemsType<'demo', { str: string }>;
  }
}

Form.config({ itemsType: { demo: { component: <Input /> } } });

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const Demo = () => {
  return (
    <div>
      <Form<Fields>
        {...layout}
        onFinish={(values) => {
          console.log('v', values);
        }}
        initialValues={{ age: '1' }}
      >
        <div>这里自定义显示</div>
        {[
          {
            type: 'demo',
            initialValue: '1',
            label: 'demo',
            name: 'demo',
            componentProps: { str: '1' },
          },
          {
            label: '年龄',
            type: 'input',
            name: 'age',
            deFormat: (value) => value + 1,
            componentProps: { placeholder: '请输入年龄' },
          },
          {
            label: '姓名',
            type: 'input',
            shouldUpdate: (prev, current) => prev.age !== current.age,
            isShow: (values) => {
              return values.age === '1';
            },
            name: 'name',
            componentProps: { placeholder: '请输入姓名' },
          },
          {
            type: 'button',
            ...tailLayout,
            componentProps: { children: '提交', htmlType: 'submit' },
          },
        ]}
      </Form>
    </div>
  );
};
export default Demo;
