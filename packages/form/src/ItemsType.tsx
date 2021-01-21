import React from 'react';
import { Input, Button, DatePicker } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { DatePickerProps, RangePickerProps } from 'antd/lib/date-picker';
import { InputProps, PasswordProps } from 'antd/lib/input';

import List, { FormListProps } from './components/list';
import Custom, { CustomProps } from './components/custom';
import Radio, { RadioProps } from './components/radio';
import Space, { SpaceProps } from './components/space';

export interface BaseTypeProps<T = any, P = any> {
  type?: T;
  componentProps?: P;
  /** 内部定义渲染组件使用，可覆盖 */
  component?: React.ReactElement;
}

export interface FormItemsTypeDefine {
  input: BaseTypeProps<'input', InputProps>;
  button: BaseTypeProps<'button', ButtonProps>;
  radio: BaseTypeProps<'radio', RadioProps>;
  password: BaseTypeProps<'password', PasswordProps>;
  datePicker: BaseTypeProps<'datePicker', DatePickerProps>;
  rangePicker: BaseTypeProps<'rangePicker', RangePickerProps>;
  list: BaseTypeProps<'list', FormListProps>;
  custom: BaseTypeProps<'custom', CustomProps>;
  space: BaseTypeProps<'space', SpaceProps>;
}

// type 做可为空处理
export type FormItemsType = {
  [P in keyof FormItemsTypeDefine]?: FormItemsTypeDefine[P];
};

export const itemsType: FormItemsType = {
  input: { component: <Input /> },
  radio: { component: <Radio /> },
  button: { component: <Button /> },
  password: { component: <Input.Password /> },
  rangePicker: { component: <DatePicker.RangePicker /> },
  datePicker: { component: <DatePicker /> },
  list: { component: <List name={undefined} children={undefined} /> },
  custom: { component: <Custom /> },
  space: { component: <Space /> },
};
