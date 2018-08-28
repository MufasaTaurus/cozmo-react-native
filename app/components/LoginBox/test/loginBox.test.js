import React from 'react';
import { mount } from 'enzyme';
import { LoginBox, mapDispatchToProps } from 'components/LoginBox';

jest.mock('components/Signup/GoogleButton');

const renderComponent = (props = {}) => mount(
    <LoginBox />
);

describe('<LoginBox />', () => {
    it('should render 2 inputs and 1 button', () => {
        const renderedComponent = renderComponent();
        expect(renderedComponent.find('TextField').length).toEqual(2);
        expect(renderedComponent.find('ButtonNew').length).toEqual(1);
    });

    it('should have children', () => {
        const renderedComponent = renderComponent();
        expect(renderedComponent.find('BoxWithLogo').length).toEqual(1);
    });

    it('button should be disabled on init', () => {
        const renderedComponent = renderComponent();
        expect(renderedComponent.find('ButtonNew').first().props().disabled).toBe(true);
    });
});
