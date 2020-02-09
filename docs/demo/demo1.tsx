import React, { useState, useEffect } from 'react';
import { YForm } from 'father-doc-yform';

import 'antd/dist/antd.css';

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

const Demo = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    useEffect(() => {
        setTimeout(() => {
            setData({ name: '张三', age: '10' });
            setLoading(false);
        }, 10);
    }, []);
    return (
        <YForm
            {...layout}
            loading={loading}
            initialValues={data}
            required
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            {[
                { type: 'input', label: 'name', name: 'name', componentProps: { suffix: 'ss' } },
                { type: 'input', label: 'age', name: 'age' },
                { type: 'money', label: 'money', name: 'money' },
            ]}
        </YForm>
    );
};
export default Demo;
