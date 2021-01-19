import React from 'react';
import { concat, forEach, get, isArray, isObject, map } from 'lodash';
import warning from 'warning';
import { FormProps, ItemsType } from './form';
import { Form } from '.';
import { FormContextProps, FormItemContext } from './context';
import { NamePath } from 'antd/lib/form/interface';

export const useRenderChildren = (
  children: FormProps['children'],
  props: FormContextProps,
  prefixName: NamePath,
) => {
  const { itemsType, onInitFormat, onFormat } = props;
  const each = (children: FormProps['children']) => {
    const dom = map(isArray(children) ? children : [children], (item, index) => {
      if (isArray(item)) {
        return each(item);
      }
      if (React.isValidElement(item)) {
        return item;
      }
      if (isObject(item)) {
        const _item = item as ItemsType;
        const { componentProps, format, initFormat, isShow, ...rest } = _item;
        const { name, shouldUpdate } = rest;

        // List 会有拼接 name ，这里获取 all name path
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

        const typeProps = get(itemsType, _item.type);
        if (typeProps) {
          const _component = _item.component || typeProps.component;
          const _dom = (
            <FormItemContext.Provider value={{ name }} key={index}>
              <Form.Item {...rest}>
                {/* 如果有传 component 则使用当前的 */}
                {React.cloneElement(_component, componentProps as Record<string, any>)}
              </Form.Item>
            </FormItemContext.Provider>
          );

          // isShow 判断
          if ('isShow' in _item) {
            if (!isShow) return null;
            if (typeof isShow === 'function') {
              return (
                <Form.Item noStyle key={index} shouldUpdate={shouldUpdate}>
                  {(form) => isShow(form.getFieldsValue(true)) && _dom}
                </Form.Item>
              );
            }
          }
          return _dom;
        }
        warning(false, `错误: ${JSON.stringify(item)}`);
        return null;
      }
      // 不是 Element 或者不是字段 type
      return item;
    });
    return dom;
  };
  const dom = each(children);
  return { dom };
};
