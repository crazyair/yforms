import React from 'react';
import { YForm } from 'yforms';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

export default () => {
  return (
    <YForm {...layout}>
      {[
        {
          label: '用户',
          type: 'space',
          items: [
            { label: '姓名', type: 'input', name: 'name2' },
            { label: '年龄', type: 'input', name: 'age2' },
          ],
        },
        {
          type: 'space',
          items: [
            { type: 'button', componentProps: { children: '确定', type: 'primary' } },
            { type: 'button', componentProps: { children: '取消' } },
          ],
        },
      ]}
    </YForm>
  );
};
