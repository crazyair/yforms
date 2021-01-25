/**
 * title: formModal
 * desc: 模态表单
 */
import React, { useState } from 'react';
import { Button } from 'antd';
import { Form } from 'yforms-simple';
import { layout } from './utils';

const Demo = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const handleOnChange = () => {
    setVisible(false);
    form.resetFields();
  };
  return (
    <div>
      <Button onClick={() => setVisible(true)}>点击打开表单</Button>
      <Form.FormModal
        title="模态表单"
        visible={visible}
        onCancel={() => handleOnChange()}
        destroyOnClose
        formProps={{
          ...layout,
          form,
          plugins: { required: { enable: true } },
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
        {[
          {
            type: 'input',
            componentProps: { autoFocus: true },
            name: 'age',
            label: 'age',
            rules: [{ required: true }],
          },
        ]}
      </Form.FormModal>
    </div>
  );
};
export default Demo;
