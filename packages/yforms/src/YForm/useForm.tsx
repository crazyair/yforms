import { Form } from 'antd';
import { YFormProps } from './Form';

const useForm = (propForm?: YFormProps['form']): [YFormProps['form']] => {
  const [form] = Form.useForm(propForm);
  return [form];
};

export default useForm;
