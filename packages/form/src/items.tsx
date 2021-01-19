import React, { useContext } from 'react';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';

import { FormItemsTypeProps, FormProps } from './form';
import { useRenderChildren } from './children';
import { FormContext, FormListContent } from './context';

export interface FormItemsProps<Values = any> {
  children?: FormProps<Values>['children'];
  shouldUpdate?: FormItemProps<Values>['shouldUpdate'];
  isShow?: FormItemsTypeProps<Values>['isShow'];
}

function Items<Values = any>(props: FormItemsProps<Values>) {
  const { children, isShow, shouldUpdate } = props;
  const formProps = useContext(FormContext);
  const listContext = useContext(FormListContent);
  const { prefixName } = listContext;

  const { dom } = useRenderChildren(children, formProps, prefixName);

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

  return <>{dom}</>;
}

export default Items;
