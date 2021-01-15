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

Form.config({ itemsType: { demo: { component: <>1232</> } } });

const Demo = () => {
  return (
    <div>
      <Form<Fields>
        onFinish={(values) => {
          console.log('v', values);
        }}
      >
        <div>header</div>
        {[
          { type: 'demo', label: 'demo', componentProps: { str: '1' } },
          {
            label: '年龄',
            type: 'input',
            name: 'age',
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
          { type: 'button', componentProps: { children: '提交', htmlType: 'submit' } },
        ]}
        <div>footer</div>
      </Form>
    </div>
  );
};
export default Demo;
