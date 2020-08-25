import React from 'react';
import { forEach } from 'lodash';

import { YFormConfig } from './Form';
import { modifyType } from './ItemsType';
import { replaceMessage, getLabelLayout, mergeWithDom } from './utils';
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
        const _base = mergeWithDom({}, formProps, itemsProps, itemProps);

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
        const { formatStr } = mergeWithDom({}, typeProps, itemProps);
        const _label = label || hideLable;
        const _message =
          typeof _label === 'string' && replaceMessage(formatStr || '', { label: _label });
        if (itemProps.name && typeProps.type && typeProps.type !== 'list') {
          let hasRequired = false;
          forEach(rules, (item) => {
            if ('required' in item) {
              hasRequired = true;
            }
          });
          if (!hasRequired) {
            _itemProps.rules = [
              { required: true, message: _message || '此处不能为空' },
              ...(itemProps.rules || []),
            ];
          }
        }
        return {
          itemProps: { ...itemProps, ..._itemProps },
        };
      },
    },
    // 添加 placeholder
    placeholder: {
      item: ({ itemProps, componentProps, typeProps }) => {
        const _componentProps: modifyType['componentProps'] = {};
        const { label, hideLable } = itemProps;
        const { formatStr } = mergeWithDom({}, typeProps, itemProps);
        const _label = label || hideLable;
        const _message =
          typeof _label === 'string' && replaceMessage(formatStr || '', { label: _label });
        if (itemProps.name && typeProps.type && typeProps.type !== 'list') {
          // rangePicker 不需要设置 placeholder
          if (typeProps.type !== 'rangePicker' && _message) {
            _componentProps.placeholder = _message;
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
          _itemProps = { type: 'view' };
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
          itemProps: {
            ...itemProps,
            ..._itemProps,
            className: 'mb5',
            rules: [],
            required: hasRequired,
          },
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
      form: ({ formProps }) => {
        const { form } = formProps;
        return {
          formProps: {
            // 搜索成功后不重置表单
            onCancel: ({ type }) => {
              if (type === 'onCancel') {
                form.resetFields();
              }
            },
            ...formProps,
          },
        };
      },
      items: ({ itemsProps }) => {
        // 字段样式去掉
        const _itemProps = { ...itemsProps };
        mergeWithDom(_itemProps, { noStyle: true, scenes: { noCol: true, required: false } });
        return { itemsProps: _itemProps };
      },
      item: ({ itemProps, componentProps, typeProps }) => {
        let _componentProps = {};
        if (typeProps.type !== 'rangePicker') {
          _componentProps = { ..._componentProps, placeholder: itemProps.label };
        }
        if (typeProps.type === 'submit') {
          _componentProps = {
            showBtns: { showSubmit: { children: '搜索' }, showCancel: { children: '重置' } },
          };
        }
        return {
          itemProps: { style: { marginRight: 10 }, ...itemProps, label: undefined },
          componentProps: mergeWithDom(_componentProps, componentProps),
        };
      },
    },
  },
};

export default scenes;
