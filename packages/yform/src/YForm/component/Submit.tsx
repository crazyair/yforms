import React from 'react';
import { YForm } from 'father-doc-yform';
import { FormInstance } from 'antd/lib/form';
import { YFormProps } from '../Form';
import { YFormItemProps } from '../Items';
import { submitFormatValues } from '../utils';

export interface YFormSubmitProps {
  children?: React.ReactNode;
  form?: FormInstance;
  onSave?: YFormProps['onSave'];
  formatFieldsValue?: YFormProps['formatFieldsValue'];
}

export const submitModify = (
  fProps: YFormItemProps,
  cProps: YFormSubmitProps,
  formProps: YFormProps,
): [YFormItemProps, YFormSubmitProps] => {
  const { form, onSave, formatFieldsValue } = formProps;
  const _fProps = { ...fProps };
  const _cProps = { form, onSave, formatFieldsValue, ...cProps };
  return [_fProps, _cProps];
};

export default (props: YFormSubmitProps) => {
  const { children, form, onSave, formatFieldsValue } = props;

  const { resetFields, getFieldsValue } = form || {};

  const handleFormatFieldsValue = value => submitFormatValues(value, formatFieldsValue);

  const handleOnSave = e => {
    e.preventDefault();
    if (onSave && getFieldsValue) {
      const value = handleFormatFieldsValue(getFieldsValue());
      onSave(value);
    }
  };
  const handleOnCancel = e => {
    e.preventDefault();
    if (resetFields) {
      resetFields();
    }
  };

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
              componentProps: { type: 'primary', onClick: handleOnSave, children: '保存' },
            },
            {
              type: 'button',
              noStyle: true,
              plugins: { disabled: false },
              componentProps: { onClick: handleOnCancel, children: '取消' },
            },
          ],
        },
      ]}
    </YForm.Items>
  );
};
