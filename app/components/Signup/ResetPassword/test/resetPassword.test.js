import React from 'react';
import { shallow, mount } from 'enzyme';
import {ResetPasswordComponent, mapDispatchToProps} from 'components/Signup/ResetPassword';

const renderComponent = ( props = {} ) => mount(
    <ResetPasswordComponent {...props} />
);

describe('<ResetPasswordComponent />', () => {
    it('should render form', () => {
        // const renderedComponent = renderComponent({
        //     location: {
        //         query: {
        //             token: 'token',
        //             uid: 'uid'
        //         }
        //     },
        //     onLoad: () => {}
        // });
        // expect(renderedComponent.find('BoxWithLogo').length).toEqual(1);
        // expect(renderedComponent.find('Input').length).toEqual(1);
        // expect(renderedComponent.find('Button').length).toEqual(1);
    });
//
//     it('should validate form', () => {
//         const onSubmitSpy = jest.fn();
//         const renderedComponent = renderComponent({
//             password: 'abcd1234',
//             location: {
//                 query: {
//                     token: 'token',
//                     uid: 'uid'
//                 }
//             },
//             onLoad: () => {},
//             onSubmit: onSubmitSpy
//         });
//
//         const button = renderedComponent.find('Button');
//         expect(button.props().disabled).toBe(false);
//
//         button.simulate('click');
//         expect(onSubmitSpy).toHaveBeenCalled();
//     });
//
//     it('should NOT validate form', () => {
//         const onChangeSpy = jest.fn();
//         const onSubmitSpy = jest.fn();
//         const renderedComponent = renderComponent({
//             password: '12345678',
//             location: {
//                 query: {
//                     token: 'token',
//                     uid: 'uid'
//                 }
//             },
//             onLoad: () => {},
//             onChangePassword: onChangeSpy,
//             onSubmit: onSubmitSpy
//         });
//
//         renderedComponent.find('Input').simulate('change', { target: { value: '12345678' } });
//         expect(onChangeSpy).toHaveBeenCalled();
//
//         const button = renderedComponent.find('Button');
//         expect(button.props().disabled).toBe(true);
//
//         button.simulate('click');
//         expect(onSubmitSpy).not.toHaveBeenCalled();
//     });
//
//     it('should render email sent info', () => {
//         const renderedComponent = renderComponent({
//             location: {
//                 query: {
//                     token: 'token',
//                     uid: 'uid'
//                 }
//             },
//             success: true,
//             onLoad: () => {}
//         });
//         expect(renderedComponent.find('BoxWithLogo').length).toEqual(1);
//         expect(renderedComponent.find('Input').length).toEqual(0);
//         expect(renderedComponent.find('Button').length).toEqual(0);
//         expect(renderedComponent.find('.info').length).toEqual(1);
//     });
});
