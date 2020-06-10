import React, { useEffect } from 'react';
import { concat, get } from 'lodash';

import { YForm } from '..';
import { modifyType } from './ItemsType';
import { YFormItemsProps, YFormItemProps } from './Items';

const DiffSetFieldsChildren = (props: {
  value: any[];
  oldValue: any[];
  name: YFormItemProps['name'];
  form: YFormItemsProps['form'];
}) => {
  const {
    name,
    value,
    form: { setFields },
    oldValue,
  } = props;
  const diffLength = oldValue.length - value.length;
  useEffect(() => {
    if (diffLength > 0) {
      setFields([{ name, value: concat(value, new Array(diffLength).fill(null)) }]);
    }
  }, [name, diffLength, value, setFields]);
  return null;
};
const DiffSetFields = (props: modifyType) => {
  const { itemProps, formProps } = props;
  const { initialValues, oldValues = {} } = formProps;
  const context = React.useContext(YForm.ListContent);
  const { name } = itemProps;
  const _name = context.prefixName ? concat(context.prefixName, name) : name;
  const value = get(initialValues, _name, []);

  const oldValue = get(oldValues, _name, []);
  return (
    <YForm.Items>
      {[
        {
          noStyle: true,
          shouldUpdate: (prevValues, curValues) => {
            return get(prevValues, _name, []).length !== get(curValues, _name, []).length;
          },
          children: (form) => (
            <DiffSetFieldsChildren form={form} name={_name} value={value} oldValue={oldValue} />
          ),
        },
      ]}
    </YForm.Items>
  );
};

export { DiffSetFields };
