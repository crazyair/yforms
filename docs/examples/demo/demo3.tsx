/* eslint-disable no-console */
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { YForm } from 'yforms';

const Demo: React.FC<RouteComponentProps> = () => {
  const [visible, setVisible] = useState(false);

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

  return (
    <>
      <Button type="link" onClick={() => setVisible(true)}>
        打开弹窗
      </Button>
      <Modal
        visible={visible}
        maskClosable
        destroyOnClose
        onCancel={handleCancel}
        footer={null}
        bodyStyle={{ padding: 0 }}
        title="弹窗表单"
      >
        <YForm
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onCancel={handleCancel}
          params={{ type: 'create' }}
        >
          <YForm.Items className="ant-modal-body">
            {[{ type: 'input', name: 'age', label: '姓名' }]}
          </YForm.Items>
          <YForm.Items className="ant-modal-footer">
            {[
              {
                type: 'submit',
                componentProps: { reverseBtns: true, spaceProps: { noStyle: true } },
              },
            ]}
          </YForm.Items>
        </YForm>
      </Modal>
    </>
  );
};
export default Demo;
