import React from 'react';
import { YForm } from 'yforms';

export default () => {
  return (
    <YForm>
      {[
        {
          label: '自定义渲染',
          type: 'custom',
          name: 'custom',
          component: <div>这是自定义渲染</div>,
        },
        { label: '文字场景', type: 'custom', component: '文字' },
      ]}
    </YForm>
  );
};
