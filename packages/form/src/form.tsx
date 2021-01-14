import React from 'react';
import { Form as AntdForm } from 'antd';
import { FormInstance, FormProps as AntdFormProps } from 'antd/lib/form';
import Items from './items';
import { FormItemsType } from './ItemsType';

export type childrenType = FormItemsType | FormItemsType[];

export interface FormProps<Values = any> extends Omit<AntdFormProps<Values>, 'children'> {
  children?: childrenType | childrenType[];
}

const InternalForm: React.ForwardRefRenderFunction<unknown, FormProps> = (props, ref) => {
  const { children, form, ...rest } = props;

  const [wrapForm] = AntdForm.useForm(form);

  React.useImperativeHandle(ref, () => wrapForm);

  return (
    <AntdForm form={wrapForm} {...rest}>
      <Items>{children}</Items>
    </AntdForm>
  );
};

const Form = React.forwardRef<FormInstance, FormProps>(InternalForm) as <Values = any>(
  props: FormProps<Values> & { ref?: React.Ref<FormInstance<Values>> },
) => React.ReactElement;

export default Form;
