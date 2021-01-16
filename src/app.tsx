import { ConfigProvider, Input } from 'antd';
import React from 'react';
import moment from 'moment';
import { Form } from 'yforms-simple';
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

declare module 'yforms-simple/lib/itemsType' {
  export interface FormItemsTypeDefine {
    demo?: BaseTypeProps<'demo', { str: string }>;
  }
}

Form.config({ itemsType: { demo: { component: <Input /> } } });

export function rootContainer(container: React.Component) {
  return <ConfigProvider locale={zhCN}>{container}</ConfigProvider>;
}
