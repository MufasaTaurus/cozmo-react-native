import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Header from 'components/Dashboard/Header';
import { fromJS } from 'immutable';

let actions = [];
const defaultStore = {
    subscribe: () => {},
    dispatch: (action) => actions.push(action),
    getState: () => fromJS({
        global: {
            user: {
                first_name: 'Name',
                last_name: 'Last',
                avatar: '',
            },
        }
    })
};

const renderComponent = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <Header { ...props } />
    </Provider>
);

describe('<Header />', () => {
    it('should render button but no menu', () => {
        const renderedComponent = renderComponent();

        expect(renderedComponent.find('.profile-menu').length).toEqual(1);
        expect(renderedComponent.find('.active').length).toEqual(0);
    });

    it('should render button and menu when clicked', () => {
        const renderedComponent = renderComponent();

        renderedComponent.find('.profile-menu').props().onClick();
        expect(renderedComponent.find('.profile-menu .menu').length).toEqual(1);
        expect(renderedComponent.find('.profile-menu-item').length).toEqual(2);
    });

    it('should render right user name', () => {
        const renderedComponent = renderComponent();

        expect(renderedComponent.find('.name').text()).toEqual('Name');
    });
});
