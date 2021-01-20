import React from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { ConfigContext } from 'antd/lib/config-provider';

import { Form } from '.';
import { FormItemProps } from './item';
import { FormProps } from './form';

interface YFormModalProps extends ModalProps {
  children?: FormItemProps['children'];
  formFooter?: FormItemProps['children'];
  formProps?: FormProps;
}

const FormModal = (props: YFormModalProps) => {
  const AntdConfig = React.useContext(ConfigContext);

  const { children, formFooter, formProps, ...rest } = props;

  const prefixCls = AntdConfig.getPrefixCls('');

  return (
    <Modal footer={null} bodyStyle={{ padding: 0 }} {...rest}>
      <Form {...formProps}>
        <div className={`${prefixCls}-modal-body`}>
          <Form.Items>{children}</Form.Items>
        </div>
        <div className={`${prefixCls}-modal-footer`}>
          <Form.Items>{formFooter}</Form.Items>
        </div>
      </Form>
    </Modal>
  );
};
export default FormModal;
