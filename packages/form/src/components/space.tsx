import React from 'react';
import { map } from 'lodash';
import { Space as AntdSpace } from 'antd';
import { SpaceProps as AntdSpaceProps } from 'antd/lib/space';

import { FormProps } from '../form';
import { Form } from '..';

export interface SpaceProps extends AntdSpaceProps {
  items?: () => FormProps['children'];
  children?: React.ReactNode;
}

const Space = (props: SpaceProps) => {
  const { items, children, ...rest } = props;
  if (children) {
    return <AntdSpace {...rest}>{children}</AntdSpace>;
  }

  return (
    <AntdSpace>
      {map(items(), (item, index) => {
        return <Form.Item {...item} key={index} />;
      })}
    </AntdSpace>
  );
};
export default Space;
