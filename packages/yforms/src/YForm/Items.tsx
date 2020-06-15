import React, { useContext, isValidElement } from 'react';
import classNames from 'classnames';
import warning from 'warning';
import { omit, merge, forEach, isObject, isArray, mapKeys, get, pick, concat, map } from 'lodash';
import { FormItemProps } from 'antd/lib/form';

import { YForm } from '..';
import { YFormProps, YFormInstance } from './Form';
import { YFormItemsTypeArray, YFormFieldBaseProps } from './ItemsType';
import ItemChildren from './ItemChildren';
import { getParentNameData } from './utils';

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
  format?: FormatFieldsValue<T>['format'] | FormatFieldsValue<T>[];
  unFormat?: FormatFieldsValue<T>['format'];
  style?: React.CSSProperties;
  offset?: number;
  children?:
    | (YFormDataSource | YFormDataSource[] | boolean)[]
    | React.ReactElement
    | YFormRenderChildren
    | boolean;
  dataSource?: YFormItemProps['children'];
  viewProps?: YFormFieldBaseProps['viewProps'];
  diffProps?: YFormFieldBaseProps['diffProps'];
}

export interface FormatFieldsValue<T = any> {
  name: FormItemProps['name'];
  isOmit?: boolean;
  format?: (value: any, parentValues?: any) => any;
}

// 内部使用，类型不重要
interface InternalYFormItemProps extends YFormItemProps {
  dataSource?: any;
  items?: any;
  scenes?: any;
  component?: any;
  onSave?: any;
  _addonAfter?: React.ReactNode;
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
  const listContext = React.useContext(YForm.ListContent);
  const { prefixName } = listContext;
  const { itemsType, onUnFormatFieldsValue, oldValues } = formProps;
  const { getScene, onFormatFieldsValue } = formProps;
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
  const _props = _defaultData.itemsProps;
  if ('isShow' in _props && !_props.isShow) return null;

  const { isShow, children = [], className, style, noStyle } = _props;

  const list: React.ReactNode[] = [];
  let _offset = 0;

  const each = (lists: YFormItemsTypeArray<InternalYFormItemProps>[], pIndex?: number) => {
    forEach(lists, (item, index) => {
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
          key: `dom_${_index}`,
        };
        return list.push(React.cloneElement(item, { ...domProps }));
      }
      if (isObject(item)) {
        if ('isShow' in item && !item.isShow) return undefined;
        // 这里解析出来的参数最好不要在 scenes 中更改
        const { name, format, unFormat, scenes } = item;

        const _scenes = merge({}, thisScenes, scenes);
        let _itemProps = { ...item };
        // List 会有拼接 name ，这里获取 all name path
        const allName = prefixName ? concat(prefixName, name) : name;

        // 提交前格式化
        if (format) {
          if (typeof format === 'function') {
            onFormatFieldsValue([{ name: allName, format }]);
          } else {
            const _format = map(format, (item) => {
              const _item = { ...item };
              const { name } = item;
              if (name) {
                _item.name = prefixName ? concat(prefixName, name) : name;
              }

              return _item;
            });
            onFormatFieldsValue(_format);
          }
        }

        // 获取前格式化
        if (unFormat) {
          onUnFormatFieldsValue({ name: allName, format: unFormat });
          if (oldValues && _scenes.diff) {
            _itemProps = {
              oldValue: unFormat(
                get(oldValues, allName),
                getParentNameData(oldValues, allName) || {},
              ),
              ..._itemProps,
            };
          }
        }

        // offset 需要自增
        if (typeof _itemProps.offset === 'number') {
          _offset += _itemProps.offset;
          _itemProps.offset = _offset;
        }

        let _componentProps = { ...item.componentProps };
        const typeProps = get(itemsType, item.type) || {};
        typeProps.type = item.type;
        const defaultData = {
          formProps,
          itemsProps: mergeProps,
          typeProps,
          itemProps: _itemProps,
          componentProps: _componentProps,
        };

        // 参数修改
        let _defaultData = defaultData;
        const { modifyProps } = typeProps;
        if (modifyProps) {
          _defaultData = merge({}, defaultData, modifyProps(defaultData));
        }

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
        _itemProps = merge({}, pick(mergeProps, ['scenes', 'disabled']), _defaultData.itemProps);
        _componentProps = _defaultData.componentProps;

        const { type, dataSource, items, componentProps, ...formItemProps } = _itemProps;

        const _formItemProps = formItemProps;
        const { isShow, shouldUpdate } = _formItemProps;

        let _children = item.children;
        // 默认用 FormItem 包裹
        let _hasFormItem = true;

        if (type && itemsType) {
          const _fieldData = itemsType[type];
          if (_fieldData) {
            const { component, needItemProps } = _fieldData;
            _hasFormItem = 'hasFormItem' in _fieldData ? _fieldData.hasFormItem : _hasFormItem;
            // 包含 items 类型把当前 item 属性全部透传过去
            if (needItemProps) {
              _componentProps = { ..._itemProps, componentProps: _componentProps };
            }
            const _component = component || item.component;
            if (isValidElement(_component)) {
              const _props = component
                ? { ...component.props, ..._componentProps } // 内置组件 componentProps 在后面
                : { ..._componentProps, ...item.component.props }; // 自定义组件 componentProps 在前面
              _children = React.cloneElement(_component, _props);
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
        let dom;
        if (_hasFormItem) {
          dom = (
            <ItemChildren
              key={_index}
              {...omit(_formItemProps, [
                'component',
                'scenes',
                'viewProps',
                'unFormat',
                'format',
                'oldValue',
              ])}
            >
              {domChildren}
            </ItemChildren>
          );
        } else {
          dom = <React.Fragment key={_index}>{domChildren}</React.Fragment>;
        }
        if (typeof isShow === 'function') {
          list.push(
            <YForm.Item key={_index} noStyle shouldUpdate={shouldUpdate}>
              {(form) => {
                return isShow(form.getFieldsValue()) && dom;
              }}
            </YForm.Item>,
          );
        } else {
          list.push(dom);
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
    <YForm.YFormItemsContext.Provider value={mergeProps}>{list}</YForm.YFormItemsContext.Provider>
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
      <YForm.Item noStyle shouldUpdate={shouldUpdate}>
        {(form) => {
          return isShow(form.getFieldsValue()) && dom;
        }}
      </YForm.Item>
    );
  }
  return dom;
};

export default React.memo(Items);
