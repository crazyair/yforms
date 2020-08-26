import { Form, Spin } from 'antd';
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { merge, concat, mapKeys, omit, find, get, set, forEach } from 'lodash';
import classNames from 'classnames';
import { FormProps, FormInstance } from 'antd/lib/form';
import warning from 'warning';
import { usePersistFn } from 'ahooks';

import baseItemsType, { YFormItemsType, modifyType } from './ItemsType';
import Items, { FormatFieldsValue, YFormItemProps } from './Items';
import { YFormContext } from './Context';
import {
  onFormatFieldsValue,
  submitFormatValues,
  paramsType,
  getParentNameData,
  mergeWithDom,
} from './utils';
import { YFormSubmitComponentProps } from './component/Submit';
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
  defaultFormProps?: YFormProps;
  scenes?: {
    labelLayout?: boolean;
    noCol?: boolean;
    required?: boolean;
    placeholder?: boolean;
    disabled?: boolean;
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
  getFormatFieldsValue: (value?: T) => T;
}

type CancelType = 'onSave' | 'onSubmit' | 'onCancel';

export interface YFormProps<T = any> extends Omit<FormProps, 'form'>, YFormConfig {
  isShow?: boolean;
  disabled?: boolean;
  loading?: boolean;
  form?: YFormInstance;
  submit?: YFormUseSubmitReturnProps['submit'];
  formatFieldsValue?: FormatFieldsValue[];
  onFormatFieldsValue?: (f: FormatFieldsValue[]) => (f: FormatFieldsValue[]) => FormatFieldsValue[];
  children?: YFormItemProps['children'];
  onDeFormatFieldsValue?: (p?: FormatFieldsValue) => void;
  onSave?: (values: { [key: string]: any }) => void;
  submitComponentProps?: YFormSubmitComponentProps;
  onCancel?: (p: { type: CancelType }) => void;
  params?: ParamsType;
  oldValues?: T;
  offset?: YFormItemProps['offset'];
  minBtnLoadingTime?: number;
  getInitialValues?: (p?: any) => Promise<Object> | Object;
}

export function useFormatFieldsValue() {
  const formatFieldsValue = useRef([]);
  return {
    onFormatFieldsValue: onFormatFieldsValue(formatFieldsValue.current),
    formatFieldsValue: formatFieldsValue.current,
  };
}

// 全局默认值
let globalConfig: YFormConfig = {
  getScene: defaultScene.getScene,
  scenes: { labelLayout: true, disabled: true, placeholder: true, required: true },
  // 如果 4 不够，推荐使用 offset
  defaultFormProps: { labelCol: { span: 4 }, wrapperCol: { span: 20 } },
};

export const Config = (options: YFormConfig) => {
  globalConfig = merge({}, globalConfig, options);
};

