/* eslint-disable @typescript-eslint/no-unused-vars */
import { merge, forEach } from 'lodash';

import { YFormConfig } from './Form';
import { modifyType } from './ItemsType';
import { replaceMessage, getLabelLayout } from './utils';

const scenes: YFormConfig = {
  getScene: {
    base: {
      form: ({ formProps }) => ({
        formProps: { ...formProps },
      }),
      items: ({ itemsProps }) => {
        return {
          itemsProps: { noStyle: true, ...itemsProps },
          componentProps: { disable: true },
        };
      },
      item: ({ formProps, itemsProps, itemProps, componentProps, typeProps }) => {
        const _componentProps: modifyType['componentProps'] = {};
        let _itemProps: modifyType['itemProps'] = {};
        const { disabled, required } = formProps;
        const { label, rules } = itemProps;
        const { noField, formatStr } = typeProps;
        const _base = merge({}, formProps, itemsProps, itemProps);

        const { labelCol, wrapperCol, offset } = _base;
        const { noLabelLayoutValue, labelLayoutValue } = getLabelLayout({
          labelCol,
          wrapperCol,
          offset,
        });
        _itemProps = label ? labelLayoutValue : noLabelLayoutValue;

        const _placeholder =
          typeof label === 'string' && replaceMessage(formatStr || '', { label });

        if (!noField) {
          _componentProps.disabled = disabled;
          _componentProps.placeholder = _placeholder || '';
          if (required) {
            let hasRequired = false;
            forEach(rules, (item) => {
              hasRequired = 'required' in item;
            });
            if (!hasRequired) {
              _itemProps.rules = [
                { required, message: _placeholder || '此处不能为空' },
                ...(_itemProps.rules || []),
              ];
            }
          }
        }
        return {
          itemProps: { ..._itemProps, ...itemProps },
          componentProps: { ..._componentProps, ...componentProps },
        };
      },
    },
    noCol: {
      item: ({ itemProps }) => {
        return { itemProps: { ...itemProps, labelCol: {}, wrapperCol: {} } };
      },
    },
    noLabelLayout: {
      item: ({ formProps, itemsProps, itemProps }) => {
        const { label } = itemProps;
        const _base = merge({}, formProps, itemsProps, itemProps);
        const { wrapperCol } = _base;
        const _itemProps = label ? {} : { labelCol: {}, wrapperCol };
        return {
          itemProps: { ...itemProps, ..._itemProps },
        };
      },
    },
  },
};

export default scenes;
