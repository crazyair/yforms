import React, { useContext } from 'react';
import { Form } from 'antd';
import { FormItemProps as AntdFormItemProps } from 'antd/lib/form';
import { get, isArray, isObject, map } from 'lodash';
import { FormProps, ItemsType } from './form';
import { getOnlyKey } from './utils';
import { FormContext } from './Context';

const _getOnlyKey = getOnlyKey();

// 渲染 children
const renderChildren = (children: FormProps['children'], formProps: FormProps, pIndex?: string) => {
  const { itemsType } = formProps;
  const dom = map(children, (item, index) => {
    if (isArray(item)) {
      return renderChildren(item, formProps, index);
    }

    if (React.isValidElement(item)) {
      return item;
    }
    if (isObject(item)) {
      const _item = item as ItemsType;
      const { componentProps, format, deFormat, isShow, ...rest } = _item;
      const { name, shouldUpdate } = rest;
      const key = _getOnlyKey(index, pIndex, name);
      const typeProps = get(itemsType, _item.type);
      if (typeProps) {
        const _component = _item.component || typeProps.component;
        const _dom = (
          <Form.Item {...rest} key={key}>
            {/* 如果有传 component 则使用当前的 */}
            {React.cloneElement(_component, componentProps as Record<string, any>)}
          </Form.Item>
        );

        // 传 isShow 判断
        if ('isShow' in _item) {
          if (!isShow) return null;
          if (typeof isShow === 'function') {
            return (
              <Form.Item noStyle key={key} shouldUpdate={shouldUpdate}>
                {(form) => isShow(form.getFieldsValue(true)) && _dom}
              </Form.Item>
            );
          }
        }
        return _dom;
      }
    }
  });
  return dom;
};

export interface FormItemProps extends Omit<AntdFormItemProps, 'children'> {
  children?: FormProps['children'];
}

const Item = (props: FormItemProps) => {
  const { children } = props;
  const formProps = useContext(FormContext);

  const dom = renderChildren(isArray(children) ? children : [children], formProps);
  return <>{dom}</>;
};

export default Item;
