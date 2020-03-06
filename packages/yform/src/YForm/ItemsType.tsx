import React from 'react';
import { Input, Checkbox, Switch, Button } from 'antd';
import { get, isEqual, isArray } from 'lodash';
import { TextProps } from 'antd/lib/typography/Text';
import { InputProps, PasswordProps } from 'antd/lib/input';
import { SwitchProps } from 'antd/lib/switch';
import { ButtonProps } from 'antd/lib/button';
import { CheckboxProps } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

import { YFormProps } from './Form';
import { YFormItemProps, YFormItemsProps } from './Items';
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

interface YFormFieldBaseProps<T = any> {
  component?: React.ReactElement;
  formItemProps?: YFormItemProps;
  render?: (p?: T) => React.ReactElement;
  formatStr?: string;
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
  // antd 组件
  button: { componentProps?: ButtonProps };
  // 功能类型
  oneLine: { componentProps?: YFormOneLineComponentProps; items?: YFormOneLineProps['items'] };
  list: { componentProps?: YFormListComponentProps; items?: YFormListProps['items'] };
  custom: { componentProps?: any; component?: React.ReactElement };
  submit: { componentProps?: YFormSubmitProps };
  secureButton: { componentProps?: YFormSecureButtonProps };
}

export type YFormItemsType<T = YFormFieldBaseProps> = {
  [P in keyof YFormItemsTypeDefine]?: { type?: P } & YFormItemsTypeDefine[P] & T;
};

export type YFormItemsTypeArray<T> = YFormItemsType<T>[keyof YFormItemsType];

const showOldDom = (dom: React.ReactNode, extra: React.ReactNode) => {
  let pl = {};
  // 文本需要左右加点宽度
  if (typeof dom === 'string') {
    pl = { paddingLeft: '1px' };
  }
  if (isArray(dom) && (dom as []).length === 0) {
    dom = undefined;
  }
  return (
    <div>
      {extra}
      <div style={{ background: '#fbe9eb', wordBreak: 'break-word', padding: '1px', ...pl }}>
        {dom || '-/-'}
      </div>
    </div>
  );
};

export const demoModify = (
  fProps: YFormItemProps,
  cProps: any,
  allProps: YFormItemsProps,
): [YFormItemProps, YTextAreaProps] => {
  const _fProps = { ...fProps };
  const _cProps = { ...cProps };
  const { name } = _fProps;
  const { oldInitialValues, initialValues } = allProps;
  if (!isEqual(get(oldInitialValues, name), get(initialValues, name))) {
    _fProps.extra = showOldDom(
      // <Input disabled value={get(oldInitialValues, name)} />,
      get(oldInitialValues, name),
      _fProps.extra,
    );
  }

  return [_fProps, _cProps];
};

export const itemsType: YFormItemsType = {
  input: { component: <Input />, formatStr: '请输入${label}', modifyProps: demoModify },
  password: { component: <Input.Password />, formatStr: '请输入${label}' },
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
  submit: { component: <Submit />, modifyProps: submitModify },
  secureButton: { component: <SecureButton /> },
};

export default itemsType;
