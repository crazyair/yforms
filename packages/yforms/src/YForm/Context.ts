import React from 'react';
import { YFormProps } from './Form';
import { YFormItemsProps, YFormItemProps } from './Items';
import { YFormListItems } from './component/List';

export const YFormContext = React.createContext<YFormProps>({});

export const YFormListContent = React.createContext<{
  isList?: boolean;
  field?: YFormListItems['field'];
  prefixName?: YFormItemProps['name'];
}>({});

export const YFormItemsContext = React.createContext<YFormItemsProps>({});
