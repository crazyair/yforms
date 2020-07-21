/**
 * title: 全局拿到 form fieldsValue
 * desc: 小表单场景下，希望组件任何地方能拿到实时字段值。
 */

import React from 'react';
import { YForm } from 'yforms';

const Demo = () => {
  const onFinish = async (values: any) => {
    console.log('Success:', values);
  };

  return (
    <>
      <YForm initialValues={{ name: '张三', age: '10' }} name="basic" onFinish={onFinish}>
        <YForm.Item shouldUpdate={(prevValues, curValues) => prevValues !== curValues}>
          {(form) => {
            const fieldsValue = form.getFieldsValue();
            return (
              <YForm.Items>
                {[
                  { type: 'input', label: 'name', name: 'name' },
                  {
                    type: 'input',
                    label: 'age',
                    name: 'age',
                    isShow: fieldsValue.name === '张三',
                  },
                  { type: 'submit' },
                ]}
              </YForm.Items>
            );
          }}
        </YForm.Item>
      </YForm>
    </>
  );
};

export default Demo;
