/**
 * title: 动态获取数据
 * desc: '`getOptions` 用于接口返回数据，并能根据表单当前值对数处理（尝试修改 optionName 字段值）'
 */

import React from 'react';
import { YForm } from 'yforms';

const options = [
  { id: '1', name: '男' },
  { id: '2', name: '女' },
];

const Demo = () => {
  return (
    <YForm>
      {[
        { type: 'select', label: 'select', name: 'list', componentProps: { options } },
        { type: 'radio', label: 'radio', name: 'list', componentProps: { options } },
        {
          type: 'checkboxGroup',
          label: 'checkboxGroup',
          name: 'list',
          componentProps: { options },
        },
      ]}
    </YForm>
  );
};

export default Demo;
