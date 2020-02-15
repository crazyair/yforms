import { isValidElement } from 'react';
import { get, map, join, set, mapKeys, forEach, cloneDeep } from 'lodash';
import { ColProps } from 'antd/lib/col';

import { stringAndFunc } from './ItemsType';
import { FieldsType, KeyValue, ParamsType } from './Form';
import { FormatFieldsValue } from './Items';

const nzhcn = require('nzh/cn');

export const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
export const layoutMore = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
export const tailLayout = { wrapperCol: { offset: 8, span: 16 } };

export function replaceMessage(template: string, kv: Record<string, string>): string {
  return template.replace(/\$\{\w+\}/g, (str: string) => {
    const key = str.slice(2, -1);
    return kv[key];
  });
}

// 获取一行多组件的 width
export const oneLineItemStyle = (list?: Array<number | string>) => {
  if (!list || !Array.isArray(list)) return [];
  const _list: { display: string; width: string }[] = [];
  let width = 0;
  let count = 0;
  list.forEach(item => {
    if (typeof item === 'number') {
      width += item;
    } else {
      count += 1;
    }
  });

  list.forEach(item => {
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
        const d = map(_value, item => {
          if (isValidElement(item)) {
            return getValue(item);
          } else {
            return item;
          }
        });
        return join(d, '');
      } else if (isValidElement(_value)) {
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
  strArr.forEach(c => {
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

export function submitFormatValues<T>(
  values: FieldsType<T>,
  formatFieldsValue?: FormatFieldsValue[],
): KeyValue {
  const _values = cloneDeep(values) as KeyValue;
  forEach(formatFieldsValue, item => {
    if (item && item.name) {
      set(_values, item.name, item.format({ ...values }));
    }
  });
  return _values;
}

export const onFormatFieldsValue = <T>(formatFieldsValue: FormatFieldsValue<T>[]) => {
  return (list: FormatFieldsValue<T>[]) => {
    const _formatFields = formatFieldsValue;
    forEach(list, item => {
      _formatFields.push(item);
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
