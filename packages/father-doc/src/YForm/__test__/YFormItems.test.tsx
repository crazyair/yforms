// tslint:disable:no-console
import React from 'react';
import { render } from '@testing-library/react';
import KeyCode from 'rc-util/lib/KeyCode';
import { mount } from 'enzyme';
import { Input } from 'antd';
import { YForm } from '../../index';
import { YFormItemsProps } from '../Items';

const delay = (timeout = 0) =>
    new Promise(resolve => {
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
                                plugins: { disabled: false },
                                componentProps: { type: 'primary', htmlType: 'submit', children: 'submit' },
                            },
                        ],
                    },
                ]}
            </YForm.Items>
        </YForm>
    );
};

describe('YFormItems', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    beforeEach(() => {
        jest.useRealTimers();
    });

    afterEach(() => {
        errorSpy.mockReset();
    });

    afterAll(() => {
        errorSpy.mockRestore();
    });

    async function operate(wrapper: any, className: string) {
        wrapper
            .find(className)
            .last()
            .simulate('click');
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
            </YForm>
        );
        expect(wrapper).toMatchSnapshot();
    });
    test('more children', () => {
        const wrapper = mount(
            <YForm required>
                <YForm.Items plugins={{ required: true }}>
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
                            componentProps: { onAddProps: () => 'a', options: [{ name: '真的', id: '1' }] },
                        },
                        {
                            type: 'radio',
                            name: '单选框',
                            componentProps: { renderOption: () => 'a', options: [{ name: '真的', id: '1' }] },
                        },
                        {
                            type: 'select',
                            label: '下拉框',
                            name: '下拉框',
                            componentProps: {
                                optionLabelProp: 'checkedValue',
                                onAddProps: item => ({ checkedValue: `(${item.name})` }),
                                showField: record => (
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
                            componentProps: { onAddProps: () => 'a', options: [{ id: '1', name: 'a' }] },
                        },
                        {
                            type: 'checkboxGroup',
                            name: 'checkboxGroup2',
                            componentProps: { options: [{ id: '1', name: 'a' }], renderOption: () => 'b' },
                        },
                        { type: 'list', items: ({ index }) => [{ type: 'input', name: [index, 'd'] }] },
                        { type: 'money', name: 'money' },
                        { label: 'text', name: 'text', type: 'text' },
                        { label: 'switch', name: 'switch', type: 'switch' },
                        { label: 'custom', type: 'custom', name: 'custom', component: <Input /> },
                    ]}
                    {[{ type: 'noType', name: 'a' }] as any}
                    <div>1</div>
                    123
                </YForm.Items>
            </YForm>
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
            </YForm>
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
                                return [{ label: index === 0 && '手机号', type: 'input', name: [index, 'phone'] }];
                            },
                        },
                    ]}
                </YForm.Items>
            </YForm>
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
            </YForm>
        );
        const dom = await wrapper.find('.ant-input').last();
        dom.simulate('change', { target: { value: '2' } });
        dom.simulate('blur');
        dom.simulate('change', { target: { value: 'a' } });
        dom.simulate('blur');
    });
    test('text', async () => {
        const wrapper = mount(
            <YForm>{[{ name: 'text', type: 'text', componentProps: { editable: { onStart: () => {} } } }]}</YForm>
        );
        wrapper
            .find('.ant-typography-edit')
            .first()
            .simulate('click');
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
                        plugins: { required: false },
                        label: '长文本',
                        componentProps: { inputMax: 9 },
                    },
                ]}
            </YForm>
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
                        plugins: { noLabelLayout: false },
                        items: () => [
                            { label: '姓名', type: 'input', name: 'name' },
                            <span key="center" />,
                            { label: '年龄', type: 'input', name: 'age' },
                        ],
                    },
                    { label: '多字段', type: 'oneLine', items: () => [undefined] },
                ]}
            </YForm>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
