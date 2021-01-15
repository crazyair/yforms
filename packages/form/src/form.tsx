import React from 'react';
import { Form as AntdForm } from 'antd';
import { FormInstance, FormItemProps, FormProps as AntdFormProps } from 'antd/lib/form';
import { FormItemsType, FormItemsTypeDefine, itemsType as baseItemsType } from './itemsType';
import { merge } from 'lodash';
import { FormContext } from './Context';
import { useRenderChildren } from './children';

export interface FormatFieldsValue<Values = any> {
  name: FormItemProps['name'];
  omitField?: boolean;
  format?: (thisValue: any, values: Values) => unknown;
}

export interface FormItemsTypeProps<Values = any> extends FormItemProps {
  isShow?: boolean | ((values: Values) => boolean | undefined);
  deFormat?: (thisValue: any, values: Values) => unknown;
  format?: (thisValue: any, values: Values) => unknown;
}

export type ItemsType<Values = any> = FormItemsTypeDefine[keyof FormItemsTypeDefine] &
  FormItemsTypeProps<Values>;

export interface FormConfig {
  itemsType?: FormItemsType;
}

type childrenType<Values> = ItemsType<Values> | ItemsType<Values>[];

export interface FormProps<Values = any> extends FormConfig, AntdFormProps<Values> {
  children?: childrenType<Values> | childrenType<Values>[];
}

// 全局默认值
let globalConfig: FormConfig = {};

export const config = (options: FormConfig) => {
  globalConfig = merge({}, globalConfig, options);
};

const InternalForm: React.ForwardRefRenderFunction<unknown, FormProps> = (props, ref) => {
  const { children, form, itemsType: thisItemsType, initialValues, ...rest } = props;
  const [wrapForm] = AntdForm.useForm(form);
  // 合并全部 type
  const itemsType = { ...baseItemsType, ...globalConfig.itemsType, ...thisItemsType };

  // 返回 form 实例
  React.useImperativeHandle(ref, () => wrapForm);

  // dom 渲染后的 children
  const { dom, formatValues } = useRenderChildren({ ...props, itemsType });

  const formProps = {
    form: wrapForm,
    // 格式化后的初始值
    initialValues: merge({}, initialValues, formatValues),
    ...rest,
  };

  return (
    <AntdForm {...formProps}>
      <FormContext.Provider value={{ ...formProps, itemsType }}>{dom}</FormContext.Provider>
    </AntdForm>
  );
};

const Form = React.forwardRef<FormInstance, FormProps>(InternalForm) as <Values = any>(
  props: FormProps<Values> & { ref?: React.Ref<FormInstance<Values>> },
) => React.ReactElement;

export default Form;
