import React, { useContext } from 'react';
import { reverse, mergeWith } from 'lodash';
import { ButtonProps } from 'antd/lib/button';

import { YForm, mergeWithDom } from '../..';
import { YFormDataSource } from '../Items';
import { YFormSecureButtonProps } from './SecureButton';
import { YFormSpaceProps } from './Space';

export interface ShowBtns {
  showSubmit?: ButtonProps;
  showSave?: YFormSecureButtonProps['componentProps'];
  showCancel?: ButtonProps;
  showEdit?: ButtonProps;
  showBack?: ButtonProps;
}

type showBtns = {
  [P in keyof ShowBtns]?: boolean | ShowBtns[P];
};

export interface YFormSubmitComponentProps {
  showBtns?: showBtns | boolean;
  reverseBtns?: boolean;
  spaceProps?: YFormSpaceProps;
}
export interface YFormSubmitProps {
  componentProps?: YFormSubmitComponentProps;
}

export default (props: YFormSubmitProps['componentProps']) => {
  const { showBtns = true, reverseBtns, spaceProps } = props;
  const formProps = useContext(YForm.YFormContext);
  const itemsProps = useContext(YForm.YFormItemsContext);
  const { form, onSave, submitComponentProps, disabled } = mergeWithDom({}, formProps, itemsProps);
  const { getFieldsValue, getFormatFieldsValue } = form;

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
  mergeWithDom(_showBtns, submitComponentProps.showBtns);
  const { showSubmit, showSave, showCancel, showEdit, showBack } = mergeWith(
    _showBtns,
    showBtns,
    (objValue, srcValue) => {
      // boolean 类型则用 objValue
      if (typeof srcValue === 'boolean') {
        return srcValue ? objValue : srcValue;
      }
    },
  );

  const actionBtns: { [key: string]: YFormDataSource } = {
    submit: { type: 'button', noStyle: true, isShow: !!showSubmit, componentProps: showSubmit },
    save: { type: 'secureButton', noStyle: true, isShow: !!showSave, componentProps: showSave },
    cancel: { type: 'button', noStyle: true, isShow: !!showCancel, componentProps: showCancel },
    edit: { type: 'button', noStyle: true, isShow: !!showEdit, componentProps: showEdit },
    back: { type: 'button', noStyle: true, isShow: !!showBack, componentProps: showBack },
  };

  let btns = [];
  if (disabled) {
    btns = [actionBtns.edit, actionBtns.back];
  } else {
    btns = [actionBtns.submit, actionBtns.save, actionBtns.cancel];
  }
  if (reverseBtns) {
    btns = reverse(btns);
  }
  return (
    <YForm.Items scenes={{ disabled: false }} isShow={!!showBtns}>
      {[{ type: 'space', ...spaceProps, items: btns }]}
    </YForm.Items>
  );
};
