import { Form as AntdForm } from 'antd';
import { FormContext, FormItemContext } from './context';
import InternalForm, { config } from './form';
import Items from './items';
import Item from './item';
import FormModal from './FormModal';

import './styles/index.less';

type InternalFormType = typeof InternalForm;

interface FormInterface extends InternalFormType {
  Item: typeof Item;
  List: typeof AntdForm.List;
  ErrorList: typeof AntdForm.ErrorList;
  useForm: typeof AntdForm.useForm;
  Provider: typeof AntdForm.Provider;
  Items: typeof Items;
  config: typeof config;
  FormContext: typeof FormContext;
  FormItemContext: typeof FormItemContext;
  FormModal: typeof FormModal;
}

const Form = InternalForm as FormInterface;
// 默认
Form.Item = Item;
Form.List = AntdForm.List;
Form.ErrorList = AntdForm.ErrorList;
Form.Provider = AntdForm.Provider;
Form.useForm = AntdForm.useForm;
// 自定义
Form.Items = Items;
Form.config = config;
Form.FormContext = FormContext;
Form.FormItemContext = FormItemContext;
Form.FormModal = FormModal;

export { Form };
