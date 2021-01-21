import React from 'react';
import { mount } from 'enzyme';
import { Input } from 'antd';
import { Form } from '..';

describe('item', () => {
  test('isShow', async () => {
    const wrapper = mount(
      <Form initialValues={{ age: '11' }}>
        {[{ isShow: false, type: 'input', name: 'aaa', label: 'age' }]}
      </Form>,
    );
    expect(wrapper.find(Input).length).toBe(0);
  });
  test('isShow function', async () => {
    const wrapper = mount(
      <Form initialValues={{ age: '11' }}>
        {[{ shouldUpdate: true, isShow: () => true, type: 'input', name: 'aaa', label: 'age' }]}
      </Form>,
    );
    expect(wrapper.find(Input).length).toBe(1);
  });
  test('loading', async () => {
    const wrapper = mount(<Form loading>{[{ type: 'input', name: 'age', label: 'age' }]}</Form>);
    expect(wrapper.find('.form-spin').length).toBe(1);
  });
});
