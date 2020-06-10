import { Form as AntForm } from 'antd';

import YForm, { Config, useFormatFieldsValue } from './Form';
import Items from './Items';
import useSubmit from './useSubmit';
import useForm from './useForm';

import './index.less';
import { YFormItemsContext, YFormContext, YFormListContent } from './Context';
import FormModal from './YFormModal';

type InternalYForm = typeof YForm;
interface RefYForm extends InternalYForm {
  Config: typeof Config;
  Items: typeof Items;
  Item: typeof AntForm.Item;
  useForm: typeof useForm;
  useFormatFieldsValue: typeof useFormatFieldsValue;
  useSubmit: typeof useSubmit;
  YFormContext: typeof YFormContext;
  YFormItemsContext: typeof YFormItemsContext;
  ListContent: typeof YFormListContent;
  FormModal: typeof FormModal;
}

const Form: RefYForm = YForm as RefYForm;

Form.Config = Config;
Form.Items = Items;
Form.Item = AntForm.Item;
Form.useForm = useForm;
Form.useFormatFieldsValue = useFormatFieldsValue;
Form.useSubmit = useSubmit;
Form.YFormContext = YFormContext;
Form.YFormItemsContext = YFormItemsContext;
Form.ListContent = YFormListContent;
Form.FormModal = FormModal;

export default Form;
