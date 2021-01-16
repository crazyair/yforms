import { Input, Button, DatePicker } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { RangePickerProps } from 'antd/lib/date-picker';
// TODO 使用 ConfigProvider 无法设置到 DatePicker
import locale from 'antd/es/date-picker/locale/zh_CN';
import { InputProps, PasswordProps } from 'antd/lib/input';

import List, { FormListProps } from './components/list';

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
  list: BaseTypeProps<'list', FormListProps>;
}

// type 做可为空处理
export type FormItemsType = {
  [P in keyof FormItemsTypeDefine]?: FormItemsTypeDefine[P];
};

export const itemsType: FormItemsType = {
  input: { component: <Input /> },
  button: { component: <Button /> },
  password: { component: <Input.Password /> },
  rangePicker: { component: <DatePicker.RangePicker locale={locale} /> },
  list: { component: <List /> },
};
