import { FormItemProps } from 'antd/lib/form';
import { createContext } from 'react';
import { FormListItems } from './components/list';
import { FormatFieldsValue, FormProps } from './form';

export interface FormContextProps extends FormProps {
  onInitFormat?: (p: FormatFieldsValue) => void;
  onFormat?: (p: FormatFieldsValue) => void;
}

export const FormContext = createContext<FormContextProps>({});

export const FormItemContext = createContext<FormItemProps>({});

export const FormListContent = createContext<{
  isList?: boolean;
  field?: FormListItems['field'];
  prefixName?: FormItemProps['name'];
}>({});
