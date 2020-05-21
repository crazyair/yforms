import { YFormConfig } from './Form';

const scenes: YFormConfig = {
  getScene: {
    base: {
      form: ({ formProps }) => ({
        formProps: { ...formProps },
      }),
      items: ({ formProps, itemsProps }) => {
        const { disabled } = formProps;
        return {
          itemsProps: { disabled, noStyle: true, ...itemsProps },
        };
      },
      item: ({ itemProps, componentProps }) => {
        return {
          itemProps: { ...itemProps },
          componentProps: { placeholder: itemProps.label, ...componentProps },
        };
      },
    },
  },
};

export default scenes;
