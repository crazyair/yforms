import { Form as AntForm } from 'antd';
import YForm, { Config, useFormatFieldsValue } from './Form';
import Items from './Items';
import ItemsType from './ItemsType';
import { submitFormatValues, onFormatFieldsValue } from './utils';

import './index.less';

type InternalYForm = typeof YForm;
interface RefYForm extends InternalYForm {
  config: typeof Config;
  ItemsType: typeof ItemsType;
  Items: typeof Items;
  Item: typeof AntForm.Item;
  useFormatFieldsValue: typeof useFormatFieldsValue;
  submitFormatValues: typeof submitFormatValues;
  onFormatFieldsValue: typeof onFormatFieldsValue;
}

const Form: RefYForm = YForm as RefYForm;

Form.ItemsType = ItemsType;
Form.config = Config;
Form.Items = Items;
Form.Item = AntForm.Item;
Form.useFormatFieldsValue = useFormatFieldsValue;
Form.submitFormatValues = submitFormatValues;
Form.onFormatFieldsValue = onFormatFieldsValue;

export default Form;
