import React from 'react';
import { YForm } from 'yforms';

export default () => {
  return (
    <YForm>
      {[
        {
          label: '用户',
          type: 'space',
          className: 'mb0',
          items: [
            { label: '姓名', type: 'input', name: 'name2' },
            { label: '年龄', type: 'input', name: 'age2' },
          ],
        },
        {
          type: 'space',
          items: [
            { type: 'button', componentProps: { children: '按钮 1', type: 'primary' } },
            { type: 'button', componentProps: { children: '按钮 2' } },
          ],
        },
      ]}
    </YForm>
  );
};
