/**
 * title: plugins
 * desc: 自定义规则，修改 Item、Component 等默认参数
 */
import React from 'react';
import { Form } from 'yforms-simple';
import { layout, tailLayout } from './utils';

const Demo = () => {
  return (
    <Form
      {...layout}
      plugins={{ placeholder: { enable: true }, required: { enable: true } }}
      onFinish={(values) => console.log(values)}
    >
      {[
        { type: 'input', label: '年龄', name: 'age', rules: [{ required: true }] },
        {
          type: 'radio',
          label: '状态',
          name: 'radio',
          rules: [{ required: true }],
          componentProps: {
            options: [
              { id: '1', name: '男' },
              { id: '2', name: '女' },
            ],
          },
        },
        {
          type: 'space',
          ...tailLayout,
          componentProps: {
            items: () => {
              return [
                {
                  type: 'button',
                  componentProps: { children: '提交', type: 'primary', htmlType: 'submit' },
                },
              ];
            },
          },
        },
      ]}
    </Form>
  );
};
export default Demo;
