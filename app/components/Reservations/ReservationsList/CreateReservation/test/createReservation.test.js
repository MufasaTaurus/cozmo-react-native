import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import {fromJS} from 'immutable';
import CreateReservation from 'components/Reservations/ReservationsList/CreateReservation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const defaultStore = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => fromJS({
        global: {
            properties: [{id: 1, name: 'a', street: 'b'}, {id: 2, name: 'c', street: 'd'}]
        }
    }),
};

const renderComponent = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <MuiThemeProvider>
            <CreateReservation { ...props } />
        </MuiThemeProvider>
    </Provider>
);

describe('<CreateReservation />', () => {
    it('should not be visible', () => {
        const renderedComponent = renderComponent({
            open: false,
            status: '',
            onClose: () => {},
            onSubmit: () => {}
        });

        expect(renderedComponent.find('Dialog').props().open).toEqual(false);
    });

    it('should be visible', () => {
        const renderedComponent = renderComponent({
            open: true,
            status: '',
            onClose: () => {},
            onSubmit: () => {}
        });

        expect(renderedComponent.find('Dialog').props().open).toEqual(true);
    });

    it('should close', () => {
        const spy = jest.fn();
        const renderedComponent = renderComponent({
            open: true,
            status: '',
            onClose: spy,
            onSubmit: () => {}
        });

        renderedComponent.find('Dialog').props().onRequestClose();
        expect(spy).toHaveBeenCalled();
    });

    it('should have 2 buttons', () => {
        const renderedComponent = renderComponent({
            open: true,
            status: '',
            onClose: () => {},
            onSubmit: () => {}
        });

        expect(renderedComponent.find('Dialog').props().actions.length).toEqual(2);
    });

    it('should have disabled submit button', () => {
        const renderedComponent = renderComponent({
            open: true,
            status: '',
            onClose: () => {},
            onSubmit: () => {}
        });

        const buttons = renderedComponent.find('Dialog').props().actions;
        const cancel = buttons[0];
        const submit = buttons[1];
        expect(cancel.props.disabled).toEqual(false);
        expect(submit.props.disabled).toEqual(true);
    });

    it('should submit form', () => {
        const spy = jest.fn();
        const renderedComponent = renderComponent({
            open: true,
            status: '',
            onClose: () => {},
            onSubmit: spy
        });

        const buttons = renderedComponent.find('Dialog').props().actions;
        const submit = buttons[1];
        submit.props.onTouchTap();
        expect(spy).toHaveBeenCalled();
    });
});
