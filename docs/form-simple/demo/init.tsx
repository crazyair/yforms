import { Button } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'yforms-simple';

export const delay = (timeout = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

type Fields = {
  age?: string;
  nei?: string;
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const Demo = () => {
  const [enable, setEnable] = useState(true);
  const [form] = Form.useForm();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    await delay(250);
    setDetail({ age: '1', nei: 'nei', demo: 'demo' });
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <div>
      <Button onClick={() => setEnable((c) => !c)}>刷新</Button>
      {JSON.stringify(enable)}
      <Form<Fields>
        {...layout}
        loading={loading}
        form={form}
        onFinish={(values) => {
          console.log('v', values);
        }}
        initialValues={detail}
      >
        <div>
          <Form.Items<Fields> isShow={() => enable} shouldUpdate>
            {[
              {
                type: 'input',
                label: '内部form',
                initFormat: (_, values) => `${values.age}values.age`,
                name: 'nei',
              },
            ]}
          </Form.Items>
        </div>
        {[
          {
            label: '年龄',
            type: 'input',
            name: 'age',
            initFormat: (value) => `${value}format`,
            componentProps: { placeholder: '请输入年龄' },
          },
          {
            type: 'button',
            ...tailLayout,
            componentProps: { children: '提交', htmlType: 'submit' },
          },
          {
            type: 'button',
            ...tailLayout,
            componentProps: {
              children: '重置',
              onClick: () => {
                form.resetFields();
              },
            },
          },
        ]}
      </Form>
    </div>
  );
};
export default Demo;
