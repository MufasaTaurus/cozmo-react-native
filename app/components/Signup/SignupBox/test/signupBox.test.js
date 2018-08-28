import React from 'react';
import { mount, shallow } from 'enzyme';
import { SignupBox } from 'components/Signup/SignupBox';
import { fromJS } from 'immutable';

jest.mock('react-google-login');

const renderComponent = (props = {}) => shallow(
        <SignupBox { ...props } />
);

describe('<SignupBox />', () => {
    it('should render form', () => {
        const renderedComponent = renderComponent({
            isEmail: false,
            formErrors: fromJS({}),
        });
        expect(renderedComponent.find('BoxWithLogo').dive().find('.form').length).toEqual(1);
    });
//
//     it('should render choice', () => {
//         const renderedComponent = renderComponent({ isEmail: false, formErrors: fromJS({}) });
//         expect(renderedComponent.find('.google-wrapper').length).toEqual(2);
//     });
//
//     it('should validate form', () => {
//         let actions = [];
//         const renderedComponent = renderComponent({
//             isEmail: true,
//             formErrors: fromJS({}),
//             dispatch: (action) => actions.push(action),
//             firstName: 'Jane',
//             lastName: 'Doe',
//             email: 'email@com.com',
//             phone: '12345',
//             password: 'abcdefghijk'
//         });
//
//         renderedComponent.find('Button').simulate('click');
//         expect(actions.filter((a) => a.type === 'cozmo/Signup/SIGNUP_FORM_ERRORS').length).toBe(0);
//         expect(actions.filter((a) => a.type === 'cozmo/Signup/SIGNUP').length).toBe(1);
//     });
//
//     it('should NOT validate form', () => {
//         const onChangeSpy = jest.fn();
//         let actions = [];
//         const renderedComponent = renderComponent({
//             isEmail: true,
//             formErrors: fromJS({}),
//             dispatch: (action) => actions.push(action),
//             firstName: 'Jan',
//             lastName: '',
//             email: '',
//             phone: '',
//             password: ''
//         });
//         renderedComponent.instance().changeFirstName = onChangeSpy;
//         renderedComponent.update();
//         const firstNameInput = renderedComponent.find('Input').first();
//         firstNameInput.simulate('change', { target: { value: 'Jane' } });
//
//         expect(onChangeSpy).toHaveBeenCalled();
//
//         renderedComponent.find('Button').simulate('click');
//         expect(actions.length).toBe(5);
//         expect(actions.filter((a) => a.type === 'cozmo/Signup/SIGNUP_FORM_ERRORS').length).toBe(4);
//     });
//
});
