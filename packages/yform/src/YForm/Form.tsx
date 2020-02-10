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
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  plugins?: YFormPluginsType | boolean;
  itemsType?: YFormItemsType;
  formatFieldsValue?: FormatFieldsValue[];
  children?: YFormItemProps['children'];
}

const InternalForm = (props: YFormProps) => {
  const {
    disabled,
    required,
    loading,
    itemsType,
    children,
    onFinish,
    formatFieldsValue,
    ...rest
  } = props;

  const _itemsTypeAll = {
    ...baseItemsType,
    ...itemsType,
    ...globalConfig.itemsType,
  } as YFormItemsType;
  const _props = { plugins: true, ...props, itemsType: _itemsTypeAll };
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
  const handleOnFinish = (value: KeyValue) => {
    if (onFinish) {
      if (formatFieldsValue) {
        onFinish(submitFormatValues(value, formatFieldsValue));
      } else {
        onFinish(value);
      }
    }
  };

  return (
    <Form {...rest} onFinish={handleOnFinish}>
      <YFormContext.Provider value={_props}>
        <Items>{children}</Items>
      </YFormContext.Provider>
    </Form>
  );
};

export default InternalForm;
