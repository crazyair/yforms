import React from 'react';
import { get, concat } from 'lodash';
import classNames from 'classnames';

import ComponentView from './ComponentView';
import { YForm } from '../..';
import { modifyType } from '../ItemsType';

const DiffDom = (props: modifyType) => {
  const { formProps, itemProps, componentProps } = props;
  const { oldValues = {} } = formProps;
  const { name } = itemProps;

  const context = React.useContext(YForm.ListContent);
  const allName = context.prefixName ? concat(context.prefixName, name) : name;
  const _oldValue = 'oldValue' in itemProps ? itemProps.oldValue : get(oldValues, allName);
  return (
    <YForm.Items className="diff">
      {[
        {
          noStyle: true,
          shouldUpdate: (prevValues, curValues) => {
            return get(prevValues, allName) !== get(curValues, allName);
          },
          children: ({ getFieldValue }) => {
            // 如果字段为 undefined 则改为 ''，为了字段输入值再删除一样的道理
            const value = getFieldValue(allName) === undefined ? '' : getFieldValue(allName);
            const oldValue = _oldValue === undefined ? '' : _oldValue;
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
                <YForm.YFormItemContext.Provider value={itemProps}>
                  <ComponentView
                    {...componentProps}
                    oldValue={oldValue}
                    className={classNames('old-value', componentProps.className)}
                  />
                </YForm.YFormItemContext.Provider>
              </div>
            );
          },
        },
      ]}
    </YForm.Items>
  );
};

export default DiffDom;
