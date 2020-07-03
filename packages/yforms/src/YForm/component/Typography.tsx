import React, { forwardRef } from 'react';
import { Typography } from 'antd';
import { TextProps } from 'antd/lib/typography/Text';
import { isObject } from 'lodash';

export default forwardRef<any, TextProps & { value?: any; onChange?: (str: any) => void }>(
  (props, ref) => {
    const { value, onChange, editable = true, ...rest } = props;

    const handleChange = (value: any) => {
      if (onChange) {
        onChange(value);
      }
    };
    const _props: TextProps = {};
    // 如果 editable 为 bool 类型，并且是 true ，就默认追加 form 的 onChange
    if (editable === true) {
      _props.editable = { onChange: handleChange };
    } else if (isObject(editable)) {
      _props.editable = { ...editable, onChange: handleChange };
    }
    React.useImperativeHandle(ref, () => props);
    return (
      <Typography.Text {..._props} {...rest}>
        {value}
      </Typography.Text>
    );
  },
);
