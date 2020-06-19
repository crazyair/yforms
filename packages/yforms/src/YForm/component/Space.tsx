import React from 'react';
import { map, forEach, isArray, isObject } from 'lodash';
import { Space } from 'antd';
import { SpaceProps } from 'antd/lib/space';

import YForm from '..';
import { YFormItemProps, YFormDataSource } from '../Items';

export interface YFormSpaceProps extends YFormItemProps {
  componentProps?: SpaceProps;
  items?: YFormItemProps['children'];
}

export default (props: YFormSpaceProps['componentProps']) => {
  const itemProps = React.useContext(YForm.YFormItemContext) as YFormSpaceProps;
  const { items, scenes } = itemProps;
  // 获取子集所有 shouldUpdate
  const shouldUpdates = [];
  forEach(isArray(items) ? items : [items], (item) => {
    if (isObject(item)) {
      const { shouldUpdate } = item as YFormDataSource;
      shouldUpdates.push(shouldUpdate);
    }
  });
  const shouldUpdate = (prevValue, nextValue) => {
    let isRender = false;
    // 判断只要子集有个为 true， 则 render
    forEach(shouldUpdates, (item) => {
      if (typeof item === 'boolean' && item) {
        isRender = true;
      }
      if (typeof item === 'function' && item(prevValue, nextValue)) {
        isRender = true;
      }
    });
    return isRender;
  };
  return (
    <YForm.Item noStyle shouldUpdate={shouldUpdate}>
      {(form) => {
        return (
          <Space {...props}>
            {isArray(items)
              ? map(items, (item, index) => {
                  if (isObject(item)) {
                    const { isShow } = item as YFormDataSource;
                    if (typeof isShow === 'function' && !isShow(form.getFieldsValue())) {
                      return null;
                    }
                    if (typeof isShow === 'boolean' && !isShow) return null;
                  }
                  return (
                    <YForm.Items scenes={{ noCol: true, ...scenes }} noStyle key={index}>
                      {[item]}
                    </YForm.Items>
                  );
                })
              : items}
          </Space>
        );
      }}
    </YForm.Item>
  );
};
