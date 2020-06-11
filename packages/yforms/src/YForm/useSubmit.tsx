import { useState } from 'react';
import { ParamsObjType } from './Form';
import { paramsType } from './utils';

export interface YFormUseSubmitProps {
  disabled?: boolean;
  params?: { [key: string]: string };
}

export interface YFormUseSubmitReturnProps {
  submit: { params: ParamsObjType; onDisabled?: (disabled?: boolean) => void; disabled?: boolean };
}

export default (props: YFormUseSubmitProps): YFormUseSubmitReturnProps => {
  const { params, disabled } = props || {};
  const paramsObj = paramsType(params);
  const { view } = paramsObj;
  // 同 Form 使用 view 当默认值
  const [thisDisabled, setThisDisabled] = useState('disabled' in props ? disabled : view);

  return { submit: { disabled: thisDisabled, params: paramsObj, onDisabled: setThisDisabled } };
};
