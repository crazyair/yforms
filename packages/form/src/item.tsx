import React, { useContext } from 'react';
import { Form } from 'antd';
import { concat, forEach, get, mapKeys } from 'lodash';
import { FormItemProps as AntdFormItemProps } from 'antd/lib/form';

import { FormatFieldsValue, FormProps, ItemsType } from './form';
import { FormContext, FormItemContext, FormListContent } from './context';
import { mergeWithDom } from './utils';
import { FormItemsProps } from './items';

export interface FormItemProps<Values = any> extends AntdFormItemProps<Values> {
  isShow?: FormItemsProps['isShow'];
  plugins?: FormProps['plugins'];

  /**
   * 1. 会改变 initialValues 值，所以执行该方法改变后的值，点击重置后会恢复改变后的 initialValues
   * 2. 返回 undefined 则不修改 initialValues
   */
  initFormat?: FormatFieldsValue['format'];
  format?: FormatFieldsValue['format'] | FormatFieldsValue[];
}

function Item<Values = any>(props: FormItemProps<Values> & ItemsType<Values>) {
  const formProps = useContext(FormContext);
  const { itemsType, plugins, onInitFormat, onFormat } = formProps;
  const listContext = useContext(FormListContent);
  const { prefixName } = listContext;
  // 合并插件
  const allPlugins = mergeWithDom({}, plugins, props.plugins);
  const _itemProps: ItemsType = {};
  mapKeys(allPlugins, (value) => {
    const { enable, item } = value;
    if (enable) {
      if (item) {
        mergeWithDom(_itemProps, item({ itemProps: props }));
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
    <FormItemContext.Provider value={{ ..._props }}>
      <Form.Item {...rest}>
        {children ||
          (typeProps && React.cloneElement(component || typeProps.component, componentProps))}
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
