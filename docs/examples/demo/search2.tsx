/**
 * title: 搜索场景 2
 * desc: 搜索场景 2
 */

/* eslint-disable no-console */
import React from 'react';
import { YForm } from 'yforms';
import { Form, Row, Col } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

export default () => {
  const [expand, setExpand] = React.useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  // 表单字段可以单独抽离单独组建兼容表单搜索交互
  const fieldDom = [
    { type: 'input', name: 'field1', label: 'field1' },
    { type: 'input', name: 'field2', label: 'field2' },
    { type: 'input', name: 'field2', label: 'field2' },
    { type: 'rangePicker', name: 'field3', label: 'field3' },
  ];
  const fieldDom2 = [
    { type: 'input', name: 'field4', label: 'field4' },
    { type: 'input', name: 'field5', label: 'field5' },
    { type: 'input', name: 'field6', label: 'field6' },
    { type: 'input', name: 'field7', label: 'field7' },
  ];
  return (
    <div>
      <p>搜索场景 2</p>
      <YForm scenes={{ search: true }} form={form} name="search" onFinish={onFinish}>
        <Row>
          <YForm.Items>{[...fieldDom, ...(expand ? fieldDom2 : [])]}</YForm.Items>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <YForm.Item
              type="space"
              items={[
                {
                  type: 'space',
                  noStyle: true,
                  items: [
                    { type: 'submit' },
                    {
                      type: 'custom',
                      children: (
                        <a onClick={() => setExpand(!expand)}>
                          {expand ? <UpOutlined /> : <DownOutlined />} 更多
                        </a>
                      ),
                    },
                  ],
                },
              ]}
            />
          </Col>
        </Row>
      </YForm>
    </div>
  );
};
