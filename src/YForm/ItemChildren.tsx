import React from 'react';
import { Form } from 'antd';
import { forEach, omit } from 'lodash';
import { FormItemProps } from 'antd/lib/form';
import { YFormItemProps } from './Items';

export default (props: YFormItemProps) => {
    const { children, addonAfter, ...rest } = props;
    let _required: boolean | undefined = false;
    // 根据 rules required 判断外部 Form.Item 是否必填
    forEach(props.rules, item => {
        if ('required' in item) _required = item.required;
    });

    return children ? (
        <Form.Item required={_required} {...omit(rest, ['name', 'rules', 'dependencies', 'shouldUpdate'])}>
            <Form.Item noStyle {...rest}>
                {children as FormItemProps['children']}
            </Form.Item>
            <>{addonAfter}</>
        </Form.Item>
    ) : null;
};
