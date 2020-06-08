import React from 'react';
import classNames from 'classnames';
import { get, isArray } from 'lodash';

import { YFormItemProps } from '../Items';

const noData = <span style={{ color: '#ccc' }}>-/-</span>;

export interface YFormComponentView {
  value?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  _show_type?: string;
  oldValue?: any;
  itemProps?: YFormItemProps;
}

export default React.memo<YFormComponentView>((props) => {
  const {
    _show_type,
    addonBefore,
    addonAfter,
    suffix,
    prefix,
    className,
    oldValue,
    itemProps = {},
  } = props;
  const { valuePropName = 'value' } = itemProps;
  const { format } = itemProps.viewProps || {};
  // diff 渲染使用 oldValue
  let _value = _show_type === 'diff' ? oldValue : get(props, valuePropName);

  if (format) {
    _value = format(_value);
  }

  return (
    <span className={classNames('ant-form-text', className)}>
      {addonBefore && <span style={{ color: '#999' }}>{addonBefore} </span>}
      {prefix && <span style={{ color: '#999' }}>{prefix} </span>}
      {_value === undefined || _value === '' || (isArray(_value) && _value.length === 0)
        ? noData
        : _value}
      {suffix && <span style={{ color: '#999' }}> {suffix}</span>}
      {addonAfter && <span style={{ color: '#999' }}> {addonAfter}</span>}
    </span>
  );
});
