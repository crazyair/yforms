import React from 'react';
import { find, forEach, get, isArray, isObject, set } from 'lodash';
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

export const deFormatValues = (props: FormProps) => {
  const { children, initialValues } = props;
  const formatValues = { ...initialValues };
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
        const { name, deFormat } = item as ItemsType;
        if (deFormat) {
          set(formatValues, name, deFormat(get(initialValues, name), initialValues));
        }
      }
    });
  };
  each(children);
  return { formatValues };
};
