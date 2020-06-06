import React, { useEffect } from 'react';
import { merge, forEach, concat, get, takeRight } from 'lodash';
import classNames from 'classnames';

import { YForm } from '..';
import { YFormConfig } from './Form';
import { modifyType } from './ItemsType';
import { replaceMessage, getLabelLayout } from './utils';
import DiffDom from './component/Diff';

// eslint-disable-next-line no-console
console.clear();

// TODO 以下判断是如果有 name 并且不是 list 类型才当做为表单字段从而注入 view diff 等功能
// itemProps.name && typeProps.type !== 'list'

const Demo = (props?: modifyType & { allName: any; form: any }) => {
  const {
    allName,
    itemProps,
    formProps,
    form: { getFieldValue, setFields },
  } = props;
  const { diffProps: { oldValues } = {} } = formProps;
  const value = getFieldValue(allName) || [];
  const oldValue = get(oldValues, allName, []);

  const le = oldValue.length - value.length;
  const showOldValue = takeRight(oldValue, le);
  useEffect(() => {
    // if (isArray(allName)) {
    //   setFields([{ name: concat(allName[0], '_old_fields', allName), value: showOldValue }]);
    // } else {
    //   setFields([{ name: concat('_old_fields', allName), value: showOldValue }]);
    // }
    setFields([{ name: concat('_old_fields', allName), value: showOldValue }]);
  }, [allName, setFields, showOldValue]);

  // if (value.length < oldValue.length) {
  if (showOldValue.length > 0) {
    const nnn = concat('_old_fields', allName);
    return (
      <YForm.Items disabled>
        {[
          { type: 'custom', component: '以下为被删数据', className: 'mb0' },
          { ...itemProps, name: nnn, scenes: { view: true, diff: false } },
        ]}
      </YForm.Items>
    );
  }
  return null;
};

const Demo1 = (props: modifyType) => {
  const { itemProps, formProps } = props;
  const context = React.useContext(YForm.ListContent);
  const { name } = itemProps;
  const _name = context.prefixName ? concat(context.prefixName, name) : name;
  return (
    <YForm.Items>
      {[
        {
          noStyle: true,
          shouldUpdate: (prevValues, curValues) => get(prevValues, _name) !== get(curValues, _name),
          children: (form) => (
            <Demo form={form} itemProps={itemProps} formProps={formProps} allName={_name} />
          ),
        },
      ]}
    </YForm.Items>
  );
};

