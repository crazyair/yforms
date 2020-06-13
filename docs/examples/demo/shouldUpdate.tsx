/**
 * title: 依赖字段判断隐藏显示
 * desc: isShow 为 function 可以得到 fieldsValue 判断该 type 隐藏显示
 */

import React from 'react';
import { YForm } from 'yforms';

const Demo = () => {
  return (
    <YForm name="basic" initialValues={{ type: '1' }}>
      {[
        {
          label: '开关',
          type: 'radio',
          name: 'type',
          componentProps: {
            options: [
              { name: '开', id: '1' },
              { name: '关', id: '2' },
            ],
          },
        },
        { label: '密码', type: 'password', name: 'password' },
        {
          label: '确认密码',
          type: 'password',
          name: 'confirm',
          dependencies: ['password'],
          rules: [
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Two passwords that you enter is inconsistent!');
              },
            }),
          ],
        },
        {
          noStyle: true,
          shouldUpdate: (prevValues, curValues) => prevValues.type !== curValues.type,
          children: ({ getFieldsValue }) => {
            const fieldsValue = getFieldsValue();
            return [
              {
                noStyle: true,
                isShow: fieldsValue.type === '2',
                dataSource: [{ label: '原生使用', type: 'input', name: 'children_field1' }],
              },
            ];
          },
        },
        {
          label: '精简使用',
          type: 'input',
          name: 'children_field2',
          shouldUpdate: (prevValues, curValues) => prevValues.type !== curValues.type,
          isShow: (values) => values.type === '2',
        },
      ]}
    </YForm>
  );
};

export default Demo;
