import React from 'react';
import { mount } from 'enzyme';
import DropdownInput from 'components/DropdownInput';

const renderComponent = (props = {}) => mount(
    <DropdownInput id="1" { ...props } />
);

describe('<DropdownInput />', () => {
    it('list should render when button is clicked', () => {
        const renderedComponent = renderComponent({
            options: [
                { name: 'button1', value: '1' },
                { name: 'button2', value: '2' }
            ],
        });
        expect(renderedComponent.find('.dropdown-menu').length).toEqual(0);
        renderedComponent.find('.dropdown-button').props().onClick();
        expect(renderedComponent.find('.dropdown-menu').length).toEqual(1);
    });

    it('onChange should fire when input is changed', () => {
        const change1Spy = jest.fn();
        const renderedComponent = renderComponent({
            options: [
                { name: 'button1', value: '1' },
                { name: 'button2', value: '2' }
            ],
            onChange: change1Spy,
        });
        renderedComponent.find('.text-field').simulate('change');
        expect(change1Spy).toHaveBeenCalled();
    });

    it('Input should be disabled when needed', () => {
        const renderedComponent = renderComponent({
            options: [
                { name: 'button1', value: '1' },
                { name: 'button2', value: '2' }
            ],
            disabled: true,
        });
        expect(renderedComponent.find('.text-field').props().disabled).toEqual(true);
    });

    it('Component should render button on right side if needed', () => {
        const renderedComponent = renderComponent({
            options: [
                { name: 'button1', value: '1' },
                { name: 'button2', value: '2' }
            ],
            className: 'right',
        });
        expect(renderedComponent.find('.dropdown-menu').length).toEqual(0);
        expect(renderedComponent.find('.right').length).toEqual(2);
        renderedComponent.find('.dropdown-button').props().onClick();
        expect(renderedComponent.find('.dropdown-menu').length).toEqual(1);
        expect(renderedComponent.find('.right').length).toEqual(3);
    });

    it('Options should change when clicked', () => {
        const change1Spy = jest.fn();
        const renderedComponent = renderComponent({
            options: [
                { name: 'button1', value: '1' },
                { name: 'button2', value: '2' }
            ],
            onOptionChange: change1Spy,
        });
        expect(renderedComponent.find('.dropdown-menu').length).toEqual(0);
        expect(renderedComponent.find('.dropdown-input').text()).toContain('button1');
        renderedComponent.find('.dropdown-button').props().onClick();
        expect(renderedComponent.find('.dropdown-menu').length).toEqual(1);
        expect(renderedComponent.find('.dropdown-input').text()).toContain('button1');
        renderedComponent.find('.dropdown-menu-option').at(1).props().onClick();
        expect(renderedComponent.find('.dropdown-input').text()).toContain('button2');
        expect(change1Spy).toHaveBeenCalled();
    });
});
