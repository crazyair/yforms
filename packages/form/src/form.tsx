import React from 'react';
import { Form as AntdForm } from 'antd';
import { FormInstance, FormItemProps, FormProps as AntdFormProps } from 'antd/lib/form';
import Items from './items';
import { FormItemsType, FormItemsTypeDefine, itemsType as baseItemsType } from './itemsType';
import { merge } from 'lodash';
import { FormContext } from './Context';

export interface FormItemsTypeProps<Values = any> extends Omit<FormItemProps, 'children'> {
  isShow?: boolean | ((values: Values) => boolean | undefined);
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
  const { children, form, itemsType, ...rest } = props;

  const itemsTypeAll = { ...baseItemsType, ...globalConfig.itemsType, ...itemsType };

  const [wrapForm] = AntdForm.useForm(form);

  React.useImperativeHandle(ref, () => wrapForm);

  return (
    <AntdForm form={wrapForm} {...rest}>
      <FormContext.Provider value={{ itemsType: itemsTypeAll }}>
        <Items>{children}</Items>
      </FormContext.Provider>
    </AntdForm>
  );
};

const Form = React.forwardRef<FormInstance, FormProps>(InternalForm) as <Values = any>(
  props: FormProps<Values> & { ref?: React.Ref<FormInstance<Values>> },
) => React.ReactElement;

export default Form;
