import { paramsType } from './utils';
import { ParamsType, ParamsObjType } from './Form';

export interface YFormUseSubmitProps {
  params?: ParamsType;
}

export interface YFormUseSubmitReturnProps {
  params: ParamsObjType;
}
export default (props: YFormUseSubmitProps): YFormUseSubmitReturnProps => {
  const { params } = props;
  return { params: paramsType(params) };
};
