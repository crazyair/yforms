import { Input, Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { InputProps, PasswordProps } from 'antd/lib/input';

export interface BaseItemsType<T = any, P = any> {
  type?: T;
  componentProps?: P;
  /** 内部定义渲染组件使用，可覆盖 */
  component?: React.ReactElement;
}

export interface FormItemsTypeDefine {
  input: BaseItemsType<'input', InputProps>;
  button: BaseItemsType<'button', ButtonProps>;
  password: BaseItemsType<'password', PasswordProps>;
}

// type 做可为空处理
export type FormItemsType = {
  [P in keyof FormItemsTypeDefine]?: FormItemsTypeDefine[P];
};

export const itemsType: FormItemsType = {
  input: { component: <Input /> },
  button: { component: <Button /> },
  password: { component: <Input.Password /> },
};
