/**
 * title: 动态获取数据
 * desc: '`getOptions` 用于接口返回数据，并能根据表单当前值对数处理（尝试修改 optionName 字段值）'
 */

import React from 'react';
import { YForm } from 'yforms';
import { OptionsType } from 'yforms/lib/YForm/ItemsType';

const getOptions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1));
  return [
    { id: '1', name: '男' },
    { id: '2', name: '女' },
  ];
};

const Demo = () => {
  return (
    <YForm>
      {[
        { type: 'input', name: 'optionName', label: 'optionName' },
        {
          type: 'radio',
          label: 'list',
          name: 'list',
          shouldUpdate: (prev, current) => prev.optionName !== current.optionName,
          componentProps: {
            getOptions: async (value, values) => {
              const data = await getOptions();
              if (values.optionName) {
                data[0].name = values.optionName;
              }
              return data;
            },
          },
        },
        {
          type: 'radio',
          label: '已选中',
          name: 'check',
          shouldUpdate: (prev, current) => prev.check !== current.check,
          componentProps: {
            getOptions: async (value) => {
              const data: OptionsType[] = await getOptions();
              data.map((item) => {
                if (item.id === value) {
                  item.name = `${item.name}（已选中）`;
                  item.disabled = true;
                } else {
                  item.name = `${item.name}（未选中）`;
                  item.disabled = false;
                }
                return item;
              });
              return data;
            },
          },
        },
      ]}
    </YForm>
  );
};

export default Demo;
