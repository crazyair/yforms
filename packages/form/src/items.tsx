import React from 'react';
import { Form } from 'antd';
import { FormItemProps as AntdFormItemProps } from 'antd/lib/form';
import { find, isArray, isObject, map } from 'lodash';
import { FormItemsType, itemsType } from './ItemsType';
import { FormProps } from './form';
import { getOnlyKey } from './utils';

export interface FormItemProps extends Omit<AntdFormItemProps, 'children'> {
  children?: FormProps['children'];
}

const _getOnlyKey = getOnlyKey();

const renderChildren = (children: FormProps['children'], pIndex?: string) => {
  const dom = map(children, (item, index) => {
    if (isArray(item)) {
      return renderChildren(item, index);
    }

    if (React.isValidElement(item)) {
      return item;
    }
    if (isObject(item)) {
      const _item = item as FormItemsType;
      const { componentProps, ...rest } = _item;
      const { name } = rest;
      const key = _getOnlyKey(index, pIndex, name);
      const typeProps = find(itemsType, { type: _item.type });
      if (typeProps) {
        return (
          <Form.Item {...rest} key={key}>
            {React.cloneElement(typeProps.component, componentProps)}
          </Form.Item>
        );
      }
    }
  });
  return dom;
};

const Item = (props: FormItemProps) => {
  const { children } = props;

  const dom = renderChildren(isArray(children) ? children : [children]);
  return <>{dom}</>;
};

export default Item;
