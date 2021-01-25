import React from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import { CheckboxGroupProps as AntdCheckboxGroupProps } from 'antd/lib/checkbox';
import { map } from 'lodash';
import { getFieldKeyValue } from '../utils';
import { OptionsBaeProps } from '.';

export interface CheckboxGroupProps
  extends Omit<AntdCheckboxGroupProps, 'options'>,
    OptionsBaeProps {}

const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const {
    postField = 'id',
    showField = 'name',
    renderOption,
    onAddProps,
    options,
    ...rest
  } = props;

  const _children = map(options, (item, index) => {
    const _postField = getFieldKeyValue(item, index, postField);
    const _showField = getFieldKeyValue(item, index, showField);
    const _props = onAddProps && onAddProps(item, index);
    return (
      <AntdCheckbox key={_postField} value={_postField} disabled={item.disabled} {..._props}>
        {renderOption ? renderOption(item) : _showField}
      </AntdCheckbox>
    );
  });

  return <AntdCheckbox.Group {...rest}>{_children}</AntdCheckbox.Group>;
};

export default React.memo(CheckboxGroup);
