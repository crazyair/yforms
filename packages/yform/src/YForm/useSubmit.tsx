import { useState } from 'react';

export interface YFormUseSubmitProps {
  history?: any;
}

export default (props: YFormUseSubmitProps) => {
  const { history } = props;

  const goBack = () => {
    if (history) {
      history.goBack();
    }
  };

  const [disabled, setDisabled] = useState(false);

  return {
    disabled,
    onFinishCallBack: goBack,
    submitComponentProps: {
      history,
      showBtns: {
        showEdit: {
          onClick: e => {
            e.preventDefault();
            setDisabled(c => !c);
          },
        },
      },
    },
  };
};
