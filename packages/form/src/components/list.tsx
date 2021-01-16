import React, { useContext } from 'react';
import { Form as AntdForm } from 'antd';
import { FormProps } from '../Form';
import { FormItemContext } from '../Context';
import { oneLineItemStyle } from '../utils';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Form } from '..';

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

export interface FormListProps extends FormProps {
  items?: (p: FormListItems) => FormProps['children'];
}

export default (props: FormListProps) => {
  const { items } = props;
  const itemProps = useContext(FormItemContext);

  return (
    <div className="list">
      <AntdForm.List name={itemProps.name}>
        {(fields, { add, remove, move }) => {
          // console.log('fields', fields);
          // console.log('1', add, remove, move);
          return (
            <>
              {fields.map((field, index) => {
                const icons: React.ReactNode[] = [];
                icons.push(
                  <MinusCircleOutlined
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
                  icons: '_iconsDom',
                  iconsWidth: 1,
                  layoutStyles: _oneLineStyle,
                });

                return <Form.Items key={field.key}>{dataSource}</Form.Items>;
              })}
            </>
          );
        }}
      </AntdForm.List>
    </div>
  );
};
