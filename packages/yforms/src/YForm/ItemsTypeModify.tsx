import React from 'react';
import moment, { isMoment } from 'moment';
import { CheckboxProps } from 'antd/lib/checkbox';
import { DatePickerProps } from 'antd/lib/date-picker';
import { PickerPanelDateProps } from 'antd/lib/calendar/generateCalendar';
// import { isArray } from 'lodash';
import { SwapRightOutlined } from '@ant-design/icons';
import { YFormFieldBaseProps, YFormItemsTypeDefine } from './ItemsType';

const noData = <span style={{ color: '#ccc' }}>-/-</span>;

const dateFormat = (
  value?: any,
  props?: YFormItemsTypeDefine['datePicker']['componentProps'],
  type?: string,
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

  if (type === 'datePicker') {
    if (isMoment(value)) {
      return moment(value).format(dateFormat);
    }
  } else if (type === 'rangePicker') {
    const { separator } = props as any;
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
  // rangePicker
};

const datePicker: YFormFieldBaseProps<DatePickerProps>['modifyProps'] = ({
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

const checkbox: YFormFieldBaseProps<CheckboxProps>['modifyProps'] = ({ itemProps }) => {
  return { itemProps: { valuePropName: 'checked', ...itemProps } };
};

export { checkbox, datePicker };
