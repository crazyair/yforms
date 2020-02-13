import { useState } from 'react';
import { YFormProps } from './Form';
import { YFormSubmitProps } from './component/Submit';

export interface YFormUseSubmitProps {
  history?: any;
  form: YFormProps['form'];
}
export interface YFormUseSubmitReturnProps {
  disabled?: boolean;
  submit: YFormProps['submit'];
  submitComponentProps: YFormSubmitProps;
}

export default (props: YFormUseSubmitProps): YFormUseSubmitReturnProps => {
  const { history } = props;

  const goBack = () => {
    if (history) {
      // history.goBack();
    }
  };

  const [disabled, setDisabled] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // const handleOnSave = e => {
  //   e.preventDefault();
  //   console.log('handleOnSave', e);
  // };

  // const handleOnSubmit = e => {
  //   // TODO 要允许执行
  //   e.preventDefault();
  //   console.log('handleOnSubmit');
  // };

  // const handleOnSubmitLoaded = () => {
  //   console.log('handleOnSubmitLoaded', status);
  // };

  return {
    disabled,
    submit: { onFinishCallBack: setSubmitLoading, submitLoading },
    // onFinishCallBack: goBack,
    submitComponentProps: {
      goBack,
      showBtns: {
        showEdit: {
          onClick: e => {
            e.preventDefault();
            setDisabled(c => !c);
          },
        },
        // showSave: {
        //   onClick: handleOnSave,
        // },
        showSubmit: {
          loading: submitLoading,
          // onClick: handleOnSubmit,
          // onLoaded: handleOnSubmitLoaded,
        },
      },
    },
  };
};
