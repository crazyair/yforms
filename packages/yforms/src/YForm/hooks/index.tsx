import { useContext, useState, useEffect } from 'react';
import { get } from 'lodash';

import YForm from '../index';
import { getParentNameData } from '../utils';
import { OptionsType } from '../ItemsType';

export const useGetOptions = () => {
  const { form } = useContext(YForm.YFormContext);
  const { name, reRender, componentProps } = useContext(YForm.YFormItemContext);
  const { getOptions, options } = componentProps;

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
