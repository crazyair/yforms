import React from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';

import { calculateStrLength } from '../utils';
import { YFormFieldBaseProps } from '../ItemsType';

export interface YTextAreaProps extends TextAreaProps {
  inputMax?: number;
}

export const textModify: YFormFieldBaseProps<YTextAreaProps>['modifyProps'] = (fProps, cProps) => {
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
