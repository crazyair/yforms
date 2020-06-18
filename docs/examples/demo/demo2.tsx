/**
 * title: format unFormat 使用
 * desc: 日期场景下修改初始化值，提交修改提交值，数据对比也可以共享该配置。
 */

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { YForm } from 'yforms';
import moment from 'moment';

const Demo = () => {
  const [form] = YForm.useForm();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const count = useRef(1);
  const [diff, setDiff] = useState(false);

  const loadData = useCallback(() => {
    setTimeout(() => {
      setData({
        name: `原值_${count.current}`,
        start: '1591943666',
        end: '1592116466',
        date: '1591943666',
        phones: [{ start: '1591943666', end: '1592116466' }],
        list: [{ age: '10' }],
      });
      count.current += 1;
      setLoading(false);
    }, 10);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onFinish = (values: any) => {
    loadData();
    console.log('Success:', values);
  };

  return (
    <YForm
      name="basic"
      form={form}
      loading={loading}
      onFinish={onFinish}
      initialValues={data}
      oldValues={{
        date: '1592030066',
        start: '1591943666',
        end: '1592030066',
        name: `原值_2`,
        phones: [{ start: '1591943666', end: '1592030066' }],
      }}
      scenes={{ diff }}
    >
      {[
        {
          type: 'input',
          label: '全格式化',
          name: 'name',
          unFormat: (value) => value && `${value}_unFormat`,
          format: (value) => value && `${value}_format`,
        },
        {
          type: 'datePicker',
          label: '日期',
          name: 'date',
          unFormat: (value) => value && moment.unix(value),
          format: (value) => value && `${moment(value).unix()}`,
        },
        {
          type: 'rangePicker',
          name: 'range',
          label: '日期区间',
          unFormat: (_, { start, end }) => {
            return [start && moment.unix(start), end && moment.unix(end)];
          },
          format: [
            { name: 'range', isOmit: true },
            {
              name: 'start',
              format: (_, { range = [] }) => range[0] && `${moment(range[0]).unix()}`,
            },
            {
              name: 'end',
              format: (_, { range = [] }) => range[1] && `${moment(range[1]).unix()}`,
            },
          ],
        },
        {
          type: 'list',
          label: '动态数组日期',
          name: 'phones',
          componentProps: { isUseIconStyle: false },
          items: ({ index }) => {
            return [
              {
                type: 'rangePicker',
                name: [index, 'range'],
                unFormat: (_, { start, end }) => {
                  return [start && moment.unix(start), end && moment.unix(end)];
                },
                format: [
                  { name: [index, 'range'], isOmit: true },
                  {
                    name: [index, 'start'],
                    format: (_, { range = [] }) => range[0] && `${moment(range[0]).unix()}`,
                  },
                  {
                    name: [index, 'end'],
                    format: (_, { range = [] }) => range[1] && `${moment(range[1]).unix()}`,
                  },
                ],
              },
            ];
          },
        },
        {
          type: 'list',
          label: '动态数组日期',
          name: 'list',
          items: ({ index }) => {
            return [
              {
                type: 'input',
                name: [index, 'age'],
                unFormat: (value) => {
                  return value && `${value}_unFormat`;
                },
              },
            ];
          },
        },
        { type: 'submit' },
        {
          scenes: { disabled: false },
          type: 'space',
          items: [
            {
              type: 'button',
              componentProps: {
                onClick: () => console.log(form.getFieldsValue()),
                children: '获取表单当前数据',
              },
            },
            {
              type: 'button',
              componentProps: {
                onClick: () => console.log(form.getFormatFieldsValue()),
                children: '获取表单提交时候数据',
              },
            },
            {
              type: 'button',
              componentProps: {
                onClick: () => setDiff((c) => !c),
                children: '切换数据对比',
              },
            },
          ],
        },
      ]}
    </YForm>
  );
};
export default Demo;
