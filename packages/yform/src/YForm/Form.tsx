import { Form, Spin } from 'antd';
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { merge } from 'lodash';
import classNames from 'classnames';

import { FormProps } from 'antd/lib/form';
import baseItemsType, { YFormItemsType, YFormFieldBaseProps, modifyType } from './ItemsType';
import Items, { FormatFieldsValue, YFormItemProps } from './Items';
import { YFormContext } from './Context';

import { onFormatFieldsValue, submitFormatValues, paramsType } from './utils';
import { YFormSubmitProps } from './component/Submit';

type pluginsType = boolean | YFormFieldBaseProps['modifyProps'];

export type YFormPluginsType = {
  placeholder?: pluginsType;
  required?: pluginsType;
  disabled?: pluginsType;
  labelLayout?: pluginsType;
  noLabelLayout?: pluginsType;
};

export type KeyValue = { [key: string]: any };
export type FieldsType<T> = { [K in keyof T]: string };

export interface YFormConfig {
  itemsType?: YFormItemsType;
  plugins?: YFormPluginsType | boolean;
  getScene?: {
    [key: string]: {
      form?: (
        props: Required<Pick<modifyType, 'formProps'>>,
      ) => Pick<modifyType, 'formProps' | 'plugins'>;
      items?: (
        props: Required<Pick<modifyType, 'itemsProps'>>,
      ) => Pick<modifyType, 'itemsProps' | 'plugins'>;
      item?: (props: Required<modifyType>) => Pick<modifyType, 'itemProps' | 'componentProps'>;
    };
  };
}
let globalConfig: YFormConfig = { plugins: true };

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

export interface ParamsType {
  id?: string;
  type?: 'create' | 'edit' | 'view';
}

export interface ParamsObjType {
  create?: boolean;
  edit?: boolean;
  view?: boolean;
  id?: string;
  typeName?: string;
}

export interface YFormProps extends FormProps, YFormConfig {
  isShow?: boolean;
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;
  formatFieldsValue?: FormatFieldsValue[];
  children?: YFormItemProps['children'];
  onSave?: (values: { [key: string]: any }) => void;
  submitComponentProps?: YFormSubmitProps;
  onCancel?: (p: { type: 'onSave' | 'onSubmit' | 'onCancel' }) => void;
  params?: ParamsType;
  scene?: string;
}

const InternalForm = (props: YFormProps) => {
  const { scene, getScene = globalConfig.getScene } = props;
  const _scene = (scene && getScene && getScene[scene]) || {};
  let _props = { ...props };
  if (_scene.form) {
    const data = _scene.form({ formProps: _props });
    if ('formProps' in data) _props = data.formProps;
  }

  const {
    disabled,
    required,
    loading,
    itemsType,
    children,
    onFinish,
    onSave,
    formatFieldsValue,
    onCancel,
    params,
    form: propsForm,
    className,
    plugins,
    ...rest
  } = _props;
  const [form] = Form.useForm(propsForm);
  const { resetFields } = form;
  const _params = paramsType(params);
  const { create, edit, view } = _params;
  const [thisDisabled, setDisabled] = useState(view);
  const [submitLoading, setSubmitLoading] = useState(false);

  const timeOut = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      clearTimeout(timeOut.current);
    };
  }, []);

  const goBack = () => {
    window.history.back();
  };

  const handleReset: YFormProps['onCancel'] = useCallback(
    ({ type }) => {
      if (typeof onCancel === 'function') {
        onCancel({ type });
      } else {
        resetFields();
        if (create) {
          goBack();
        } else if (edit || view) {
          setDisabled(true);
        }
      }
    },
    [create, edit, onCancel, resetFields, view],
  );
  const _itemsTypeAll = {
    ...baseItemsType,
    ...itemsType,
    ...globalConfig.itemsType,
  } as YFormItemsType;

  const handleOnFinish = async (value: KeyValue) => {
    if (onFinish) {
      if (submitLoading) return;
      const begin = new Date().getTime();
      setSubmitLoading(true);
      try {
        await onFinish(formatFieldsValue ? submitFormatValues(value, formatFieldsValue) : value);
        const end = new Date().getTime();
        timeOut.current = window.setTimeout(
          () => {
            setSubmitLoading(false);
            handleReset({ type: 'onSubmit' });
          },
          // loading 时间不到 0.5s 的加载 0.5s，超过的立刻结束。
          end - begin > 500 ? 0 : 500,
        );
      } catch (error) {
        setSubmitLoading(false);
      }
    }
  };

  const handleOnEdit = e => {
    e.preventDefault();
    setDisabled(c => !c);
  };

  let _plugins;
  if (typeof globalConfig.plugins === 'boolean') {
    _plugins = globalConfig.plugins;
  } else if (typeof plugins === 'boolean') {
    _plugins = plugins;
  } else {
    _plugins = merge({}, plugins, globalConfig.plugins);
  }

  const _providerProps = {
    plugins: _plugins,
    form,
    disabled: thisDisabled,
    submitComponentProps: {
      showBtns: {
        // form submit 触发后设置 loading = true
        showSubmit: { loading: submitLoading },
        showEdit: { onClick: handleOnEdit },
        showCancel: { onClick: () => handleReset({ type: 'onCancel' }) },
        showSave: { onLoaded: () => handleReset({ type: 'onSave' }) },
        showBack: { onClick: goBack },
      },
    },
    getScene,
    ..._props,
    itemsType: _itemsTypeAll,
  };

  if ('isShow' in _props && !_props.isShow) {
    return null;
  }
  if (loading) {
    return (
      <div className="form-spin">
        <Spin />
      </div>
    );
  }

  return (
    <Form
      {...rest}
      form={form}
      className={classNames('yform', className)}
      onFinish={handleOnFinish}
    >
      <YFormContext.Provider value={_providerProps}>
        <Items>{children}</Items>
      </YFormContext.Provider>
    </Form>
  );
};

export default InternalForm;
