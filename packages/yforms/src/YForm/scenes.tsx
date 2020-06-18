import React from 'react';
import { merge, forEach } from 'lodash';
import classNames from 'classnames';

import { YFormConfig } from './Form';
import { modifyType } from './ItemsType';
import { replaceMessage, getLabelLayout } from './utils';
import DiffDom from './component/Diff';
import { DiffSetFields } from './scenesComps';

// TODO 以下判断是如果有 name 并且不是 list 类型才当做为表单字段从而注入 view diff 等功能
// itemProps.name && typeProps.type !== 'list'
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
        const { label, hideLable, rules } = itemProps;
        const { formatStr } = merge({}, typeProps, itemProps);
        const _label = label || hideLable;
        const _message =
          typeof _label === 'string' && replaceMessage(formatStr || '', { label: _label });
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
        const { label, hideLable } = itemProps;
        const { formatStr } = merge({}, typeProps, itemProps);
        const _label = label || hideLable;
        const _message =
          typeof _label === 'string' && replaceMessage(formatStr || '', { label: _label });
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
    // 判断 disabled 给每个 item componentProps 添加 disabled
    disabled: {
      item: ({ componentProps, itemsProps }) => {
        const { disabled } = itemsProps;
        let _componentProps = {};
        _componentProps = { disabled };
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
          _itemProps = { className: 'mb5', type: 'view' };
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
      item: (props) => {
        const { itemProps, typeProps } = props;

        let _itemProps;
        if (typeProps.type === 'list') {
          _itemProps = {
            addonBefore: [itemProps.addonBefore, <DiffSetFields key="list-fields" {...props} />],
          };
        }
        if (itemProps.name && typeProps.type !== 'list') {
          _itemProps = {
            addonAfter: [itemProps.addonAfter, <DiffDom key="diff-dom" {...props} />],
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
