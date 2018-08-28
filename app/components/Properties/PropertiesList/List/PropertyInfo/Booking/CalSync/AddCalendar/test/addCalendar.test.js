import React from 'react';
import { mount } from 'enzyme';
import AddCalendar, { mapDispatchToProps } from 'components/Properties/PropertiesList/List/PropertyInfo/Booking/CalSync/AddCalendar';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';

const actions = [];
const defaultStore = {
    subscribe: () => {},
    dispatch: (action) => actions.push(action),
    getState: () => fromJS({
        properties : {
            selectedProperty: {
                id: '1',
                calendar: fromJS({
                    id: '123',
                    external_cals: [{ id: '1', name: 'name', desc: '', logs: [], url: 'url', color: { name: 'blue', hex_color: '#00f' } }]
                })
            },
            loading: false,
            syncingCalendar: false,
            property: {},
            calendarChecking: false,
            calendarURLError: 'ok',
            calendarEvents: [],
            events: [],
        }
    }),
};

const renderComponent = (props = {}, store = defaultStore) => mount(

    <Provider store={ store }>
        <AddCalendar { ...props } />
    </Provider>
);

describe('<AddCalendar />', () => {

    // it('can\'t save data', () => {
    //     const spy = jest.fn();
    //     const renderedComponent = renderComponent({
    //         updateCalendar: spy,
    //         resetCalendarEvents: () => {},
    //         addAlert: () => {},
    //         checkCalendarUrl: () => {},
    //         addCalendar: () => {},
    //         syncCalendar: () => {},
    //         resetUrlError: () => {},
    //     });
    //
    //     renderedComponent.find('.save-button').simulate('click');
    //     expect(spy).toHaveBeenCalled();
    //
    // });
    //
    // it('can save data', () => {
    //     const spy = jest.fn();
    //     const renderedComponent = renderComponent({
    //         updateCalendar: spy,
    //         resetCalendarEvents: () => {},
    //         addAlert: () => {},
    //         checkCalendarUrl: () => {},
    //         addCalendar: () => {},
    //         syncCalendar: () => {},
    //         resetUrlError: () => {},
    //     });
    //
    //     renderedComponent.find('.save-button').simulate('click');
    //     expect(spy).toHaveBeenCalled();
    //
    // });

    it('can cancel adding/editing', () => {
        const spy = jest.fn();
        const renderedComponent = renderComponent({
            onClose: spy
        });

        renderedComponent.find('.button-new .ghost .big').simulate('click');
        expect(spy).toHaveBeenCalled();
    });

});
