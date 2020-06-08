import React from 'react';
import { get, concat, isArray, forEach, isEqual } from 'lodash';
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
  const { oldValues, name, itemProps, type } = props;
  const context = React.useContext(YForm.ListContent);

  const _name = context.prefixName ? concat(context.prefixName, name) : name;
  return (
    <YForm.Items className="diff">
      {[
        {
          noStyle: true,
          shouldUpdate: (prevValues, curValues) => get(prevValues, _name) !== get(curValues, _name),
          children: ({ getFieldValue }) => {
            // 如果字段为 undefined 则改为 ''，为了字段输入值再删除一样的道理
            const value = getFieldValue(_name) === undefined ? '' : getFieldValue(_name);
            const oldValue = get(oldValues, _name) === undefined ? '' : get(oldValues, _name);
            let equal = equalFunc(value, oldValue);
            // 如果有渲染方法，就按照次来对比
            if (itemProps.viewProps) {
              const { format } = itemProps.viewProps;
              // 这里用的 pureValue = true（纯值），直接 === 判断就可以。
              equal = format(value, true) === format(oldValue, true);
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
