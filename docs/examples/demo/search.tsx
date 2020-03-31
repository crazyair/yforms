/* eslint-disable no-console */
import React from 'react';
import { YForm } from 'father-doc-yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

YForm.Config({
  setScene: {
    search: ({ fieldProps, componentProps, type, plugins }) => {
      const _fProps = { ...fieldProps };
      const _cProps = { ...componentProps };
      console.log('type, plugins ', type, plugins);
      return [_fProps, _cProps];
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
