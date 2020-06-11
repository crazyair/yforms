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

export default (props: YFormSpaceProps) => {
  const { items, componentProps } = props;
  return (
    <Space {...componentProps}>
      {isArray(items)
        ? map(items, (item, index) => {
            return (
              <YForm.Items scenes={{ noCol: true }} key={index} noStyle>
                {[item]}
              </YForm.Items>
            );
          })
        : items}
    </Space>
  );
};
