import React, { useCallback, useRef } from 'react';
import { Form as AntdForm, Spin } from 'antd';
import {
  FormInstance,
  FormItemProps as AntdFormItemProps,
  FormProps as AntdFormProps,
} from 'antd/lib/form';
import { FormItemsType, FormItemsTypeDefine, itemsType as baseItemsType } from './itemsType';
import { plugins as basePlugins } from './plugins';
import { find, forEach, get, isArray, merge, omit, set, sortBy } from 'lodash';
import { FormContext } from './context';
import Items from './items';
import { mergeWithDom, submitFormatValues } from './utils';
import { FormPluginsType } from './plugins';
import { FormItemProps } from './item';

export interface FormatFieldsValue<Values = any> {
  name: AntdFormItemProps['name'];
  removeField?: boolean;
  format?: (thisValue: any, values: Values) => unknown;
}

export type ItemsType<Values = any> = FormItemsTypeDefine[keyof FormItemsTypeDefine] &
  FormItemProps<Values>;

export interface FormConfig {
  itemsType?: FormItemsType;
  plugins?: FormPluginsType;
}

export interface FormProps<Values = any> extends AntdFormProps<Values> {
  children?: FormItemProps['children'];
  loading?: boolean;
  // 默认配置
  config?: FormConfig;
  // 插件
  plugins?: FormConfig['plugins'];
}

// 全局默认值
let globalConfig: FormConfig = {};

export const config = (options: FormConfig) => {
  globalConfig = merge({}, globalConfig, options);
};

const InternalForm: React.ForwardRefRenderFunction<unknown, FormProps> = (props, ref) => {
  const { children, form, config = {}, initialValues, loading, plugins, onFinish, ...rest } = props;

  const { itemsType: thisItemsType, plugins: thisPlugins } = config;
  // 全部 type
  const allItemsType = mergeWithDom({}, baseItemsType, globalConfig.itemsType, thisItemsType);
  // 全部插件
  const allPlugins = mergeWithDom({}, basePlugins, globalConfig.plugins, thisPlugins);

  // 获取 form 实例
  const [wrapForm] = AntdForm.useForm(form);
  // 返回 form 实例
  React.useImperativeHandle(ref, () => wrapForm);

  const handleOnFinish = useCallback(
    (values) => {
      if (onFinish) onFinish(values);
    },
    [onFinish],
  );

  // 存储初始格式花值
  const initFormatRef = useRef([]);
  // 存储提交格式化值
  const formatListRef = useRef([]);

  const onFormat = useCallback((data) => {
    const { name } = data;
    if (!find(formatListRef.current, { name })) {
      formatListRef.current.push(data);
    }
  }, []);

  const handleFormatFieldsValue = useCallback((value) => {
    const _value = { ...value };
    // 根据 name 长度倒序排序，先格式化内层值，再格式化外层值
    const _list = sortBy(formatListRef.current, (item) => {
      if (isArray(item.name)) {
        return -item.name.length;
      }
      return -`${item.name}`.length;
    });
    // 忽略字段
    const omitNames = [];
    forEach(_list, (item) => {
      if (item.removeField) omitNames.push(item.name);
    });
    const formatValues = submitFormatValues(_value, _list);
    return omit(formatValues, omitNames);
  }, []);

  if (loading) {
    return (
      <div className="form-spin">
        <Spin />
      </div>
    );
  }

  // 此时 initialValues 有值
  const _initialValues = merge({}, initialValues);
  const onInitFormat = (data) => {
    const { name, format } = data;
    const value = format(get(initialValues, name), initialValues);
    if (!find(initFormatRef.current, { name })) {
      if (value !== undefined) {
        set(_initialValues, name, value);
        wrapForm.setFields([{ name, value }]);
        initFormatRef.current.push({ name, value });
      }
    }
  };

  const formProps = {
    form: wrapForm,
    // 格式化后的初始值
    initialValues: _initialValues,
    onFinish: (values) => handleOnFinish(handleFormatFieldsValue(values)),
    ...rest,
  };
  return (
    <AntdForm {...formProps}>
      <FormContext.Provider
        value={{
          onInitFormat,
          onFormat,
          config: { plugins: allPlugins, itemsType: allItemsType },
        }}
      >
        <Items>{children}</Items>
      </FormContext.Provider>
    </AntdForm>
  );
};

const Form = React.forwardRef<FormInstance, FormProps>(InternalForm) as <Values = any>(
  props: FormProps<Values> & { ref?: React.Ref<FormInstance<Values>> },
) => React.ReactElement;

export default Form;
