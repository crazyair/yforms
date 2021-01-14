import { Input, Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { FormItemProps } from 'antd/lib/form';
import { InputProps, PasswordProps } from 'antd/lib/input';

interface BaseComp<T = any, P = any> {
  type?: T;
  component?: React.ReactElement;
  componentProps?: P;
}

export type FormItemsType = Omit<FormItemProps, 'children'> &
  (
    | BaseComp<'input', InputProps>
    | BaseComp<'button', ButtonProps>
    | BaseComp<'password', PasswordProps>
  );

export const itemsType: FormItemsType[] = [
  { type: 'input', component: <Input /> },
  { type: 'button', component: <Button /> },
  { type: 'password', component: <Input.Password /> },
];
