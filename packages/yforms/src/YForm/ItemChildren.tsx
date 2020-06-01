import React from 'react';
import { Form } from 'antd';
import { forEach, omit, isArray } from 'lodash';
import { FormItemProps } from 'antd/lib/form';
import { YFormItemProps } from './Items';
import { YForm } from '..';

export default React.memo<YFormItemProps>((props) => {
  const context = React.useContext(YForm.ListItemsContent);
  const { isList, field } = context;

  const { children, addonAfter, isShow, ...rest } = props;
  const { name } = rest;

  let _required: boolean | undefined = false;
  // 根据 rules required 判断外部 Form.Item 是否必填
  forEach(props.rules, (item) => {
    if ('required' in item) _required = item.required;
  });

  let itemProps = {};
  if (isList) {
    const _name = [...(isArray(name) ? name : [name])];
    if (isArray(name) && typeof name[0] === 'number') {
      _name[0] = 'keep';
    }
    itemProps = {
      isListField: true,
      fieldKey: [field.fieldKey, ..._name],
    };
  }
  const ItemDom = children ? (
    <Form.Item
      required={_required}
      {...omit(rest, ['name', 'rules', 'dependencies', 'shouldUpdate'])}
    >
      <Form.Item noStyle {...itemProps} {...rest}>
        {children as FormItemProps['children']}
      </Form.Item>
      <>{addonAfter}</>
    </Form.Item>
  ) : null;

  return ItemDom;
});
