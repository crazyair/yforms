/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { get, concat, omit, isArray, forEach, isEqual, map } from 'lodash';
import moment from 'moment';
import ComponentView from './ComponentView';
import { YForm } from '../..';

const equalFunc = (value: any, oldValue: any): boolean => {
  let equal = false;
  // 如果有个是数组则用数组
  if (isArray(value) || isArray(oldValue)) {
    // 数组对比有一个不是数组则为 false
    if (!isArray(value) || !isArray(oldValue)) return false;
    // 长度不一致为 false
    if (value.length !== oldValue.length) return false;

    // 数据情况下对索引数据挨个对比。
    forEach(value, (item: any, index: number) => {
      if (moment.isMoment(item)) {
        // 对比数据到秒级，忽略毫秒
        equal = item.isSame(oldValue[index], 'seconds');
      } else if (moment.isMoment(oldValue[index])) {
        equal = oldValue[index].isSame(item, 'seconds');
      } else {
        equal = isEqual(item, oldValue[index]);
      }
      if (!equal) {
        return false;
      }
    });
  } else if (moment.isMoment(value)) {
    // 对比数据到秒级，忽略毫秒
    equal = value.isSame(oldValue, 'seconds');
  } else if (moment.isMoment(oldValue)) {
    equal = oldValue.isSame(value, 'seconds');
  } else {
    equal = isEqual(value, oldValue);
  }

  return equal;
};

const DiffDom = React.memo<any>((props) => {
  const { oldValues, initialValues, name, itemProps, type } = props;
  const context = React.useContext(YForm.ListContent);

  const _name = context.prefixName ? concat(context.prefixName, name) : name;
  return (
    <YForm.Items className="diff">
      {[
        {
          noStyle: true,
          shouldUpdate: (prevValues, curValues) => get(prevValues, _name) !== get(curValues, _name),
          children: ({ getFieldValue }) => {
            const value = getFieldValue(_name);
            const oldValue = get(oldValues, _name);
            let equal = equalFunc(value, oldValue);
            // 如果有渲染方法，就按照次来对比
            if (itemProps.viewProps) {
              // 这里用的 pureValue = true（纯值），直接 === 判断就可以。
              equal =
                itemProps.viewProps.format(value, true) ===
                itemProps.viewProps.format(oldValue, true);
            }

            // List 下级字段
            if (context.prefixName) {
              if (isArray(itemProps.addonAfter)) {
                itemProps.addonAfter = map(itemProps.addonAfter, (item) => {
                  // list 会用 addonAfter 注入 icons，这里判断如果是 List 子元素则删除 icons
                  if (item && item.key === 'icons') {
                    return null;
                  }
                  return item;
                });
              }
            }
            if (equal) {
              return null;
            }
            return (
              <div style={{ padding: '5px 0' }}>
                <ComponentView
                  _show_type="diff"
                  {...itemProps.componentProps}
                  itemProps={itemProps}
                  className="old-value"
                  _item_type={type}
                  oldValue={oldValue}
                />
              </div>
            );
          },
        },
      ]}
    </YForm.Items>
  );
});

export default DiffDom;
