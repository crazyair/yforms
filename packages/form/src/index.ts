import { Form as AntdForm } from 'antd';
import { FormContext } from './Context';
import InternalForm, { config } from './form';
import Items from './items';

import './styles/index.less';

type InternalFormType = typeof InternalForm;

interface FormInterface extends InternalFormType {
  Items: typeof Items;
  config: typeof config;
  useForm: typeof AntdForm.useForm;
  FormContext: typeof FormContext;
}

const Form = InternalForm as FormInterface;
Form.Items = Items;
Form.FormContext = FormContext;
Form.config = config;
Form.useForm = AntdForm.useForm;

export { Form };
