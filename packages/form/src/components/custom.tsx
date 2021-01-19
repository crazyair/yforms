import React from 'react';
import { FormProps } from '../form';
import { Form } from '..';

export interface FormItemCustomProps {
  items?: () => FormProps['children'];
}

const Custom = (props: FormItemCustomProps) => {
  const { items } = props;

  return <Form.Items>{items && items()}</Form.Items>;
};
export default Custom;
