import React from 'react';
import Numbro from 'numbro';
import { Tag } from 'antd';
import classNames from 'classnames';
import { includes, isArray, map, get } from 'lodash';

import { YFormItemsTypeDefine } from '../ItemsType';
import { YFormItemProps } from '../Items';

const noData = <span style={{ color: '#ccc' }}>-/-</span>;

export interface YFormComponentView {
  _item_type?: string;
  value?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  itemProps?: YFormItemProps;
}

export default React.memo<YFormComponentView>((props) => {
  const {
    _item_type,
    children,
    addonBefore,
    addonAfter,
    suffix,
    prefix,
    value,
    className,
    itemProps = {},
  } = props;
  const { valuePropName = 'value' } = itemProps;
  const { format } = itemProps.viewProps || {};
  let _value = value;
  // 金额格式化
  if (_item_type === 'money') {
    _value = Numbro(_value).format('0,0.00');
  }

  if (_item_type === 'checkbox') {
    if (get(props, valuePropName || 'checked')) _value = <Tag>{children}</Tag>;
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
    _value = list.length > 0 ? map(list, (item) => <Tag key={item}>{item}</Tag>) : noData;
  }
  if (_item_type === 'radio') {
    const {
      options,
      showField = 'name',
    } = props as YFormItemsTypeDefine['radio']['componentProps'];
    if (value) {
      const list = [];
      _value = map(options, (item, index) => {
        if (value === item.id) {
          if (typeof showField === 'function') {
            list.push(showField(item, index));
          } else {
            list.push(item[showField]);
          }
        }
      });
      _value = list.length > 0 ? map(list, (item) => <Tag key={item}>{item}</Tag>) : noData;
    }
  }
  if (_item_type === 'checkboxGroup') {
    const { options } = props as YFormItemsTypeDefine['checkboxGroup']['componentProps'];
    if (value && isArray(value)) {
      const list = map(options, (item) => {
        if (includes(value, item.id)) {
          return item.name;
        }
      });
      _value = list.length > 0 ? map(list, (item, index) => <Tag key={index}>{item}</Tag>) : noData;
    }
  }

  if (format) {
    _value = format(get(props, valuePropName));
  }

  return (
    <span className={classNames('ant-form-text', className)}>
      {addonBefore && <span style={{ color: '#999' }}>{addonBefore} </span>}
      {prefix && <span style={{ color: '#999' }}>{prefix} </span>}
      {_value === undefined || _value === '' ? noData : _value}
      {suffix && <span style={{ color: '#999' }}> {suffix}</span>}
      {addonAfter && <span style={{ color: '#999' }}> {addonAfter}</span>}
      {itemProps.addonAfter && <span style={{ color: '#999' }}> {itemProps.addonAfter}</span>}
    </span>
  );
});
