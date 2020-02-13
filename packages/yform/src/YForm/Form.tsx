import { Form, Spin } from 'antd';
import React, { useRef } from 'react';
import { merge } from 'lodash';

import { FormProps } from 'antd/lib/form';
import baseItemsType, { YFormItemsType } from './ItemsType';
import Items, { FormatFieldsValue, YFormItemProps } from './Items';
import { YFormContext } from './Context';

import { onFormatFieldsValue, submitFormatValues } from './utils';

export type YFormPluginsType = {
  placeholder?: boolean;
  required?: boolean;
  disabled?: boolean;
  labelLayout?: boolean;
  noLabelLayout?: boolean;
};

export type KeyValue = { [key: string]: any };
export type FieldsType<T> = { [K in keyof T]: string };

export interface YFormConfig {
  itemsType?: YFormItemsType;
}
let globalConfig: YFormConfig = {};

export const Config = (options: YFormConfig) => {
  globalConfig = merge({}, globalConfig, options);
};

export function useFormatFieldsValue<T = any>() {
  const formatFieldsValue = useRef([]);
  return {
    onFormatFieldsValue: onFormatFieldsValue<T>(formatFieldsValue.current),
    formatFieldsValue: formatFieldsValue.current,
  };
}

export interface YFormProps extends FormProps {
  isShow?: boolean;
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;
  plugins?: YFormPluginsType | boolean;
  itemsType?: YFormItemsType;
  formatFieldsValue?: FormatFieldsValue[];
  children?: YFormItemProps['children'];
  onSave?: (values: { [key: string]: any }) => void;
  onFinishCallBack?: (values: { [key: string]: any }) => void;
}

const InternalForm = (props: YFormProps) => {
  const {
    disabled,
    required,
    loading,
    itemsType,
    children,
    onFinish,
    onSave,
    formatFieldsValue,
    onFinishCallBack,
    ...rest
  } = props;

  const [form] = Form.useForm();

  const _itemsTypeAll = {
    ...baseItemsType,
    ...itemsType,
    ...globalConfig.itemsType,
  } as YFormItemsType;

  const handleFormatFieldsValue = value => submitFormatValues(value, formatFieldsValue);
  const _props = {
    plugins: true,
    form,
    ...props,
    itemsType: _itemsTypeAll,
    onSave,
    formatFieldsValue,
  };
  if ('isShow' in props && !props.isShow) {
    return null;
  }
  if (loading) {
    return (
      <div className="form-spin">
        <Spin />
      </div>
    );
  }
  const handleOnFinish = async (value: KeyValue) => {
    if (onFinish) {
      if (formatFieldsValue) {
        await onFinish(handleFormatFieldsValue(value));
      } else {
        await onFinish(value);
      }
      // TOD 这里写提交成功后的 goBack 方法集合
      if (onFinishCallBack) {
        onFinishCallBack(value);
      }
    }
  };

  return (
    <Form form={form} {...rest} onFinish={handleOnFinish}>
      <YFormContext.Provider value={_props}>
        <Items>{children}</Items>
      </YFormContext.Provider>
    </Form>
  );
};

export default InternalForm;
