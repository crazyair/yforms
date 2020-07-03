import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { get, isArray } from 'lodash';
import { ConfigContext } from 'antd/lib/config-provider';

import { YForm } from '../..';
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

export default forwardRef<any, YFormComponentViewComponentProps>((props, ref) => {
  const AntdConfig = React.useContext(ConfigContext);
  const itemProps = React.useContext(YForm.YFormItemContext);
  const { viewProps: { format } = {}, valuePropName = 'value' } = itemProps;
  const { addonBefore, addonAfter, suffix, prefix, className, oldValue } = props;
  // diff 渲染使用 oldValue
  let _value = 'oldValue' in props ? oldValue : get(props, valuePropName);
  if (format) {
    _value = format(_value);
  }
  const prefixCls = AntdConfig.getPrefixCls('');

  return (
    <span className={classNames(`${prefixCls}-form-text`, className)} ref={ref}>
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
