import { Form as AntdForm } from 'antd';
import { FormContext, FormItemContext } from './Context';
import InternalForm, { config } from './form';
import Items from './items';

import './styles/index.less';

type InternalFormType = typeof InternalForm;

interface FormInterface extends InternalFormType {
  Items: typeof Items;
  config: typeof config;
  useForm: typeof AntdForm.useForm;
  FormContext: typeof FormContext;
  FormItemContext: typeof FormItemContext;
}

const Form = InternalForm as FormInterface;
Form.Items = Items;
Form.config = config;
Form.useForm = AntdForm.useForm;
Form.FormContext = FormContext;
Form.FormItemContext = FormItemContext;

export { Form };
