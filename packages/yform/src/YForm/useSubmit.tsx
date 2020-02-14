import React, { useState, useCallback } from 'react';
import { YFormProps } from './Form';
import { YFormSubmitProps } from './component/Submit';
import { paramsType } from './utils';

export interface ParamsType {
  id?: string;
  type?: 'create' | 'edit' | 'view';
}

export interface ParamsObjType {
  create?: boolean;
  edit?: boolean;
  view?: boolean;
  id?: string;
  typeName?: string;
}

export interface YFormUseSubmitProps {
  history?: any;
  params?: ParamsType;
  form: YFormProps['form'];
  onCancel?: () => void;
}

export type ModalOnCancel = (
  e?: React.MouseEvent<HTMLElement>,
) => void | boolean | Promise<void | boolean>;

export interface YFormUseSubmitReturnProps {
  disabled?: boolean;
  params?: ParamsObjType;
  submit: {
    onFinishLoading: (loading?: boolean) => void;
    onFinishCallback: () => void;
    submitComponentProps: YFormSubmitProps;
  };
}
export default (props: YFormUseSubmitProps): YFormUseSubmitReturnProps => {
  const { history, form, onCancel, params } = props;
  const { resetFields } = form;
  const _params = paramsType(params);
  const { create, edit, view } = _params;

  const [disabled, setDisabled] = useState(view);
  const [submitLoading, setSubmitLoading] = useState(false);

  const goBack = useCallback(() => {
    if (history) {
      history.goBack();
    }
  }, [history]);

  const handleReset = useCallback(() => {
    if (typeof onCancel === 'function') {
      onCancel();
    } else if (create) {
      goBack();
    } else if (edit || view) {
      resetFields();
      setDisabled(true);
    }
  }, [create, edit, goBack, onCancel, resetFields, view]);

  const handleOnEdit = e => {
    e.preventDefault();
    setDisabled(c => !c);
  };
  return {
    disabled,
    params: _params,
    submit: {
      onFinishLoading: setSubmitLoading,
      onFinishCallback: handleReset,
      submitComponentProps: {
        showBtns: {
          // form submit 触发后设置 loading = true
          showSubmit: { loading: submitLoading },
          showEdit: { onClick: handleOnEdit },
          showCancel: { onClick: handleReset },
          showSave: { onLoaded: handleReset },
          showBack: { onClick: goBack },
        },
      },
    },
  };
};
