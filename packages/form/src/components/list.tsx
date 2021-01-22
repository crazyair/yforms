import React from 'react';
import { Button, Space } from 'antd';
import { concat } from 'lodash';
import { FormListProps as AntdFormListProps } from 'antd/es/form';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { FormListFieldData, FormListOperation } from 'antd/lib/form/FormList';

import { FormProps } from '../form';
import { FormContext, FormItemContext, FormListContent } from '../context';
import { getLabelLayout, oneLineItemStyle } from '../utils';
import { Form } from '..';

export interface FormListItems {
  index: number;
  fields: FormListFieldData[];
  field: FormListFieldData;
  operation: FormListOperation;
  icons: React.ReactNode;
  layoutStyles: React.CSSProperties[];
}
export interface FormListBottomItems {
  operation: FormListOperation;
  meta: { errors: React.ReactNode[] };
}

export interface FormListProps extends Omit<AntdFormListProps, 'children'> {
  items?: (p: FormListItems) => FormProps['children'];
  bottomItems?: (p: FormListBottomItems) => FormProps['children'];
  children?: AntdFormListProps['children'];
  disabled?: boolean;
}

const List = (props: FormListProps) => {
  const { items, bottomItems, children, name, disabled, ...rest } = props;
  const formProps = React.useContext(FormContext);
  const { labelCol, wrapperCol } = formProps;
  const { noLabelLayoutValue } = getLabelLayout({ labelCol, wrapperCol });
  const itemProps = React.useContext(FormItemContext);

  const listProps = React.useContext(FormListContent);
  // 支持多级 List name 拼接
  const prefixName = listProps.prefixName ? concat(listProps.prefixName, name) : name;

  if (children) {
    return (
      <FormListContent.Provider value={{ prefixName }}>
        <Form.List name={name} {...rest}>
          {children}
        </Form.List>
      </FormListContent.Provider>
    );
  }

  return (
    <FormListContent.Provider value={{ prefixName }}>
      <Form.List name={name} {...rest}>
        {(fields, operation, meta) => {
          const { errors } = meta;
          return (
            <>
              {fields.map((field, index) => {
                const { add, move, remove } = operation;
                const icons = (
                  <Space size={5}>
                    <PlusCircleOutlined
                      key="plus"
                      onClick={() => {
                        // 先增加一位
                        add();
                        // 再把最后一位移动到当前
                        move(fields.length, index);
                      }}
                    />
                    <MinusCircleOutlined key="minus" onClick={() => remove(index)} />
                  </Space>
                );
                const iconsWidth = icons.props.children.length * (8 + 14);
                const layoutStyles = oneLineItemStyle(['100%', iconsWidth]);

                const dataSource = items({ field, index, fields, operation, icons, layoutStyles });
                return <Form.Items key={field.key}>{dataSource}</Form.Items>;
              })}
              {bottomItems
                ? bottomItems({ operation, meta })
                : !disabled && (
                    <Form.Item {...noLabelLayoutValue}>
                      <Button type="dashed" block onClick={() => operation.add()}>
                        添加{itemProps.label}
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  )}
            </>
          );
        }}
      </Form.List>
    </FormListContent.Provider>
  );
};
export default List;
