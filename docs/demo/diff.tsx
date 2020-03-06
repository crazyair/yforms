import React from 'react';
import { YForm } from 'father-doc-yform';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

const Demo = () => {
  return (
    <YForm
      {...layout}
      initialValues={{ name: '张三', age: '10', money: '10' }}
      oldInitialValues={{ name: '李四', age: '10', money: '10.01' }}
      name="basic"
      required
      params={{ type: 'view' }}
    >
      {[
        { type: 'input', label: 'name', name: 'name' },
        { type: 'input', label: 'age', name: 'age' },
        { type: 'money', label: 'money', name: 'money' },
      ]}
    </YForm>
  );
};
export default Demo;
