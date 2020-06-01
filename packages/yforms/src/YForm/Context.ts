import React from 'react';
import { YFormProps } from './Form';
import { YFormItemsProps } from './Items';
import { YFormListProps } from './component/List';

export const YFormContext = React.createContext<YFormProps>({});

export const YFormListContent = React.createContext<YFormListProps>({});

export const YFormListItemsContent = React.createContext<{ isList?: boolean; field?: any }>({});

export const YFormItemsContext = React.createContext<YFormItemsProps>({});
