import { Form } from 'antd';
import { YFormInstance } from './Form';

const useForm = (form?: YFormInstance): [YFormInstance] => {
  const [warpForm] = Form.useForm(form);
  return [warpForm as YFormInstance];
};

export default useForm;
