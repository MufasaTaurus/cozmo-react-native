import React from 'react';
import { shallow, mount } from 'enzyme';
import {ForgotPassword, mapDispatchToProps} from 'components/Signup/ForgotPassword';
import {fromJS} from 'immutable';

const renderComponent = ( props = {} ) => mount(
    <ForgotPassword {...props} />
);


describe('<ForgotPassword />', () => {
    it('should render form', () => {
        const renderedComponent = renderComponent();
        expect(renderedComponent.find('BoxWithLogo').length).toEqual(1);
        expect(renderedComponent.find('input').length).toEqual(1);
        expect(renderedComponent.find('ButtonNew').length).toEqual(1);
    });

    it('should validate form', () => {
        let actions = [];
        const renderedComponent = renderComponent({
            email: 'email@email.com',
            dispatch: (action) => actions.push(action)
        });

        const button = renderedComponent.find('ButtonNew');
        expect(button.props().disabled).toBe(false);

        button.simulate('click');
        expect(actions.filter((a) => a.type === 'cozmo/Signup/FORGOT_PASSWORD_SEND_EMAIL').length).toBe(1);
    });

    it('should NOT validate form', () => {
        let actions = [];
        const renderedComponent = renderComponent({
            email: 'email@',
            dispatch: (action) => actions.push(action)
        });
        const onChangeSpy = jest.fn();
        renderedComponent.instance().onEmailChange = onChangeSpy;
        renderedComponent.update();

        renderedComponent.find('TextField').simulate('change', { target: { value: 'email@' } });

        const button = renderedComponent.find('ButtonNew');
        expect(button.props().disabled).toBe(true);

        button.simulate('click');
        expect(actions.length).toBe(0);
    });

    it('should render email sent info', () => {
        const renderedComponent = renderComponent({
            emailSent: true
        });
        expect(renderedComponent.find('BoxWithLogo').length).toEqual(1);
        expect(renderedComponent.find('input').length).toEqual(0);
        expect(renderedComponent.find('ButtonNew').length).toEqual(0);
        expect(renderedComponent.find('.email-sent-confirmation').length).toEqual(1);
    });
});
