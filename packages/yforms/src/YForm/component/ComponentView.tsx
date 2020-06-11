import React from 'react';
import classNames from 'classnames';
import { get, isArray } from 'lodash';

import { YFormItemProps } from '../Items';

export const noData = <span style={{ color: '#ccc' }}>-/-</span>;

export interface YFormComponentViewComponentProps {
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  className?: string;
  oldValue?: any;
}

export interface YFormComponentViewProps extends YFormItemProps {
  componentProps?: YFormComponentViewComponentProps;
}

export default (props: YFormComponentViewProps) => {
  const { viewProps: { format } = {}, componentProps = {}, valuePropName = 'value' } = props;
  const { addonBefore, addonAfter, suffix, prefix, className, oldValue } = componentProps;
  // diff 渲染使用 oldValue
  let _value = 'oldValue' in componentProps ? oldValue : get(props, valuePropName);
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
};
