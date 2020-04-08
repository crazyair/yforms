/* eslint-disable no-console */
import React from 'react';
import { YForm } from 'father-doc-yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

YForm.Config({
  getScene: {
    search: ({ itemProps, componentProps, itemsProps }) => {
      const _itemProps = { ...itemProps, label: undefined };
      const _componentProps = { placeholder: itemProps.label, ...componentProps };
      const _itemsProps = { ...itemsProps };
      return {
        itemProps: _itemProps,
        itemsProps: _itemsProps,
        componentProps: _componentProps,
        plugins: { required: false },
      };
    },
  },
});

export default () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <YForm scene="search" {...layout} required onFinish={onFinish}>
      {[{ type: 'input', label: '姓名', name: 'name' }, { type: 'submit' }]}
    </YForm>
  );
};
