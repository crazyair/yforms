import React, { forwardRef } from 'react';
import { Select } from 'antd';
import { map } from 'lodash';
import { SelectProps } from 'antd/lib/select';

import YForm from '../index';
import { getFieldKeyValue } from '../utils';
import { OptionsProps } from '../ItemsType';
import { useGetOptions } from '../hooks';

export interface YSelectProps extends OptionsProps, Omit<SelectProps<any>, 'options'> {}

export default forwardRef<any, YSelectProps & { reRender?: boolean }>((props, ref) => {
  const { form } = React.useContext(YForm.YFormContext);
  const { name } = React.useContext(YForm.YFormItemContext);
  const {
    postField = 'id',
    showField = 'name',
    options,
    renderOption,
    onAddProps,
    getOptions,
    reRender,
    ...rest
  } = props;
  const list = useGetOptions({ form, name, getOptions, options, reRender });

  const children = map(list, (item, index: number) => {
    if (item) {
      const _postField = getFieldKeyValue(item, index, postField);
      const _showField = getFieldKeyValue(item, index, showField);
      return (
        <Select.Option
          key={_postField}
          value={_postField}
          disabled={item.disabled}
          {...(onAddProps && onAddProps(item, index))}
        >
          {/* 如果有 renderOption 就渲染 renderOption 如果没有默认用 showField 字段 */}
          {renderOption ? renderOption(item) : _showField}
        </Select.Option>
      );
    }
  });
  return (
    <Select {...rest} ref={ref}>
      {children}
    </Select>
  );
});
