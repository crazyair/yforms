import React from 'react';
import { isArray, isObject, map } from 'lodash';
import { Form as AntdForm } from 'antd';
import { FormItemProps } from 'antd/lib/form';

import { Form } from '.';
import { FormProps } from './form';

export interface FormItemsProps<Values = any> {
  children?: FormProps<Values>['children'];
  shouldUpdate?: FormItemProps<Values>['shouldUpdate'];
  isShow?: boolean | ((values: Values) => boolean | undefined);
}

export const useRenderChildren = (children: FormProps['children']) => {
  const each = (children: FormProps['children']) => {
    const dom = map(isArray(children) ? children : [children], (item, index) => {
      if (isArray(item)) {
        return each(item);
      }
      if (React.isValidElement(item)) {
        return item;
      }
      if (isObject(item)) {
        return <Form.Item {...item} key={index} />;
      }
      // 不是 Element 或者不是字段 type
      return item;
    });
    return dom;
  };
  const dom = each(children);
  return { dom };
};

function Items<Values = any>(props: FormItemsProps<Values>) {
  const { children, isShow, shouldUpdate } = props;

  const { dom } = useRenderChildren(children);

  if ('isShow' in props) {
    if (!isShow) return null;
    if (typeof isShow === 'function') {
      return (
        <AntdForm.Item noStyle shouldUpdate={shouldUpdate}>
          {(form) => isShow(form.getFieldsValue(true)) && dom}
        </AntdForm.Item>
      );
    }
  }

  return <>{dom}</>;
}

export default Items;
