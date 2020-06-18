import React, { useContext, isValidElement } from 'react';
import classNames from 'classnames';
import { Form } from 'antd';
import { merge, forEach, isArray, mapKeys, pick } from 'lodash';
import { FormItemProps } from 'antd/lib/form';

import { YForm } from '..';
import { YFormProps, YFormInstance } from './Form';
import { YFormItemsTypeArray, YFormFieldBaseProps } from './ItemsType';

export type YFormDataSource = YFormItemsTypeArray<YFormItemProps>;
export type YFormRenderChildren = (form: YFormInstance) => YFormItemProps['children'];

type isShowFunc = (values: any) => boolean;

export interface YFormItemProps<T = any>
  extends Omit<FormItemProps, 'children'>,
    Pick<YFormProps, 'scenes' | 'disabled'> {
  isShow?: boolean | isShowFunc;
  className?: string;
  oldValue?: T;
  addonAfter?: React.ReactNode;
  addonBefore?: React.ReactNode;
  format?: FormatFieldsValue['format'] | FormatFieldsValue[];
  unFormat?: FormatFieldsValue['format'];
  style?: React.CSSProperties;
  offset?: number;
  children?:
    | (YFormDataSource | YFormDataSource[] | boolean)[]
    | YFormRenderChildren
    | React.ReactNode;
  dataSource?: YFormItemProps['children'];
  viewProps?: YFormFieldBaseProps['viewProps'];
  diffProps?: YFormFieldBaseProps['diffProps'];
  hideLable?: React.ReactNode; // 隐藏公共 label 用于得到 placeholder 和 rules required 的 message
}

export interface FormatFieldsValue {
  name: FormItemProps['name'];
  isOmit?: boolean;
  format?: (value: any, parentValues?: any) => any;
}

export interface YFormItemsProps
  extends Omit<YFormProps, 'loading' | 'itemsType' | 'formatFieldsValue' | 'isShow'> {
  isShow?: YFormItemProps['isShow'];
  scenes?: YFormItemProps['scenes'];
  shouldUpdate?: YFormItemProps['shouldUpdate'];
  offset?: number;
  noStyle?: boolean;
}

const Items = (props: YFormItemsProps) => {
  const formProps = useContext(YForm.YFormContext);
  const itemsProps = useContext(YForm.YFormItemsContext);

  if ('isShow' in props && !props.isShow) return null;

  const { getScene } = formProps;
  let mergeProps = merge({}, pick(formProps, ['scenes', 'offset', 'disabled']), itemsProps, props);
  const { scenes: thisScenes, shouldUpdate } = mergeProps;
  const _defaultData = { formProps, itemsProps: props };
  mapKeys(thisScenes, (value: boolean, key: string) => {
    if (value && getScene[key] && getScene[key].items) {
      const data = getScene[key].items(_defaultData);
      if (data) {
        _defaultData.itemsProps = { ..._defaultData.itemsProps, ...data.itemsProps };
      }
    }
  });
  mergeProps = merge({}, mergeProps, _defaultData.itemsProps);
  mergeProps.offset = (props.offset || 0) + (itemsProps.offset || 0);

  const _props = _defaultData.itemsProps;

  const { isShow, children = [], className, style, noStyle } = _props;

  const itemList: React.ReactNode[] = [];

  const eachItem = (list: YFormDataSource[], pIndex?: number) => {
    if (isArray(list)) {
      forEach(list, (item, index) => {
        // 如果还是是数组就回调该方法
        if (isArray(item)) return eachItem(item, index);
        const _index = pIndex ? `${pIndex}_${index}` : index;
        // 如果是 dom 直接渲染
        if (isValidElement(item)) {
          return itemList.push(item);
        }
        return itemList.push(<YForm.Item {...item} key={_index} />);
      });
    }
  };
  // 遍历元素
  eachItem(isArray(children) ? children : [children]);
  const child = (
    <YForm.YFormItemsContext.Provider value={mergeProps}>
      {itemList}
    </YForm.YFormItemsContext.Provider>
  );
  const dom = noStyle ? (
    child
  ) : (
    <div className={classNames('yform-items', className)} style={style}>
      {child}
    </div>
  );

  if (typeof isShow === 'function') {
    return (
      <Form.Item noStyle shouldUpdate={shouldUpdate}>
        {(form) => isShow(form.getFieldsValue()) && dom}
      </Form.Item>
    );
  }
  return dom;
};

export default React.memo(Items);
