import React, { useCallback, useRef } from 'react';
import { Form as AntdForm, Spin } from 'antd';
import { FormInstance, FormItemProps, FormProps as AntdFormProps } from 'antd/lib/form';
import { FormItemsType, FormItemsTypeDefine, itemsType as baseItemsType } from './itemsType';
import { forEach, merge, omit } from 'lodash';
import { FormContext } from './Context';
import Items from './items';
import { eachChildren, submitFormatValues } from './utils';

export interface FormatFieldsValue<Values = any> {
  name: FormItemProps['name'];
  removeField?: boolean;
  format?: (thisValue: any, values: Values) => unknown;
}

export interface FormItemsTypeProps<Values = any> extends FormItemProps {
  isShow?: boolean | ((values: Values) => boolean | undefined);
  initFormat?: FormatFieldsValue['format'];
  format?: FormatFieldsValue['format'] | FormatFieldsValue[];
}

export type ItemsType<Values = any> = FormItemsTypeDefine[keyof FormItemsTypeDefine] &
  FormItemsTypeProps<Values>;

export interface FormConfig {
  itemsType?: FormItemsType;
}

type childrenType<Values> = ItemsType<Values> | ItemsType<Values>[];

export interface FormProps<Values = any> extends FormConfig, AntdFormProps<Values> {
  children?: childrenType<Values> | childrenType<Values>[];
  loading?: boolean;
}

// 全局默认值
let globalConfig: FormConfig = {};

export const config = (options: FormConfig) => {
  globalConfig = merge({}, globalConfig, options);
};

const InternalForm: React.ForwardRefRenderFunction<unknown, FormProps> = (props, ref) => {
  const {
    children,
    form,
    itemsType: thisItemsType,
    initialValues,
    loading,
    onFinish,
    ...rest
  } = props;
  // 合并全部 type
  const itemsType = { ...baseItemsType, ...globalConfig.itemsType, ...thisItemsType };
  // 获取 form 实例
  const [wrapForm] = AntdForm.useForm(form);
  // 返回 form 实例
  React.useImperativeHandle(ref, () => wrapForm);

  const initRef = useRef<Record<string, any>>();
  const handleInitFormat = useCallback((children, initialValues) => {
    initRef.current = eachChildren({ children, initialValues });
    return initRef.current;
  }, []);

  const handleOnFinish = useCallback(
    (values) => {
      if (onFinish) {
        onFinish(values);
      }
    },
    [onFinish],
  );

  if (loading) {
    return (
      <div className="form-spin">
        <Spin />
      </div>
    );
  }
  // 此时 initialValues 有值
  const { formatValues, formatList } = initRef.current || handleInitFormat(children, initialValues);

  const handleFormatFieldsValue = (value) => {
    const _value = { ...value };
    // 忽略字段
    const omitNames = [];
    forEach(formatList, (item) => {
      if (item.removeField) omitNames.push(item.name);
    });
    const formatValues = { ...submitFormatValues(_value, formatList) };
    return omit(formatValues, omitNames);
  };

  const formProps = {
    form: wrapForm,
    // 格式化后的初始值
    initialValues: formatValues,
    onFinish: (values) => handleOnFinish(handleFormatFieldsValue(values)),
    ...rest,
  };
  return (
    <AntdForm {...formProps}>
      <FormContext.Provider value={{ itemsType }}>
        <Items>{children}</Items>
      </FormContext.Provider>
    </AntdForm>
  );
};

const Form = React.forwardRef<FormInstance, FormProps>(InternalForm) as <Values = any>(
  props: FormProps<Values> & { ref?: React.Ref<FormInstance<Values>> },
) => React.ReactElement;

export default Form;
