import { useState, useCallback } from 'react';
import { YFormProps } from './Form';
import { YFormSubmitProps } from './component/Submit';

export interface ParamsType {
  id?: string;
  type?: 'create' | 'edit' | 'view';
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
  submit: {
    onFinishLoading?: (loading?: boolean) => void;
    submitLoading?: boolean;
    onCancel?: ModalOnCancel;
  };
  submitComponentProps: YFormSubmitProps;
}

export const paramsType = (params?: ParamsType) => {
  const _params = params || ({} as ParamsType);
  const type = {
    id: _params.id,
    edit: _params.type === 'edit',
    create: _params.type === 'create',
    view: _params.type === 'view',
  };
  let typeName = '';
  if (type.create) typeName = '新建';
  if (type.edit) typeName = '编辑';
  if (type.view) typeName = '查看';

  return { ...type, typeName };
};

export default (props: YFormUseSubmitProps): YFormUseSubmitReturnProps => {
  const { history, form, onCancel, params } = props;
  const { resetFields } = form || {};
  const { create, edit = true, view } = paramsType(params);
  // const { create = true, edit, view } = perms || {};

  const [disabled, setDisabled] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const goBack = () => {
    if (history) {
      history.goBack();
    }
  };

  const handleReset = useCallback(() => {
    if (typeof onCancel === 'function') {
      onCancel();
    } else if (create) {
      goBack();
    } else if (edit || view) {
      resetFields();
      setDisabled(true);
    }
  }, []);

  const handleOnEdit = e => {
    e.preventDefault();
    setDisabled(c => !c);
  };

  return {
    disabled,
    submit: { onFinishLoading: setSubmitLoading, submitLoading, onCancel: handleReset },
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
  };
};
