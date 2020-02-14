/* tslint:disable:no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import SecureButton from '../component/SecureButton';
import { delay } from './YFormItems.test';

describe('SecureButton', () => {
  // 组件卸载
  let container: any;
  beforeEach(() => {
    container = document.createElement('div');
    mount(<SecureButton />, { attachTo: container });
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  test('click', async () => {
    const onClick = () => {};
    const wrapper = mount(<SecureButton onClick={onClick} />);
    await wrapper
      .find('.ant-btn')
      .at(0)
      .simulate('click');
  });

  test('click loading', async () => {
    const onClick = jest.fn();
    const wrapper = mount(<SecureButton loading onClick={onClick} />);
    await wrapper
      .find('.ant-btn')
      .at(0)
      .simulate('click');
    expect(onClick).not.toHaveBeenCalled();
  });

  test('click error', async () => {
    const onClick = async () => {
      await Promise.reject();
    };
    const wrapper = mount(<SecureButton onClick={onClick} />);
    await wrapper
      .find('.ant-btn')
      .at(0)
      .simulate('click');
  });
  test('click delay', async () => {
    const onClick = async () => {
      await delay(600);
    };
    const wrapper = mount(<SecureButton onClick={onClick} />);
    await wrapper
      .find('.ant-btn')
      .at(0)
      .simulate('click');
    await delay(600);
  });
  test('click 500', async () => {
    const onClick = async () => {};
    const onLoaded = jest.fn();
    const wrapper = mount(<SecureButton onClick={onClick} onLoaded={onLoaded} />);
    await wrapper
      .find('.ant-btn')
      .at(0)
      .simulate('click');
    await delay(500);
    expect(onLoaded).toHaveBeenCalled();
  });
  test('click 600', async () => {
    const onClick = async () => {
      await delay(600);
    };
    const onLoaded = jest.fn();
    const wrapper = mount(<SecureButton onClick={onClick} onLoaded={onLoaded} />);
    await wrapper
      .find('.ant-btn')
      .at(0)
      .simulate('click');
    await delay(700);
    expect(onLoaded).toHaveBeenCalled();
  });
});
