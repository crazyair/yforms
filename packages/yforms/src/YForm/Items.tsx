import React, { useContext, isValidElement } from 'react';
import classNames from 'classnames';
import warning from 'warning';
import { find, omit, merge, forEach, isObject, isArray, mapKeys } from 'lodash';
import { FormItemProps } from 'antd/lib/form';

import { YFormContext, YFormItemsContext } from './Context';
import { YFormProps, YFormInstance } from './Form';
import { YFormItemsTypeArray } from './ItemsType';
import ItemChildren from './ItemChildren';

export type YFormDataSource = YFormItemsTypeArray<YFormItemProps>;
export type YFormRenderChildren = (form: YFormInstance) => YFormItemProps['children'];

type isShowFunc = (values: any) => boolean;

export interface YFormItemProps<T = any> extends Omit<FormItemProps, 'children'> {
  isShow?: boolean | isShowFunc;
  required?: boolean;
  className?: string;
  addonAfter?: React.ReactElement;
  componentView?: React.ReactNode;
  noField?: boolean;
  format?: FormatFieldsValue<T>['format'];
  style?: React.CSSProperties;
  offset?: number;
  children?:
    | (YFormDataSource | YFormDataSource[] | boolean)[]
    | React.ReactElement
    | YFormRenderChildren
    | boolean;
  dataSource?: YFormItemProps['children'];
}

export interface FormatFieldsValue<T = any> {
  name: FormItemProps['name'];
  format: (values: T) => any;
}

// 内部使用，类型不重要
interface InternalYFormItemProps extends YFormItemProps {
  dataSource?: any;
  items?: any;
  component?: any;
  onSave?: any;
}

export interface YFormItemsProps
  extends Omit<YFormProps, 'loading' | 'itemsType' | 'formatFieldsValue'> {
  offset?: number;
  noStyle?: boolean;
}

const Items = (props: YFormItemsProps) => {
  const formProps = useContext(YFormContext);
  const itemsProps = useContext(YFormItemsContext);
  const { itemsType } = formProps;

  // const _scene = (scene && getScene && getScene[scene]) || {};
  let _props = { ...props };
  let mergeProps = merge({}, formProps, itemsProps, _props);
  const { scenes, getScene, onFormatFieldsValue } = mergeProps;

  mapKeys(scenes, (value: boolean, key: string) => {
    if (value) {
      const data = getScene[key].items({ formProps: props, itemsProps: _props });
      if (data) {
        if ('itemsProps' in data) _props = data.itemsProps;
        mergeProps = merge({}, mergeProps, _props);
      }
    }
  });

  if ('isShow' in _props && !_props.isShow) return null;

  const { children = [], className, style, noStyle } = _props;

  const list: React.ReactNode[] = [];

  const each = (lists: YFormItemsTypeArray<InternalYFormItemProps>[], pIndex?: number) => {
    forEach(lists, (item, index: number) => {
      // 如果是数组就回调该方法
      if (isArray(item)) return each(item, index);
      const _index = pIndex ? `${pIndex}_${index}` : index;
      // 如果是 dom 直接渲染
      if (React.isValidElement(item)) {
        const domProps = merge(item.props, { style: item.style, className: item.className });
        return list.push(
          <React.Fragment key={_index}>{React.cloneElement(item, { ...domProps })}</React.Fragment>,
        );
      }
      if (isObject(item)) {
        if ('isShow' in item && !item.isShow) return undefined;
        const typeProps = (itemsType[item.type] && itemsType[item.type]) || {};
        const { modifyProps } = typeProps;

        let _itemProps = { ...item };
        let _componentProps = { ...item.componentProps };

        const defaultData = {
          // 当前类型参数
          itemProps: _itemProps,
          // 当前类型组件参数
          componentProps: _componentProps,
          formProps,
          itemsProps: _props,
          typeProps,
        };
        // 参数修改
        let _defaultData = defaultData;
        if (modifyProps) {
          _defaultData = merge({}, defaultData, modifyProps(defaultData));
        }
        mapKeys(scenes, (value: boolean, key: string) => {
          if (value) {
            const data = getScene[key].item(_defaultData);
            if (data) {
              if ('itemProps' in data) _itemProps = data.itemProps;
              if ('componentProps' in data) _componentProps = data.componentProps;
            }
          }
        });

        const _base = merge({}, formProps, itemsProps, _itemProps);

        const {
          type,
          dataSource,
          items,
          addonAfter,
          componentProps,
          format,
          ...formItemProps
        } = _itemProps;

        const _formItemProps = formItemProps;
        const { name } = _formItemProps;

        if (format) {
          onFormatFieldsValue([{ name, format }]);
        }

        let _children = item.children;
        // 默认用 FormItem 包裹
        let _hasFormItem = true;

        let key: React.ReactText = _index;

        if (item.type && itemsType) {
          const _fieldData = itemsType[item.type];
          if (_fieldData) {
            const { component } = _fieldData;
            _hasFormItem = 'hasFormItem' in _fieldData ? _fieldData.hasFormItem : _hasFormItem;

            const _key = name ? `${name}` : key;
            key = find(list, { key: _key }) ? key : _key;
            // 包含 items 类型把当前 item 属性全部透传过去
            if (items) {
              _componentProps = { ..._base, key };
            }
            const _component = component || item.component;
            if (isValidElement(_component)) {
              const _props = component
                ? { ...component.props, ..._componentProps } // 内置组件 componentProps 在后面
                : { ..._componentProps, ...item.component.props }; // 自定义组件 componentProps 在前面
              _children = React.cloneElement(_component, { ..._props, _item_type: type });
            } else {
              _children = _component;
            }
          } else {
            warning(false, `[YFom.Items] ${type} 类型未找到`);
          }
        } else {
          // 没有 type 单独有 dataSource 情况
          if (dataSource) {
            _children = <Items {..._componentProps}>{dataSource}</Items>;
          }
        }
        const domChildren =
          typeof _children === 'function'
            ? (form: YFormInstance) => {
                return <Items noStyle>{(_children as YFormRenderChildren)(form)}</Items>;
              }
            : _children;
        if (_hasFormItem) {
          list.push(
            <ItemChildren
              key={key}
              addonAfter={addonAfter}
              {...omit(_formItemProps, ['component'])}
            >
              {domChildren}
            </ItemChildren>,
          );
        } else {
          list.push(<React.Fragment key={key}>{domChildren}</React.Fragment>);
        }
      } else {
        return list.push(item);
      }
    });
  };

  if (isArray(children)) {
    each(children as YFormItemsTypeArray<InternalYFormItemProps>[]);
  } else {
    list.push(children);
  }

  const child = (
    <YFormItemsContext.Provider value={{ ...mergeProps }}>{list}</YFormItemsContext.Provider>
  );
  return noStyle ? (
    child
  ) : (
    <div className={classNames('yform-items', className)} style={style}>
      {child}
    </div>
  );
};

export default Items;
