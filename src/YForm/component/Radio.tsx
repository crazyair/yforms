import React from 'react';
import { Radio } from 'antd';
import { map } from 'lodash';
import { RadioGroupProps } from 'antd/lib/radio';

import { getFieldKeyValue } from '../utils';
import { OptionsProps } from '../ItemsType';

export interface YRadioProps extends OptionsProps, Omit<RadioGroupProps, 'options'> {}

export default (props: YRadioProps) => {
    const { value, postField = 'id', showField = 'name', options, renderOption, onAddProps, ...rest } = props;
    const children = map(options, (item, index: number) => {
        if (item) {
            const _postField = getFieldKeyValue(item, index, postField);
            const _showField = getFieldKeyValue(item, index, showField);
            return (
                <Radio
                    key={_postField}
                    value={_postField}
                    disabled={item.disabled}
                    {...(onAddProps && onAddProps(item, index))}
                >
                    {/* 如果有 renderOption 就渲染 renderOption 如果没有默认用 showField 字段 */}
                    {renderOption ? renderOption(item) : _showField}
                </Radio>
            );
        }
    });
    return (
        <Radio.Group value={value} {...rest}>
            {children}
        </Radio.Group>
    );
};
