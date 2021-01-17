import { createContext } from 'react';
import { FormListItems } from './components/list';
import { FormProps } from './form';

export const FormContext = createContext<FormProps>({});

export const FormItemContext = createContext<any>({});

export const FormListContent = createContext<{
  isList?: boolean;
  field?: FormListItems['field'];
  prefixName?: FormProps['name'];
}>({});
