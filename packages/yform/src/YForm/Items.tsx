import React, { useContext } from 'react';
import classNames from 'classnames';
import warning from 'warning';
import { find, set, merge, forEach, isObject, isArray, pick } from 'lodash';
import { FormInstance, FormItemProps } from 'antd/lib/form';

import { YFormContext, YFormItemsContext } from './Context';
import { replaceMessage, getLabelLayout } from './utils';
import { YFormPluginsType, YFormProps } from './Form';
import { YFormItemsTypeArray } from './ItemsType';
import ItemChildren from './ItemChildren';

export type YFormDataSource = YFormItemsTypeArray<YFormItemProps>;
export type YFormRenderChildren = (form: FormInstance) => YFormItemProps['children'];

export interface YFormItemProps extends Omit<FormItemProps, 'children'> {
  isShow?: boolean;
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
  format: (value: T) => any;
}

// 内部使用，类型不重要
interface InternalYFormItemProps extends YFormItemProps {
  dataSource?: any;
  items?: any;
  component?: any;
}

export interface YFormItemsProps extends YFormProps {
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
  const { required: mergeRequired, disabled: mergeDisabled } = mergeProps;
  const list: React.ReactNode[] = [];
  const each = (lists: YFormItemsTypeArray<InternalYFormItemProps>[], pIndex?: number) => {
    forEach(lists, (item, index: number) => {
      const _index = pIndex ? `${pIndex}_${index}` : index;
      if (isArray(item)) {
        return each(item, index);
      }
      if (React.isValidElement(item)) {
        const domProps = merge(item.props, {
          style: item.style,
          className: item.className,
        });
        return list.push(
          <React.Fragment key={_index}>{React.cloneElement(item, { ...domProps })}</React.Fragment>,
        );
      }
      if (isObject(item)) {
        // 处理插件
        const _base = merge({}, mergeProps, item);

        const { labelCol, wrapperCol, offset } = _base;
        const { noLabelLayoutValue, labelLayoutValue } = getLabelLayout({
          labelCol,
          wrapperCol,
          offset,
        });

        let _plugins: YFormPluginsType = {};
        if (typeof _base.plugins === 'boolean') {
          defaultPlugin = _base.plugins;
        } else if (isObject(_base.plugins)) {
          _plugins = _base.plugins;
        }
        const {
          placeholder = defaultPlugin,
          required = defaultPlugin,
          noLabelLayout = defaultPlugin,
          labelLayout = defaultPlugin,
          disabled = defaultPlugin,
        } = _plugins;

        if ('isShow' in item && !item.isShow) {
          return undefined;
        }
        const { type, componentProps, dataSource, items, addonAfter, plugins, ...fieldRest } = item; //  list 默认不需要 FormItem 样式

        let dom;
        let _children = item.children;
        let _formItemProps = { ...fieldRest };
        if (labelLayout) {
          _formItemProps = { ..._formItemProps, ...labelLayoutValue };
        }
        let key: React.ReactText = _index;
        let _componentProps = {};
        const { label, name } = _formItemProps;
        if (disabled) {
          set(_componentProps, 'disabled', mergeDisabled);
        }
        _componentProps = { ..._componentProps, ...componentProps };
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
            const { component, render, formatStr, formItemProps, modifyProps } = _fieldData;
            // 注入定义类型传的默认数据
            _formItemProps = { ..._formItemProps, ...formItemProps };

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
                _formItemProps.rules = merge(
                  [],
                  [
                    {
                      required: mergeRequired,
                      message: _formatStr || '此处不能为空',
                    },
                  ],
                  _formItemProps.rules,
                );
              }
            }
            // 最后修改参数
            if (modifyProps) {
              [_formItemProps, _componentProps] = modifyProps(_formItemProps, _componentProps);
            }
            const _key = name ? `${name}` : key;
            key = find(list, { key: _key }) ? key : _key;
            // 包含 items 类型把当前 item 属性全部透传过去
            if (items) {
              // list 类型需要 disabled
              _componentProps = {
                ...pick(_componentProps, 'disabled'),
                ...item,
                key,
              };
            }

            if (render) {
              dom = render(_componentProps);
            } else if (component) {
              dom = React.cloneElement(component, _componentProps);
            } else if (type === 'custom') {
              dom = React.cloneElement(item.component, _componentProps);
            }
            _children = dom;
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
        // list 不需要 Form.Item
        if (type === 'list') {
          list.push(_children);
        } else {
          list.push(
            <ItemChildren key={key} addonAfter={addonAfter} {..._formItemProps}>
              {typeof _children === 'function'
                ? (form: FormInstance) => {
                    return (
                      <Items noStyle plugins={plugins}>
                        {(_children as YFormRenderChildren)(form)}
                      </Items>
                    );
                  }
                : _children}
            </ItemChildren>,
          );
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
