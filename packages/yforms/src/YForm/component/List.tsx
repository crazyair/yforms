import React from 'react';
import { Form } from 'antd';
import { MinusCircleOutlined, PlusOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { map, merge, isArray } from 'lodash';
import classNames from 'classnames';

import YForm from '../index';
import { oneLineItemStyle } from '../utils';
import { YFormProps } from '../Form';
import { BaseComponentProps } from '../ItemsType';
import { YFormItemProps } from '../Items';

export type ShowIconsType = {
  showBottomAdd?: boolean | { text?: string };
  showAdd?: boolean;
  showRemove?: boolean;
};

export interface YFormListComponentProps extends BaseComponentProps {
  maxNum?: number;
  minNum?: number;
  showRightIcons?: boolean;
  showIcons?: ShowIconsType;
  onShowIcons?: (p: { index: number }) => Pick<ShowIconsType, 'showAdd' | 'showRemove'>;
}

export interface YFormListItems {
  index: number;
  field: { name: number; key: number; fieldKey: number };
  add: () => void;
  remove: (index: number) => void;
  move: (from: number, to: number) => void;
  icons: React.ReactNode;
}

export interface YFormListProps
  extends Pick<YFormItemProps, 'label'>,
    Pick<YFormProps, 'children' | 'disabled'> {
  // TODO  field-form 和 antd 的 name 类型不一致
  name?: string | number | (string | number)[];
  items?: (p: YFormListItems) => YFormItemProps['children'];
  componentProps?: YFormListComponentProps;
  offset?: number;
}

export default (props: YFormListProps) => {
  const { label, items, disabled, componentProps = {}, name, offset } = props;
  const {
    maxNum,
    minNum,
    showRightIcons = true,
    showIcons: { showBottomAdd = true, showAdd = true, showRemove = true } = {} as ShowIconsType,
    onShowIcons,
  } = componentProps;
  return (
    <div className="list">
      <Form.List name={name || ''}>
        {(fields, { add, remove, move }) => {
          const isMax = maxNum ? fields.length < maxNum : true;
          const isMin = minNum ? fields.length > minNum : true;

          return (
            <>
              {fields.map((field, index) => {
                const _showIcons = onShowIcons ? onShowIcons({ index }) : {};
                const { showAdd: _showAdd, showRemove: _showRemove } = merge(
                  {},
                  { showAdd, showRemove },
                  _showIcons,
                );
                const icons: React.ReactNode[] = [];
                if (!disabled) {
                  if (isMax && _showAdd) {
                    icons.push(
                      <PlusCircleOutlined
                        key="plus"
                        onClick={() => {
                          // 先增加一位
                          add();
                          // 再把最后一位移动到当前
                          move(fields.length, index + 1);
                        }}
                      />,
                    );
                  }
                  if (isMin && _showRemove) {
                    icons.push(<MinusCircleOutlined key="minus" onClick={() => remove(index)} />);
                  }
                }

                const iconsWidth = icons.length * (8 + 14);
                const _oneLineStyle = oneLineItemStyle(['100%', iconsWidth]);
                // 第一行有 label（当然，外部需要传 label 参数）
                const _label = index === 0 && label;

                const _iconsDom = <div className={classNames('padding-icons')}>{icons}</div>;

                const dataSource =
                  items && items({ index, field, add, remove, move, icons: _iconsDom });
                let _children = dataSource;
                if (isArray(dataSource)) {
                  _children = map(dataSource, (item, index) => {
                    const _item = merge(
                      {},
                      {
                        offset,
                        componentProps: !disabled &&
                          showRightIcons && { style: { ..._oneLineStyle[0] } },
                        label: index === 0 && _label,
                        addonAfter: showRightIcons && !disabled && index === 0 && (
                          <div
                            className={classNames('padding-icons', 'inline-icons')}
                            style={_oneLineStyle[1]}
                          >
                            {icons}
                          </div>
                        ),
                      },
                      item,
                      { key: index },
                    );
                    return _item;
                  });
                }
                return (
                  <YForm.Items noStyle key={field.key} scenes={{ noLabelLayout: true }}>
                    {_children}
                  </YForm.Items>
                );
              })}
              {showBottomAdd && isMax && (
                <YForm.Items>
                  {[
                    {
                      type: 'button',
                      offset,
                      componentProps: {
                        type: 'dashed',
                        onClick: () => add(),
                        style: { width: '100%' },
                        children: (
                          <>
                            <PlusOutlined style={{ paddingRight: 5 }} />
                            {typeof showBottomAdd === 'object'
                              ? showBottomAdd.text
                              : `添加${label || ''}`}
                          </>
                        ),
                      },
                    },
                  ]}
                </YForm.Items>
              )}
            </>
          );
        }}
      </Form.List>
    </div>
  );
};
