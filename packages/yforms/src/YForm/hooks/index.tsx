import { useState, useEffect } from 'react';
import { getParentNameData } from '../utils';
import { OptionsProps } from '../ItemsType';
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
  const [list, setList] = useState(options);
  useEffect(() => {
    (async () => {
      if (getOptions) {
        const parentValue = getParentNameData(form.getFieldsValue(true), name);
        const data = await getOptions(parentValue);
        setList(data);
      }
    })();
  }, [form, getOptions, reRender, name]);
  return list;
};
