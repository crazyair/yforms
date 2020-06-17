import React, { useContext, isValidElement } from 'react';
import { Form } from 'antd';
import { merge, concat, map, get, pick, omit, mapKeys } from 'lodash';
import warning from 'warning';
import { YForm } from '..';
import ItemChildren from './ItemChildren';
import Items, { YFormRenderChildren, YFormDataSource } from './Items';
import { getParentNameData } from './utils';
import { YFormInstance } from './Form';

const Item: React.FC<YFormDataSource> = (props) => {
  // 这里解析出来的参数最好不要在 scenes 中更改
  const { format, unFormat, scenes, children, ...rest } = props;

  const { name } = rest;
  const formProps = useContext(YForm.YFormContext);
  const {
    itemsType = {},
    onUnFormatFieldsValue,
    oldValues,
    getScene,
    onFormatFieldsValue,
  } = formProps;
  const itemsProps = useContext(YForm.YFormItemsContext);
  const { scenes: thisScenes } = itemsProps;
  const listContext = useContext(YForm.ListContent);
  const { prefixName } = listContext;
  const mergeProps = merge(
    {},
    pick(formProps, ['scenes', 'offset', 'disabled']),
    itemsProps,
    props,
  );

  if ('isShow' in props && !props.isShow) return null;

  if (props.type && props.children) {
    warning(false, '传了 type 就不能传 children ');
    return null;
  }

  const _scenes = merge({}, thisScenes, scenes);
  let _itemProps = { ...rest };
  // offset 层级增加
  _itemProps.offset = (props.offset || 0) + (itemsProps.offset || 0);

  // List 会有拼接 name ，这里获取 all name path
  const allName = prefixName ? concat(prefixName, name) : name;

  // 提交前格式化
  if (format) {
    let _format = [];
    if (typeof format === 'function') {
      _format = [{ name: allName, format }];
    } else {
      _format = map(format, (item) => {
        const _item = { ...item };
        const { name } = item;
        if (name) {
          _item.name = prefixName ? concat(prefixName, name) : name;
        }
        return _item;
      });
    }
    onFormatFieldsValue(_format);
  }

  // 获取前格式化
  if (unFormat) {
    onUnFormatFieldsValue({ name: allName, format: unFormat });
    if (oldValues && _scenes.diff) {
      _itemProps = {
        oldValue: unFormat(get(oldValues, allName), getParentNameData(oldValues, allName) || {}),
        ..._itemProps,
      };
    }
  }

  let _componentProps = { ...props.componentProps };
  const typeProps = get(itemsType, props.type) || {};
  typeProps.type = props.type;
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

  const { type, dataSource, componentProps, ...formItemProps } = _itemProps;
  const _formItemProps = formItemProps;
  const { isShow, shouldUpdate } = _formItemProps;

  let _children;
  // 默认用 FormItem 包裹
  let _hasFormItem = true;

  if (type) {
    const _fieldData = itemsType[type];
    if (_fieldData) {
      const { component, needItemProps } = _fieldData;
      _hasFormItem = 'hasFormItem' in _fieldData ? _fieldData.hasFormItem : _hasFormItem;
      // 包含 items 类型把当前 item 属性全部透传过去
      if (needItemProps) {
        _componentProps = { ..._itemProps, componentProps: _componentProps };
      }
      const _component = component || props.component;
      _children = isValidElement(_component)
        ? React.cloneElement(_component, { ...(_component.props as object), ..._componentProps })
        : _component;
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
    } else {
      _children = isValidElement(children)
        ? React.cloneElement(children, { ...children.props, ..._componentProps })
        : children;
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
        {...omit(_formItemProps, [
          'component',
          'scenes',
          'viewProps',
          'unFormat',
          'format',
          'oldValue',
          'items',
          'offset',
        ])}
      >
        {domChildren}
      </ItemChildren>
    );
  } else {
    dom = <React.Fragment>{domChildren}</React.Fragment>;
  }
  if (typeof isShow === 'function') {
    return (
      <Form.Item noStyle shouldUpdate={shouldUpdate}>
        {(form) => {
          return isShow(form.getFieldsValue()) && dom;
        }}
      </Form.Item>
    );
  }
  return dom;
};

export default Item;
