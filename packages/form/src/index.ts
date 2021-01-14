import InternalForm from './form';
import Items from './items';

type InternalFormType = typeof InternalForm;

interface FormInterface extends InternalFormType {
  Items: typeof Items;
}

const Form = InternalForm as FormInterface;
Form.Items = Items;

export { Form };
