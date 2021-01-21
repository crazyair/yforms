import React from 'react';
import { FormProps } from '../form';
import { Form } from '..';

export interface CustomProps {
  items?: () => FormProps['children'];
}

const Custom = (props: CustomProps) => {
  const { items } = props;

  return <Form.Items>{items && items()}</Form.Items>;
};
export default Custom;
