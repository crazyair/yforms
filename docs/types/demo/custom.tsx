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
          children: <div>这是自定义渲染</div>,
        },
        { label: '文字场景', type: 'custom', children: '文字' },
      ]}
    </YForm>
  );
};
