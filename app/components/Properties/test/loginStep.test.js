import React from 'react';
import { shallow, mount } from 'enzyme';
import { Login, mapDispatchToProps } from 'components/Properties/PropertiesList/ImportDialog/Steps/Login';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let actions = [];
const defaultStore = {
    subscribe: () => {},
    dispatch: (action) => actions.push(action),
    getState: () => fromJS({
        properties: {
            username: '',
            password: '',
            loading: false,
            loginError: ''
        }
    })
};

const renderComponent = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <MuiThemeProvider>
            <Login { ...props } />
        </MuiThemeProvider>
    </Provider>
);

describe('<Login />', () => {
    it('should render form with 2 inputs', () => {
        const renderedComponent = renderComponent({
            username: '',
            password: '',
            loading: false,
            loginError: ''
        });

        expect(renderedComponent.find('form').length).toEqual(1);
        expect(renderedComponent.find('Input').length).toEqual(2);
        expect(renderedComponent.find('ButtonNew').length).toEqual(1);
        expect(renderedComponent.find('ButtonNew').props().disabled).toEqual(true);
    });

    it('should populate Inputs', () => {
        const renderedComponent = renderComponent({
            username: 'a',
            password: 'b',
            loading: false,
            loginError: ''
        });

        expect(renderedComponent.find('Input').at(0).props().value).toEqual('a');
        expect(renderedComponent.find('Input').at(1).props().value).toEqual('b');
        expect(renderedComponent.find('ButtonNew').props().disabled).toEqual(false);
    });

    it('should show login error', () => {
        const renderedComponent = renderComponent({
            username: 'a',
            password: 'b',
            loading: false,
            loginError: {}
        });

        expect(renderedComponent.find('.error-msg').length).toEqual(1);
    });

    it('should render spinner', () => {
        const renderedComponent = renderComponent({
            username: 'a',
            password: 'b',
            loading: true,
            loginError: ''
        });

        expect(renderedComponent.find('.error-msg').length).toEqual(0);
        expect(renderedComponent.find('Spinner').length).toEqual(1);
        expect(renderedComponent.find('ButtonNew').props().disabled).toEqual(true);
    });

    it('should NOT submit form', () => {
        const spy = jest.fn();
        const renderedComponent = renderComponent({
            username: 'aaa',
            password: '',
            loading: false,
            loginError: '',
            submitForm: spy
        });

        renderedComponent.find('ButtonNew').simulate('click');
        expect(spy).not.toHaveBeenCalled();
    });

    it('should submit form', () => {
        const spy = jest.fn();
        const renderedComponent = renderComponent({
            username: 'aaa',
            password: 'bbb',
            loading: false,
            loginError: '',
            submitForm: spy
        });

        renderedComponent.find('ButtonNew').simulate('click');
        expect(spy).toHaveBeenCalled();
    });
});
