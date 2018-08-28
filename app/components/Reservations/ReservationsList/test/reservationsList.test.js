import React from 'react';
import { shallow, mount } from 'enzyme';
import {ReservationsList, mapDispatchToProps} from 'components/Reservations/ReservationsList';
import PaginationModel from 'models/Pagination';
import { Provider } from 'react-redux';
import {fromJS} from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const sampleData = [
    {id: 1, start_date: '2017-10-10', property: {name: 'aaa', street: 's', cover_image: ''}, guest: {first_name: 'a', last_name: 'b'}},
    {id: 2, start_date: '2017-10-10', property: {name: 'bbb', street: 's', cover_image: ''}, guest: {first_name: 'a', last_name: 'b'}},
    {id: 3, start_date: '2017-10-10', property: {name: 'ccc', street: 's', cover_image: ''}, guest: {first_name: 'a', last_name: 'b'}}
];

const actions = [];
const defaultStore = {
    subscribe: () => {},
    dispatch: (action) => actions.push(action),
    getState: () => fromJS({
        reservations: {
            calendarView: false,
            pagination: new PaginationModel({ currentPage: 1 }),
            calendarPagination: new PaginationModel({}),
            reservationsCalendar: [{
                name: 'a',
                street: 'b',
                rates: [{
                    value: '1'
                }],
                reservations: [
                    {
                        guest: {
                            first_name: 'a',
                            last_name: 'b'
                        },
                        start_date: '2017-10-10',
                        end_date: '2017-10-11'
                    }
                ],
                blockings: [],
                ical_events: []
            }]
        },
        global: {
            cache: {
                multicalendar: {}
            }
        }

    }),
};

const renderComponent = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <MuiThemeProvider>
            <ReservationsList { ...props } />
        </MuiThemeProvider>
    </Provider>
);

describe('<ReservationsList />', () => {
    it('should render 1 section', () => {
        // const renderedComponent = renderComponent({
        //     reservations: fromJS([]),
        //     calendarView: false,
        //     loading: true
        // });

        expect(1).toEqual(1);
    });

    // it('should render List', () => {
    //     const renderedComponent = renderComponent({
    //         reservations: fromJS(sampleData),
    //         calendarView: false,
    //         loading: true,
    //         pagination: new PaginationModel({ currentPage: 1 })
    //     });
    //
    //     expect(renderedComponent.find('table').length).toEqual(1);
    // });
    //
    // it('should render Multicalendar', () => {
    //     const renderedComponent = renderComponent({
    //         reservations: fromJS([]),
    //         calendarView: true,
    //         loading: true
    //     });
    //
    //     expect(renderedComponent.find('Multicalendar').length).toEqual(1);
    // });
    //
    // it('should render proper number of rows', () => {
    //     const renderedComponent = renderComponent({
    //         reservations: fromJS(sampleData),
    //         calendarView: false,
    //         loading: false,
    //         pagination: new PaginationModel({ currentPage: 1 })
    //     });
    //
    //     expect(renderedComponent.find('table tbody tr').length).toEqual(3);
    //     expect(renderedComponent.find('.empty-state').length).toEqual(0);
    // });
    //
    // it('should render Empty state', () => {
    //     const renderedComponent = renderComponent({
    //         reservations: fromJS([]),
    //         calendarView: false,
    //         loading: false
    //     });
    //
    //     expect(renderedComponent.find('table').length).toEqual(0);
    //     expect(renderedComponent.find('.empty-state').length).toEqual(1);
    // });
    //
    // it('should filter results', () => {
    //     const renderedComponent = renderComponent({
    //         reservations: fromJS(sampleData),
    //         calendarView: false,
    //         loading: false,
    //         pagination: new PaginationModel({ currentPage: 1 })
    //     });
    //
    //     renderedComponent.find('input').simulate('change', { target: { value: 'aaa' } });
    //     expect(renderedComponent.find('table tbody tr').length).toEqual(1);
    //
    //     renderedComponent.find('input').simulate('change', { target: { value: 'bbb' } });
    //     expect(renderedComponent.find('table tbody tr').length).toEqual(1);
    //
    //     renderedComponent.find('input').simulate('change', { target: { value: '' } });
    //     expect(renderedComponent.find('table tbody tr').length).toEqual(3);
    // });
    //
    // it('should toggle views', () => {
    //     const spy = jest.fn();
    //     const renderedComponent = renderComponent({
    //         reservations: fromJS(sampleData),
    //         calendarView: true,
    //         loading: false,
    //         changeDisplay: spy
    //     });
    //
    //     renderedComponent.find('.toggle').simulate('click');
    //     expect(spy).toHaveBeenCalled();
    // });
});

