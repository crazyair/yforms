/* eslint-disable no-console */
import React from 'react';
import { Input } from 'antd';
import { YForm } from 'yforms';

export default () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onSave = (values: any) => {
    console.log('values:', values);
  };

  return (
    <YForm onFinish={onFinish} onFinishFailed={onFinishFailed} onSave={onSave}>
      {[
        { type: 'input', label: '文本', name: 'input' },
        { type: 'money', label: '金额', name: 'money' },
        {
          type: 'textarea',
          label: '文本域',
          name: 'textarea',
          extra: '有长度校验（中文为 2 个字符）',
          componentProps: { inputMax: 2 },
        },
        { type: 'checkbox', label: '单选', name: '单选', componentProps: { children: '已阅读' } },
        {
          type: 'checkboxGroup',
          label: '多选',
          name: '多选',
          componentProps: {
            options: [
              { id: '1', name: '开' },
              { id: '2', name: '关' },
            ],
          },
        },
        {
          type: 'switch',
          label: '开关',
          name: '开关',
          componentProps: { checkedChildren: '开', unCheckedChildren: '关' },
        },
        {
          type: 'select',
          label: '下拉框',
          name: '下拉框',
          componentProps: {
            optionLabelProp: 'label',
            onAddProps: (item) => ({ label: `(${item.name})` }),
            showField: (record) => (
              <div>
                <div>{record.id}</div>-{record.name}
              </div>
            ),
            options: [
              { id: '1', name: '开' },
              { id: '2', name: '关' },
            ],
          },
        },
        {
          type: 'radio',
          label: '开关',
          name: '开关',
          componentProps: {
            showField: (record) => `${record.id}-${record.name}`,
            postField: 'id',
            options: [
              { id: '1', name: '开' },
              { id: '2', name: '关' },
            ],
          },
        },
        { label: '文本', name: 'text', type: 'text' },
        { label: '自定义渲染', type: 'custom', name: 'custom', children: <Input /> },
        { type: 'submit' },
      ]}
    </YForm>
  );
};
