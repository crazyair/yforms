import React from 'react';
import { map, merge, get, isArray, isObject } from 'lodash';
import classNames from 'classnames';

import { oneLineItemStyle } from '../utils';
import { BaseComponentProps } from '../ItemsType';
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
  scenes?: YFormItemProps['scenes'];
  items?: (p: YFormOneLineItems) => YFormItemProps['children'];
}

export default (props: YFormOneLineProps) => {
  const { items, componentProps = {}, scenes } = props;
  const { oneLineStyle, className, style } = componentProps as YFormOneLineComponentProps;

  const styleObj = oneLineItemStyle(oneLineStyle || []);
  const _dataSource = items && items({ style: styleObj });
  let _childrenDataSource = _dataSource;
  if (isArray(_dataSource)) {
    _childrenDataSource = map(_dataSource, (item, index: number) => {
      if (!item) return;
      const _style = get(styleObj, index, {});
      if (isObject(item)) {
        return merge({}, { style: { display: 'inline-block', ..._style } }, { scenes }, item, {
          className: classNames('dib', get(item, 'className')),
        });
      }
    }).filter((x) => x);
  }
  return (
    <div className={classNames('one-line', className)} style={style}>
      <YForm.Items scenes={{ noCol: true }}>{_childrenDataSource}</YForm.Items>
    </div>
  );
};
