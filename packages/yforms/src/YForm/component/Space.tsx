import React from 'react';
import { map, isArray } from 'lodash';
import { Space } from 'antd';
import { SpaceProps } from 'antd/lib/space';

import YForm from '..';
import { YFormItemProps } from '../Items';

export interface YFormSpaceProps extends YFormItemProps {
  componentProps?: SpaceProps;
  items?: YFormItemProps['children'];
}

export default (props: YFormSpaceProps['componentProps']) => {
  const itemProps = React.useContext(YForm.YFormItemContext) as YFormSpaceProps;
  const { items, scenes } = itemProps;

  return (
    <Space {...props}>
      {isArray(items)
        ? map(items, (item, index) => {
            return (
              <YForm.Items scenes={{ noCol: true, ...scenes }} noStyle key={index}>
                {[item]}
              </YForm.Items>
            );
          })
        : items}
    </Space>
  );
};
