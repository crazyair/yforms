import React, { useContext, isValidElement } from 'react';
import { Form } from 'antd';
import { concat, map, get, pick, omit, mapKeys } from 'lodash';
import warning from 'warning';
import { YForm, mergeWithDom } from '..';
import ItemChildren from './ItemChildren';
import Items, { YFormRenderChildren, YFormDataSource } from './Items';
import { getParentNameData } from './utils';
import { YFormInstance } from './Form';

const Item: React.FC<YFormDataSource> = (props) => {
  // 这里解析出来的参数最好不要在 scenes 中更改
  const { scenes, ...rest } = props;

  const { name, children } = rest;
  const formProps = useContext(YForm.YFormContext);

  const {
    itemsType = {},
    onDeFormatFieldsValue,
    oldValues,
    getScene,
    onFormatFieldsValue,
  } = formProps;

  const itemsProps = useContext(YForm.YFormItemsContext);
  const { scenes: thisScenes } = itemsProps;

  const listContext = useContext(YForm.ListContent);
  const { prefixName } = listContext;

  // List 会有拼接 name ，这里获取 all name path
  const allName = prefixName ? concat(prefixName, name) : name;

  const mergeProps = mergeWithDom(
    {},
    pick(formProps, ['scenes', 'offset', 'disabled']),
    itemsProps,
    props,
  );

  if ('isShow' in props && !props.isShow) return null;

  const _scenes = mergeWithDom({}, thisScenes, scenes);
  let _props = mergeWithDom({}, mergeProps, rest, {
    offset: (props.offset || 0) + (itemsProps.offset || 0),
  });

  let _componentProps = { ...props.componentProps };

  const typeProps = get(itemsType, props.type) || {};
  // 原类型
  typeProps.type = props.type;
  const defaultData = {
    formProps,
    itemsProps: mergeProps,
    itemProps: _props,
    componentProps: _componentProps,
    typeProps,
  };

  // 参数修改
  const _defaultData = defaultData;
  const { modifyProps } = typeProps;
  if (modifyProps) {
    mergeWithDom(_defaultData, modifyProps(defaultData));
  }

  mapKeys(_scenes, (value: boolean, key: string) => {
    if (value && getScene[key] && getScene[key].item) {
      const data = getScene[key].item(_defaultData);
      if (data) {
        _defaultData.itemProps = { ..._defaultData.itemProps, ...data.itemProps };
        _defaultData.componentProps = { ..._defaultData.componentProps, ...data.componentProps };
      }
    }
  });

  _props = { ..._defaultData.itemProps };
  _componentProps = _defaultData.componentProps;

  const { type, dataSource, componentProps, format, ...formItemProps } = _props;
  const _formItemProps = formItemProps;
  const { isShow, shouldUpdate } = _formItemProps;

  const { deFormat } = _defaultData.itemProps;

  // 获取前格式化
  if (deFormat) {
    onDeFormatFieldsValue({ name: allName, format: deFormat });
    if (oldValues && _scenes.diff) {
      _defaultData.itemProps = {
        oldValue: deFormat(
          get(oldValues, allName),
          getParentNameData(oldValues, allName),
          oldValues,
        ),
        ..._defaultData.itemProps,
      };
    }
  }

  // 提交前格式化
  if (format) {
    let _format = [];
    if (typeof format === 'function') {
      _format = [{ name: allName, format }];
    } else {
      _format = map(format, (item) => {
        const _item = { ...item };
        if (item.name) {
          _item.name = prefixName ? concat(prefixName, item.name) : item.name;
        }
        return _item;
      });
    }
    onFormatFieldsValue(_format);
  }

  let _children;
  // 默认用 FormItem 包裹
  let _hasFormItem = true;
  const thisComponentProps = _componentProps;
  if (type) {
    const _fieldData = itemsType[type];
    if (_fieldData) {
      const { component } = _fieldData;
      _hasFormItem = 'hasFormItem' in _fieldData ? _fieldData.hasFormItem : _hasFormItem;
      const _component = children || component;
      _children = isValidElement(_component)
        ? React.cloneElement(_component, {
            ...(_component.props as object),
            ...thisComponentProps,
          })
        : _component;
    } else {
      warning(false, `[YFom.Items] ${type} 类型未找到`);
    }
  } else {
    // 没有 type 单独有 dataSource 情况
    if (dataSource) {
      _children = (
        <Items scenes={_scenes} {...thisComponentProps}>
          {dataSource}
        </Items>
      );
    } else {
      _children = isValidElement(children)
        ? React.cloneElement(children, { ...children.props, ...thisComponentProps })
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
  let dom = domChildren;
  if (_hasFormItem) {
    dom = (
      <ItemChildren
        {...omit(_formItemProps, [
          'component',
          'scenes',
          'viewProps',
          'deFormat',
          'format',
          'oldValue',
          'items',
          'offset',
          'hideLable',
        ])}
      >
        {domChildren}
      </ItemChildren>
    );
  }

  const render = (props?: any) => {
    return (
      <YForm.YFormItemContext.Provider value={mergeWithDom(omit(_props, ['children']), props)}>
        {dom}
      </YForm.YFormItemContext.Provider>
    );
  };

  if (shouldUpdate) {
    let reRender = false;
    return (
      <Form.Item noStyle shouldUpdate={shouldUpdate}>
        {(form) => {
          if (typeof isShow === 'function') {
            const fieldsValue = form.getFieldsValue(true);
            const parentValue = getParentNameData(fieldsValue, name);
            if (!isShow(parentValue, fieldsValue)) {
              return;
            }
          }
          reRender = !reRender;
          return render({ reRender });
        }}
      </Form.Item>
    );
  }
  return render();
};

export default Item;
