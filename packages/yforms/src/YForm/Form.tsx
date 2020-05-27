import { Form, Spin } from 'antd';
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { merge, concat, mapKeys, omit } from 'lodash';
import classNames from 'classnames';

import { FormProps, FormInstance } from 'antd/lib/form';
import baseItemsType, { YFormItemsType, modifyType } from './ItemsType';
import Items, { FormatFieldsValue, YFormItemProps } from './Items';
import { YFormContext } from './Context';

import { onFormatFieldsValue, submitFormatValues, paramsType, useImmutableValue } from './utils';
import { YFormSubmitProps } from './component/Submit';
import useForm from './useForm';

import defaultScene from './scenes';
import { YFormUseSubmitReturnProps } from './useSubmit';

export type KeyValue = { [key: string]: any };
export type FieldsType<T> = { [K in keyof T]: string };

export type YFormScene = {
  form?: (props: Required<Pick<modifyType, 'formProps'>>) => Pick<modifyType, 'formProps'>;
  items?: (
    props: Required<Pick<modifyType, 'formProps' | 'itemsProps'>>,
  ) => Pick<modifyType, 'itemsProps'>;
  item?: (props: Required<modifyType>) => Pick<modifyType, 'itemProps' | 'componentProps'>;
};

export interface YFormConfig {
  itemsType?: YFormItemsType;
  getScene?: { [key: string]: YFormScene };
  scenes?: {
    labelLayout?: boolean;
    noCol?: boolean;
    disabled?: boolean;
    placeholder?: boolean;
    required?: boolean;
    view?: boolean;
    diff?: boolean;
    search?: boolean;
    [key: string]: boolean;
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

export interface YFormInstance<T = any> extends FormInstance {
  getFormatFieldsValue?: (value?: T) => T;
}

type CancelType = 'onSave' | 'onSubmit' | 'onCancel';

export interface YFormProps<T = any> extends FormProps, YFormConfig {
  isShow?: boolean;
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;
  form?: YFormInstance;
  submit?: YFormUseSubmitReturnProps['submit'];
  formatFieldsValue?: FormatFieldsValue[];
  onFormatFieldsValue?: (
    f: FormatFieldsValue<T>[],
  ) => (f: FormatFieldsValue<T>[]) => FormatFieldsValue<T>[];
  children?: YFormItemProps['children'];
  onSave?: (values: { [key: string]: any }) => void;
  submitComponentProps?: YFormSubmitProps;
  onCancel?: (p: { type: CancelType; changeDisabled: (disabled: boolean) => void }) => void;
  params?: ParamsType;
  diffProps?: any;
}

export function useFormatFieldsValue<T = any>() {
  const formatFieldsValue = useRef([]);
  return {
    onFormatFieldsValue: onFormatFieldsValue<T>(formatFieldsValue.current),
    formatFieldsValue: formatFieldsValue.current,
  };
}

// 全局默认值
let globalConfig: YFormConfig = {
  getScene: defaultScene.getScene,
  scenes: { labelLayout: true, disabled: true, placeholder: true, required: true },
};

export const Config = (options: YFormConfig) => {
  globalConfig = merge({}, globalConfig, options);
};

const InternalForm = React.memo<YFormProps>((props) => {
  const { scenes, getScene = globalConfig.getScene } = props;
  const _scenes = merge({}, globalConfig.scenes, scenes);
  const _defaultData = { formProps: props };
  mapKeys(_scenes, (value: boolean, key: string) => {
    if (value && getScene[key] && getScene[key].form) {
      const data = getScene[key].form(_defaultData);
      if (data) {
        _defaultData.formProps = { ..._defaultData.formProps, ...data.formProps };
      }
    }
  });
  const _props = _defaultData.formProps;

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
    submitComponentProps,
    submit,
    ...rest
  } = _props;
  const [form] = useForm(propsForm);
  const { resetFields, getFieldsValue } = form;
  const _params = paramsType(params);
  const { create, edit, view } = _params;
  const iParams = useImmutableValue(_params);
  const initDisabled = view;
  const [thisDisabled, setDisabled] = useState(initDisabled);
  const [submitLoading, setSubmitLoading] = useState(false);
  const timeOut = useRef<number | null>(null);

  // 改变状态
  const handleChangeDisabled = useCallback(
    (disabled: boolean) => {
      setDisabled(disabled);
      if (submit) {
        submit.forceUpdate({ params: iParams, disabled });
      }
    },
    [iParams, submit],
  );

  // 初始化状态
  useEffect(() => {
    handleChangeDisabled(initDisabled);
  }, [handleChangeDisabled, initDisabled, submit]);

  useEffect(() => {
    return () => {
      clearTimeout(timeOut.current);
    };
  }, []);

  const goBack = () => {
    window.history.back();
  };

  const handleReset: (p: { type: CancelType }) => void = useCallback(
    ({ type }) => {
      if (typeof onCancel === 'function') {
        onCancel({ type, changeDisabled: handleChangeDisabled });
      } else {
        resetFields();
        if (create) {
          goBack();
        } else if (edit || view) {
          handleChangeDisabled(true);
        }
      }
    },
    [create, edit, handleChangeDisabled, onCancel, resetFields, view],
  );
  const _itemsTypeAll = {
    ...baseItemsType,
    ...itemsType,
    ...globalConfig.itemsType,
  } as YFormItemsType;

  // 内部格式化功能
  const {
    formatFieldsValue: _formatFieldsValue,
    onFormatFieldsValue: _onFormatFieldsValue,
  } = useFormatFieldsValue();

  const handleFormatFieldsValue = (value) => {
    let _value;
    if (value) {
      _value = value;
    } else {
      _value = getFieldsValue();
    }
    return submitFormatValues(_value, concat(formatFieldsValue, _formatFieldsValue));
  };
  form.getFormatFieldsValue = handleFormatFieldsValue;

  const handleOnFinish = async (value: KeyValue) => {
    if (onFinish) {
      if (submitLoading) return;
      const begin = new Date().getTime();
      setSubmitLoading(true);
      try {
        await onFinish(handleFormatFieldsValue(value));
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

  const handleOnEdit = (e) => {
    e.preventDefault();
    handleChangeDisabled(!thisDisabled);
  };

  const _providerProps = merge(
    {},
    {
      form,
      scenes: _scenes,
      disabled: thisDisabled,
      getScene,
      onFormatFieldsValue: _onFormatFieldsValue,
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
    },
    { ..._props, itemsType: _itemsTypeAll },
  );

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
      {...omit(rest, ['scenes', 'diffProps'])}
      form={form}
      className={classNames('yforms', className)}
      onFinish={handleOnFinish}
    >
      <YFormContext.Provider value={_providerProps}>
        <Items>{children}</Items>
      </YFormContext.Provider>
    </Form>
  );
});

export default InternalForm;
