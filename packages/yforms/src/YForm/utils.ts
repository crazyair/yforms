import { isValidElement, useRef } from 'react';
import { isImmutable } from 'immutable';
import {
  get,
  map,
  join,
  set,
  mapKeys,
  forEach,
  sortBy,
  isArray,
  find,
  isEqual,
  mergeWith,
} from 'lodash';
import { ColProps } from 'antd/lib/col';

import warning from 'warning';
import { stringAndFunc } from './ItemsType';
import { KeyValue, ParamsType } from './Form';
import { FormatFieldsValue, YFormItemProps } from './Items';

const nzhcn = require('nzh/cn');

export const layoutMore = {
  labelCol: { xs: { span: 24 }, sm: { span: 4 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 20 } },
};
export const tailLayout = { wrapperCol: { offset: 8, span: 16 } };

export function replaceMessage(template: string, kv: Record<string, string>): string {
  return template.replace(/\$\{\w+\}/g, (str: string) => {
    const key = str.slice(2, -1);
    return kv[key];
  });
}

export const mergeWithDom = (obj: any, ...params: any[]) => {
  return mergeWith(obj, ...params, (_, srcValue) => {
    // 如果是元素则返回要更改的值，不是则不处理
    if (isValidElement(srcValue)) {
      return srcValue;
    }
    // 如果是不可变数据，不处理合并
    if (isImmutable(srcValue)) {
      return srcValue;
    }
  });
};

// 获取一行多组件的 width
export const oneLineItemStyle = (list?: Array<number | string>) => {
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

export function getFieldKeyValue<T>(record: T, index: number, field: stringAndFunc<T>) {
  const recordKey = typeof field === 'function' ? field(record, index) : get(record, field);
  return recordKey === undefined ? index : recordKey;
}

export const searchSelect = {
  allowClear: true,
  showSearch: true,
  optionFilterProp: 'children',
  filterOption: (input: string, option: any) => {
    const getValue = (dom: React.ReactNode): string => {
      const _value = get(dom, 'props.children');
      if (Array.isArray(_value)) {
        const d = map(_value, (item) => {
          if (isValidElement(item)) {
            return getValue(item);
          }
          return item;
        });
        return join(d, '');
      }
      if (isValidElement(_value)) {
        return getValue(_value);
      }
      return join(_value, '');
    };

    const str = getValue(option);
    return str.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  },
};

// jiesuan 项目中使用的计算中文、全角字符 x2
export const calculateStrLength = (name?: string | number): number => {
  if (name === null || name === void 0) return 0;
  if (typeof name === 'number') {
    name = `${name}`;
  }
  let count = 0;
  const strArr = Array.from(name);
  strArr.forEach((c) => {
    if (/[\x00-\xff]/.test(c)) {
      count++;
    } else {
      count += 2;
    }
  });
  return count;
};

export const convertMoney = (money: string | number) => {
  return nzhcn.encodeB(money, { tenMin: true });
};

interface NoLabelLayoutValueProps {
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  offset?: number;
}
// 处理 label 宽度
export const getLabelLayout = ({ labelCol, wrapperCol, offset = 0 }: NoLabelLayoutValueProps) => {
  const labelLayoutValue = {};
  const noLabelLayoutValue = {};
  const labelSpan = get(labelCol, 'span');
  const wrapperSpan = get(wrapperCol, 'span');
  if (labelSpan) {
    set(labelLayoutValue, ['labelCol', 'span'], Number(labelSpan) + offset);
    set(labelLayoutValue, ['wrapperCol', 'span'], Number(wrapperSpan) - offset);
    set(noLabelLayoutValue, ['wrapperCol', 'offset'], Number(labelSpan) + offset);
    set(noLabelLayoutValue, ['wrapperCol', 'span'], Number(wrapperSpan) - offset);
  } else {
    mapKeys(labelCol, (value, key) => {
      set(labelLayoutValue, ['labelCol', key, 'span'], value.span + offset);
      set(noLabelLayoutValue, ['wrapperCol', key, 'offset'], value.span + offset);
    });
    mapKeys(wrapperCol, (value, key) => {
      set(labelLayoutValue, ['wrapperCol', key, 'span'], value.span - offset);
      set(noLabelLayoutValue, ['wrapperCol', key, 'span'], value.span - offset);
    });
  }

  return { noLabelLayoutValue, labelLayoutValue };
};
// 返回上一级 name 的数据
export const getParentNameData = (values: any, name: YFormItemProps['name']) => {
  const _values = { ...values };
  const _name = isArray(name) ? name : [name];
  if (_name.length === 1) {
    return _values;
  }
  return get(_values, _name.slice(0, _name.length - 1));
};

export function submitFormatValues(
  values: KeyValue,
  formatFieldsValue?: FormatFieldsValue[],
): KeyValue {
  const _values = mergeWithDom({}, values);
  const list: FormatFieldsValue[] = sortBy(formatFieldsValue, (item) => {
    if (!item) return;
    if (isArray(item.name)) {
      return -item.name.length;
    }
    return -`${item.name}`.length;
  }).filter((x) => x);
  forEach(list, (item) => {
    const { name, format } = item;
    if (name && format) {
      const parentValue = getParentNameData(values, name);
      // 如果上一级是 undefined，则不处理该字段。（List add 会生成空对象）
      if (parentValue === undefined) return;
      try {
        set(_values, name, format(get(values, name), parentValue, values));
      } catch (error) {
        // 如果 format 代码报错这里抛出异常
        // eslint-disable-next-line no-console
        console.error(error);
        warning(false, error);
      }
    }
  });
  return _values;
}

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

export const paramsType = (params?: ParamsType) => {
  const _params = params || ({} as ParamsType);
  const type = {
    id: _params.id,
    edit: _params.type === 'edit',
    create: _params.type === 'create',
    view: _params.type === 'view',
  };
  let typeName = '';
  if (type.create) typeName = '新建';
  if (type.edit) typeName = '编辑';
  if (type.view) typeName = '查看';

  return { ...type, typeName };
};

export const useImmutableValue = (value: any) => {
  const v = useRef(value);
  if (!isEqual(value, v.current)) {
    v.current = value;
  }
  return v.current;
};
