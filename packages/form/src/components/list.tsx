import React, { useContext } from 'react';
import { Button } from 'antd';
import { FormProps } from '../form';
import { FormItemContext, FormListContent } from '../context';
import { oneLineItemStyle } from '../utils';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Form } from '..';
import { concat } from 'lodash';

export interface FormListItems {
  index: number;
  field: { name: number; key: number; fieldKey: number; isListField?: boolean };
  add: () => void;
  remove: (index: number) => void;
  move: (from: number, to: number) => void;
  icons: React.ReactNode;
  iconsWidth: number;
  layoutStyles: React.CSSProperties[];
}

export interface FormListProps {
  items?: (p: FormListItems) => FormProps['children'];
}

export default (props: FormListProps) => {
  const { items } = props;
  const itemProps = useContext(FormItemContext);
  const { name } = itemProps;
  const context = React.useContext(FormListContent);
  // 支持多级 List name 拼接
  const _name = context.prefixName ? concat(context.prefixName, name) : name;

  return (
    <Form.List name={name}>
      {(fields, { add, remove, move }, { errors }) => {
        return (
          <>
            {fields.map((field, index) => {
              const icons: React.ReactNode[] = [];
              icons.push(
                <PlusCircleOutlined
                  key="plus"
                  onClick={() => {
                    // 先增加一位
                    add();
                    // 再把最后一位移动到当前
                    move(fields.length, index);
                  }}
                />,
              );
              icons.push(<MinusCircleOutlined key="minus" onClick={() => remove(index)} />);

              const iconsWidth = icons.length * (8 + 14);
              const _oneLineStyle = oneLineItemStyle(['100%', iconsWidth]);

              const dataSource = items({
                index,
                field,
                add,
                remove,
                move,
                icons,
                iconsWidth: 1,
                layoutStyles: _oneLineStyle,
              });

              return (
                <FormListContent.Provider
                  value={{ isList: true, field, prefixName: _name }}
                  key={field.key}
                >
                  <Form.Items>{dataSource}</Form.Items>
                </FormListContent.Provider>
              );
            })}
            <Form.Item>
              <Button type="dashed" onClick={() => add()}>
                Add field
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        );
      }}
    </Form.List>
  );
};
