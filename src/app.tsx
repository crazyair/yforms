import { Input } from 'antd';
import React from 'react';
import { Form } from 'yforms-simple';

declare module 'yforms-simple/lib/itemsType' {
  export interface FormItemsTypeDefine {
    demo?: BaseItemsType<'demo', { str: string }>;
  }
}

Form.config({ itemsType: { demo: { component: <Input /> } } });
