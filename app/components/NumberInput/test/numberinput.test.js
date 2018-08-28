import React from 'react';
import { mount } from 'enzyme';
import NumberInput from 'components/NumberInput';

const renderComponent = (props = {}) => mount(
    <NumberInput { ...props } />
);

describe('<NumberInput />', () => {
    it('check if arrow up will change value of input', () => {
        const updateSpy = jest.fn();
        const renderedComponent = renderComponent({
            value: 10,
            min: 0,
            max: 100,
            step: 5,
            onChange: updateSpy,
            placeholder: '',
            disabled: false,
        });

        renderedComponent.find('.arrow-up').props().onClick();
        expect(updateSpy).toHaveBeenCalledWith(15);
    });

    it('check if arrow down will change value of input', () => {
        const updateSpy = jest.fn();
        const renderedComponent = renderComponent({
            value: 40,
            min: 0,
            max: 100,
            step: 10,
            onChange: updateSpy,
            placeholder: '',
            disabled: false,
        });

        renderedComponent.find('.arrow-down').props().onClick();
        expect(updateSpy).toHaveBeenCalledWith(30);
    });

    it('check if disabled is working', () => {
        const updateSpy = jest.fn();
        const renderedComponent = renderComponent({
            value: 40,
            min: 0,
            max: 100,
            step: 10,
            onChange: updateSpy,
            placeholder: '',
            disabled: true,
        });

        renderedComponent.find('.arrow-down').props().onClick();
        expect(updateSpy).not.toHaveBeenCalled();
        renderedComponent.find('.arrow-up').props().onClick();
        expect(updateSpy).not.toHaveBeenCalled();
    });
});
