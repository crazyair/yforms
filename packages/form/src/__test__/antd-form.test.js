import React from 'react';
import { mount } from 'enzyme';
import { Input, Button } from 'antd';
import { Form } from '..';
import { sleep } from '../../tests/utils';

// antd 测试用例
describe('antd form', () => {
  async function change(wrapper, index, value) {
    wrapper.find(Input).at(index).simulate('change', { target: { value } });
    await sleep();
    wrapper.update();
  }

  test('not repeat render when Form.Item is not a real Field', async () => {
    const shouldNotRender = jest.fn();
    const StaticInput = () => {
      shouldNotRender();
      return <Input />;
    };

    const shouldRender = jest.fn();
    const DynamicInput = () => {
      shouldRender();
      return <Input />;
    };

    const formRef = React.createRef();

    mount(
      <div>
        <Form ref={formRef}>
          <Form.Item>
            <StaticInput />
          </Form.Item>
          <Form.Item name="light">
            <DynamicInput />
          </Form.Item>
        </Form>
      </div>,
    );

    expect(shouldNotRender).toHaveBeenCalledTimes(1);
    expect(shouldRender).toHaveBeenCalledTimes(1);

    formRef.current.setFieldsValue({ light: 'bamboo' });
    await Promise.resolve();
    expect(shouldNotRender).toHaveBeenCalledTimes(1);
    expect(shouldRender).toHaveBeenCalledTimes(2);
  });
  it('correct onFinish values', async () => {
    async function click(wrapper, className) {
      wrapper.find(className).last().simulate('click');
      await sleep();
      wrapper.update();
    }

    const onFinish = jest.fn().mockImplementation(() => {});

    const wrapper = mount(
      <Form
        onFinish={(v) => {
          if (typeof v.list[0] === 'object') {
            /* old version led to SyntheticEvent be passed as an value here
              that led to weird infinite loop somewhere and OutOfMemory crash */
            // eslint-disable-next-line no-param-reassign
            v = new Error('We expect value to be a primitive here');
          }
          onFinish(v);
        }}
      >
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                // key is in a field
                // eslint-disable-next-line react/jsx-key
                <Form.Item {...field}>
                  <Input />
                </Form.Item>
              ))}
              <Button className="add" onClick={add}>
                Add
              </Button>
              <Button className="remove" onClick={() => remove(0)}>
                Remove
              </Button>
            </>
          )}
        </Form.List>
      </Form>,
    );

    await click(wrapper, '.add');
    await change(wrapper, 0, 'input1');
    wrapper.find('form').simulate('submit');
    await sleep();
    expect(onFinish).toHaveBeenLastCalledWith({ list: ['input1'] });

    await click(wrapper, '.add');
    await change(wrapper, 1, 'input2');
    await click(wrapper, '.add');
    await change(wrapper, 2, 'input3');
    wrapper.find('form').simulate('submit');
    await sleep();
    expect(onFinish).toHaveBeenLastCalledWith({ list: ['input1', 'input2', 'input3'] });

    await click(wrapper, '.remove'); // will remove first input
    wrapper.find('form').simulate('submit');
    await sleep();
    expect(onFinish).toHaveBeenLastCalledWith({ list: ['input2', 'input3'] });
  });
});
