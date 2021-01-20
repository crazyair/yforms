import { findIndex, set } from 'lodash';
import { ItemsType } from '../form';

export interface BasePluginsProps {
  item?: (p: { itemProps: ItemsType }) => ItemsType;
}

export interface FormPluginsTypeDefine {
  placeholder: BasePluginsProps;
  required: BasePluginsProps;
}

// type 做可为空处理
export type FormPluginsType = {
  [P in keyof FormPluginsTypeDefine]?: FormPluginsTypeDefine[P] | boolean;
};

const getTypeMessage = (itemProps: ItemsType) => {
  const { type, label = '此项' } = itemProps;
  let formatStr = '';
  switch (type) {
    case 'input':
    case 'password':
      formatStr = `请输入${label}`;
      break;
    case 'radio':
      formatStr = `请选择${label}`;
      break;
    default:
      break;
  }
  return formatStr;
};

export const plugins: FormPluginsType = {
  placeholder: {
    item: ({ itemProps }) => {
      const placeholder = getTypeMessage(itemProps);
      if (placeholder) {
        return { componentProps: { placeholder } };
      }
    },
  },
  required: {
    item: ({ itemProps }) => {
      const _rules = itemProps.rules;
      const index = findIndex(_rules, { required: true });
      const placeholder = getTypeMessage(itemProps);
      if (index > -1 && placeholder) {
        set(_rules, [index, 'message'], placeholder);
        return { rules: _rules };
      }
    },
  },
};

export default plugins;