const scenes: YFormConfig = {
  getScene: {
    // 没有 label 也和有 label 对齐
    labelLayout: {
      item: ({ formProps, itemsProps, itemProps }) => {
        let _itemProps: modifyType['itemProps'] = {};
        const { label } = itemProps;
        const _base = merge({}, formProps, itemsProps, itemProps);

        const { labelCol, wrapperCol, offset } = _base;
        const { noLabelLayoutValue, labelLayoutValue } = getLabelLayout({
          labelCol,
          wrapperCol,
          offset,
        });
        _itemProps = label ? labelLayoutValue : noLabelLayoutValue;

        return {
          itemProps: { ..._itemProps, ...itemProps },
        };
      },
    },
    // 移除 Col 栅格
    noCol: {
      item: ({ itemProps }) => {
        return { itemProps: { ...itemProps, labelCol: {}, wrapperCol: {} } };
      },
    },
    // 判断如果是 required 则每个 item 添加 rules
    required: {
      item: ({ itemProps, typeProps }) => {
        const _itemProps: modifyType['itemProps'] = {};
        const { label, rules } = itemProps;
        const { formatStr } = merge({}, typeProps, itemProps);

        const _message = typeof label === 'string' && replaceMessage(formatStr || '', { label });
        if (itemProps.name && typeProps.type !== 'list') {
          let hasRequired = false;
          forEach(rules, (item) => {
            hasRequired = 'required' in item;
          });
          if (!hasRequired) {
            _itemProps.rules = [
              { required: true, message: _message || '此处不能为空' },
              ...(itemProps.rules || []),
            ];
          }
        }
        return {
          itemProps: { ..._itemProps, ...itemProps },
        };
      },
    },
    // 添加 placeholder
    placeholder: {
      item: ({ itemProps, componentProps, typeProps }) => {
        const _componentProps: modifyType['componentProps'] = {};
        const { label } = itemProps;
        const { formatStr } = merge({}, typeProps, itemProps);

        const _message = typeof label === 'string' && replaceMessage(formatStr || '', { label });
        if (itemProps.name && typeProps.type !== 'list') {
          // rangePicker 不需要设置 placeholder
          if (typeProps.type !== 'rangePicker') {
            _componentProps.placeholder = _message || '';
          }
        }
        return {
          componentProps: { ..._componentProps, ...componentProps },
        };
      },
    },
    // 判断 disabled 给没个 item 添加 disabled
    disabled: {
      item: ({ formProps, componentProps, itemProps, typeProps }) => {
        const _componentProps: modifyType['componentProps'] = {};
        const { disabled } = formProps;
        if (itemProps.name && typeProps.type !== 'list') {
          _componentProps.disabled = disabled;
        }
        return {
          componentProps: { ..._componentProps, ...componentProps },
        };
      },
    },
    // 查看情况下每个 item 使用 view 类型渲染
    view: {
      item: ({ itemProps, typeProps, componentProps }) => {
        let _itemProps;
        let _componentProps;
        if (itemProps.name && typeProps.type !== 'list') {
          // 使用 ComponentView 组件渲染
          _itemProps = { className: 'mb0', type: 'view' };
          // ComponentView 组件需要 itemProps 参数
          _componentProps = { itemProps };
        }
        let hasRequired = false;
        forEach(itemProps.rules, (item) => {
          if ('required' in item) {
            hasRequired = item.required;
          }
        });
        return {
          // 清空 rules ，避免提交会校验
          // 如果之前是必填的，这里则保留红色 *
          itemProps: { ...itemProps, ..._itemProps, rules: [], required: hasRequired },
          componentProps: { ...componentProps, ..._componentProps },
        };
      },
    },
    diff: {
      item: ({ formProps, itemProps, typeProps }) => {
        const { diffProps: { oldValues } = {} } = formProps;

        let _itemProps;
        if (typeProps.type === 'list') {
          _itemProps = {
            addonAfter: [
              itemProps.addonAfter,
              <Demo1 key="append" itemProps={itemProps} formProps={formProps} />,
            ],
          };
        }
        if (itemProps.name && typeProps.type !== 'list') {
          _itemProps = {
            addonAfter: [
              itemProps.addonAfter,
              <DiffDom
                key="diff-dom"
                itemProps={itemProps}
                type={typeProps.type}
                oldValues={oldValues}
                name={itemProps.name}
              />,
            ],
          };
        }
        return { itemProps: { ...itemProps, ..._itemProps } };
      },
    },
    // 搜索场景
    search: {
      form: ({ formProps }) => ({
        formProps: {
          // 搜索成功后不重置表单
          onCancel: () => {},
          ...formProps,
          // 搜索场景表单不必填
          scenes: merge({}, { required: false }, formProps.scenes),
          className: classNames('yforms-search-form', formProps.className),
        },
      }),
      items: ({ itemsProps }) => {
        // 字段样式去掉
        return { itemsProps: { noStyle: true, ...itemsProps } };
      },
      item: ({ itemProps, componentProps }) => {
        return {
          itemProps: { ...itemProps, label: undefined },
          componentProps: { ...componentProps, placeholder: itemProps.label },
        };
      },
    },
    // 没有 label 不和有 label 对齐 TODO: 暂时没作用
    // noLabelLayout: {
    //   item: ({ formProps, itemsProps, itemProps }) => {
    //     const { label } = itemProps;
    //     const _base = merge({}, formProps, itemsProps, itemProps);
    //     const { wrapperCol } = _base;
    //     const _itemProps = label ? {} : { labelCol: {}, wrapperCol };
    //     return {
    //       itemProps: { ...itemProps, ..._itemProps },
    //     };
    //   },
    // },
  },
};

export default scenes;
