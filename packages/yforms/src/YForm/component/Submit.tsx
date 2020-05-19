import React from 'react';
import { merge, reverse, mergeWith } from 'lodash';
import { ButtonProps } from 'antd/lib/button';

import { YForm } from '../..';
import { YFormProps } from '../Form';
import { YFormItemProps, YFormDataSource } from '../Items';
import { YFormSecureButtonProps } from './SecureButton';
import { YFormFieldBaseProps } from '../ItemsType';

export const submitModify: YFormFieldBaseProps<YFormSubmitProps>['modifyProps'] = ({
  componentProps,
  formProps,
}) => {
  const { form, onSave, submitComponentProps } = formProps;
  const mergeCProps = merge({}, submitComponentProps, componentProps);
  const _cProps = { form, onSave, ...mergeCProps };
  return { componentProps: _cProps };
};

export interface ShowBtns {
  showSubmit?: ButtonProps;
  showSave?: YFormSecureButtonProps;
  showCancel?: ButtonProps;
  showEdit?: ButtonProps;
  showBack?: ButtonProps;
}

type showBtns = {
  [P in keyof ShowBtns]?: boolean | ShowBtns[P];
};

export interface YFormSubmitProps
  extends Pick<YFormProps, 'form' | 'onSave' | 'formatFieldsValue' | 'disabled'> {
  showBtns?: showBtns | boolean;
  reverseBtns?: boolean;
}

export default (props: YFormSubmitProps) => {
  const { form, onSave, showBtns = true, reverseBtns, disabled } = props;
  const { getFieldsValue, getFormatFieldsValue } = form || {};

  const handleOnSave = async (e) => {
    e.preventDefault();
    if (onSave && getFieldsValue) {
      await onSave(getFormatFieldsValue(getFieldsValue()));
    }
  };

  const _showBtns: ShowBtns = {
    showSubmit: { children: '提交', type: 'primary', htmlType: 'submit' },
    showSave: { children: '保存', type: 'primary', onClick: handleOnSave },
    showCancel: { children: '取消' },
    showEdit: { children: '编辑' },
    showBack: { children: '返回', type: 'link' },
  };

  const { showSubmit, showSave, showCancel, showEdit, showBack } = mergeWith(
    _showBtns,
    showBtns,
    (objValue, srcValue) => {
      // boolean 类型如果是 true 则用 objValue
      if (typeof srcValue === 'boolean') {
        return srcValue ? objValue : srcValue;
      }
      // 对象则合并
      return merge({}, objValue, srcValue);
    },
  );

  const actionBtns: { [key: string]: YFormDataSource } = {
    submit: {
      type: 'button',
      noStyle: true,
      isShow: !!showSubmit,
      plugins: { disabled: false },
      componentProps: showSubmit,
    },
    save: {
      type: 'secureButton',
      noStyle: true,
      isShow: !!showSave,
      plugins: { disabled: false },
      componentProps: showSave,
    },
    cancel: {
      type: 'button',
      noStyle: true,
      isShow: !!showCancel,
      plugins: { disabled: false },
      componentProps: showCancel,
    },
    edit: {
      type: 'button',
      noStyle: true,
      isShow: !!showEdit,
      plugins: { disabled: false },
      componentProps: showEdit,
    },
    back: {
      type: 'button',
      noStyle: true,
      isShow: !!showBack,
      plugins: { disabled: false },
      componentProps: showBack,
    },
  };

  let btns: YFormItemProps['children'];
  if (disabled) {
    btns = [actionBtns.edit, actionBtns.back];
  } else {
    btns = [actionBtns.submit, actionBtns.save, actionBtns.cancel];
  }
  if (reverseBtns) {
    btns = reverse(btns);
  }
  return (
    <YForm.Items isShow={!!showBtns}>
      {[{ className: 'button-more-left', dataSource: btns }]}
    </YForm.Items>
  );
};
