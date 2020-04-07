/* eslint-disable no-console */
import React from 'react';
import { YForm } from 'father-doc-yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

YForm.Config({
  setScene: {
    search: ({ formItemProps, componentProps, itemsProps, itemProps }) => {
      const _formItemProps = { ...formItemProps };
      const _componentProps = { ...componentProps };
      const _itemProps = { ...itemProps };
      const _itemsProps = { ...itemsProps };
      return {
        formItemProps: _formItemProps,
        componentProps: _componentProps,
        itemsProps: _itemsProps,
        itemProps: _itemProps,
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
