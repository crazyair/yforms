import { FormContext } from './Context';
import InternalForm, { config } from './form';
import Items from './items';

import './styles/index.less';

type InternalFormType = typeof InternalForm;

interface FormInterface extends InternalFormType {
  Items: typeof Items;
  config: typeof config;
  FormContext: typeof FormContext;
}

const Form = InternalForm as FormInterface;
Form.Items = Items;
Form.FormContext = FormContext;
Form.config = config;

export { Form };
