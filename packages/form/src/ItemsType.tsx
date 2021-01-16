import { Input, Button, DatePicker } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { RangePickerProps } from 'antd/lib/date-picker';

import { InputProps, PasswordProps } from 'antd/lib/input';

export interface BaseTypeProps<T = any, P = any> {
  type?: T;
  componentProps?: P;
  /** 内部定义渲染组件使用，可覆盖 */
  component?: React.ReactElement;
}

export interface FormItemsTypeDefine {
  input: BaseTypeProps<'input', InputProps>;
  button: BaseTypeProps<'button', ButtonProps>;
  password: BaseTypeProps<'password', PasswordProps>;
  rangePicker: BaseTypeProps<'rangePicker', RangePickerProps>;
}

// type 做可为空处理
export type FormItemsType = {
  [P in keyof FormItemsTypeDefine]?: FormItemsTypeDefine[P];
};

export const itemsType: FormItemsType = {
  input: { component: <Input /> },
  button: { component: <Button /> },
  password: { component: <Input.Password /> },
  rangePicker: { component: <DatePicker.RangePicker /> },
};
