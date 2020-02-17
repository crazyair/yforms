/* eslint-disable no-console */
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { YForm } from 'father-doc-yform';
import './demo.less';

// const { ConfigConsumer } = 'antd/lib/config-provider';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Demo: React.FC<RouteComponentProps> = props => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      // await form.validateFields();
      // setTimeout(() => {
      //   setVisible(false);
      //   setConfirmLoading(false);
      // }, 2000);
      setVisible(false);
      setConfirmLoading(false);
    } catch (error) {
      console.log('err', error);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onSave = async (values: any) => {
    console.log('values:', values);
  };
  return (
    <>
      <Button type="link" onClick={() => setVisible(true)}>
        打开弹窗
      </Button>

      <Modal
        title="Title"
        // visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose
      >
        <YForm
          // form={form}
          {...layout}
          onFinish={onFinish}
          onSave={onSave}
          onFinishFailed={onFinishFailed}
          params={{ type: 'create' }}
          required
        >
          <YForm.Items>
            {[{ type: 'input', name: 'age', label: '姓名' }, { type: 'submit' }]}
          </YForm.Items>
        </YForm>
        <div className="ant-modal-footer">13</div>
      </Modal>

      <Modal visible={visible} destroyOnClose footer={null} title="demo" wrapClassName="yform">
        <YForm
          {...layout}
          required
          onFinish={onFinish}
          onSave={onSave}
          onFinishFailed={onFinishFailed}
          onCancel={() => setVisible(false)}
          params={{ type: 'create' }}
        >
          <div className="ant-modal-body-children">
            <YForm.Items>{[{ type: 'input', name: 'age', label: '姓名' }]}</YForm.Items>
          </div>
          <div className="ant-modal-footer">
            <YForm.Items>{[{ type: 'submit' }]}</YForm.Items>
          </div>
        </YForm>
      </Modal>
    </>
  );
};
export default Demo;
