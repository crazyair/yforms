/* eslint-disable no-console */
import React, { useState } from 'react';
import { YForm } from 'yforms';
import { Button } from 'antd';

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div>
      <Button type="link" onClick={() => setVisible(true)}>
        打开弹窗
      </Button>
      <YForm.FormModal
        visible={visible}
        destroyOnClose
        title="表单弹窗"
        formProps={{ onFinish, onCancel: () => setVisible(false) }}
      >
        {[{ type: 'input', name: 'age', label: '姓名' }]}
      </YForm.FormModal>
    </div>
  );
};
export default Demo;
