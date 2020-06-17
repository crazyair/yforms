import React from 'react';
import { YForm } from 'yforms';
import { YFormItemProps } from 'yforms/lib/YForm/Items';

export default () => {
  return (
    <YForm>
      {[
        {
          label: '用户 1',
          type: 'oneLine',
          // name: 'xxx',
          componentProps: { oneLineStyle: ['50%', 8, '50%'] },
          items: (): YFormItemProps['children'] => [
            { label: '姓名', type: 'input', name: 'name' },
            { type: 'custom', component: <span /> },
            { label: '年龄', type: 'input', name: 'age' },
          ],
        },
        {
          label: '用户 2',
          type: 'oneLine',
          componentProps: { oneLineStyle: ['50%', 8, '50%'] },
          items: ({ style }): YFormItemProps['children'] => {
            return [
              { label: '姓名', type: 'input', name: 'name2' },
              { type: 'custom', component: <span /> },
              {
                noStyle: true,
                shouldUpdate: true,
                children: (): YFormItemProps['children'] => {
                  return [{ style: style[2], label: '年龄', type: 'input', name: 'age2' }];
                },
              },
            ];
          },
        },
      ]}
    </YForm>
  );
};
