import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import { FormInstance } from 'antd/lib/form';
import { Input } from 'antd';
import { Form } from '..';
import { sleep } from '../../tests/utils';

describe('form', () => {
  test('renders', () => {
    const wrapper = render(
      <Form plugins={{ placeholder: { enable: true }, required: { enable: true } }}>
        {[
          { type: 'input', name: 'age', label: 'age' },
          { type: 'radio', name: 'radio', rules: [{ required: true }] },
          {
            type: 'radio',
            name: 'radio2',
            componentProps: {
              showField: 'id',
              postField: 'name',
              options: [{ id: '1', name: 'age' }],
            },
          },
          {
            type: 'radio',
            name: 'radio2',
            componentProps: {
              showField: (item) => item.id,
              postField: () => undefined,
              options: [{ id: '1', name: 'age' }],
            },
          },
          { type: 'custom', name: 'custom', component: <Input /> },
        ]}
      </Form>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('config has placeholder', async () => {
    const wrapper = mount(
      <Form plugins={{ placeholder: { enable: true } }}>
        {[{ type: 'input', name: 'age', label: 'age' }]}
      </Form>,
    );
    expect(wrapper.find(Input).at(0).props().placeholder).toBe('请输入age');
  });
  test('init config has placeholder', async () => {
    Form.config({ plugins: { placeholder: { enable: true } } });
    const wrapper = mount(<Form>{[{ type: 'input', name: 'age', label: 'age' }]}</Form>);
    expect(wrapper.find(Input).at(0).props().placeholder).toBe('请输入age');
  });
  test('initFormat format', async () => {
    const ref = React.createRef<FormInstance>();
    const onFinish = jest.fn().mockImplementation(() => {});

    const wrapper = mount(
      <Form
        ref={ref}
        onFinish={(v) => {
          onFinish(v);
        }}
      >
        {[
          { type: 'input', initFormat: () => 1, format: () => 2, name: 'age' },
          { type: 'input', format: () => 2, name: ['name', 'age'] },
          { type: 'input', name: 'remove', format: [{ name: 'remove', removeField: true }] },
        ]}
      </Form>,
    );
    wrapper.find('form').simulate('submit');
    await sleep();
    expect(ref.current.getFieldsValue(true).age).toBe(1);
    expect(onFinish).toHaveBeenLastCalledWith({ age: 2, name: { age: 2 } });
  });
  test('loading', async () => {
    const ref = React.createRef<FormInstance>();

    mount(
      <Form ref={ref} loading initialValues={{ age: 1 }}>
        {[{ type: 'input', name: 'age' }]}
      </Form>,
    );
    expect(ref.current.getFieldsValue(true).age).toBe(undefined);
  });
});
