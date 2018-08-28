import React from 'react';
import { shallow, mount } from 'enzyme';
import {ReservationInfo, mapDispatchToProps} from 'components/Reservations/ReservationInfo';
import { Provider } from 'react-redux';
import {fromJS} from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

let actions = [];
const defaultStore = {
    subscribe: () => {},
    dispatch: (action) => actions.push(action),
    getState: () => fromJS({
        global: {
            alerts: [],
            templates: []
        },
        reservations: {
            reservations: [],
            fetchingMessages: true
        }
    }),
};

const defaultReservations = fromJS([
    {
        id: '1',
        guest: {
            first_name: 'A',
            last_name: 'B',
            email: 'email@email.com',
            phone: '',
            avatar: ''
        },
        start_date: '2017-10-10',
        end_date: '2017-10-12',
        guests_children: 1,
        guests_adults: 2,
        paid: '0',
        price: '100',
        property: {
            cover_image: '',
            name: 'Name',
            id: 1,
            street: 'address'
        },
        messages: []
    }
]);

const renderComponent = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <MuiThemeProvider>
            <ReservationInfo { ...props } />
        </MuiThemeProvider>
    </Provider>
);

describe('<ReservationInfo />', () => {
    it('should display 2 Card and TextEditor', () => {
        const renderedComponent = renderComponent({
            reservations: defaultReservations,
            id: '1'
        });

        expect(renderedComponent.find('Card').length).toEqual(2);
        expect(renderedComponent.find('TextEditor').length).toEqual(1);
    });

    it('should not display TextEditor', () => {
        const renderedComponent = renderComponent({
            reservations: defaultReservations.setIn([0, 'guest', 'email'], null),
            id: '1'
        });

        expect(renderedComponent.find('Card').length).toEqual(2);
        expect(renderedComponent.find('TextEditor').length).toEqual(0);
    });

    it('should edit Guest details', () => {
        const spy = jest.fn();
        const renderedComponent = renderComponent({
            reservations: defaultReservations,
            id: '1',
            editGuest: spy
        });

        expect(renderedComponent.find('EditGuestDetails').length).toEqual(1);
        expect(renderedComponent.find('EditGuestDetails').props().open).toEqual(false);
        renderedComponent.find('Card').first().find('.header .edit').simulate('click');
        expect(renderedComponent.find('EditGuestDetails').props().open).toEqual(true);
        renderedComponent.find('EditGuestDetails').props().onSubmit();
        expect(spy).toHaveBeenCalled();
    });

    it('should delete reservation', () => {
        const spy = jest.fn();
        const renderedComponent = renderComponent({
            reservations: defaultReservations,
            id: '1',
            deleteReservation: spy
        });

        renderedComponent.find('.delete-button button').simulate('click');
        expect(spy).toHaveBeenCalled();
    });

    it('should edit Reservation details', () => {
        const spy = jest.fn();
        const renderedComponent = renderComponent({
            reservations: defaultReservations,
            id: '1',
            editReservation: spy
        });

        expect(renderedComponent.find('EditReservationDetails').length).toEqual(1);
        expect(renderedComponent.find('EditReservationDetails').props().open).toEqual(false);
        renderedComponent.find('Card').last().find('.header .edit').simulate('click');
        expect(renderedComponent.find('EditReservationDetails').props().open).toEqual(true);
        renderedComponent.find('EditReservationDetails').props().onSubmit();
        expect(spy).toHaveBeenCalled();
    });
});
