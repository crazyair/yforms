import React from 'react';
import Numbro from 'numbro';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import { convertMoney } from '../utils';

export interface YMoneyProps extends InputProps {
    onChange?: (value: any) => void;
}

class InputMoney extends React.PureComponent<YMoneyProps> {
    handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { onChange } = this.props;
        if (onChange) {
            const { value } = e.target;
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

    render() {
        const { value } = this.props;
        return (
            <div className="input-money">
                <Input suffix="元" onBlur={this.handleNumberChange} {...this.props} />
                <div className="zh">{convertMoney(`${value || ''}`)}</div>
            </div>
        );
    }
}

export default InputMoney;
