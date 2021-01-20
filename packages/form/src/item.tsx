import React, { useContext } from 'react';
import { Form } from 'antd';
import { concat, forEach, get, isObject, mapKeys } from 'lodash';
import { FormItemProps as AntdFormItemProps } from 'antd/lib/form';

import { FormatFieldsValue, FormProps, ItemsType } from './form';
import { FormContext, FormItemContext, FormListContent } from './context';
import { mergeWithDom } from './utils';
import { FormItemsProps } from './items';
import warning from 'warning';

type childrenType<Values> = ItemsType<Values> | ItemsType<Values>[];

export interface FormItemProps<Values = any> extends AntdFormItemProps<Values> {
  isShow?: FormItemsProps['isShow'];
  plugins?: FormProps['plugins'];
  children?: childrenType<Values> | childrenType<Values>[];

  /**
   * 1. 会改变 initialValues 值，所以执行该方法改变后的值，点击重置后会恢复改变后的 initialValues
   * 2. 返回 undefined 则不修改 initialValues
   */
  initFormat?: FormatFieldsValue['format'];
  format?: FormatFieldsValue['format'] | FormatFieldsValue[];
}

function Item<Values = any>(props: FormItemProps<Values> & ItemsType<Values>) {
  const formProps = useContext(FormContext);
  const { config = {}, onInitFormat, onFormat } = formProps;
  const { itemsType, plugins } = config;
  const listContext = useContext(FormListContent);
  const { prefixName } = listContext;
  // 合并插件
  const allPlugins = mergeWithDom({}, plugins, props.plugins);
  const _itemProps = {};
  mapKeys(allPlugins, (value, key) => {
    if (value) {
      // 如果是对象，就使用传入的配置  如果是 boolean 则使用默认的配置
      const obj = isObject(value) ? value : get(allPlugins, key);
      if (typeof obj === 'object') {
        if (obj.item) {
          const dd = obj.item({ itemProps: props });
          mergeWithDom(_itemProps, dd);
        }
      } else {
        warning(false, `config 配置 ${key} 必须是对象`);
      }
    }
  });

  // 修改默认值
  const _props = mergeWithDom({}, _itemProps, props);

  const { children, componentProps, format, initFormat, isShow, component, type, ...rest } = _props;
  const { name, shouldUpdate } = rest;

  const allName = prefixName ? concat(prefixName, name) : name;

  if (initFormat) {
    onInitFormat({ name: allName, format: initFormat });
  }
  if (format) {
    if (typeof format === 'function') {
      onFormat({ name: allName, format });
    } else {
      forEach(format, (item) => {
        const { name, format, removeField } = item;
        const _name = prefixName ? concat(prefixName, name) : name;
        onFormat({ name: _name, format, removeField });
      });
    }
  }

  // 根据类型解析渲染组件
  const typeProps = get(itemsType, type);

  const dom = (
    <FormItemContext.Provider value={{ name }}>
      <Form.Item {...rest}>
        {typeProps
          ? React.cloneElement(component || typeProps.component, componentProps)
          : children}
      </Form.Item>
    </FormItemContext.Provider>
  );

  // isShow 判断
  if ('isShow' in _props) {
    if (!isShow) return null;
    if (typeof isShow === 'function') {
      return (
        <Form.Item noStyle shouldUpdate={shouldUpdate}>
          {(form) => isShow(form.getFieldsValue(true)) && dom}
        </Form.Item>
      );
    }
  }

  return dom;
}

export default Item;
