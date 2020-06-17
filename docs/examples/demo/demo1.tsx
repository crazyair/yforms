/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { YForm } from 'yforms';
import { message, Input } from 'antd';
import moment from 'moment';

const options = [
  { id: '1', name: '语文' },
  { id: '2', name: '数学' },
];

const initialValues = {
  name: '张三',
  age: '10',
  textarea: '这里是长文本',
  text: '这里是文本',
  custom: '这里是自定义文本',
  money: '999999999',
  单选: true,
  开关: true,
  多选: ['1', '2'],
  下拉框多选: ['1', '2'],
  下拉框: '1',
  radio: '1',
  users: [
    { name: '张三', age: '10' },
    { name: '李四', age: '20' },
  ],
  phones: [{ phone: '18888888888' }, { phone: '18888888888' }],
  date: moment(),
};

const Demo = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [form] = YForm.useForm();

  const {
    submit,
    submit: { disabled },
  } = YForm.useSubmit({ params: { type: 'view', id: '1' } });
  useEffect(() => {
    setTimeout(() => {
      setData(initialValues);
      setLoading(false);
    }, 10);
  }, []);

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
    <YForm
      form={form}
      submit={submit}
      name="basic"
      initialValues={data}
      onFinish={onFinish}
      loading={loading}
      onFinishFailed={onFinishFailed}
      onSave={onSave}
      scenes={{ view: disabled }}
    >
      {[
        // {
        //   type: 'button',
        //   scenes: { disabled: false },
        //   componentProps: { onClick: () => setView((c) => !c), children: '查看表单' },
        // },
        // { type: 'custom', component: 1, label: 'xx' },
        { type: 'input', label: '空值', name: 'names', scenes: { base: false } },
        {
          type: 'list',
          name: 'phones',
          componentProps: {
            showIcons: { showBottomAdd: { text: '添加手机号' }, showAdd: true, showRemove: false },
            onShowIcons: () => ({
              showAdd: true,
              showRemove: true,
            }),
          },
          items: ({ index }) => {
            return [
              {
                label: index === 0 && '手机号',
                type: 'input',
                name: [index, 'phone'],
                componentProps: { placeholder: '请输入手机号' },
              },
            ];
          },
        },
        {
          label: '用户',
          type: 'list',
          name: 'users',
          items: ({ index }) => {
            return [
              {
                type: 'oneLine',
                componentProps: { oneLineStyle: ['50%', 8, '50%'] },
                items: () => [
                  { label: '姓名', type: 'input', name: [index, 'name'] },
                  { type: 'custom', component: <span /> },
                  { label: '年龄', type: 'input', name: [index, 'age'] },
                ],
              },
            ];
          },
        },
        {
          type: 'input',
          label: '姓名',
          name: 'name',
          format: ({ name }) => `${name} 修改了`,
        },
        {
          type: 'datePicker',
          label: '日期',
          name: 'date',
          componentProps: { style: { width: '100%' } },
          format: ({ date }) => moment(date).format('YYYY-MM-DD'),
        },
        {
          type: 'money',
          label: '金额',
          componentProps: { suffix: '元' },
          name: 'money',
        },
        { type: 'textarea', label: '文本域', name: 'textarea' },
        { type: 'checkbox', label: '单选', name: '单选', componentProps: { children: '已阅读' } },
        {
          type: 'checkboxGroup',
          label: '多选',
          name: '多选',
          componentProps: { options },
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
            optionLabelProp: 'checked-value',
            onAddProps: (item) => ({ 'checked-value': `(${item.name})` }),
            showField: (record) => `${record.id}-${record.name}`,
            options,
          },
        },
        {
          type: 'select',
          label: '下拉框多选',
          name: '下拉框多选',
          componentProps: { mode: 'multiple', options },
        },
        {
          type: 'radio',
          label: '单选按钮',
          name: 'radio',
          componentProps: { showField: (record) => `${record.id}-${record.name}`, options },
        },
        { label: '文本', name: 'text', type: 'text' },
        {
          label: '自定义渲染',
          type: 'custom',
          name: 'custom',
          component: <Input />,
        },
        {
          type: 'space',
          items: [
            { type: 'submit' },
            {
              type: 'button',
              componentProps: {
                onClick: () => message.success(JSON.stringify(form.getFormatFieldsValue())),
                children: '获取提交前数据',
              },
            },
          ],
        },
      ]}
    </YForm>
  );
};
export default Demo;
