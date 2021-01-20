import React, { useState } from 'react';
import { Button } from 'antd';
import { Form } from 'yforms-simple';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

export const delay = (timeout = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

const Demo = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const handleOnChange = () => {
    setVisible(false);
    form.resetFields();
  };
  return (
    <div>
      <Button onClick={() => setVisible(true)}>点击打开</Button>
      <Form.FormModal
        title="模态表单"
        visible={visible}
        onCancel={() => handleOnChange()}
        formProps={{
          ...layout,
          form,
          onFinish: (values) => {
            console.log('v', values);
            handleOnChange();
          },
        }}
        formFooter={[
          {
            type: 'button',
            noStyle: true,
            componentProps: { children: '取消', onClick: () => handleOnChange() },
          },
          {
            type: 'button',
            noStyle: true,
            componentProps: { children: '提交', type: 'primary', htmlType: 'submit' },
          },
        ]}
      >
        {[{ type: 'input', name: 'age', label: 'age' }]}
      </Form.FormModal>
    </div>
  );
};
export default Demo;
