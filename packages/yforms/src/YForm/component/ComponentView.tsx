import React from 'react';
import moment, { isMoment } from 'moment';
import Numbro from 'numbro';
import { Tag } from 'antd';
import classNames from 'classnames';
import { includes, isArray, map, get } from 'lodash';
import SwapRightOutlined from '@ant-design/icons/SwapRightOutlined';
import { PickerPanelDateProps } from 'antd/lib/calendar/generateCalendar';

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
    // viewProps,
    addonBefore,
    addonAfter,
    suffix,
    prefix,
    value,
    className,
    itemProps = {},
  } = props;
  const { valuePropName } = itemProps;
  const { format } = itemProps.viewProps || {};
  let _value = value;
  // 金额格式化
  if (_item_type === 'money') {
    _value = Numbro(_value).format('0,0.00');
  }
  // 日期格式化
  if (_item_type === 'datePicker' || _item_type === 'rangePicker') {
    const {
      format: thisFormat,
      picker = 'date',
    } = props as YFormItemsTypeDefine['datePicker']['componentProps'];
    let _format;
    // 对比 antd 各个类型的默认格式化
    if (thisFormat) {
      _format = thisFormat;
    } else if (picker === 'date') {
      const { showTime } = props as PickerPanelDateProps<'date'>;
      let timeFormat = '';
      if (showTime) {
        timeFormat = typeof showTime === 'boolean' ? 'HH:mm:ss' : showTime.format;
      }
      _format = `YYYY-MM-DD ${timeFormat}`;
    } else if (picker === 'year') {
      _format = 'YYYY';
    } else if (picker === 'quarter') {
      _format = 'YYYY-\\QQ';
    } else if (picker === 'month') {
      _format = 'YYYY-MM';
    } else if (picker === 'week') {
      _format = 'YYYY-wo';
    } else if (picker === 'time') {
      _format = 'HH:mm:ss';
    }
    const dateFormat = typeof _format === 'string' ? _format : _format[0];
    if (_item_type === 'datePicker') {
      if (isMoment(_value)) {
        // 设置日期格式，为数组时支持多格式匹配，展示以第一个为准。配置参考 moment.js
        // https://ant.design/components/date-picker-cn/#DatePicker
        _value = moment(_value).format(dateFormat);
      }
    } else if (_item_type === 'rangePicker') {
      const { separator } = props as any;
      _value = _value ? (
        <>
          {_value && _value[0] ? moment(_value[0]).format(dateFormat) : noData}
          &nbsp;{separator || <SwapRightOutlined />}&nbsp;
          {_value && _value[1] ? moment(_value[1]).format(dateFormat) : noData}
        </>
      ) : (
        noData
      );
    }
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

  if (_item_type === 'switch') {
    const {
      checkedChildren = '开',
      unCheckedChildren = '关',
    } = props as YFormItemsTypeDefine['switch']['componentProps'];
    _value = (
      <Tag>{get(props, valuePropName || 'checked') ? checkedChildren : unCheckedChildren}</Tag>
    );
  }

  if (format) {
    _value = format(value);
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
