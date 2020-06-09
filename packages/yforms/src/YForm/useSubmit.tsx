import { useRef, useState } from 'react';
import { ParamsObjType } from './Form';
import { paramsType } from './utils';

export interface YFormUseSubmitProps {}

export interface YFormUseSubmitReturnProps {
  submit: { params: ParamsObjType; forceUpdate: (p: { disabled?: boolean }) => void };
  disabled?: boolean;
  params: ParamsObjType;
}

export default (props: { params?: { [key: string]: string } }): YFormUseSubmitReturnProps => {
  const { params } = props || {};
  const paramsObj = paramsType(params);
  const { view } = paramsObj;

  const [update, forceUpdate] = useState<Partial<Omit<YFormUseSubmitReturnProps, 'submit'>>>({
    params: paramsObj,
  });

  const thisRef = useRef<YFormUseSubmitReturnProps['submit']>({
    forceUpdate,
    params: paramsObj,
  });

  return {
    params: paramsObj,
    // 用 view 判断 disabled 默认值（同 Form）
    disabled: update.disabled === undefined ? view : update.disabled,
    submit: thisRef.current,
  };
};
