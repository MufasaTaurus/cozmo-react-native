import React from 'react';
import { mount } from 'enzyme';
import { Multicalendar, mapDispatchToProps } from 'components/Multicalendar';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import PaginationModel from 'models/Pagination';
import moment from 'moment';

const actions = [];
const defaultStore = {
    subscribe: () => {},
    dispatch: (action) => actions.push(action),
    getState: () => fromJS({
        reservations: {
            calendarPagination: new PaginationModel({}),
            pagination: new PaginationModel({}),
        }
    }),
};

const sampleData = fromJS([
    {
        name: 'aaa',
        street: 'bbb',
        cover_image: '',
        reservations: [{
            start_date: moment().add(2, 'd').format('YYYY-MM-DD'),
            end_date: moment().add(5, 'd').format('YYYY-MM-DD'),
            guest: {
                first_name: 'ccc',
                last_name: 'ddd'
            }
        }],
        rates: [{ nightly: '1' }],
    }, {
        name: 'aaa',
        street: 'bbb',
        cover_image: '',
        reservations: [{
            start_date: moment().add(2, 'd').format('YYYY-MM-DD'),
            end_date: moment().add(25, 'd').format('YYYY-MM-DD'),
            guest: {
                first_name: 'ccc',
                last_name: 'ddd'
            }
        }],
        rates: [{ nightly: '2' }]
    }, {
        name: 'zzz',
        street: 'xxx',
        cover_image: '',
        reservations: [],
        rates: [{ nightly: '3' }]
    }]);

const renderComponent = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <Multicalendar { ...props } />
    </Provider>
);

