import React from 'react';
import { YFormProps } from './Form';
import { YFormItemsProps } from './Items';
import { YFormListProps } from './component/List';

export const YFormContext = React.createContext<YFormProps>({});

export const YFormTypeList = React.createContext<YFormListProps>({});

export const YFormItemsContext = React.createContext<YFormItemsProps>({});
