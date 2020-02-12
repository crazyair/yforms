import React from 'react';
import { YForm } from 'father-doc-yform';
import { merge } from 'lodash';
import { ButtonProps } from 'antd/lib/button';

import { YFormProps } from '../Form';
import { YFormItemProps, YFormDataSource } from '../Items';
import { submitFormatValues } from '../utils';

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

// type ButtonType = { text: React.ReactNode };

export interface ShowBtns {
  showSubmit?: boolean | ButtonProps;
  showSave?: boolean | ButtonProps;
  showCancel?: boolean | ButtonProps;
  showEdit?: boolean | ButtonProps;
  showBack?: boolean | ButtonProps;
}

export interface YFormSubmitProps
  extends Pick<YFormProps, 'form' | 'onSave' | 'formatFieldsValue' | 'disabled'> {
  showBtns?: ShowBtns | boolean;
}

export default (props: YFormSubmitProps) => {
  const { form, onSave, formatFieldsValue, showBtns = true, disabled } = props;

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

  const _showBtns = {
    showSubmit: { type: 'primary', htmlType: 'submit', children: '提交' },
    showSave: { type: 'primary', onClick: handleOnSave, children: '保存' },
    showCancel: { onClick: handleOnCancel, children: '取消' },
    showEdit: { onClick: handleOnCancel, children: '编辑' },
    showBack: { type: 'link', onClick: handleOnCancel, children: '返回' },
  } as ShowBtns;

  const { showSubmit, showSave, showCancel, showEdit, showBack } = merge({}, _showBtns, showBtns);

  const actionBtns: { [key: string]: YFormDataSource } = {
    submit: {
      type: 'button',
      noStyle: true,
      isShow: !!showSubmit,
      plugins: { disabled: false },
      componentProps: showSubmit as ButtonProps,
    },
    save: {
      type: 'button',
      noStyle: true,
      isShow: !!showSave,
      plugins: { disabled: false },
      componentProps: showSave as ButtonProps,
    },
    cancel: {
      type: 'button',
      noStyle: true,
      isShow: !!showCancel,
      plugins: { disabled: false },
      componentProps: showCancel as ButtonProps,
    },
    edit: {
      type: 'button',
      noStyle: true,
      isShow: !!showEdit,
      plugins: { disabled: false },
      componentProps: showEdit as ButtonProps,
    },
    back: {
      type: 'button',
      noStyle: true,
      isShow: !!showBack,
      plugins: { disabled: false },
      componentProps: showBack as ButtonProps,
    },
  };

  let btns: YFormItemProps['children'];
  if (disabled) {
    btns = [actionBtns.edit, actionBtns.back];
  } else {
    btns = [actionBtns.submit, actionBtns.save, actionBtns.cancel];
  }
  return (
    <YForm.Items plugins={{ noLabelLayout: false }} isShow={!!showBtns}>
      {[{ className: 'button-more-left mb0', dataSource: btns }]}
    </YForm.Items>
  );
};
