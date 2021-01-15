import { find, forEach, get, isArray, isObject, set } from 'lodash';
import React from 'react';
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

export const getChildrenTypes = (children: FormProps['children'], initialValues = {}) => {
  const obj = {};
  const each = (children: FormProps['children'], initialValues = {}) => {
    forEach(isArray(children) ? children : [children], (item) => {
      if (isArray(item)) {
        return each(item, initialValues);
      }
      if (React.isValidElement(item)) {
        return;
      }
      if (isObject(item)) {
        const { name, deFormat } = item as ItemsType;
        if (deFormat) {
          set(obj, name, deFormat(get(initialValues, name), initialValues));
        }
      }
    });
    return obj;
  };
  each(children, initialValues);
  return obj;
};
