import React, { forwardRef } from 'react';
import { Radio } from 'antd';
import { map } from 'lodash';
import { RadioGroupProps } from 'antd/lib/radio';

import YForm from '../index';
import { getFieldKeyValue } from '../utils';
import { OptionsProps } from '../ItemsType';
import { useGetOptions } from '../hooks';

export interface YRadioProps extends OptionsProps, Omit<RadioGroupProps, 'options'> {}

export default forwardRef<any, YRadioProps & { reRender?: boolean }>((props, ref) => {
  const { form } = React.useContext(YForm.YFormContext);
  const { name } = React.useContext(YForm.YFormItemContext);
  const {
    value,
    postField = 'id',
    showField = 'name',
    options,
    renderOption,
    onAddProps,
    getOptions,
    reRender,
    ...rest
  } = props;
  // 可以是方法返回的异步数据
  const list = useGetOptions({ form, name, getOptions, reRender, options });
  const children = map(list, (item, index: number) => {
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
  React.useImperativeHandle(ref, () => props);
  return (
    <Radio.Group value={value} {...rest}>
      {children}
    </Radio.Group>
  );
});
