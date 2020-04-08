import React, { useContext } from 'react';
import classNames from 'classnames';
import warning from 'warning';
import { find, set, merge, forEach, isObject, isArray } from 'lodash';
import { FormInstance, FormItemProps } from 'antd/lib/form';

import { YFormContext, YFormItemsContext } from './Context';
import { replaceMessage, getLabelLayout } from './utils';
import { YFormPluginsType, YFormProps } from './Form';
import { YFormItemsTypeArray } from './ItemsType';
import ItemChildren from './ItemChildren';

export type YFormDataSource = YFormItemsTypeArray<YFormItemProps>;
export type YFormRenderChildren = (form: FormInstance) => YFormItemProps['children'];

type isShowFunc = (values: any) => boolean;

export interface YFormItemProps extends Omit<FormItemProps, 'children'> {
  isShow?: boolean | isShowFunc;
  required?: boolean;
  plugins?: YFormPluginsType | boolean;
  className?: string;
  addonAfter?: React.ReactElement;
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
  const { itemsType } = formProps;
  const { children = [], className, style, noStyle } = props;
  if ('isShow' in props && !props.isShow) return null;
  const mergeProps = merge({}, formProps, itemsProps, props);
  const { required: mergeRequired, disabled: mergeDisabled, scene, getScene } = mergeProps;
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
        let defaultProps;
        let _itemProps = { ...item };
        let _itemsProps = { ...itemsProps };
        let _formProps = { ...formProps };
        let _componentProps = { ...item.componentProps };
        let _basePlugins = merge({}, mergeProps, item).plugins;
        const defaultData = {
          // 当前类型参数
          itemProps: _itemProps,
          // 当前类型组件参数
          componentProps: _componentProps,
          // form 参数
          formProps,
          // itemsProps 参数
          itemsProps,
          // 当前插件参数
          plugins: _basePlugins,
        };
        const _scene = scene && getScene && getScene[scene];
        const _modifyProps = itemsType[item.type] && itemsType[item.type].modifyProps;
        // 参数修改
        if (_scene || _modifyProps) {
          // 场景
          if (_scene) {
            defaultProps = _scene(defaultData);
          }
          // 类型修改
          if (_modifyProps) {
            defaultProps = merge({}, defaultProps, _modifyProps(defaultData));
          }
          if (defaultProps.itemProps) {
            _itemProps = defaultProps.itemProps;
          }
          if (defaultProps.itemsProps) {
            _itemsProps = defaultProps.itemsProps;
          }
          if (defaultProps.itemsProps) {
            _itemsProps = defaultProps.itemsProps;
          }
          if (defaultProps.formProps) {
            _formProps = defaultProps.formProps;
          }
          if (defaultProps.componentProps) {
            _componentProps = defaultProps.componentProps;
          }
          if ('plugins' in defaultProps) {
            _basePlugins = defaultProps.plugins;
          }
        }

        const _base = merge({}, _formProps, _itemsProps, _itemProps);
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
          ...formItemProps
        } = _itemProps;

        let _formItemProps = formItemProps;
        const { label, name } = _formItemProps;

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
        } = _plugins;

        if (disabled) {
          set(_componentProps, 'disabled', mergeDisabled);
        }

        let _children = item.children;
        // 默认只用 FormItem 包裹
        let _hasFormItem = true;
        if (labelLayout) {
          _formItemProps = { ..._formItemProps, ...labelLayoutValue };
        }
        let key: React.ReactText = _index;

        // 添加无 label 处理
        if (noLabelLayout && !label) {
          _formItemProps = {
            ..._formItemProps,
            ...noLabelLayoutValue,
            labelCol: undefined,
          };
        }
        if (item.type && itemsType) {
          const _fieldData = itemsType[item.type];
          if (_fieldData) {
            const { component, formatStr, hasFormItem = _hasFormItem } = _fieldData;

            _hasFormItem = hasFormItem;

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
                forEach(_formItemProps.rules, item => {
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

            if (component) {
              _children = React.cloneElement(component, _componentProps);
            } else if (item.component) {
              _children = React.cloneElement(item.component, _componentProps);
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
            ? (form: FormInstance) => {
                return (
                  <Items noStyle plugins={plugins}>
                    {(_children as YFormRenderChildren)(form)}
                  </Items>
                );
              }
            : _children;
        if (_hasFormItem) {
          list.push(
            <ItemChildren key={key} addonAfter={addonAfter} {..._formItemProps}>
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
