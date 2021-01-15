import React, { useContext } from 'react';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';

import { FormItemsTypeProps, FormProps } from './form';
import { useRenderChildren } from './children';
import { FormContext } from './Context';

export interface FormItemsProps<Values = any> {
  children?: FormProps<Values>['children'];
  shouldUpdate?: FormItemProps<Values>['shouldUpdate'];
  isShow?: FormItemsTypeProps<Values>['isShow'];
}

function Items<Values = any>(props: FormItemsProps<Values>) {
  const { children, isShow, shouldUpdate } = props;
  const formProps = useContext(FormContext);

  const { dom } = useRenderChildren({ ...formProps, children });

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
