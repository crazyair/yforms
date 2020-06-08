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
import OneLine, { YFormOneLineComponentProps, YFormOneLineProps } from './component/OneLine';
import Radio, { YRadioProps } from './component/Radio';
import List, { YFormListComponentProps, YFormListProps } from './component/List';
import CheckboxGroup, { YCheckGroupProps } from './component/CheckboxGroup';
import Select, { YSelectProps } from './component/Select';
import TextArea, { YTextAreaProps } from './component/TextArea';
import Money, { YMoneyProps } from './component/Money';
import Submit, { YFormSubmitProps } from './component/Submit';
import SecureButton, { YFormSecureButtonProps } from './component/SecureButton';
import { YFormProps, YFormConfig } from './Form';
import ComponentView from './component/ComponentView';
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
} from './ItemsTypeModify';
import Space, { YFormSpaceComponentProps, YFormSpaceProps } from './component/Space';

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
  componentView?: React.ReactElement;
  viewProps?: { format?: (value: any, pureValue?: boolean) => React.ReactNode };
  diffProps?: any;
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
  view: { componentProps?: any };
  datePicker: { componentProps?: DatePickerProps };
  rangePicker: { componentProps?: RangePickerProps };
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
  space: { componentProps?: YFormSpaceComponentProps; items?: YFormSpaceProps['items'] };
  list: {
    componentProps?: YFormListComponentProps;
    disabled?: boolean;
    items?: YFormListProps['items'];
    // 用于 diff 状态下处理数据
    addonBefore?: React.ReactNode;
  };
  custom: { componentProps?: any; component?: React.ReactNode };
  submit: { componentProps?: YFormSubmitProps };
  secureButton: { componentProps?: YFormSecureButtonProps };
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
  radio: { component: <Radio />, modifyProps: radioModify },
  select: {
    component: <Select {...searchSelect} />,
    formatStr: '请选择${label}',
    modifyProps: selectModify,
  },
  // 工具类
  oneLine: { component: <OneLine />, modifyProps: oneLineModify },
  list: { component: <List />, hasFormItem: false },
  button: { component: <Button /> },
  secureButton: { component: <SecureButton /> },
  submit: { component: <Submit />, hasFormItem: false, modifyProps: submitModify },
  // 展示类
  custom: {},
  view: { component: <ComponentView /> },
  space: { component: <Space />, modifyProps: SpaceModify },
};

export default itemsType;
