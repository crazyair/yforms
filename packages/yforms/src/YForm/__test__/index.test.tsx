import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';

import { YForm } from '../..';
import { layout, layoutMore } from '../utils';
import { YFormProps } from '../Form';

const YFormDemo = (props: YFormProps) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const { onFormatFieldsValue, formatFieldsValue } = YForm.useFormatFieldsValue();

  onFormatFieldsValue([{ name: ['demo', 'aa'], format: (value: { users: any }) => value.users }]);

  return (
    <YForm
      onFinish={onFinish}
      formatFieldsValue={formatFieldsValue}
      initialValues={{ money: '1' }}
      {...props}
    >
      {[
        { type: 'input', name: 'demo' },
        { type: 'money', name: 'money', label: 'money' },
        {
          dataSource: [
            {
              type: 'button',
              noStyle: true,
              componentProps: {
                type: 'primary',
                htmlType: 'submit',
                children: 'submit',
              },
            },
          ],
        },
      ]}
    </YForm>
  );
};

describe('YForm', () => {
  test('renders', () => {
    const wrapper = render(<YFormDemo />);
    expect(wrapper).toMatchSnapshot();
  });
  test('isShow', () => {
    const wrapper = render(<YFormDemo isShow={false} />);
    expect(wrapper).toMatchSnapshot();
  });
  test('loading', () => {
    const wrapper = render(<YFormDemo loading />);
    expect(wrapper).toMatchSnapshot();
  });
  test('layout', () => {
    const wrapper = render(
      <div>
        <YFormDemo {...layout} />
        <YFormDemo {...layoutMore} />
      </div>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('layout2', () => {
    const itemsType: any = {
      demo: { component: <p>123</p>, formatStr: '请输入${label}' },
      render: { render: () => <div>1</div> },
    };
    YForm.Config({ itemsType });
    const wrapper = render(
      <YForm name="basic">{[{ type: 'demo' }, { type: 'render' }] as any}</YForm>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('onFinish', () => {
    const wrapper = mount(<YFormDemo />);
    wrapper.find('Button').simulate('submit');
    const wrapper2 = mount(<YFormDemo formatFieldsValue={undefined} />);
    wrapper2.find('Button').simulate('submit');
  });
});
