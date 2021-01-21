import React, { useContext } from 'react';
import { map } from 'lodash';
import { Space as AntdSpace } from 'antd';
import { SpaceProps as AntdSpaceProps } from 'antd/lib/space';

import { FormProps } from '../form';
import { Form } from '..';
import { FormItemContext } from '../context';

export interface SpaceProps extends AntdSpaceProps {
  items?: () => FormProps['children'];
}

const Space = (props: SpaceProps) => {
  const { items, ...rest } = props;
  const formItemProps = useContext(FormItemContext);
  const { children } = formItemProps;

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
