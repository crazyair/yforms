import React from 'react';
import { Input, Checkbox, Switch, Button } from 'antd';
import { TextProps } from 'antd/lib/typography/Text';
import { InputProps, PasswordProps } from 'antd/lib/input';
import { SwitchProps } from 'antd/lib/switch';
import { ButtonProps } from 'antd/lib/button';
import { CheckboxProps } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

import { YFormProps } from './Form';
import { YFormItemProps } from './Items';
import { searchSelect } from './utils';

import CustomTypography from './component/Typography';
import OneLine, {
  oneLineModify,
  YFormOneLineComponentProps,
  YFormOneLineProps,
} from './component/OneLine';
import Radio, { YRadioProps } from './component/Radio';
import List, { YFormListComponentProps, YFormListProps } from './component/List';
import CheckboxGroup, { YCheckGroupProps } from './component/CheckboxGroup';
import Select, { YSelectProps } from './component/Select';
import TextArea, { YTextAreaProps, textModify } from './component/TextArea';
import Money, { YMoneyProps } from './component/Money';
import Submit, { YFormSubmitProps, submitModify } from './component/Submit';
import SecureButton, { YFormSecureButtonProps } from './component/SecureButton';

export interface YFormFieldBaseProps<T = any> {
  component?: React.ReactElement;
  formItemProps?: YFormItemProps;
  formatStr?: string;
  useFormItem?: boolean;
  modifyProps?: (
    formItemProps: YFormItemProps,
    componentProps: T,
    formProps: YFormProps,
  ) => [YFormItemProps, T];
}

export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
}

export type stringAndFunc<T> = string | ((record: T, index: number) => React.ReactNode);

export interface OptionsProps<T = any> {
  options?: {
    id?: React.ReactNode;
    name?: CheckboxValueType;
    disabled?: boolean;
  }[];
  postField?: stringAndFunc<T>;
  showField?: stringAndFunc<T>;
  renderOption?: (item: any) => any;
  onAddProps?: (item: T, index: number) => { disabled?: boolean; [key: string]: React.ReactNode };
}

export interface YFormItemsTypeDefine {
  // 字段类型
  input: { componentProps?: InputProps };
  password: { componentProps?: PasswordProps };
  textarea: { componentProps?: YTextAreaProps };
  money: { componentProps?: YMoneyProps };
  checkbox: { componentProps?: CheckboxProps };
  switch: { componentProps?: SwitchProps };
  checkboxGroup: { componentProps?: YCheckGroupProps };
  select: { componentProps?: YSelectProps };
  radio: { componentProps?: YRadioProps };
  text: { componentProps?: TextProps };
  // 展示类型
  button: { componentProps?: ButtonProps };
  // 其它功能类型
  oneLine: { componentProps?: YFormOneLineComponentProps; items?: YFormOneLineProps['items'] };
  list: { componentProps?: YFormListComponentProps; items?: YFormListProps['items'] };
  custom: { componentProps?: any; component?: React.ReactElement };
  submit: { componentProps?: YFormSubmitProps };
  secureButton: { componentProps?: YFormSecureButtonProps };
}

export type YFormItemsType<T = YFormFieldBaseProps> = {
  [P in keyof YFormItemsTypeDefine]?: { type?: P } & YFormItemsTypeDefine[P] & T;
};

const checkboxProps: YFormFieldBaseProps<CheckboxProps>['modifyProps'] = (fProps, cProps) => {
  return [{ valuePropName: 'checked', ...fProps }, cProps];
};
const switchProps: YFormFieldBaseProps<SwitchProps>['modifyProps'] = (fProps, cProps) => {
  return [{ valuePropName: 'checked', ...fProps }, cProps];
};

export type YFormItemsTypeArray<T> = YFormItemsType<T>[keyof YFormItemsType];

export const itemsType: YFormItemsType = {
  input: { component: <Input />, formatStr: '请输入${label}' },
  password: { component: <Input.Password />, formatStr: '请输入${label}' },
  textarea: { component: <TextArea />, formatStr: '请输入${label}', modifyProps: textModify },
  money: { component: <Money />, formatStr: '请输入${label}' },
  checkbox: { component: <Checkbox />, formatStr: '请选择${label}', modifyProps: checkboxProps },
  switch: { component: <Switch />, formatStr: '请选择${label}', modifyProps: switchProps },
  checkboxGroup: { component: <CheckboxGroup />, formatStr: '请选择${label}' },
  radio: { component: <Radio />, formatStr: '请选择${label}' },
  select: { component: <Select {...searchSelect} />, formatStr: '请选择${label}' },
  text: { component: <CustomTypography /> },
  oneLine: { component: <OneLine />, modifyProps: oneLineModify },
  list: { component: <List />, useFormItem: false },
  button: { component: <Button /> },
  custom: { formatStr: '请输入${label}' },
  submit: { component: <Submit />, useFormItem: false, modifyProps: submitModify },
  secureButton: { component: <SecureButton /> },
};

export default itemsType;
