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
      ]}
    </YForm>
  );
};
