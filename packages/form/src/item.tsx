import React, { useCallback, useContext } from 'react';
import { Form } from 'antd';
import { concat, forEach, get } from 'lodash';
import { FormItemProps } from 'antd/lib/form';

import { FormItemsTypeProps, ItemsType } from './form';
import { FormContext, FormItemContext, FormListContent } from './context';
import warning from 'warning';

export interface FormItemsProps<Values = any> extends FormItemProps<Values> {
  isShow?: FormItemsTypeProps<Values>['isShow'];
}

function Item<Values = any>(props: FormItemsProps<Values> & ItemsType<Values>) {
  const { children, componentProps, format, initFormat, isShow, component, type, ...rest } = props;

  const { name, shouldUpdate } = rest;
  const formProps = useContext(FormContext);
  const { itemsType, onInitFormat, onFormat } = formProps;
  const listContext = useContext(FormListContent);
  const { prefixName } = listContext;

  const render = useCallback(
    (com: FormItemsProps['children']) => (
      <FormItemContext.Provider value={{ name }}>
        <Form.Item {...rest}>
          {/* 如果是 Element 则把 componentProps 添加到 children props 上 */}
          {React.isValidElement(com)
            ? React.cloneElement(com, componentProps as Record<string, any>)
            : com}
        </Form.Item>
      </FormItemContext.Provider>
    ),
    [componentProps, name, rest],
  );
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

  let dom = render(children);

  const typeProps = get(itemsType, type);
  if (typeProps) {
    // 如果有传 component 则使用当前的
    const _component = component || typeProps.component;
    dom = render(_component);
  } else {
    warning(false, `错误: ${JSON.stringify(props)}`);
    return null;
  }

  // isShow 判断
  if ('isShow' in props) {
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
