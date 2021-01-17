import { createContext } from 'react';
import { FormListItems } from './components/list';
import { FormatFieldsValue, FormConfig, FormProps } from './form';

export interface FormContextProps {
  itemsType?: FormConfig['itemsType'];
  onInitFormat?: (p: FormatFieldsValue) => void;
  onFormat?: (p: FormatFieldsValue) => void;
}

export const FormContext = createContext<FormContextProps>({});

export const FormItemContext = createContext<any>({});

export const FormListContent = createContext<{
  isList?: boolean;
  field?: FormListItems['field'];
  prefixName?: FormProps['name'];
}>({});
