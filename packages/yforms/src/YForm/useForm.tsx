import { Form } from 'antd';
import { YFormInstance } from './Form';

const useForm = (propForm?: YFormInstance): [YFormInstance] => {
  const [form] = Form.useForm(propForm);
  return [form];
};

export default useForm;
