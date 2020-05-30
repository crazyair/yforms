import React, { useContext } from 'react';
import { merge, reverse, mergeWith } from 'lodash';
import { ButtonProps } from 'antd/lib/button';

import { YForm } from '../..';
import { YFormProps } from '../Form';
import { YFormItemProps, YFormDataSource } from '../Items';
import { YFormSecureButtonProps } from './SecureButton';

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

export interface YFormSubmitProps extends Pick<YFormProps, 'disabled'> {
  showBtns?: showBtns | boolean;
  reverseBtns?: boolean;
}

export default (props: YFormSubmitProps) => {
  const formProps = useContext(YForm.YFormContext);
  const itemsProps = useContext(YForm.YFormItemsContext);
  const { form, onSave, scenes, submitComponentProps, ...rest } = merge({}, formProps, itemsProps);
  const { getFieldsValue, getFormatFieldsValue } = form;

  const { showBtns = true, reverseBtns, disabled } = merge({}, rest, props);

  const handleOnSave = async (e) => {
    e.preventDefault();
    if (onSave) {
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
  merge(_showBtns, submitComponentProps.showBtns);
  const { showSubmit, showSave, showCancel, showEdit, showBack } = mergeWith(
    _showBtns,
    showBtns,
    (objValue, srcValue) => {
      // boolean 类型则用 objValue
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
      componentProps: showSubmit,
    },
    save: {
      type: 'secureButton',
      noStyle: true,
      isShow: !!showSave,
      componentProps: showSave,
    },
    cancel: {
      type: 'button',
      noStyle: true,
      isShow: !!showCancel,
      componentProps: showCancel,
    },
    edit: {
      type: 'button',
      noStyle: true,
      isShow: !!showEdit,
      componentProps: showEdit,
    },
    back: {
      type: 'button',
      noStyle: true,
      isShow: !!showBack,
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
    <YForm.Items scenes={{ ...scenes, disabled: false }} isShow={!!showBtns}>
      {[{ className: 'button-more-left', dataSource: btns }]}
    </YForm.Items>
  );
};
