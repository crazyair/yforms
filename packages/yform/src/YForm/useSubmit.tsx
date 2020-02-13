import { useState, useCallback } from 'react';
import { YFormProps } from './Form';
import { YFormSubmitProps } from './component/Submit';

export interface YFormUseSubmitProps {
  history?: any;
  form: YFormProps['form'];
  onCancel?: () => void;
  perms?: any;
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

export default (props: YFormUseSubmitProps): YFormUseSubmitReturnProps => {
  const { history, form, onCancel, perms } = props;
  const { resetFields } = form || {};
  const { create, edit = true, view } = perms || {};
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

  return {
    disabled,
    submit: { onFinishLoading: setSubmitLoading, submitLoading, onCancel: handleReset },
    submitComponentProps: {
      goBack,
      showBtns: {
        // form submit 触发后设置 loading = true
        showSubmit: { loading: submitLoading },
        showEdit: {
          onClick: e => {
            e.preventDefault();
            setDisabled(c => !c);
          },
        },
        showCancel: {
          onClick: handleReset,
        },
      },
    },
  };
};
