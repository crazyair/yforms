import React from 'react';
import { YForm } from 'yforms';
import { YFormProps } from 'yforms/src/YForm/Form';

export default () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <YForm onFinish={onFinish} initialValues={{ card: [{}] }}>
      {[
        {
          type: 'card',
          label: '卡片',
          items: [{ type: 'input', name: 'phone', label: '手机号' }],
        },
        {
          type: 'list',
          name: 'card',
          label: '卡片',
          componentProps: { showRightIcons: false },
          items: ({ index, icons }): YFormProps['children'] => {
            return [
              {
                type: 'card',
                componentProps: { title: `card_${index + 1}`, extra: icons },
                items: [{ type: 'input', name: [index, 'phone'], label: '手机号' }],
              },
            ];
          },
        },
        { type: 'submit' },
      ]}
    </YForm>
  );
};
