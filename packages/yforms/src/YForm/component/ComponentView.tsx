import React from 'react';
import moment, { isMoment } from 'moment';

import { YFormItemsTypeDefine } from '../ItemsType';

export interface YFormComponentView {
  _item_type?: string;
  value?: string | string[] | number;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  suffix?: React.ReactNode;
  [key: string]: any;
}

export default (props: YFormComponentView) => {
  const { _item_type, addonBefore, addonAfter, suffix, value, ...rest } = props;
  let _value = value;

  let _addonAfter = addonAfter || suffix;
  const _addonBefore = addonBefore;
  if (_item_type === 'input') {
    const { addonAfter, suffix } = rest as YFormItemsTypeDefine['input']['componentProps'];
    _addonAfter = addonAfter || suffix;
  }
  if (_item_type === 'datePicker') {
    if (isMoment(_value)) {
      _value = moment(_value).format('YYYY-MM-DD');
    }
  }
  return (
    <span className="ant-form-text">
      {_addonBefore}
      {_value === undefined || _value === '' ? (
        <span style={{ color: '#ccc' }}>-/-</span>
      ) : (
        _value
      )}{' '}
      {_addonAfter}
    </span>
  );
};
