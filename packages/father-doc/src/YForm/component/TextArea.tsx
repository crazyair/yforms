import React from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';

import { calculateStrLength } from '../utils';
import { YFormItemProps } from '../Items';

export interface YTextAreaProps extends TextAreaProps {
    inputMax?: number;
}

export const textModify = (
    fProps: YFormItemProps,
    cProps: YTextAreaProps,
): [YFormItemProps, YTextAreaProps] => {
    const _fProps = { ...fProps };
    const _cProps = { ...cProps };
    if (cProps.inputMax) {
        _fProps.rules = [
            ...(_fProps.rules || []),
            () => ({
                validator(_, value) {
                    if (value && calculateStrLength(value) > Number(cProps.inputMax)) {
                        return Promise.reject('数量超长');
                    }
                    return Promise.resolve();
                },
            }),
        ];
    }
    return [_fProps, _cProps];
};

export default (props: YTextAreaProps) => {
    const { inputMax, ...rest } = props;
    const { value } = rest;
    return (
        <div className="can-input-length">
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} {...rest} />
            <div className="length">
                {inputMax && `${calculateStrLength(`${value || ''}`)}/${inputMax}`}
            </div>
        </div>
    );
};
