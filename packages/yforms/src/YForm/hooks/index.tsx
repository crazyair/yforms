import { useState, useEffect } from 'react';
import { get } from 'lodash';

import { getParentNameData } from '../utils';
import { OptionsProps, OptionsType } from '../ItemsType';
import { YFormItemProps } from '../Items';
import { YFormProps } from '../Form';

export interface YUseGetOptionsProps {
  form?: YFormProps['form'];
  name?: YFormItemProps['name'];
  reRender?: boolean;
  getOptions?: OptionsProps['getOptions'];
  options?: OptionsProps['options'];
}

export const useGetOptions = (props: YUseGetOptionsProps) => {
  const { getOptions, form, name, reRender, options } = props;
  const [list, setList] = useState<OptionsType[]>();
  useEffect(() => {
    (async () => {
      if (getOptions) {
        const parentValue = getParentNameData(form.getFieldsValue(true), name);
        const data = await getOptions(
          get(parentValue, name),
          parentValue,
          form.getFieldsValue(true),
        );
        setList(data);
      }
    })();
  }, [form, getOptions, reRender, name]);
  return getOptions ? list : options;
};
