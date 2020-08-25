import React from 'react';
import { Input, Checkbox, Switch, Button, DatePicker } from 'antd';
import { TextProps } from 'antd/lib/typography/Text';
import { InputProps, PasswordProps } from 'antd/lib/input';
import { SwitchProps } from 'antd/lib/switch';
import { ButtonProps } from 'antd/lib/button';
import { CheckboxProps } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { DatePickerProps, RangePickerProps } from 'antd/lib/date-picker';

import { YFormItemProps, YFormItemsProps } from './Items';
import { searchSelect } from './utils';
import CustomTypography from './component/Typography';
import OneLine, { YFormOneLineProps } from './component/OneLine';
import Radio, { YRadioProps } from './component/Radio';
import List, { YFormListProps } from './component/List';
import CheckboxGroup, { YCheckGroupProps } from './component/CheckboxGroup';
import Select, { YSelectProps } from './component/Select';
import TextArea, { YTextAreaProps } from './component/TextArea';
import Money, { YMoneyProps } from './component/Money';
import Submit, { YFormSubmitProps } from './component/Submit';
import SecureButton, { YFormSecureButtonProps } from './component/SecureButton';
import { YFormProps, YFormConfig } from './Form';
import ComponentView, { YFormComponentViewProps } from './component/ComponentView';
import {
  datePickerModify,
  rangePickerModify,
  checkboxModify,
  switchModify,
  textModify,
  oneLineModify,
  submitModify,
  checkboxGroupModify,
  selectModify,
  moneyModify,
  radioModify,
  SpaceModify,
  CustomModify,
} from './ItemsTypeModify';
import Space, { YFormSpaceProps } from './component/Space';
import Card, { YFormCardProps } from './component/Card';

export interface YFormFieldBaseProps<T = any> {
  component?: React.ReactElement;
  type?: string;
  formItemProps?: YFormItemProps;
  formatStr?: string;
  hasFormItem?: boolean;
  scenes?: YFormConfig['scenes'];
  modifyProps?: (
    props: Required<modifyType<T>>,
  ) => Pick<modifyType<T>, 'itemProps' | 'componentProps'>;
  viewProps?: { format?: (value: any, pureValue?: boolean) => React.ReactNode };
  diffProps?: { onEqual?: (value: any, oldValue?: any) => boolean };
}

export type modifyType<T = any> = {
  formProps?: YFormProps;
  itemsProps?: YFormItemsProps;
  itemProps?: YFormItemProps;
  componentProps?: T;
  typeProps?: YFormFieldBaseProps<T>;
};

export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
}

export type stringAndFunc<T> = string | ((record: T, index: number) => React.ReactNode);
export type OptionsType = {
  id?: React.ReactNode;
  name?: CheckboxValueType;
  disabled?: boolean;
  [key: string]: any;
};

export interface OptionsProps<T = any> {
  options?: OptionsType[];
  getOptions?: (value: any, parentValues: any, values: any) => OptionsType[];
  postField?: stringAndFunc<T>;
  showField?: stringAndFunc<T>;
  renderOption?: (item: any) => any;
  onAddProps?: (item: T, index: number) => { disabled?: boolean; [key: string]: React.ReactNode };
}

export interface YFormItemsTypeDefine {
  // antd 类型
  input: { componentProps?: InputProps };
  datePicker: { componentProps?: DatePickerProps };
  rangePicker: { componentProps?: RangePickerProps };
  password: { componentProps?: PasswordProps };
  checkbox: { componentProps?: CheckboxProps };
  switch: { componentProps?: SwitchProps };
  text: { componentProps?: TextProps };
  button: { componentProps?: ButtonProps };
  // 封装类型
  textarea: { componentProps?: YTextAreaProps };
  view: YFormComponentViewProps;
  money: { componentProps?: YMoneyProps };
  checkboxGroup: { componentProps?: YCheckGroupProps };
  select: { componentProps?: YSelectProps };
  radio: { componentProps?: YRadioProps };
  oneLine: YFormOneLineProps;
  card: YFormCardProps;
  space: YFormSpaceProps;
  list: YFormListProps;
  submit: YFormSubmitProps;
  secureButton: YFormSecureButtonProps;
  custom: { componentProps?: any };
}

export type YFormItemsType<T = YFormFieldBaseProps> = {
  [P in keyof YFormItemsTypeDefine]?: { type?: P } & YFormItemsTypeDefine[P] & T;
};

export type YFormItemsTypeArray<T> = YFormItemsType<T>[keyof YFormItemsType];

export const itemsType: YFormItemsType = {
  // 纯文本类
  input: { component: <Input />, formatStr: '请输入${label}' },
  password: { component: <Input.Password />, formatStr: '请输入${label}' },
  textarea: { component: <TextArea />, formatStr: '请输入${label}', modifyProps: textModify },
  money: { component: <Money />, formatStr: '请输入${label}', modifyProps: moneyModify },
  text: { component: <CustomTypography />, formatStr: '请输入${label}' },
  // 日期类
  datePicker: {
    component: <DatePicker />,
    formatStr: '请选择${label}',
    modifyProps: datePickerModify,
  },
  rangePicker: {
    component: <DatePicker.RangePicker />,
    formatStr: '请选择${label}',
    modifyProps: rangePickerModify,
  },
  // 单选复选类
  checkbox: { component: <Checkbox />, formatStr: '请选择${label}', modifyProps: checkboxModify },
  switch: { component: <Switch />, formatStr: '请选择${label}', modifyProps: switchModify },
  checkboxGroup: {
    component: <CheckboxGroup />,
    formatStr: '请选择${label}',
    modifyProps: checkboxGroupModify,
  },
  radio: { component: <Radio />, modifyProps: radioModify, formatStr: '请选择${label}' },
  select: {
    component: <Select {...searchSelect} />,
    formatStr: '请选择${label}',
    modifyProps: selectModify,
  },
  // 工具类
  oneLine: { component: <OneLine />, modifyProps: oneLineModify },
  card: { component: <Card /> },
  list: { component: <List />, hasFormItem: false },
  button: { component: <Button /> },
  secureButton: { component: <SecureButton /> },
  submit: { component: <Submit />, hasFormItem: false, modifyProps: submitModify },
  // 展示类
  custom: { modifyProps: CustomModify },
  view: { component: <ComponentView /> },
  space: { component: <Space />, modifyProps: SpaceModify },
};

export default itemsType;
