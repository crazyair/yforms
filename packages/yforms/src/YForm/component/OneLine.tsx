import React from 'react';
import { map, merge, get, isArray, isObject } from 'lodash';
import classNames from 'classnames';

import { oneLineItemStyle } from '../utils';
import { BaseComponentProps, YFormFieldBaseProps } from '../ItemsType';
import YForm from '..';
import { YFormItemProps } from '../Items';

export interface YFormOneLineComponentProps extends BaseComponentProps {
  oneLineStyle?: (string | number)[];
}

export interface YFormOneLineItems {
  style: React.CSSProperties[];
}
export interface YFormOneLineProps {
  componentProps?: YFormOneLineComponentProps;
  className?: string;
  style?: React.CSSProperties;
  items?: (p: YFormOneLineItems) => YFormItemProps['children'];
}

export const oneLineModify: YFormFieldBaseProps<YFormOneLineProps>['modifyProps'] = ({
  itemProps = {},
}) => {
  return {
    itemProps: { ...itemProps, className: classNames(itemProps.className, 'mb0') },
  };
};

export default (props: YFormOneLineProps) => {
  const { componentProps = {}, items, ...rest } = props;
  const { oneLineStyle, ..._componentRest } = componentProps as YFormOneLineComponentProps;

  const styleObj = oneLineItemStyle(oneLineStyle || []);
  const _dataSource = items && items({ style: styleObj });
  let _childrenDataSource = _dataSource;
  if (isArray(_dataSource)) {
    _childrenDataSource = map(_dataSource, (item, index: number) => {
      if (!item) return;
      const _style = get(styleObj, index, {});
      if (isObject(item)) {
        return merge(
          {},
          {
            style: { display: 'inline-block', ..._style },
          },
          { ...item, className: classNames('dib', get(item, 'className')) },
        );
      }
    }).filter((x) => x);
  }

  return (
    <div className="one-line" {..._componentRest}>
      <YForm.Items {...rest}>{_childrenDataSource}</YForm.Items>
    </div>
  );
};
