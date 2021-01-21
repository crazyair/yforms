import React, { useContext } from 'react';
import { FormProps } from '../form';
import { Form } from '..';
import { FormItemContext } from '../context';

export interface CustomProps {
  items?: () => FormProps['children'];
}

const Custom = (props: CustomProps) => {
  const { items } = props;
  const formItemProps = useContext(FormItemContext);
  const { children } = formItemProps;

  return children || <Form.Items>{items && items()}</Form.Items>;
};
export default Custom;
