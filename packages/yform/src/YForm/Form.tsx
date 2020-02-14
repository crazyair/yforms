import { Form, Spin } from 'antd';
import React, { useRef, useEffect } from 'react';
import { merge } from 'lodash';

import { FormProps } from 'antd/lib/form';
import baseItemsType, { YFormItemsType } from './ItemsType';
import Items, { FormatFieldsValue, YFormItemProps } from './Items';
import { YFormContext } from './Context';

import { onFormatFieldsValue, submitFormatValues } from './utils';
import { YFormUseSubmitReturnProps } from './useSubmit';

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
  submit?: YFormUseSubmitReturnProps['submit'];
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

  const { onFinishLoading, submitLoading, onFinishCallback } = submit || {};

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
      // 防连点
      if (submitLoading) return;
      const begin = new Date().getTime();
      onFinishLoading && onFinishLoading(true);
      try {
        await onFinish(formatFieldsValue ? submitFormatValues(value, formatFieldsValue) : value);
        const end = new Date().getTime();
        timeOut.current = window.setTimeout(
          () => {
            onFinishLoading && onFinishLoading(false);
            onFinishCallback && onFinishCallback();
          },
          // loading 时间不到 0.5s 的加载 0.5s，超过的立刻结束。
          end - begin > 500 ? 0 : 500,
        );
      } catch (error) {
        onFinishLoading && onFinishLoading(false);
      }
    }
  };

  const _props = {
    plugins: true,
    form,
    ...props,
    itemsType: _itemsTypeAll,
    onSave,
    formatFieldsValue,
    submit,
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
