import React from 'react';
import { find, forEach, get, isArray, isObject, merge, set, sortBy } from 'lodash';
import { FormatFieldsValue, FormProps, ItemsType } from './form';

// 获取唯一 key
export const getOnlyKey = () => {
  const keyMap = new Set();
  return (index, pIndex, name) => {
    let _index = name ? name.toString() : index;
    let key = pIndex ? `${pIndex}_${_index}` : _index;
    if (keyMap.has(key)) {
      _index = `${_index}_${index}`;
      key = pIndex ? `${pIndex}_${_index}` : _index;
    }
    keyMap.add(key);
    return key;
  };
};

// TODO 暂未使用
export const onFormatFieldsValue = (formatFieldsValue: FormatFieldsValue[]) => {
  return (list: FormatFieldsValue[]) => {
    const _formatFields = formatFieldsValue;
    forEach(list, (item) => {
      // 已存在不再注册
      if (!find(_formatFields, { name: item.name })) {
        _formatFields.push(item);
      }
    });
    return _formatFields;
  };
};

export const eachChildren = (props: FormProps) => {
  const { children, initialValues } = props;
  const formatValues = { ...initialValues };
  const list = [];
  const each = (children: FormProps['children']) => {
    forEach(isArray(children) ? children : [children], (item) => {
      if (isArray(item)) {
        return each(item);
      }
      if (React.isValidElement<{ children?: FormProps['children'] }>(item)) {
        if (item.props && item.props.children) {
          return each(isArray(item.props.children) ? item.props.children : [item.props.children]);
        }
      }
      if (isObject(item)) {
        const { name, format, initFormat } = item as ItemsType;
        if (initFormat) {
          set(formatValues, name, initFormat(get(initialValues, name), initialValues));
        }
        if (format) {
          if (typeof format === 'function') {
            list.push({ name, format });
          } else {
            forEach(format, (item) => {
              const { name, format, removeField } = item;
              list.push({ name, format, removeField });
            });
          }
        }
      }
    });
  };
  each(children);
  // 根据 name 长度倒序排序，先格式化内层值，再格式化外层值
  const _list = sortBy(list, (item) => {
    if (isArray(item.name)) {
      return -item.name.length;
    }
    return -`${item.name}`.length;
  });

  return { formatValues, formatList: _list };
};

export function submitFormatValues(values: any, formatFieldsValue?: FormatFieldsValue[]) {
  const _values = merge({}, values);
  forEach(formatFieldsValue, (item) => {
    const { name, format } = item;
    if (name && format) {
      set(_values, name, format(get(values, name), values));
    }
  });
  return _values;
}
