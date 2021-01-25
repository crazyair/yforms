import React from 'react';
import { Select as AntdSelect } from 'antd';
import { RefSelectProps, SelectProps as AntdSelectProps } from 'antd/lib/select';
import { map } from 'lodash';
import { getFieldKeyValue } from '../utils';
import { OptionsBaeProps } from '.';

export interface SelectProps<T = any>
  extends Omit<AntdSelectProps<T>, 'options'>,
    OptionsBaeProps {}

const InternalRadio: React.ForwardRefRenderFunction<RefSelectProps, SelectProps> = (props, ref) => {
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
      <AntdSelect.Option key={_postField} value={_postField} disabled={item.disabled} {..._props}>
        {renderOption ? renderOption(item) : _showField}
      </AntdSelect.Option>
    );
  });

  return (
    <AntdSelect {...rest} ref={ref}>
      {_children}
    </AntdSelect>
  );
};

const Select = React.forwardRef<RefSelectProps, SelectProps>(InternalRadio);

export default Select;
