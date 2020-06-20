import React, { isValidElement } from 'react';
import { Tag } from 'antd';
import moment, { isMoment } from 'moment';
import { CheckboxProps } from 'antd/lib/checkbox';
import { DatePickerProps, RangePickerProps } from 'antd/lib/date-picker';
import { PickerPanelDateProps } from 'antd/lib/calendar/generateCalendar';
import { PickerMode } from 'rc-picker/lib/interface';
import { SwapRightOutlined } from '@ant-design/icons';
import { SwitchProps } from 'antd/lib/switch';
import Numbro from 'numbro';
import { isArray, map, includes, forEach } from 'lodash';
import { YFormFieldBaseProps } from './ItemsType';
import { YTextAreaProps } from './component/TextArea';
import { calculateStrLength, mergeWithDom } from './utils';
import { YFormOneLineProps } from './component/OneLine';
import { YFormSubmitProps } from './component/Submit';
import { YCheckGroupProps } from './component/CheckboxGroup';
import { YSelectProps } from './component/Select';
import { YMoneyProps } from './component/Money';
import { YRadioProps } from './component/Radio';
import { YFormSpaceProps } from './component/Space';
import { noData } from './component/ComponentView';

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

export const datePickerModify: YFormFieldBaseProps<DatePickerProps>['modifyProps'] = ({
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
export const rangePickerModify: YFormFieldBaseProps<RangePickerProps>['modifyProps'] = ({
  itemProps,
  componentProps,
  typeProps,
}) => {
  return {
    itemProps: {
      // 点击 allerClear 后值为 null ，解构时候 { range=[] } 会失效
      getValueFromEvent: (e) => e || [],
      viewProps: {
        format: (value, pureValue) => dateFormat(value, componentProps, typeProps.type, pureValue),
      },
      ...itemProps,
    },
  };
};

export const checkboxModify: YFormFieldBaseProps<CheckboxProps>['modifyProps'] = ({
  itemProps,
  componentProps,
}) => {
  const { children } = componentProps;
  return {
    itemProps: {
      valuePropName: 'checked',
      viewProps: {
        format: (value, pureValue) => {
          if (pureValue) {
            return !!value;
          }
          return value ? <Tag>{children}</Tag> : noData;
        },
      },
      ...itemProps,
    },
  };
};

export const switchModify: YFormFieldBaseProps<SwitchProps>['modifyProps'] = ({
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

export const textModify: YFormFieldBaseProps<YTextAreaProps>['modifyProps'] = ({
  itemProps,
  componentProps,
}) => {
  const _fProps = { ...itemProps };
  if (componentProps.inputMax) {
    _fProps.rules = [
      ...(_fProps.rules || []),
      () => ({
        validator(_, value) {
          if (value && calculateStrLength(value) > Number(componentProps.inputMax)) {
            return Promise.reject('数量超长');
          }
          return Promise.resolve();
        },
      }),
    ];
  }

  return { itemProps: _fProps };
};

export const oneLineModify: YFormFieldBaseProps<YFormOneLineProps>['modifyProps'] = ({
  itemProps = {},
}) => {
  return { itemProps: { className: 'mb0', ...itemProps } };
};

export const submitModify: YFormFieldBaseProps<YFormSubmitProps>['modifyProps'] = ({
  componentProps,
}) => {
  return { componentProps: mergeWithDom({ showBtns: { showSave: false } }, componentProps) };
};

export const checkboxGroupModify: YFormFieldBaseProps<YCheckGroupProps>['modifyProps'] = ({
  itemProps,
  componentProps,
}) => {
  const { options } = componentProps;
  return {
    itemProps: {
      viewProps: {
        format: (value, pureValue) => {
          if (value && isArray(value)) {
            const list = [];
            forEach(options, (item) => {
              if (includes(value, item.id)) {
                list.push(item.name);
              }
            });
            if (pureValue) {
              if (isArray(value)) {
                return map(value, (item) => item).join('-');
              }
              return value;
            }
            return map(list, (item, index) => <Tag key={index}>{item}</Tag>);
          }
        },
      },
      ...itemProps,
    },
  };
};

export const selectModify: YFormFieldBaseProps<YSelectProps>['modifyProps'] = ({
  itemProps,
  componentProps,
}) => {
  const { options, optionLabelProp, onAddProps, showField = 'name' } = componentProps;
  return {
    itemProps: {
      viewProps: {
        format: (value, pureValue) => {
          const list = [];
          forEach(options, (item, index) => {
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
          if (pureValue) {
            if (isArray(value)) {
              return map(value, (item) => item).join('-');
            }
            return value;
          }
          return map(list, (item) => <Tag key={item}>{item}</Tag>);
        },
      },
      ...itemProps,
    },
  };
};

export const moneyModify: YFormFieldBaseProps<YMoneyProps>['modifyProps'] = ({ itemProps }) => {
  return {
    itemProps: {
      viewProps: {
        format: (value) => {
          try {
            return Numbro(value).format('0,0.00');
          } catch (error) {
            return value;
          }
        },
      },
      ...itemProps,
    },
  };
};

export const radioModify: YFormFieldBaseProps<YRadioProps>['modifyProps'] = ({
  itemProps,
  componentProps,
}) => {
  const { options, showField = 'name' } = componentProps;
  return {
    itemProps: {
      viewProps: {
        format: (value, pureValue) => {
          const list = [];
          forEach(options, (item, index) => {
            if (value === item.id) {
              if (typeof showField === 'function') {
                list.push(showField(item, index));
              } else {
                list.push(item[showField]);
              }
            }
          });
          if (pureValue) {
            if (isArray(value)) {
              return map(value, (item) => item).join('-');
            }
            return value;
          }
          return map(list, (item) => <Tag key={item}>{item}</Tag>);
        },
      },
      ...itemProps,
    },
  };
};

export const SpaceModify: YFormFieldBaseProps<YFormSpaceProps>['modifyProps'] = ({
  itemProps = {},
}) => {
  return { itemProps: { ...itemProps } };
};

export const CustomModify: YFormFieldBaseProps<any>['modifyProps'] = (props) => {
  const { itemProps = {} } = props;
  const { children } = itemProps;
  return {
    itemProps: {
      viewProps: {
        format: (value, pureValue) => {
          if (pureValue) {
            return value;
          }
          return isValidElement(children) ? (
            <children.type disabled value={value} {...children.props} />
          ) : (
            children
          );
        },
      },
      ...itemProps,
    },
  };
};
