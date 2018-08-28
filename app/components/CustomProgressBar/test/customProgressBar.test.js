import React from 'react';
import { mount } from 'enzyme';
import CustomProgressBar from 'components/CustomProgressBar';

const renderComponent = (props = {}) => mount(
    <CustomProgressBar { ...props } />
);

describe('<CustomProgressBar />', () => {
    it('is progress bar before 25% correct color', () => {
        const renderedComponent = renderComponent({
            value: 20,
        });
        expect(renderedComponent.children().first().hasClass('low')).toEqual(true);
    });
    it('is progress bar before 50% correct color', () => {
        const renderedComponent = renderComponent({
            value: 40,
        });
        expect(renderedComponent.children().first().hasClass('mid')).toEqual(true);
    });
    it('is progress bar before 75% correct color', () => {
        const renderedComponent = renderComponent({
            value: 60,
        });
        expect(renderedComponent.children().first().hasClass('high')).toEqual(true);
    });
    it('is progress bar before 100% correct color', () => {
        const renderedComponent = renderComponent({
            value: 80,
        });
        expect(renderedComponent.children().first().hasClass('max')).toEqual(true);
    });
});
