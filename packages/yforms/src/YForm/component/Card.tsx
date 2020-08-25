import React, { forwardRef } from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';

import YForm from '..';
import { YFormItemProps } from '../Items';

export interface YFormCardProps extends YFormItemProps {
  componentProps?: CardProps;
  items?: YFormItemProps['children'];
}

export default forwardRef<any, YFormCardProps['componentProps']>((props, ref) => {
  const itemProps = React.useContext(YForm.YFormItemContext);
  const { items } = itemProps as YFormCardProps;

  React.useImperativeHandle(ref, () => props);

  return (
    <Card key="card" size="small" {...props}>
      <YForm.Items>{items}</YForm.Items>
    </Card>
  );
});
