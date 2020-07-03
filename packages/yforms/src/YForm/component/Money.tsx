import React, { forwardRef } from 'react';
import Numbro from 'numbro';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import { convertMoney } from '../utils';

export interface YMoneyProps extends InputProps {
  onChange?: (value: any) => void;
}

export default forwardRef<any, YMoneyProps>((props, ref) => {
  const { onChange, ...rest } = props;
  const { value } = rest;
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const { value } = e.target;
      if (value === undefined || value === '') {
        return value;
      }
      const _number = parseFloat(value);
      if (Number.isNaN(_number)) {
        return onChange(0);
      }
      // 如果有小数，保留 2 位小数。
      onChange(
        Numbro(_number).format({
          trimMantissa: true,
          mantissa: 2,
        }),
      );
      // 这个会强制有小数
      // onChange(number.toFixed(2));
    }
  };
  return (
    <div className="input-money">
      <Input onBlur={handleNumberChange} {...rest} ref={ref} />
      <div className="zh">{convertMoney(`${value || ''}`)}</div>
    </div>
  );
});
