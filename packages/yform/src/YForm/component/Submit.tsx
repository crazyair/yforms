import React from 'react';
import { YForm } from 'father-doc-yform';
import { FormInstance } from 'antd/lib/form';

export interface YFormSubmitProps {
  children?: React.ReactNode;
  form?: FormInstance;
}

export default (props: YFormSubmitProps) => {
  const { children, form } = props;

  const { resetFields } = form;

  return (
    <YForm.Items plugins={{ noLabelLayout: false }}>
      {[
        {
          className: 'button-more-left mb0',
          dataSource: [
            {
              type: 'button',
              noStyle: true,
              plugins: { disabled: false },
              componentProps: { type: 'primary', htmlType: 'submit', children },
            },
            {
              type: 'button',
              noStyle: true,
              plugins: { disabled: false },
              componentProps: { type: 'primary', children: '保存' },
            },
            {
              type: 'button',
              noStyle: true,
              plugins: { disabled: false },
              componentProps: { onClick: () => resetFields(), children: '取消' },
            },
          ],
        },
      ]}
    </YForm.Items>
  );
};
