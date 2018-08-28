import React from 'react';
import { mount } from 'enzyme';
import Calendars, { mapDispatchToProps } from 'components/Properties/PropertiesList/List/PropertyInfo/Booking/CalSync';
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
                    external_cals: [{ id: '1', name: 'name', desc: '', logs: [] }]
                })
            },
            property: {},
            loading: false,
            syncingCalendar: false,
            calendarURLError: 'ok',
            events: [],
        }
    }),
};

const renderComponent = (props = {}, store = defaultStore) => mount(

    <Provider store={ store }>
        <Calendars { ...props } />
    </Provider>
);

describe('<Calendars />', () => {

    it('has equal rows', () => {
        const renderedComponent = renderComponent({
            create: false,
            addAlert: () => {},
            deleteCalendar: () => {},
            syncCalendar: () => {},
        });

        expect(renderedComponent.find('.ical-row').length).toBe(1);

    });

    // it('open Details after click', () => {
    //     const renderedComponent = renderComponent({
    //         create: false,
    //         addAlert: () => {},
    //         deleteCalendar: () => {},
    //         syncCalendar: () => {},
    //     });
    //
    //     expect(renderedComponent.find('AddCalendar').length).toBe(0);
    //
    //     renderedComponent.find('.ical-row').simulate('click');
    //     expect(renderedComponent.find('AddCalendar').length).toBe(1);
    //
    // });

    it('has right options', () => {
        const renderedComponent = renderComponent({
            create: false,
            addAlert: () => {},
            deleteCalendar: () => {},
            syncCalendar: () => {},
        });

        renderedComponent.find('.icon').simulate('click');
        expect(renderedComponent.find('.popup-menu').props().children[0].props.children).toBe('Edit');
        expect(renderedComponent.find('.popup-menu').props().children[1].props.children).toBe('Delete');

    });

    // it('delete iCal after click', () => {
    //     const spy = jest.fn();
    //     const renderedComponent = renderComponent({
    //         deleteCalendar: spy,
    //     });
    //
    //     renderedComponent.find('.icon').simulate('click');
    //     renderedComponent.find('.popup-option').at(1).simulate('click');
    //     expect(spy).toHaveBeenCalledTimes(1);
    //
    // });

    it('edit iCal after click', () => {
        const renderedComponent = renderComponent({
            create: false,
            addAlert: () => {},
            syncCalendar: () => {},
        });

        expect(renderedComponent.find('AddCalendar').length).toBe(0);
        renderedComponent.find('.icon').simulate('click');
        renderedComponent.find('.popup-option').at(0).simulate('click');
        expect(renderedComponent.find('AddCalendar').length).toBe(1);
    });
});