describe('<Multicalendar />', () => {
    it('should render 3 children', () => {
        const renderedComponent = renderComponent({
            fetchReservationCalendar: () => {},
            reservationsCalendar: fromJS([]),
            cachedData: fromJS({}),
            loading: false,
            pagination: new PaginationModel({}),
        });

        expect(renderedComponent.find('Toolbar').length).toEqual(1);
        expect(renderedComponent.find('Header').length).toEqual(1);
        expect(renderedComponent.find('Rows').length).toEqual(1);
    });

    it('should fetch data on start', () => {
        const fetchSpy = jest.fn();
        renderComponent({
            fetchReservationCalendar: fetchSpy,
            reservationsCalendar: fromJS([]),
            cachedData: fromJS({}),
            loading: false,
            pagination: new PaginationModel({}),
        });

        expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    it('should fetch data on change', () => {
        const fetchSpy = jest.fn();
        const renderedComponent = renderComponent({
            fetchReservationCalendar: fetchSpy,
            reservationsCalendar: fromJS([]),
            cachedData: fromJS({}),
            loading: false,
            pagination: new PaginationModel({}),
        });

        renderedComponent.find('.arrow.next').simulate('click');
        renderedComponent.find('.arrow.next').simulate('click');
        expect(fetchSpy).toHaveBeenCalledTimes(3);
    });

    it('should set current date as of now', () => {
        const renderedComponent = renderComponent({
            fetchReservationCalendar: () => {},
            reservationsCalendar: fromJS([]),
            cachedData: fromJS({}),
            loading: false,
            pagination: new PaginationModel({}),
        });

        const dateToShow = moment().format('MMMM DD, YYYY') + ' - ' + moment().add(13, 'd').format('MMMM DD, YYYY');
        expect(renderedComponent.find('.toolbar .left-side .dates').text()).toEqual(dateToShow);
    });

    it('should set change dates after changing number od days', () => {
        const renderedComponent = renderComponent({
            fetchReservationCalendar: () => {},
            reservationsCalendar: fromJS([]),
            cachedData: fromJS({}),
            loading: false,
            pagination: new PaginationModel({}),
        });

        renderedComponent.find('.toolbar .switcher .option').first().simulate('click');
        const dateToShow = moment().format('MMMM DD, YYYY') + ' - ' + moment().add(6, 'd').format('MMMM DD, YYYY');
        expect(renderedComponent.find('.toolbar .left-side .dates').text()).toEqual(dateToShow);
    });

    it('should go to the next/prev period', () => {
        const renderedComponent = renderComponent({
            fetchReservationCalendar: () => {},
            reservationsCalendar: fromJS([]),
            cachedData: fromJS({}),
            loading: false,
            pagination: new PaginationModel({}),
        });

        renderedComponent.find('.toolbar .arrow.next').simulate('click');
        let dateToShow = moment().add(14, 'd').format('MMMM DD, YYYY') + ' - ' + moment().add(27, 'd').format('MMMM DD, YYYY');
        expect(renderedComponent.find('.toolbar .left-side .dates').text()).toEqual(dateToShow);

        renderedComponent.find('.toolbar .arrow.prev').simulate('click');
        dateToShow = moment().format('MMMM DD, YYYY') + ' - ' + moment().add(13, 'd').format('MMMM DD, YYYY');
        expect(renderedComponent.find('.toolbar .left-side .dates').text()).toEqual(dateToShow);
    });

    it('should display right number of Rows', () => {
        const renderedComponent = renderComponent({
            fetchReservationCalendar: () => {},
            reservationsCalendar: sampleData,
            cachedData: fromJS({}),
            loading: false,
            pagination: new PaginationModel({}),
        });

        expect(renderedComponent.find('Row').length).toEqual(3);
    });

    it('should filter results', () => {
        const renderedComponent = renderComponent({
            fetchReservationCalendar: () => {},
            reservationsCalendar: sampleData,
            cachedData: fromJS({}),
            loading: false,
            pagination: new PaginationModel({}),
        });

        renderedComponent.find('SearchBox input').simulate('change', { target: { value: 'aaa' } });
        expect(renderedComponent.find('Row').length).toEqual(2);

        renderedComponent.find('SearchBox input').simulate('change', { target: { value: 'xxx' } });
        expect(renderedComponent.find('Row').length).toEqual(1);

        renderedComponent.find('SearchBox input').simulate('change', { target: { value: 'bbb' } });
        expect(renderedComponent.find('Row').length).toEqual(2);

        renderedComponent.find('SearchBox input').simulate('change', { target: { value: 'zzz' } });
        expect(renderedComponent.find('Row').length).toEqual(1);

        renderedComponent.find('SearchBox input').simulate('change', { target: { value: '' } });
        expect(renderedComponent.find('Row').length).toEqual(3);
    });

    it('should toggle rates', () => {
        const renderedComponent = renderComponent({
            fetchReservationCalendar: () => {},
            reservationsCalendar: sampleData,
            cachedData: fromJS({}),
            loading: false,
            pagination: new PaginationModel({}),
        });

        expect(renderedComponent.find('Row .day').last().text()).toEqual('$3');
        renderedComponent.find('.toolbar .toggle-rates').simulate('click');
        expect(renderedComponent.find('Row .day').last().text()).toEqual('');
    });

    it('should render reservations', () => {
        const renderedComponent = renderComponent({
            fetchReservationCalendar: () => {},
            reservationsCalendar: sampleData,
            cachedData: fromJS({}),
            loading: false,
            pagination: new PaginationModel({}),
        });

        const row = renderedComponent.find('Row').first();
        expect(row.find('.day').length).toEqual(14);
        expect(row.find('.day.start').length).toEqual(1);
        expect(row.find('.day.end').length).toEqual(1);
        expect(row.find('.day .event-continuing').length).toEqual(0);
        expect(row.find('.day.has-event').length).toEqual(2);
    });

    it('should render long reservations', () => {
        const renderedComponent = renderComponent({
            fetchReservationCalendar: () => {},
            reservationsCalendar: sampleData,
            cachedData: fromJS({}),
            loading: false,
            pagination: new PaginationModel({}),
        });

        const row = renderedComponent.find('Row').at(1);
        expect(row.find('.day.start').length).toEqual(1);
        expect(row.find('.day.start .event-start').length).toEqual(1);
        expect(row.find('.day.end').length).toEqual(0);
        expect(row.find('.day.has-event').length).toEqual(11);

        renderedComponent.find('.toolbar .arrow.next').simulate('click');
        expect(row.find('.day.start').length).toEqual(0);
        expect(row.find('.day.start .event-start').length).toEqual(0);
        expect(row.find('.day.end').length).toEqual(1);
        expect(row.find('.day .event-continuing').length).toEqual(1);
        expect(row.find('.day.has-event').length).toEqual(11);
    });

    it('should get data from cache', () => {
        const fetchSpy = jest.fn();
        const populateSpy = jest.fn();
        const key = moment().format('YYYY-MM-DD') + moment().add(13, 'd').format('YYYY-MM-DD') + '1';
        renderComponent({
            fetchReservationCalendar: fetchSpy,
            reservationsCalendar: sampleData,
            cachedData: fromJS({
                [key]: {}
            }),
            populateCalendarFromCache: populateSpy,
            loading: false,
            pagination: new PaginationModel({}),
        });

        expect(fetchSpy).not.toHaveBeenCalled();
        expect(populateSpy).toHaveBeenCalled();
    });
});


