/**
 * title: 一套字段配置用于搜索和表单场景
 * desc: 只需要全局配置 `getScene` 即可使用该场景
 */

/* eslint-disable no-console */
import React from 'react';
import { YForm } from 'yforms';
import { Form, Button, Row, Col } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import QueueAnim from 'rc-queue-anim';
import './index.less';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

YForm.Config({
  getScene: {
    search: {
      form: ({ formProps }) => ({
        formProps: {
          ...formProps,
          required: false,
          // 搜索成功后不重置表单
          onCancel: () => {},
        },
      }),
      items: ({ itemsProps }) => {
        return { itemsProps: { noStyle: true, ...itemsProps } };
      },
      item: ({ itemProps, componentProps }) => {
        return {
          itemProps: { ...itemProps, label: undefined },
          componentProps: { placeholder: itemProps.label, ...componentProps },
        };
      },
    },
  },
});

export default () => {
  const [expand, setExpand] = React.useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  // 表单字段可以单独抽离单独组建兼容表单搜索交互
  const fieldDom = (
    <YForm.Items>
      {[
        { type: 'input', name: 'field1', label: 'field1' },
        { type: 'input', name: 'field2', label: 'field2' },
        { type: 'input', name: 'field3', label: 'field3' },
      ]}
    </YForm.Items>
  );
  const fieldDom2 = (
    <YForm.Items>
      {[
        { type: 'input', name: 'field4', label: 'field4' },
        { type: 'input', name: 'field5', label: 'field5' },
        { type: 'input', name: 'field6', label: 'field6' },
        { type: 'input', name: 'field7', label: 'field7' },
      ]}
    </YForm.Items>
  );
  return (
    <div>
      <p>搜索场景</p>
      <YForm scene="search" form={form} name="search" className="search-form" onFinish={onFinish}>
        <Row style={{ marginBottom: 16 }}>
          <Col span={18}>
            <Row>{fieldDom}</Row>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={() => form.resetFields()}>
              清空
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={() => setExpand(!expand)}>
              {expand ? <UpOutlined /> : <DownOutlined />} 更多
            </a>
          </Col>
        </Row>
        <QueueAnim type={['top', 'top']}>{expand && <Row key="必须">{fieldDom2}</Row>}</QueueAnim>
      </YForm>
      <p>普通场景</p>
      <YForm required {...layout} name="base_form" onFinish={onFinish}>
        {fieldDom}
        {fieldDom2}
        {[{ type: 'submit' }]}
      </YForm>
    </div>
  );
};
