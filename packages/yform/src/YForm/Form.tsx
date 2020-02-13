import { Form, Spin } from 'antd';
import React, { useRef, useEffect } from 'react';
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
  submit?: {
    // onFinishCallBack?: (values: { [key: string]: any }) => void;
    onFinishCallBack?: (loading?: boolean) => void;
    submitLoading?: boolean;
  };
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
    submit,
    ...rest
  } = props;

  const timeOut = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeOut.current) {
        clearTimeout(timeOut.current);
      }
    };
  }, []);

  const {
    onFinishCallBack = () => {},
    submitLoading,
    // onFinishStart, onFinishEnd
  } = submit || {};

  const [form] = Form.useForm();

  const _itemsTypeAll = {
    ...baseItemsType,
    ...itemsType,
    ...globalConfig.itemsType,
  } as YFormItemsType;

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
      // 请求为结果返回
      if (submitLoading) return;
      const begin = new Date().getTime();
      onFinishCallBack(true);
      try {
        await onFinish(formatFieldsValue ? submitFormatValues(value, formatFieldsValue) : value);
        const end = new Date().getTime();
        if (end - begin > 500) {
          onFinishCallBack(false);
        } else {
          timeOut.current = window.setTimeout(() => {
            onFinishCallBack(false);
          }, 500);
        }
      } catch (error) {
        onFinishCallBack(false);
      }

      // try {
      //   await onFinish(formatFieldsValue ? submitFormatValues(value, formatFieldsValue) : value);
      // } catch (error) {
      //   onFinishCallBack && onFinishCallBack(error);
      // }
    }
  };

  const _props = {
    plugins: true,
    form,
    ...props,
    itemsType: _itemsTypeAll,
    onSave,
    formatFieldsValue,
    // onFinish: handleOnFinish,
    onFinish,
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
