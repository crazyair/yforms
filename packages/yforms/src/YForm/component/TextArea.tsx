import React from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';

import { calculateStrLength } from '../utils';

export interface YTextAreaProps extends TextAreaProps {
  inputMax?: number;
}

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
