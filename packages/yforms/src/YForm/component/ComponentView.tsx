import React from 'react';
import moment, { isMoment } from 'moment';
import Numbro from 'numbro';
import { Tag } from 'antd';
import { includes, isArray, map } from 'lodash';

import { YFormItemsTypeDefine } from '../ItemsType';

export interface YFormComponentView {
  _item_type?: string;
  value?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  suffix?: React.ReactNode;
  [key: string]: any;
}

export default (props: YFormComponentView) => {
  const { _item_type, children, addonBefore, addonAfter, suffix, value } = props;
  let _value = value;

  const _addonAfter = addonAfter || suffix;
  const _addonBefore = addonBefore;

  if (_item_type === 'money') {
    _value = Numbro(_value).format('0,0.00');
  }
  if (_item_type === 'datePicker') {
    if (isMoment(_value)) {
      _value = moment(_value).format('YYYY-MM-DD');
    }
  }
  if (_item_type === 'checkbox') {
    if (value) _value = <Tag>{children}</Tag>;
  }
  if (_item_type === 'select') {
    const {
      options,
      optionLabelProp,
      onAddProps,
      showField = 'name',
    } = props as YFormItemsTypeDefine['select']['componentProps'];
    const list = [];
    map(options, (item, index) => {
      if (includes(isArray ? value : [value], item.id)) {
        if (optionLabelProp && onAddProps) {
          list.push(onAddProps(item, index)[optionLabelProp]);
        } else if (typeof showField === 'function') {
          list.push(showField(item, index));
        } else {
          list.push(item[showField]);
        }
      }
    });
    _value = map(list, (item) => <Tag key={item}>{item}</Tag>);
  }
  if (_item_type === 'checkboxGroup') {
    const { options } = props as YFormItemsTypeDefine['checkboxGroup']['componentProps'];
    if (value && isArray(value)) {
      const list = map(options, (item) => {
        if (includes(value, item.id)) {
          return item.name;
        }
      });
      _value = map(list, (item, index) => <Tag key={index}>{item}</Tag>);
    }
  }
  if (_item_type === 'radio') {
    const { options } = props as YFormItemsTypeDefine['radio']['componentProps'];
    if (value) {
      _value = map(options, (item) => {
        if (value === item.id) {
          return <Tag key={`${item.id}`}>{item.name}</Tag>;
        }
      });
    }
  }
  if (_item_type === 'switch') {
    const {
      checkedChildren = '开',
      unCheckedChildren = '关',
    } = props as YFormItemsTypeDefine['switch']['componentProps'];
    _value = <Tag>{value ? checkedChildren : unCheckedChildren}</Tag>;
  }

  return (
    <span className="ant-form-text">
      <span style={{ color: '#999' }}>{_addonBefore} </span>
      {_value === undefined || _value === '' ? <span style={{ color: '#ccc' }}>-/-</span> : _value}
      <span style={{ color: '#999' }}> {_addonAfter}</span>
    </span>
  );
};
