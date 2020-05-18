import React from 'react';
import { YForm } from 'yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

export default () => {
  return (
    <YForm {...layout}>
      {[
        {
          label: '自定义渲染',
          type: 'custom',
          name: 'custom',
          component: <div>这是自定义渲染</div>,
        },
      ]}
    </YForm>
  );
};
