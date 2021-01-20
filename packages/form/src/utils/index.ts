import React from 'react';
import { forEach, get, isArray, merge, mergeWith, set } from 'lodash';
import { isImmutable } from 'immutable';
import { FormItemProps } from 'antd/lib/form';

import { FormatFieldsValue } from '../form';

// 返回上一级 name 的数据
export const getParentNameData = (values: any, name: FormItemProps['name']) => {
  const _values = { ...values };
  const _name = isArray(name) ? name : [name];
  if (_name.length === 1) {
    return _values;
  }
  return get(_values, _name.slice(0, _name.length - 1));
};

export function submitFormatValues(values: any, formatFieldsValue?: FormatFieldsValue[]) {
  const _values = merge({}, values);
  forEach(formatFieldsValue, (item) => {
    const { name, format } = item;
    const parentValue = getParentNameData(values, name);
    // 如果上一级是 undefined，则不处理该字段。（List add 会生成空对象）
    if (parentValue === undefined) return;
    if (name && format) {
      set(_values, name, format(get(values, name), values));
    }
  });
  return _values;
}

// 获取一行多组件的 width
export const oneLineItemStyle = (list?: (number | string)[]) => {
  if (!list || !Array.isArray(list)) return [];
  const _list: { display: string; width: string }[] = [];
  let width = 0;
  let count = 0;
  list.forEach((item) => {
    if (typeof item === 'number') {
      width += item;
    } else {
      count += 1;
    }
  });

  list.forEach((item) => {
    if (typeof item === 'number') {
      _list.push({ display: 'inline-block', width: `${item}px` });
    } else {
      _list.push({ display: 'inline-block', width: `calc(${item} - ${width / count}px)` });
    }
  });
  return _list;
};

export type stringAndFunc<T> = string | ((record: T, index: number) => React.ReactNode);

export function getFieldKeyValue<T>(record: T, index: number, field: stringAndFunc<T>) {
  const recordKey = typeof field === 'function' ? field(record, index) : get(record, field);
  return recordKey === undefined ? index : recordKey;
}

export const mergeWithDom = (obj: any, ...params: any[]) => {
  return mergeWith(obj, ...params, (_, srcValue) => {
    // 如果是元素则返回要更改的值，不是则不处理
    if (React.isValidElement(srcValue)) {
      return srcValue;
    }
    // 如果是不可变数据，不处理合并
    if (isImmutable(srcValue)) {
      return srcValue;
    }
  });
};

export function replaceMessage(template: string, kv: Record<string, string>): string {
  return template.replace(/\$\{\w+\}/g, (str: string) => {
    const key = str.slice(2, -1);
    return kv[key];
  });
}
