import React from 'react';
import { map, isArray } from 'lodash';
import { Space } from 'antd';
import { SpaceProps } from 'antd/lib/space';

import YForm from '..';
import { YFormItemProps } from '../Items';

export interface YFormSpaceComponentProps extends SpaceProps {}

export interface YFormSpaceProps {
  componentProps?: YFormSpaceComponentProps;
  items?: YFormItemProps['children'];
}

export default (props: YFormSpaceProps) => {
  const { items } = props;
  return (
    <Space>
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
