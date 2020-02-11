import React from 'react';
import { Input, Checkbox, Switch, Button } from 'antd';
import { InputProps } from 'antd/lib/input';
import { CheckboxProps } from 'antd/lib/checkbox';
import { TextProps } from 'antd/lib/typography/Text';
import { ButtonProps } from 'antd/lib/button';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { SwitchProps } from 'antd/lib/switch';

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
import { searchSelect } from './utils';
import TextArea, { YTextAreaProps, textModify } from './component/TextArea';
import Money, { YMoneyProps } from './component/Money';
import { YFormItemProps } from './Items';

interface YFormFieldBaseProps<T = any> {
  component?: React.ReactElement;
  formItemProps?: YFormItemProps;
  render?: (p?: T) => React.ReactElement;
  formatStr?: string;
  modifyProps?: (fProps: YFormItemProps, cProps: T) => [YFormItemProps, T];
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
  textarea: { componentProps?: YTextAreaProps };
  money: { componentProps?: YMoneyProps };
  checkbox: { componentProps?: CheckboxProps };
  switch: { componentProps?: SwitchProps };
  checkboxGroup: { componentProps?: YCheckGroupProps };
  select: { componentProps?: YSelectProps };
  radio: { componentProps?: YRadioProps };
  text: { componentProps?: TextProps };
  // antd 组件
  button: { componentProps?: ButtonProps };
  // 功能类型
  oneLine: { componentProps?: YFormOneLineComponentProps; items?: YFormOneLineProps['items'] };
  list: { componentProps?: YFormListComponentProps; items?: YFormListProps['items'] };
  custom: { componentProps?: any; component?: React.ReactElement };
}

export type YFormItemsType<T = YFormFieldBaseProps> = {
  [P in keyof YFormItemsTypeDefine]?: { type?: P } & YFormItemsTypeDefine[P] & T;
};

export type YFormItemsTypeArray<T> = YFormItemsType<T>[keyof YFormItemsType];

export const itemsType: YFormItemsType = {
  input: { component: <Input />, formatStr: '请输入${label}' },
  textarea: { component: <TextArea />, formatStr: '请输入${label}', modifyProps: textModify },
  money: { component: <Money />, formatStr: '请输入${label}' },
  checkbox: {
    component: <Checkbox />,
    formatStr: '请选择${label}',
    modifyProps: (
      fProps: YFormItemProps,
      cProps: CheckboxProps,
    ): [YFormItemProps, CheckboxProps] => [{ valuePropName: 'checked', ...fProps }, cProps],
  },
  switch: {
    component: <Switch />,
    formatStr: '请选择${label}',
    modifyProps: (fProps: YFormItemProps, cProps: SwitchProps): [YFormItemProps, SwitchProps] => [
      { valuePropName: 'checked', ...fProps },
      cProps,
    ],
  },
  checkboxGroup: { component: <CheckboxGroup />, formatStr: '请选择${label}' },
  radio: { component: <Radio />, formatStr: '请选择${label}' },
  select: { component: <Select {...searchSelect} />, formatStr: '请选择${label}' },
  text: { component: <CustomTypography /> },
  oneLine: { component: <OneLine />, modifyProps: oneLineModify },
  list: { component: <List />, formItemProps: { noStyle: true, rules: [{ required: false }] } },
  button: { component: <Button /> },
  custom: { formatStr: '请输入${label}' },
};

export default itemsType;
