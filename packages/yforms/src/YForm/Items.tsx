import React, { useContext, isValidElement } from 'react';
import classNames from 'classnames';
import warning from 'warning';
import { find, omit, merge, forEach, isObject, isArray } from 'lodash';
import { FormItemProps } from 'antd/lib/form';

import { YFormContext, YFormItemsContext } from './Context';
import { replaceMessage, getLabelLayout } from './utils';
import { YFormPluginsType, YFormProps, YFormInstance } from './Form';
import { YFormItemsTypeArray } from './ItemsType';
import ItemChildren from './ItemChildren';
import ComponentView from './component/ComponentView';

export type YFormDataSource = YFormItemsTypeArray<YFormItemProps>;
export type YFormRenderChildren = (form: YFormInstance) => YFormItemProps['children'];

type isShowFunc = (values: any) => boolean;

export interface YFormItemProps<T = any> extends Omit<FormItemProps, 'children'> {
  isShow?: boolean | isShowFunc;
  required?: boolean;
  plugins?: YFormPluginsType | boolean;
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
  let defaultPlugin = true;
  const formProps = useContext(YFormContext);
  const itemsProps = useContext(YFormItemsContext);
  const { itemsType, scene, getScene } = formProps;

  const _scene = (scene && getScene && getScene[scene]) || {};
  let _props = { ...props };
  let mergeProps = merge({}, formProps, itemsProps, _props);
  if (_scene.items) {
    const data = _scene.items({ formProps, itemsProps: _props });
    if ('itemsProps' in data) _props = data.itemsProps;
    mergeProps = merge({}, mergeProps, _props);
    if ('plugins' in data) mergeProps.plugins = data.plugins;
  }
  if ('isShow' in _props && !_props.isShow) return null;

  const { children = [], className, style, noStyle } = _props;
  const { required: mergeRequired, disabled: mergeDisabled, onFormatFieldsValue } = mergeProps;

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
        const { modifyProps, noField } = (itemsType[item.type] && itemsType[item.type]) || {};

        const _basePlugins = merge({}, mergeProps, item).plugins;

        let _plugins: YFormPluginsType = {};
        if (typeof _basePlugins === 'boolean') {
          defaultPlugin = _basePlugins;
        } else if (isObject(_basePlugins)) {
          _plugins = _basePlugins;
        }
        const {
          placeholder = defaultPlugin,
          required = defaultPlugin,
          noLabelLayout = defaultPlugin,
          labelLayout = defaultPlugin,
          disabled = defaultPlugin,
          view = false,
        } = _plugins;

        let defaultProps;
        let _itemProps = { ...item };
        let _componentProps = { ...item.componentProps };

        const defaultData = {
          // 当前类型参数
          itemProps: _itemProps,
          // 当前类型组件参数
          componentProps: _componentProps,
          formProps,
          itemsProps: _props,
          plugins: mergeProps.plugins,
        };
        // 参数修改
        if (_scene.item || modifyProps) {
          // 场景
          if (_scene.item) {
            defaultProps = _scene.item(defaultData);
          }
          // 类型修改
          if (modifyProps) {
            defaultProps = merge({}, defaultProps, modifyProps(defaultData));
          }
          if ('itemProps' in defaultProps) _itemProps = defaultProps.itemProps;
          if ('componentProps' in defaultProps) _componentProps = defaultProps.componentProps;
        }

        const _base = merge({}, formProps, itemsProps, _itemProps);
        const { labelCol, wrapperCol, offset } = _base;
        // 处理插件
        const { noLabelLayoutValue, labelLayoutValue } = getLabelLayout({
          labelCol,
          wrapperCol,
          offset,
        });

        const {
          type,
          dataSource,
          items,
          addonAfter,
          plugins,
          componentProps,
          format,
          ...formItemProps
        } = _itemProps;

        let _formItemProps = formItemProps;
        const { label, name } = _formItemProps;

        if (format) {
          onFormatFieldsValue([{ name, format }]);
        }

        if (labelLayout) {
          _formItemProps = { ..._formItemProps, ...labelLayoutValue };
        }
        // 添加无 label 处理
        if (noLabelLayout && !label) {
          _formItemProps = { ..._formItemProps, ...noLabelLayoutValue, labelCol: undefined };
        }
        if (disabled && !('disabled' in _componentProps)) {
          _componentProps.disabled = mergeDisabled;
        }
        if (view && !noField && !dataSource) {
          _formItemProps.className = classNames('mb0', item.className);
        }

        let _children = item.children;
        // 默认用 FormItem 包裹
        let _hasFormItem = true;

        let key: React.ReactText = _index;

        if (item.type && itemsType) {
          const _fieldData = itemsType[item.type];
          if (_fieldData) {
            const { component, componentView, formatStr } = _fieldData;
            _hasFormItem = 'hasFormItem' in _fieldData ? _fieldData.hasFormItem : _hasFormItem;

            //  添加必填 placeholder 处理
            if ((placeholder || required) && name) {
              const _formatStr =
                typeof label === 'string' && replaceMessage(formatStr || '', { label });
              if (placeholder) {
                _componentProps = {
                  placeholder: _formatStr || '请输入',
                  ..._componentProps,
                };
              }
              if (required) {
                let hasRequired = false;
                forEach(_formItemProps.rules, (item) => {
                  hasRequired = 'required' in item;
                });
                // 没传 required 校验情况下追加默认校验
                if (!hasRequired) {
                  _formItemProps.rules = [
                    { required: mergeRequired, message: _formatStr || '此处不能为空' },
                    ...(_formItemProps.rules || []),
                  ];
                }
              }
            }

            const _key = name ? `${name}` : key;
            key = find(list, { key: _key }) ? key : _key;
            // 包含 items 类型把当前 item 属性全部透传过去
            if (items) {
              _componentProps = { ..._base, key };
            }
            const _component = component || item.component;
            const _componentView = componentView || <ComponentView />;
            if (isValidElement(_component)) {
              _children = React.cloneElement(!noField && view ? _componentView : _component, {
                ..._componentProps,
                ...(_component.props as React.ReactElement),
                _item_type: type,
              });
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
              <Items plugins={plugins} {..._componentProps}>
                {dataSource}
              </Items>
            );
          }
        }
        const domChildren =
          typeof _children === 'function'
            ? (form: YFormInstance) => {
                return (
                  <Items noStyle plugins={plugins}>
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
