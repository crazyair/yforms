/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { YForm } from 'yforms';
import { message, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import { omit } from 'lodash';

moment.locale('zh-cn');

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };
const options = [
  { id: '1', name: '语文' },
  { id: '2', name: '数学' },
];

const initialValues = {
  name: '张三',
  age: '10',
  文本域: '这里是长文本',
  text: '这里是文本',
  custom: '这里是自定义文本',
  money: '999999999',
  单选: true,
  开关: true,
  多选: ['1', '2'],
  下拉框多选: ['1', '2'],
  下拉框: '1',
  单选按钮: '1',
  users: [
    { name: '张三', age: '10' },
    { name: '李四', age: '20' },
  ],
  phones: [{ phone: '17777777777' }, { phone: '18888888888' }, {}],
  date: moment(),
  range: [moment(), moment()],
};
const oldValues = {
  name: '张三1',
  phones: [{ phone: '17777777777' }, { phone: '18888888881' }, { phone: '18888888888' }],
  users: [{ name: '李四2', age: '30' }],
  多选: ['1'],
  money: '999999998',
  下拉框: '2',
  单选: true,
  单选按钮: '2',
  文本域: '这里是长文本2',
  下拉框多选: ['2'],
  date: moment('2020-01-01 12:00:00'),
  range: [moment('2020-01-01 12:00:00'), moment('2020-01-01 12:00:00')],
};

