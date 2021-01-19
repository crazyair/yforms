import React from 'react';
import { Radio as AntdRadio } from 'antd';
import { RadioGroupProps as AntdRadioGroupProps } from 'antd/lib/radio';
import { map } from 'lodash';
import { getFieldKeyValue } from '../utils';

export interface RadioProps extends Omit<AntdRadioGroupProps, 'options'> {
  options?: Record<string, any>[];
  postField?: string;
  showField?: string;
  renderOption?: (item: any) => any;
  onAddProps?: (
    item: Record<string, any>,
    index: number,
  ) => Record<string, any> & { disabled?: boolean };
}

const InternalRadio: React.ForwardRefRenderFunction<HTMLDivElement, RadioProps> = (props, ref) => {
  const {
    postField = 'id',
    showField = 'name',
    renderOption,
    onAddProps,
    options,
    ...rest
  } = props;

  const _children = map(options, (item, index) => {
    if (item) {
      const _postField = getFieldKeyValue(item, index, postField);
      const _showField = getFieldKeyValue(item, index, showField);
      return (
        <AntdRadio
          key={_postField}
          value={_postField}
          disabled={item.disabled}
          {...(onAddProps && onAddProps(item, index))}
        >
          {renderOption ? renderOption(item) : _showField}
        </AntdRadio>
      );
    }
  });

  return (
    <AntdRadio.Group {...rest} ref={ref}>
      {_children}
    </AntdRadio.Group>
  );
};

const Radio = React.forwardRef<HTMLDivElement, RadioProps>(InternalRadio);

export default Radio;
