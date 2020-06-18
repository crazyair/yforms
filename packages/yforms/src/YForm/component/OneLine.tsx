import React from 'react';
import { map, merge, get, isArray, isObject } from 'lodash';
import classNames from 'classnames';
import warning from 'warning';

import YForm from '..';
import { oneLineItemStyle } from '../utils';
import { BaseComponentProps } from '../ItemsType';
import { YFormItemProps } from '../Items';

export interface YFormOneLineProps extends YFormItemProps {
  componentProps?: BaseComponentProps & { oneLineStyle?: (string | number)[] };
  items?: (p: { style: React.CSSProperties[] }) => YFormItemProps['children'];
  oneLineStyle?: (string | number)[];
}

export default (props: YFormOneLineProps['componentProps']) => {
  const itemProps = React.useContext(YForm.YFormItemContext);
  const { scenes, items } = itemProps;
  const { oneLineStyle, className, style } = props;
  if (get(props, 'name')) {
    warning(false, 'oneLine 不支持 name');
    return null;
  }

  const styleObj = oneLineItemStyle(oneLineStyle || []);
  const _dataSource = items && items({ style: styleObj });
  let _childrenDataSource = _dataSource;
  if (isArray(_dataSource)) {
    _childrenDataSource = map(_dataSource, (item, index) => {
      if (!item) return;
      const _style = get(styleObj, index, {});
      if (isObject(item)) {
        return merge({}, { display: 'inline-block', style: { ..._style }, scenes }, item);
      }
    }).filter((x) => x);
  }
  return (
    <div className={classNames('one-line', className)} style={style}>
      <YForm.Items scenes={{ noCol: true }}>{_childrenDataSource}</YForm.Items>
    </div>
  );
};
