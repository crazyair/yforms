import { merge, forEach } from 'lodash';
import classNames from 'classnames';

import { YFormConfig } from './Form';
import { modifyType } from './ItemsType';
import { replaceMessage, getLabelLayout } from './utils';

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
      item: ({ formProps, itemProps, typeProps }) => {
        const _itemProps: modifyType['itemProps'] = {};
        const { required } = formProps;
        const { label, rules } = itemProps;
        const { formatStr, showType } = typeProps;

        const _message = typeof label === 'string' && replaceMessage(formatStr || '', { label });
        if (showType === 'input') {
          if (required) {
            let hasRequired = false;
            forEach(rules, (item) => {
              hasRequired = 'required' in item;
            });
            if (!hasRequired) {
              _itemProps.rules = [
                { required, message: _message || '此处不能为空' },
                ...(itemProps.rules || []),
              ];
            }
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
        const { formatStr, showType } = typeProps;

        const _message = typeof label === 'string' && replaceMessage(formatStr || '', { label });
        if (showType === 'input') {
          _componentProps.placeholder = _message || '';
        }
        return {
          componentProps: { ..._componentProps, ...componentProps },
        };
      },
    },
    // 判断 disabled 给没个 item 添加 disabled
    disabled: {
      item: ({ formProps, componentProps, typeProps }) => {
        const _componentProps: modifyType['componentProps'] = {};
        const { disabled } = formProps;
        const { showType } = typeProps;
        if (showType === 'input') {
          _componentProps.disabled = disabled;
        }
        return {
          componentProps: { ..._componentProps, ...componentProps },
        };
      },
    },
    // 查看情况下每个 item 并且 showType = input  使用 view 类型渲染
    view: {
      item: ({ itemProps, typeProps }) => {
        const { showType } = typeProps;
        let _itemProps;
        if (showType === 'input') {
          _itemProps = { className: 'mb0', type: 'view' };
        }
        return {
          itemProps: { ...itemProps, ..._itemProps },
        };
      },
    },
    // 搜索场景
    search: {
      form: ({ formProps }) => ({
        formProps: {
          ...formProps,
          className: classNames('yforms-search-form', formProps.className),
          // 搜索成功后不重置表单
          onCancel: () => {},
        },
      }),
      items: ({ itemsProps }) => {
        return { itemsProps: { noStyle: true, ...itemsProps } };
      },
      item: ({ itemProps, componentProps }) => {
        return {
          itemProps: { ...itemProps, label: undefined },
          componentProps: { placeholder: itemProps.label, ...componentProps },
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
