import React from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';

import { calculateStrLength } from '../utils';
import { YFormFieldBaseProps } from '../ItemsType';

export interface YTextAreaProps extends TextAreaProps {
  inputMax?: number;
}

export const textModify: YFormFieldBaseProps<YTextAreaProps>['modifyProps'] = ({
  itemProps,
  componentProps,
}) => {
  const _fProps = { ...itemProps };
  if (componentProps.inputMax) {
    _fProps.rules = [
      ...(_fProps.rules || []),
      () => ({
        validator(_, value) {
          if (value && calculateStrLength(value) > Number(componentProps.inputMax)) {
            return Promise.reject('数量超长');
          }
          return Promise.resolve();
        },
      }),
    ];
  }

  return { itemProps: _fProps };
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
