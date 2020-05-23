import React, { useContext, isValidElement } from 'react';
import classNames from 'classnames';
import warning from 'warning';
import { find, omit, merge, forEach, isObject, isArray, mapKeys, get, pick } from 'lodash';
import { FormItemProps } from 'antd/lib/form';

import { YForm } from '..';
import { YFormProps, YFormInstance, YFormConfig } from './Form';
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
  scenes?: YFormConfig['scenes'];
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
  scenes?: any;
  component?: any;
  onSave?: any;
}

export interface YFormItemsProps
  extends Omit<YFormProps, 'loading' | 'itemsType' | 'formatFieldsValue'> {
  offset?: number;
  noStyle?: boolean;
}

const Items = (props: YFormItemsProps) => {
  const formProps = useContext(YForm.YFormContext);
  const itemsProps = useContext(YForm.YFormItemsContext);
  const { itemsType } = formProps;

  let mergeProps = merge({}, formProps, itemsProps, props);
  const { scenes, getScene, onFormatFieldsValue } = mergeProps;

  const _defaultData = { formProps: props, itemsProps: props };
  mapKeys(scenes, (value: boolean, key: string) => {
    if (value && getScene[key] && getScene[key].items) {
      const data = getScene[key].items(_defaultData);
      if (data) {
        _defaultData.itemsProps = { ..._defaultData.itemsProps, ...data.itemsProps };
      }
    }
  });
  mergeProps = merge({}, mergeProps, _defaultData.itemsProps);
  const _props = _defaultData.itemsProps;
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
        const thisProps: { className?: string; style?: string } = item.props || {};
        const domProps = {
          ...pick(item, ['key']),
          style: merge({}, item.style, thisProps.style),
          className: classNames(item.className, thisProps.className),
          key: `${_index}`,
        };
        return list.push(React.cloneElement(item, { ...domProps }));
      }
      if (isObject(item)) {
        if ('isShow' in item && !item.isShow) return undefined;

        let _itemProps = { ...item };
        let _componentProps = { ...item.componentProps };

        const defaultData = {
          formProps,
          itemsProps: mergeProps,
          typeProps: itemsType[item.type] || {},
          itemProps: item,
          componentProps: item.componentProps,
        };
        // 参数修改
        let _defaultData = defaultData;

        const _scenes = merge({}, scenes, item.scenes);
        mapKeys(_scenes, (value: boolean, key: string) => {
          if (value && getScene[key] && getScene[key].item) {
            const data = getScene[key].item(_defaultData);
            if (data) {
              _defaultData.itemProps = { ..._defaultData.itemProps, ...data.itemProps };
              _defaultData.componentProps = {
                ..._defaultData.componentProps,
                ...data.componentProps,
              };
            }
          }
        });
        const typeProps = get(itemsType, get(_defaultData, ['itemProps', 'type'])) || {};
        const { modifyProps } = typeProps;
        if (modifyProps) {
          _defaultData = merge({}, defaultData, modifyProps(defaultData));
        }
        _itemProps = _defaultData.itemProps;
        _componentProps = _defaultData.componentProps;
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

        if (type && itemsType) {
          const _fieldData = itemsType[type];
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
              const _elementProps = { ..._props, _item_type: item.type };
              _children = React.cloneElement(_component, _elementProps);
            } else {
              _children = _component;
            }
          } else {
            warning(false, `[YFom.Items] ${type} 类型未找到`);
          }
        } else {
          // 没有 type 单独有 dataSource 情况
          if (dataSource) {
            _children = (
              <Items scenes={_scenes} {..._componentProps}>
                {dataSource}
              </Items>
            );
          }
        }
        const domChildren =
          typeof _children === 'function'
            ? (form: YFormInstance) => {
                return (
                  <Items noStyle scenes={_scenes}>
                    {(_children as YFormRenderChildren)(form)}
                  </Items>
                );
              }
            : _children;
        if (_hasFormItem) {
          list.push(
            <ItemChildren
              key={key}
              addonAfter={addonAfter}
              {...omit(_formItemProps, ['component', 'scenes'])}
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
    <YForm.YFormItemsContext.Provider value={omit(mergeProps, ['scenes'])}>
      {list}
    </YForm.YFormItemsContext.Provider>
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