const Demo = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [form] = YForm.useForm();

  const { submit, disabled } = YForm.useSubmit();

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
      {...layout}
      form={form}
      submit={submit}
      name="basic"
      // initialValues={data}
      onFinish={onFinish}
      loading={loading}
      onFinishFailed={onFinishFailed}
      onSave={onSave}
      onCancel={({ changeDisabled }) => changeDisabled(!disabled)}
      scenes={{ view: disabled, diff: false }}
      params={{ type: 'create' }}
      diffProps={{ oldValues }}
      required
    >
      {[
        // {
        //   type: 'button',
        //   scenes: { disabled: false },
        //   componentProps: { onClick: () => setView((c) => !c), children: '查看表单' },
        // },
        // { type: 'custom', component: 1, label: 'xx' },
        // { type: 'input', label: '空值', name: 'names' },
        {
          type: 'list',
          name: 'phones',
          initialValue: [{}, {}],
          items: ({ index, field }) => {
            return [
              {
                isListField: true,
                label: index === 0 && '手机号',
                type: 'input',
                fieldKey: [field.fieldKey, 'phone'],
                name: [field.name, 'phone'],
                componentProps: { placeholder: '请输入手机号' },
              },
              {
                label: '用户',
                type: 'list',
                initialValue: [{}, {}],
                name: [field.name, 'users'],
                items: ({ field }) => {
                  // console.log('field', field);
                  // name: 0, key: 0, isListField: true, fieldKey
                  return [
                    {
                      type: 'oneLine',
                      isListField: true,
                      componentProps: { oneLineStyle: ['50%', 8, '50%'] },
                      items: () => [
                        {
                          label: '姓名',
                          // ...field,
                          // fieldKey: [field.fieldKey, 'name'],
                          isListField: true,
                          type: 'input',
                          name: [field.name, 'name'],
                        },
                        <span key="center" />,
                        {
                          label: '年龄',
                          // ...field,
                          isListField: true,
                          type: 'input',
                          name: [field.name, 'age'],
                        },
                      ],
                    },
                  ];
                },
              },
            ];
          },
        },
        // {
        //   label: '用户',
        //   type: 'list',
        //   name: 'users',
        //   items: ({ index }) => {
        //     return [
        //       {
        //         type: 'oneLine',
        //         componentProps: { oneLineStyle: ['50%', 8, '50%'] },
        //         items: () => [
        //           { label: '姓名', type: 'input', name: [index, 'name'] },
        //           <span key="center" />,
        //           { label: '年龄', type: 'input', name: [index, 'age'] },
        //         ],
        //       },
        //     ];
        //   },
        // },
        // {
        //   type: 'input',
        //   label: '姓名',
        //   name: 'name',
        //   format: (value) => `${value} 修改了`,
        // },
        // {
        //   type: 'datePicker',
        //   label: '日期',
        //   name: 'date',
        //   // initialValue: moment('2020-01-01 12:00:00'),
        //   // componentProps: { showTime: true },
        //   componentProps: { picker: 'quarter' },
        //   // viewProps: { format: (value) => moment(value).format('YYYY-MM-DD') },
        //   // format: ({ date }) => moment(date).format('YYYY-MM-DD'),
        //   // unFormat: () => moment('2021-01-01 12:00:00'),
        // },
        // { label: '开关', type: 'radio', name: 'type', componentProps: { options } },
        // {
        //   label: '精简使用',
        //   type: 'input',
        //   name: 'children_field2',
        //   format: ({ date }) => moment(date).format('YYYY-MM-DD'),
        //   shouldUpdate: (prevValues, curValues) => prevValues.type !== curValues.type,
        //   isShow: (values) => values.type === '2',
        // },
        // {
        //   type: 'rangePicker',
        //   label: '日期区间',
        //   name: 'range',
        //   scenes: { required: false },
        //   // format: (value = []) => {
        //   //   return `${moment(value[0]).format('YYYY-MM-DD')}-${moment(value[1]).format(
        //   //     'YYYY-MM-DD',
        //   //   )}`;
        //   // },
        //   format: (value = []) => {
        //     return {
        //       start: `${moment(value[0]).format('YYYY-MM-DD')}-${moment(value[1]).format(
        //         'YYYY-MM-DD',
        //       )}`,
        //     };
        //   },
        //   // format: [
        //   //   { name: 'range', format: () => undefined },
        //   //   { name: 'start', format: (_, { range }) => moment(range[0]).format('YYYY-MM-DD') },
        //   //   { name: 'end', format: (_, { range }) => moment(range[1]).format('YYYY-MM-DD') },
        //   // ],
        // },
        // {
        //   type: 'money',
        //   label: '金额',
        //   componentProps: { addonAfter: '其它', suffix: '元' },
        //   name: 'money',
        // },
        // { type: 'textarea', label: '文本域', name: '文本域', componentProps: { inputMax: 2 } },
        // { type: 'checkbox', label: '单选', name: '单选', componentProps: { children: '已阅读' } },
        // {
        //   type: 'checkboxGroup',
        //   label: '多选',
        //   name: '多选',
        //   componentProps: { options },
        // },
        // {
        //   type: 'switch',
        //   label: '开关',
        //   name: '开关',
        //   componentProps: { checkedChildren: '开', unCheckedChildren: '关' },
        // },
        // {
        //   type: 'select',
        //   label: '下拉框',
        //   name: '下拉框',
        //   componentProps: {
        //     // optionLabelProp: 'checked-value',
        //     // onAddProps: (item) => ({ 'checked-value': `(${item.name})` }),
        //     // // onAddProps: (item) => ({ 'checked-value': <span>({item.name})</span> }),
        //     // showField: (record) => `${record.id}-${record.name}`,
        //     options,
        //   },
        // },
        // {
        //   type: 'select',
        //   label: '下拉框多选',
        //   name: '下拉框多选',
        //   componentProps: { mode: 'multiple', options },
        // },
        // {
        //   type: 'radio',
        //   label: '单选按钮',
        //   name: '单选按钮',
        //   componentProps: { showField: (record) => `${record.id}-${record.name}`, options },
        // },
        // { label: '文本', name: 'text', type: 'text' },
        // {
        //   label: '自定义渲染',
        //   type: 'custom',
        //   name: 'custom',
        //   component: <Input />,
        // },
        { type: 'submit' },
        // {
        //   type: 'button',
        //   componentProps: {
        //     onClick: () => message.success(JSON.stringify(form.getFormatFieldsValue())),
        //     children: '获取提交前数据',
        //   },
        // },
        // {
        //   type: 'button',
        //   componentProps: {
        //     onClick: () => setIsShow((c) => !c),
        //     children: '获取提交前数据',
        //   },
        // },
      ]}
    </YForm>
  );
};
export default Demo;
