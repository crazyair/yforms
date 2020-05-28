/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { get, concat, omit, isArray, forEach, isEqual } from 'lodash';
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
      } else {
        equal = isEqual(item, oldValue[index]);
      }
      if (!equal) {
        return false;
      }
    });
  } else {
    if (moment.isMoment(value)) {
      // 对比数据到秒级，忽略毫秒
      equal = value.isSame(oldValue, 'seconds');
    } else if (moment.isMoment(oldValue)) {
      equal = oldValue.isSame(value, 'seconds');
    } else {
      equal = isEqual(value, oldValue);
    }
  }

  return equal;
};

const DiffDom = React.memo<any>((props) => {
  const { oldFieldsValues, initialValues, name, itemProps, type } = props;
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
            const oldValue = get(oldFieldsValues, _name);
            // return (
            //   value !== oldValue && (
            //     <div style={{ padding: '5px 0' }}>
            //       <div className="old-value">{oldValue || noData}</div>
            //     </div>
            //   )
            // );
            // list 会用 addonAfter 注入 icons，这里判断如果是 List 子元素则删除 itemProps.addonAfter
            if (context.prefixName) {
              itemProps.addonAfter = undefined;
            }
            if (equalFunc(value, oldValue)) {
              return null;
            }
            return (
              <div style={{ padding: '5px 0' }}>
                <ComponentView
                  {...itemProps.componentProps}
                  itemProps={itemProps}
                  className="old-value"
                  _item_type={type}
                  value={oldValue}
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