const InternalForm = React.memo<YFormProps>((thisProps) => {
  const props = { ...globalConfig.defaultFormProps, ...thisProps };
  const { scenes, getScene = globalConfig.getScene, offset = 0 } = props;
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
    loading,
    itemsType,
    children,
    onFinish,
    onSave,
    formatFieldsValue: formFormatFieldsValue,
    onCancel,
    params,
    form: propsForm,
    className,
    submitComponentProps,
    submit,
    initialValues,
    minBtnLoadingTime = 500,
    getInitialValues,
    ...rest
  } = _props;

  const [form] = useForm(propsForm);
  const formatRef = useRef([]);
  const { resetFields, getFieldsValue } = form;
  const _params = submit ? submit.params : paramsType(params);
  const { create, edit, view } = _params;
  // 同 useSubmit 使用 view 当默认值
  const [thisDisabled, setDisabled] = useState(view);
  const [submitLoading, setSubmitLoading] = useState(false);
  const timeOut = useRef<number | null>(null);
  // 下面地方请使用 _thisDisabled
  let _thisDisabled = thisDisabled;
  if (submit) {
    _thisDisabled = submit.disabled;
  }
  // 改变状态
  const handleOnDisabled = useCallback(
    (disabled) => {
      if (submit) {
        submit.onDisabled(disabled);
      } else {
        setDisabled(disabled);
      }
    },
    [submit],
  );

  const [_getInitialValues, setGetInitialValues] = useState({});
  const [getLoading, setGetLoading] = useState(true);
  const immutableGetDetail = usePersistFn((...p) => getInitialValues && getInitialValues(...p));

  // 默认使用 initialValues、loading 无则使用 getInitialValues 的数据
  // const _initialValues = 'initialValues' in _props ? initialValues : _getInitialValues;
  // const _loading = 'loading' in _props ? loading : getLoading;
  const _initialValues = getInitialValues ? _getInitialValues : initialValues;
  const _loading = getInitialValues ? getLoading : loading;
  useEffect(() => {
    (async () => {
      setGetInitialValues(await immutableGetDetail());
      setGetLoading(false);
    })();
  }, [immutableGetDetail]);

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
        onCancel({ type });
      } else {
        resetFields();
        if (create) {
          goBack();
        } else if (edit || view) {
          handleOnDisabled(true);
        }
      }
    },
    [create, edit, handleOnDisabled, onCancel, resetFields, view],
  );
  const itemsTypeAll = { ...baseItemsType, ...globalConfig.itemsType, ...itemsType };

  // 内部格式化功能
  const { formatFieldsValue, onFormatFieldsValue } = useFormatFieldsValue();

  const handleFormatFieldsValue = (value) => {
    const _value = value || getFieldsValue(true);
    const _formatFieldsValue = concat(formFormatFieldsValue, formatFieldsValue).filter((x) => x);

    // 忽略字段
    const omitNames = [];
    forEach(_formatFieldsValue, (item) => {
      if (item.isOmit) omitNames.push(item.name);
    });
    const formatValues = { ...submitFormatValues(_value, _formatFieldsValue) };
    return omit(formatValues, omitNames);
  };

  if (!form.getFormatFieldsValue) {
    form.getFormatFieldsValue = handleFormatFieldsValue;
  }

  const handleOnFinish = async (value: KeyValue) => {
    if (onFinish) {
      if (submitLoading) return;
      const begin = new Date().getTime();
      setSubmitLoading(true);
      try {
        await onFinish(form.getFormatFieldsValue(value));
        const end = new Date().getTime();
        timeOut.current = window.setTimeout(
          () => {
            setSubmitLoading(false);
            handleReset({ type: 'onSubmit' });
          },
          // loading 时间不到 0.5s 的加载 0.5s，超过的立刻结束。
          end - begin > minBtnLoadingTime ? 0 : minBtnLoadingTime,
        );
      } catch (error) {
        warning(false, error || 'onSubmit error');
        setSubmitLoading(false);
      }
    }
  };

  const handleOnEdit = (e) => {
    e.preventDefault();
    handleOnDisabled(false);
  };
  const {
    formatFieldsValue: deFormatFieldsValue,
    onFormatFieldsValue: onDeFormatFieldsValue,
  } = useFormatFieldsValue();

  // deFormatFieldsValue 第一次为空需要下面 set(deFormatValues, name, value) 设置值
  // 当执行 resetFields 后，就需要 deFormatFieldsValue 的格式化。
  const deFormatValues = submitFormatValues(_initialValues, deFormatFieldsValue);

  const handleDeFormatFieldsValue = useCallback(
    (data: FormatFieldsValue) => {
      const { name, format } = data;
      const parentValue = getParentNameData(_initialValues, name);
      const value = format(get(_initialValues, name), parentValue, _initialValues);
      if (!find(formatRef.current, { name })) {
        // 如果上一级是 undefined，则不处理该字段。（List add 会生成空对象）
        if (parentValue !== undefined) {
          form.setFields([{ name, value }]);
          formatRef.current.push({ name, value });
          // 初始化使用 deFormat 后的数据
          set(deFormatValues, name, value);
          onDeFormatFieldsValue([{ name, format }]);
        }
      }
    },
    [_initialValues, form, deFormatValues, onDeFormatFieldsValue],
  );
  const providerProps = mergeWithDom(
    {
      form,
      scenes: _scenes,
      disabled: _thisDisabled,
      getScene,
      onFormatFieldsValue,
      onDeFormatFieldsValue: handleDeFormatFieldsValue,
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
    { ...omit(_props, ['name', 'initialValues']) },
    { initialValues: deFormatValues },
  );
  if ('isShow' in _props && !_props.isShow) {
    return null;
  }
  if (_loading) {
    return (
      <div className="form-spin">
        <Spin />
      </div>
    );
  }
  return (
    <Form
      {...omit(rest, ['scenes', 'oldValues'])}
      initialValues={deFormatValues}
      form={form}
      className={classNames('yforms', className)}
      onFinish={handleOnFinish}
    >
      <YFormContext.Provider value={{ ...providerProps, itemsType: itemsTypeAll }}>
        <Items offset={offset}>{children}</Items>
      </YFormContext.Provider>
    </Form>
  );
});

export default InternalForm;
