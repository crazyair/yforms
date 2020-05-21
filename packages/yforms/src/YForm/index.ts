import { Form as AntForm } from 'antd';

import YForm, { Config, useFormatFieldsValue } from './Form';
import Items from './Items';
import useSubmit from './useSubmit';
import useForm from './useForm';

import './index.less';

type InternalYForm = typeof YForm;
interface RefYForm extends InternalYForm {
  Config: typeof Config;
  Items: typeof Items;
  Item: typeof AntForm.Item;
  useForm: typeof useForm;
  useFormatFieldsValue: typeof useFormatFieldsValue;
  useSubmit: typeof useSubmit;
}

const Form: RefYForm = YForm as RefYForm;

Form.Config = Config;
Form.Items = Items;
Form.Item = AntForm.Item;
Form.useForm = useForm;
Form.useFormatFieldsValue = useFormatFieldsValue;
Form.useSubmit = useSubmit;

export default Form;
