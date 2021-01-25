/**
 * title: 基础使用
 * desc: 默认使用场景
 */
import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'yforms-simple';
import moment from 'moment';

import { delay, layout, tailLayout } from './utils';

type FieldsType = {
  age?: string;
  start?: string;
  end?: string;
  gender?: string;
  range?: moment.Moment[];
  list?: { age?: string }[];
};

const Demo = () => {
  const [form] = Form.useForm();
  const [detail, setDetail] = useState<FieldsType>({});
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const loadData = useCallback(async () => {
    await delay(250);
    setDetail({
      age: '1',
      gender: '1',
      start: '1610767167',
      end: '1611767667',
      list: [{ age: '10' }],
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Form<FieldsType>
      {...layout}
      form={form}
      onFinish={(values) => {
        console.log('v', values);
      }}
      loading={loading}
      initialValues={detail}
    >
      {[
        { label: '年龄', type: 'input', name: 'age', componentProps: { disabled } },
        {
          label: '性别',
          type: 'radio',
          name: 'gender',
          componentProps: {
            disabled,
            options: [
              { id: '1', name: '男' },
              { id: '2', name: '女' },
            ],
          },
        },
        {
          type: 'rangePicker',
          name: 'range',
          label: '日期区间',
          componentProps: { disabled },
          initFormat: (_, { start, end }) => {
            return [start && moment.unix(Number(start)), end && moment.unix(Number(end))];
          },
          format: [
            { name: 'range', removeField: true },
            {
              name: 'start',
              format: (_, { range = [] }) => range[0] && `${moment(range[0]).format('L')}`,
            },
            {
              name: 'end',
              format: (_, { range = [] }) => range[1] && `${moment(range[1]).format('L')}`,
            },
          ],
        },
        {
          type: 'list',
          noStyle: true,
          label: '动态数组',
          componentProps: {
            name: 'list',
            disabled,
            items: ({ index, field, icons }) => {
              return [
                {
                  type: 'input',
                  ...field,
                  label: index === 0 ? '动态数组' : undefined,
                  ...(index === 0 ? layout : tailLayout),
                  fieldKey: [field.fieldKey, 'age'],
                  name: [field.name, 'age'],
                  container: (children) => {
                    return (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>{children}</div>
                        {!disabled && <div style={{ paddingLeft: 5 }}>{icons}</div>}
                      </div>
                    );
                  },
                  componentProps: { disabled },
                },
              ];
            },
          },
        },
        {
          type: 'space',
          ...tailLayout,
          componentProps: {
            items: () => {
              return [
                {
                  type: 'button',
                  componentProps: { children: '提交', type: 'primary', htmlType: 'submit' },
                },
                {
                  type: 'button',
                  componentProps: { children: '重置', onClick: () => form.resetFields() },
                },
                {
                  type: 'button',
                  componentProps: { children: '切换状态', onClick: () => setDisabled((c) => !c) },
                },
              ];
            },
          },
        },
      ]}
    </Form>
  );
};
export default Demo;
