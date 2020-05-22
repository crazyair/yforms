/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { YForm } from 'yforms';
import { message, Input } from 'antd';
import moment from 'moment';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };
const options = [
  { id: '1', name: '语文' },
  { id: '2', name: '数学' },
];

const Demo = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [form] = YForm.useForm();

  useEffect(() => {
    setTimeout(() => {
      setData({
        name: '张三',
        age: '10',
        textarea: '这里是长文本',
        text: '这里是文本',
        custom: '这里是自定义文本',
        money: '999999999',
        单选: true,
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
      });
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
  const [view, setView] = useState(true);

  return (
    <YForm
      {...layout}
      form={form}
      name="basic"
      initialValues={data}
      onFinish={onFinish}
      loading={loading}
      onFinishFailed={onFinishFailed}
      onSave={onSave}
      scenes={{ view }}
      disabled={view}
      required
    >
      {[
        {
          type: 'button',
          componentProps: { onClick: () => setView((c) => !c), children: '查看表单' },
        },
        // { type: 'custom', component: 1, label: 'xx' },
        { type: 'input', label: '空值', name: 'names' },
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
                  <span key="center" />,
                  { label: '年龄', type: 'input', name: [index, 'age'] },
                ],
              },
            ];
          },
        },
        {
          type: 'input',
          label: 'name',
          name: 'name',
          format: ({ name }) => `${name} 修改了`,
        },
        {
          type: 'datePicker',
          label: 'date',
          name: 'date',
          componentProps: { style: { width: '100%' } },
          format: ({ date }) => moment(date).format('YYYY-MM-DD'),
        },
        {
          type: 'money',
          label: 'money',
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
          label: 'radio',
          name: 'radio',
          componentProps: {
            showField: (record) => `${record.id}-${record.name}`,
            postField: 'id',
            options,
          },
        },
        { label: '文本', name: 'text', type: 'text' },
        {
          label: '自定义渲染',
          // showType: 'input',
          type: 'custom',
          name: 'custom',
          component: <Input />,
        },
        { type: 'submit' },
        {
          type: 'button',
          componentProps: {
            onClick: () => message.success(JSON.stringify(form.getFormatFieldsValue())),
            children: '获取提交前数据',
          },
        },
      ]}
    </YForm>
  );
};
export default Demo;
