import React from 'react';
import { YFormProps } from './Form';
import { YFormItemsProps } from './Items';

export const YFormContext = React.createContext<YFormProps>({});

export const YFormItemsContext = React.createContext<YFormItemsProps>({});
