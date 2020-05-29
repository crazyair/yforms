import React from 'react';
import { Tag } from 'antd';
import moment, { isMoment } from 'moment';
import { CheckboxProps } from 'antd/lib/checkbox';
import { DatePickerProps, RangePickerProps } from 'antd/lib/date-picker';
import { PickerPanelDateProps } from 'antd/lib/calendar/generateCalendar';
import { PickerMode } from 'rc-picker/lib/interface';
// import { isArray } from 'lodash';
import { SwapRightOutlined } from '@ant-design/icons';
import { SwitchProps } from 'antd/lib/switch';
import { YFormFieldBaseProps } from './ItemsType';

const noData = <span style={{ color: '#ccc' }}>-/-</span>;

const dateFormat = (
  value?: any,
  props?: { picker?: PickerMode; format?: string | string[] },
  type?: string,
  pureValue?: boolean,
) => {
  const { picker = 'date', format } = props;
  let _format;
  if (format) {
    _format = format;
  } else if (picker === 'date') {
    const { showTime } = props as PickerPanelDateProps<'date'>;
    let timeFormat = '';
    if (showTime) {
      timeFormat = typeof showTime === 'boolean' ? 'HH:mm:ss' : showTime.format;
    }
    _format = timeFormat ? `YYYY-MM-DD ${timeFormat}` : 'YYYY-MM-DD';
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

  if (type === 'datePicker') {
    if (isMoment(value)) {
      return moment(value).format(dateFormat);
    }
  } else if (type === 'rangePicker') {
    const { separator } = props as any;
    const [start, end] = value || [];
    if (pureValue) {
      return `${start && moment(start).format(dateFormat)}${end && moment(end).format(dateFormat)}`;
    }
    return (
      value && (
        <>
          {value && value[0] ? moment(value[0]).format(dateFormat) : noData}
          &nbsp;{separator || <SwapRightOutlined />}&nbsp;
          {value && value[1] ? moment(value[1]).format(dateFormat) : noData}
        </>
      )
    );
  }
};

const modifyDatePicker: YFormFieldBaseProps<DatePickerProps>['modifyProps'] = ({
  itemProps,
  componentProps,
  typeProps,
}) => {
  return {
    itemProps: {
      viewProps: { format: (value) => dateFormat(value, componentProps, typeProps.type) },
      ...itemProps,
    },
  };
};
const modifyRangePicker: YFormFieldBaseProps<RangePickerProps>['modifyProps'] = ({
  itemProps,
  componentProps,
  typeProps,
}) => {
  return {
    itemProps: {
      viewProps: {
        format: (value, pureValue) => dateFormat(value, componentProps, typeProps.type, pureValue),
      },
      ...itemProps,
    },
  };
};

const modifyCheckbox: YFormFieldBaseProps<CheckboxProps>['modifyProps'] = ({ itemProps }) => {
  return { itemProps: { valuePropName: 'checked', ...itemProps } };
};

const modifySwitch: YFormFieldBaseProps<SwitchProps>['modifyProps'] = ({
  itemProps,
  componentProps,
}) => {
  const { checkedChildren = '开', unCheckedChildren = '关' } = componentProps;
  return {
    itemProps: {
      valuePropName: 'checked',
      viewProps: {
        format: (value, pureValue) => {
          // !!value 解释：undefined 设置为 false 来对比
          return pureValue ? !!value : <Tag>{value ? checkedChildren : unCheckedChildren}</Tag>;
        },
      },
      ...itemProps,
    },
  };
};

export { modifyCheckbox, modifyDatePicker, modifyRangePicker, modifySwitch };
