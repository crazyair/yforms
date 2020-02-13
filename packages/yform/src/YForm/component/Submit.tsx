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
  const _fProps = { noStyle: true, ...fProps };
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
  history?: any;
}

export default (props: YFormSubmitProps) => {
  const { form, onSave, formatFieldsValue, showBtns = true, disabled, history } = props;

  const { resetFields, getFieldsValue } = form || {};

  const goBack = () => {
    if (history) {
      history.goBack();
    }
  };

  const handleOnSave = e => {
    e.preventDefault();
    if (onSave && getFieldsValue) {
      const value = submitFormatValues(getFieldsValue(), formatFieldsValue);
      onSave(value);
      // TODO 这里要成功后才执行下面，后面做 SecureButton 后支持
      goBack();
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
    showBack: { type: 'link', onClick: goBack, children: '返回' },
  } as ShowBtns;

  const { showSubmit, showSave, showCancel, showEdit, showBack } = merge({}, _showBtns, showBtns);

  const handleBaseBtn = (btnProps): YFormDataSource => ({
    type: 'button',
    noStyle: true,
    isShow: !!btnProps,
    plugins: { disabled: false },
    componentProps: btnProps as ButtonProps,
  });

  const actionBtns = {
    submit: handleBaseBtn(showSubmit),
    save: handleBaseBtn(showSave),
    cancel: handleBaseBtn(showCancel),
    edit: handleBaseBtn(showEdit),
    back: handleBaseBtn(showBack),
  };

  let btns: YFormItemProps['children'];
  if (disabled) {
    btns = [actionBtns.edit, actionBtns.back];
  } else {
    btns = [actionBtns.submit, actionBtns.save, actionBtns.cancel];
  }
  return (
    <YForm.Items isShow={!!showBtns}>
      {[{ className: 'button-more-left', dataSource: btns }]}
    </YForm.Items>
  );
};
