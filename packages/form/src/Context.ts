import { FormItemProps } from 'antd/lib/form';
import { createContext } from 'react';
import { FormListItems } from './components/list';
import { FormatFieldsValue, FormProps } from './form';

export interface FormContextProps {
  onInitFormat?: (p: FormatFieldsValue) => void;
  onFormat?: (p: FormatFieldsValue) => void;
  config?: FormProps['config'];
}

export const FormContext = createContext<FormContextProps>({});

export const FormItemContext = createContext<any>({});

export const FormListContent = createContext<{
  isList?: boolean;
  field?: FormListItems['field'];
  prefixName?: FormItemProps['name'];
}>({});
