// import React from 'react';
import moment from 'moment';
import { CheckboxProps } from 'antd/lib/checkbox';
import { DatePickerProps } from 'antd/lib/date-picker';

import { YFormFieldBaseProps } from './ItemsType';

const checkbox: YFormFieldBaseProps<CheckboxProps>['modifyProps'] = ({ itemProps }) => {
  return { itemProps: { valuePropName: 'checked', ...itemProps } };
};

const datePicker: YFormFieldBaseProps<DatePickerProps>['modifyProps'] = ({
  itemProps,
  componentProps,
}) => {
  return {
    componentProps: {
      ...componentProps,
      // viewProps: { format: (value) => moment(value).format('YYYY-MM-DD') },
      itemProps: {
        viewProps: { format: (value) => moment(value).format('YYYY-MM-DD') },
        ...itemProps,
      },
    },
  };
};

export { checkbox, datePicker };
