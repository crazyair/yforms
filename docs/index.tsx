import React from 'react';
import { Input } from 'antd';
import { YForm } from 'yforms';
import { YFormItemProps } from 'yforms/es/YForm/Items';

const Demo = () => {
  return (
    <div>
      <YForm initialValues={{ list: [{}, {}], list2: [{}, {}] }}>
        JSX
        <YForm.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
          <Input placeholder="请输入姓名" />
        </YForm.Item>
        <YForm.Item
          label="数组"
          name="list"
          type="list"
          items={({ index, icons, layoutStyles }) => {
            const label = '数组';
            return (
              <YForm.Item
                componentProps={{ style: layoutStyles[0] }}
                label={index === 0 && label}
                hideLable={label}
                name={[index, 'age']}
                type="input"
                addonAfter={<div style={layoutStyles[1]}>{icons}</div>}
              />
            );
          }}
        />
        配置
        {[
          { type: 'input', label: '姓名', name: 'name2' },
          {
            type: 'list',
            name: 'list2',
            label: '数组',
            items: ({ index }): YFormItemProps['children'] => [
              { type: 'input', name: [index, 'age'] },
            ],
          },
        ]}
      </YForm>
    </div>
  );
};
export default Demo;
