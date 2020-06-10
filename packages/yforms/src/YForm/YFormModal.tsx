import React from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';

import { YForm } from '..';
import { YFormItemProps } from './Items';
import { YFormProps } from './Form';

interface YFormModalProps extends ModalProps {
  children?: YFormItemProps['children'];
  formFooter?: YFormItemProps['children'];
  formProps?: YFormProps;
}

const YFormModal = (props: YFormModalProps) => {
  const {
    children,
    formFooter = [{ type: 'submit', componentProps: { reverseBtns: true } }],
    formProps,
    ...rest
  } = props;

  return (
    <Modal {...rest} footer={null} bodyStyle={{ padding: 0 }}>
      <YForm {...formProps}>
        <div className="ant-modal-body">
          <YForm.Items>{children}</YForm.Items>
        </div>
        <div className="ant-modal-footer">
          <YForm.Items>{formFooter}</YForm.Items>
        </div>
      </YForm>
    </Modal>
  );
};
export default YFormModal;
