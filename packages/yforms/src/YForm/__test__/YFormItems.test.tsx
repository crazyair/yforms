// tslint:disable:no-console
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import KeyCode from 'rc-util/lib/KeyCode';
import { mount } from 'enzyme';
import { Input } from 'antd';
import { YForm } from '../../index';
import { YFormItemsProps } from '../Items';
import Submit from '../component/Submit';

export const delay = (timeout = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

const YFormItemsDemo = (props: YFormItemsProps) => {
  return (
    <YForm>
      <YForm.Items {...props}>
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
      </YForm.Items>
    </YForm>
  );
};

const YFormSubmitDemo = (props: any) => {
  const { params, onCancel, onFinish, onSave, reverseBtns } = props;
  const { onFormatFieldsValue, formatFieldsValue } = YForm.useFormatFieldsValue();

  const {
    submit,
    params: { typeName },
  } = YForm.useSubmit();

  onFormatFieldsValue([
    { name: 'append_field', format: () => '提交前追加字段' },
    { name: 'name', format: ({ name }) => `${name}_改变了` },
  ]);

  return (
    <YForm
      initialValues={{ age: '1' }}
      onFinish={onFinish}
      submit={submit}
      formatFieldsValue={formatFieldsValue}
      onSave={onSave}
      params={params}
      onCancel={onCancel}
    >
      {typeName}
      {[
        { type: 'input', label: 'age', name: 'age', componentProps: { suffix: '岁' } },
        { type: 'submit', componentProps: { reverseBtns } },
      ]}
    </YForm>
  );
};

describe('YFormItems', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  let container: any;

  beforeEach(() => {
    container = document.createElement('div');
    const wrapper = mount(<YFormSubmitDemo params={{ type: 'create' }} />, { attachTo: container });
    wrapper.find('.ant-btn').at(0).simulate('submit');
    jest.useRealTimers();
  });

  afterEach(() => {
    errorSpy.mockReset();
    ReactDOM.unmountComponentAtNode(container);
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  async function operate(wrapper: any, className: string) {
    wrapper.find(className).last().simulate('click');
    await delay();
    wrapper.update();
  }

  test('renders', () => {
    const wrapper = render(<YFormItemsDemo />);
    expect(wrapper).toMatchSnapshot();
  });
  test('isShow', () => {
    const wrapper = render(<YFormItemsDemo isShow={false} />);
    expect(wrapper).toMatchSnapshot();
  });
  test('no children', () => {
    const wrapper = render(
      <YForm>
        <YForm.Items />
      </YForm>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('more children', () => {
    const wrapper = mount(
      <YForm required>
        <YForm.Items>
          {[
            { type: 'input', name: 'input' },
            { type: 'input', name: 'input_isShow', isShow: false },
            {
              type: 'list',
              name: 'list',
              items: ({ index }) => [{ type: 'input', name: [index, 'd'] }],
            },
            {
              type: 'textarea',
              name: 'textarea',
              label: '长文本',
              componentProps: { inputMax: 9 },
            },
            {
              type: 'radio',
              name: '单选框',
              componentProps: {
                onAddProps: () => 'a',
                options: [{ name: '真的', id: '1' }],
              },
            },
            {
              type: 'radio',
              name: '单选框',
              componentProps: {
                renderOption: () => 'a',
                options: [{ name: '真的', id: '1' }],
              },
            },
            {
              type: 'select',
              label: '下拉框',
              name: '下拉框',
              componentProps: {
                optionLabelProp: 'checkedValue',
                onAddProps: (item) => ({ checkedValue: `(${item.name})` }),
                showField: (record) => (
                  <div>
                    <div>{record.id}</div>-{record.name}
                  </div>
                ),
                options: [
                  { id: '1', name: '开' },
                  { id: '2', name: '关' },
                ],
              },
            },
            {
              type: 'select',
              label: '下拉框',
              name: '下拉框',
              componentProps: {
                optionLabelProp: 'checkedValue',
                renderOption: () => 'a',
                options: [{ id: '1', name: '开' }],
              },
            },
            { shouldUpdate: true, children: () => [{ type: 'input', name: 'f' }] },
            { type: 'checkbox', name: 'checkbox' },
            {
              type: 'checkboxGroup',
              name: 'checkboxGroup',
              componentProps: {
                onAddProps: () => 'a',
                options: [{ id: '1', name: 'a' }],
              },
            },
            {
              type: 'checkboxGroup',
              name: 'checkboxGroup2',
              componentProps: {
                options: [{ id: '1', name: 'a' }],
                renderOption: () => 'b',
              },
            },
            {
              type: 'list',
              items: ({ index }) => [{ type: 'input', name: [index, 'd'] }],
            },
            { type: 'money', name: 'money' },
            { label: 'text', name: 'text', type: 'text' },
            { label: 'switch', name: 'switch', type: 'switch' },
            { label: 'custom', type: 'custom', name: 'custom', component: <Input /> },
            {
              label: '精简使用',
              type: 'input',
              name: 'children_field2',
              shouldUpdate: (prevValues, curValues) => prevValues.type !== curValues.type,
              isShow: (values) => values.type === '2',
            },
          ]}
          {[{ type: 'noType', name: 'a' }] as any}
          <div>1</div>
          123
        </YForm.Items>
      </YForm>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('list max min', async () => {
    const wrapper = mount(
      <YForm initialValues={{ a: [1, 2, 3] }}>
        <YForm.Items>
          {[
            {
              type: 'list',
              name: 'a',
              componentProps: { maxNum: 3, minNum: 3 },
              items: ({ index }) => [{ type: 'input', name: [index] }],
            },
          ]}
        </YForm.Items>
      </YForm>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('list', async () => {
    const wrapper = mount(
      <YForm initialValues={{ users: [{}, {}] }}>
        <YForm.Items>
          {[
            {
              type: 'list',
              name: 'phones',
              componentProps: {
                showIcons: {
                  showBottomAdd: { text: '添加手机号' },
                  showAdd: true,
                  showRemove: false,
                },
                onShowIcons: () => ({ showAdd: true, showRemove: true }),
              },
              items: ({ index }) => {
                return [
                  {
                    label: index === 0 && '手机号',
                    type: 'input',
                    name: [index, 'phone'],
                  },
                ];
              },
            },
          ]}
        </YForm.Items>
      </YForm>,
    );

    await operate(wrapper, '.ant-btn-dashed');
    expect(wrapper.find('.ant-form-item').length).toBe(4);
    await operate(wrapper, '.anticon-plus-circle');
    expect(wrapper.find('.ant-form-item').length).toBe(6);
    await operate(wrapper, '.anticon-minus-circle');
    expect(wrapper.find('.ant-form-item').length).toBe(4);
  });
  test('money', async () => {
    const wrapper = mount(
      <YForm initialValues={{ money: '1' }}>
        <YForm.Items>{[{ type: 'money', name: 'money' }]}</YForm.Items>
      </YForm>,
    );
    const dom = await wrapper.find('.ant-input').last();
    dom.simulate('change', { target: { value: '2' } });
    dom.simulate('blur');
    dom.simulate('change', { target: { value: 'a' } });
    dom.simulate('blur');
  });
  test('text', async () => {
    const wrapper = mount(
      <YForm>
        {[
          {
            name: 'text',
            type: 'text',
            componentProps: { editable: { onStart: () => {} } },
          },
        ]}
      </YForm>,
    );
    wrapper.find('.ant-typography-edit').first().simulate('click');
    wrapper.find('.ant-input').simulate('change', { target: { value: 'Bamboo' } });
    await wrapper.find('.ant-input').simulate('keyDown', { keyCode: KeyCode.ENTER });
    await wrapper.find('.ant-input').simulate('keyUp', { keyCode: KeyCode.ENTER });
  });
  test('textarea', async () => {
    const wrapper = mount(
      <YForm initialValues={{ textarea: '这是长文本' }}>
        {[
          {
            type: 'textarea',
            name: 'textarea',
            label: '长文本',
            componentProps: { inputMax: 9 },
          },
        ]}
      </YForm>,
    );
    const dom = await wrapper.find('.ant-input').last();
    dom.simulate('change', { target: { value: 'a' } });
    dom.simulate('change', { target: { value: '这是长文本把' } });
  });

  test('oneLine', async () => {
    const wrapper = mount(
      <YForm>
        {[
          {
            label: '多字段',
            type: 'oneLine',
            componentProps: { oneLineStyle: ['50%', 8, '50%'] },
            items: () => [
              { label: '姓名', type: 'input', name: 'name' },
              <span key="center" />,
              { label: '年龄', type: 'input', name: 'age' },
            ],
          },
          { label: '多字段', type: 'oneLine', items: () => [undefined] },
        ]}
      </YForm>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('useSubmit no save btn', async () => {
    const wrapperCreate = mount(<YFormSubmitDemo params={{ type: 'create' }} />);
    await wrapperCreate.find('.ant-btn').at(1).simulate('click');
    const wrapperView = mount(<YFormSubmitDemo params={{ type: 'view' }} />);
    await wrapperView.find('.ant-btn').at(0).simulate('click');
    await wrapperView.find('.ant-btn').at(1).simulate('click');
    const onCancel = jest.fn();
    const wrapperCancel = mount(<YFormSubmitDemo onCancel={onCancel} params={{ type: 'edit' }} />);
    await wrapperCancel.find('.ant-btn').at(1).simulate('click');
    expect(onCancel).toHaveBeenCalled();
  });
  test('Form submit', async () => {
    const onFinish = async () => {
      await delay(501);
    };
    const onFinishError = async () => {
      await Promise.reject('err');
    };
    const wrapper = mount(<YFormSubmitDemo onFinish={onFinish} params={{ type: 'create' }} />);
    await wrapper.find('.ant-btn').at(0).simulate('submit');
    await wrapper.find('.ant-btn').at(0).simulate('submit');
    await new Promise((resolve) => setTimeout(resolve, 500 + 100));

    const wrapperError = mount(
      <YFormSubmitDemo onFinish={onFinishError} params={{ type: 'create' }} />,
    );
    await wrapperError.find('.ant-btn').at(0).simulate('submit');
    await delay(600);
  });
  test('Form submit onSave', async () => {
    const onSave = async () => {
      await delay(501);
    };
    const wrapper = mount(<YFormSubmitDemo onSave={onSave} params={{ type: 'create' }} />);
    await wrapper.find('.ant-btn').at(1).simulate('click');
  });
  test('Submit', async () => {
    const wrapper = mount(
      <YForm>
        <Submit />
      </YForm>,
    );
    await wrapper.find('.ant-btn').at(1).simulate('click');
  });
  test('Form submit two', async () => {
    const onFinish = jest.fn();

    const wrapper = mount(<YFormSubmitDemo onFinish={onFinish} params={{ type: 'create' }} />);
    wrapper.find('.ant-btn').at(0).simulate('submit');
    await delay();
    wrapper.find('.ant-btn').at(0).simulate('submit');
    expect(onFinish).toHaveBeenCalled();
  });
  test('Form submit reverse', async () => {
    mount(<YFormSubmitDemo reverseBtns params={{ type: 'create' }} />);
  });
});
