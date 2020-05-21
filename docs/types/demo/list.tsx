/* eslint-disable no-console */
import React, { useState } from 'react';
import { Card } from 'antd';
import { YForm } from 'yforms';
import { YFormListComponentProps, YFormListProps } from 'yforms/lib/YForm/component/List';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

export default () => {
  const [disabled, setDisabled] = useState(false);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <YForm
      onFinish={onFinish}
      required
      {...layout}
      disabled={disabled}
      initialValues={{ phones: [{}], card: [{}], users: [{}] }}
    >
      {[
        {
          type: 'list',
          name: 'phones',
          componentProps: {
            showIcons: { showBottomAdd: { text: '添加手机号' }, showAdd: true, showRemove: false },
            onShowIcons: (): ReturnType<Required<YFormListComponentProps>['onShowIcons']> => ({
              showAdd: true,
              showRemove: true,
            }),
          },
          items: ({ index }): ReturnType<Extract<YFormListProps['items'], Function>> => {
            return [
              {
                label: index === 0 && '手机号',
                type: 'input',
                name: [index, 'phone'],
                // index > 0 后没有 label，无法得到 label 内容，需要用户自己添加 placeholder
                componentProps: { placeholder: '请输入手机号' },
              },
            ];
          },
        },
        {
          type: 'list',
          name: 'card',
          label: '卡片',
          componentProps: { showRightIcons: false },
          items: ({ index, icons }): ReturnType<Extract<YFormListProps['items'], Function>> => {
            return [
              {
                dataSource: [
                  <Card key="card" size="small" title={`card_${index + 1}`} extra={icons}>
                    <YForm.Items>
                      {[{ label: '手机号', type: 'input', name: [index, 'phone'] }]}
                    </YForm.Items>
                  </Card>,
                ],
              },
            ];
          },
        },
        {
          label: '用户',
          type: 'list',
          name: 'users',
          items: ({ index }): ReturnType<Extract<YFormListProps['items'], Function>> => {
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
        { type: 'submit' },
        {
          dataSource: [
            {
              type: 'button',
              noStyle: true,
              componentProps: {
                type: 'primary',
                onClick: () => setDisabled((c) => !c),
                children: '更改禁用状态',
              },
            },
          ],
        },
      ]}
    </YForm>
  );
};
