import React from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { ConfigContext } from 'antd/lib/config-provider';

import { YForm } from '..';
import { YFormItemProps } from './Items';
import { YFormProps } from './Form';

interface YFormModalProps extends ModalProps {
  children?: YFormItemProps['children'];
  formFooter?: YFormItemProps['children'];
  formProps?: YFormProps;
}

const FormModal = (props: YFormModalProps) => {
  const AntdConfig = React.useContext(ConfigContext);

  const {
    children,
    formFooter = [
      { type: 'submit', componentProps: { reverseBtns: true, spaceProps: { noStyle: true } } },
    ],
    formProps,
    ...rest
  } = props;

  const { onCancel } = rest;

  const prefixCls = AntdConfig.getPrefixCls('');

  return (
    <Modal {...rest} footer={null} bodyStyle={{ padding: 0 }}>
      {/* YForm onCancel 无 e ，这里暂时给 null */}
      <YForm onCancel={() => onCancel(null)} {...formProps}>
        <div className={`${prefixCls}-modal-body`}>
          <YForm.Items>{children}</YForm.Items>
        </div>
        <div className={`${prefixCls}-modal-footer`}>
          <YForm.Items>{formFooter}</YForm.Items>
        </div>
      </YForm>
    </Modal>
  );
};
export default FormModal;
