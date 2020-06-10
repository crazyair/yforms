import React from 'react';
import { get, concat } from 'lodash';
import ComponentView from './ComponentView';
import { YForm } from '../..';
import { modifyType } from '../ItemsType';

const DiffDom = (props: modifyType) => {
  const { formProps, itemProps, componentProps, typeProps } = props;
  const { oldValues = {} } = formProps;
  const { name } = itemProps;

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
            let equal = value === oldValue;
            // 如果有渲染方法，就按照次来对比
            if (itemProps.viewProps) {
              const { format } = itemProps.viewProps;
              if (format) {
                // 这里用的 pureValue = true（纯值），直接 === 判断就可以。
                equal = format(value, true) === format(oldValue, true);
              }
            }
            if (itemProps.diffProps) {
              const { onEqual } = itemProps.diffProps;
              if (onEqual) {
                // 如果有 onEqual，则最终使用该方法判断
                equal = onEqual(value, oldValue);
              }
            }

            if (equal) {
              return null;
            }
            return (
              <div style={{ padding: '5px 0' }}>
                <ComponentView
                  _show_type="diff"
                  {...componentProps}
                  itemProps={itemProps}
                  className="old-value"
                  _item_type={typeProps.type}
                  oldValue={oldValue}
                />
              </div>
            );
          },
        },
      ]}
    </YForm.Items>
  );
};

export default DiffDom;
