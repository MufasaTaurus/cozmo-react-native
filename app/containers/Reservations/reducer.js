import { fromJS } from 'immutable';
import moment from 'moment';
import {
    FETCH_RESERVATIONS,
    FETCH_RESERVATIONS_SUCCESS,
    FETCH_RESERVATIONS_ERROR,
    FETCH_RESERVATIONS_CALENDAR,
    FETCH_RESERVATIONS_CALENDAR_SUCCESS,
    FETCH_RESERVATIONS_CALENDAR_ERROR,
    FETCH_RESERVATIONS_CALENDAR_PROPERTY,
    FETCH_RESERVATIONS_CALENDAR_PROPERTY_SUCCESS,
    FETCH_RESERVATIONS_CALENDAR_PROPERTY_ERROR,
    POPULATE_RESERVATION_CALENDAR_FROM_CACHE,
    SEND_MESSAGE,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_ERROR,
    CHANGE_DISPLAY,
    EDIT_RESERVATION_SUCCESS,
    EDIT_GUEST_SUCCESS,
    ADD_RESERVATION,
    ADD_RESERVATION_SUCCESS,
    ADD_RESERVATION_ERROR,
    FETCH_RESERVATION_MESSAGES,
    FETCH_RESERVATION_MESSAGES_SUCCESS,
    FETCH_RESERVATION_MESSAGES_ERROR,
    FETCH_RESERVATION_EVENTS,
    FETCH_RESERVATION_EVENTS_SUCCESS,
    FETCH_RESERVATION_EVENTS_ERROR,
    FETCH_RESERVATION,
    FETCH_RESERVATION_SUCCESS,
    FETCH_RESERVATION_ERROR,
    FETCH_QUOTE,
    FETCH_QUOTE_SUCCESS,
    FETCH_QUOTE_ERROR,
    CREATE_BLOCKING_SUCCESS,
    DELETE_BLOCKING_SUCCESS,
    CREATE_SEASONAL_RATING,
    CREATE_SEASONAL_RATING_SUCCESS,
    CREATE_SEASONAL_RATING_ERROR,
    CREATE_CUSTOM_RATING,
    CREATE_CUSTOM_RATING_SUCCESS,
    CREATE_CUSTOM_RATING_ERROR,
    SET_CALENDAR_VIEW,
    SET_CALENDAR_CURRENT_DATE,
    OPEN_ICAL_EVENT_SUCCESS
} from './constants';
import { LOGOUT_SUCCESS } from 'containers/App/constants';
import { SYNC_CALENDAR_SUCCESS, FETCH_CALENDAR_SUCCESS } from 'containers/Properties/constants';
import PaginationModel from 'models/Pagination';
import QuoteModel from 'models/Quote';
import { calendarMerger } from 'utils/helpers';

// The initial state of the App
const initialState = fromJS({
    reservations: [],
    pagination: new PaginationModel({}),
    reservationsCalendar: [],
    calendarPagination: new PaginationModel({}),
    fetchedDates: { from: moment(), to: moment() },
    propertyCalendars: {},
    //calendarView: true,
    loading: true,
    fetchingMessages: true,
    fetchingCalendar: true,
    fetchingEvents: true,
    messageStatus: '',
    addReservationStatus: '',
    quote: null,
    quoteFetching: 'ok',
    addingRate: 'ok',
    calendarView: 'basic',
    calendarCurrentDate: null
});

function reservationsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_RESERVATIONS:
        case FETCH_RESERVATION:
            return state
                .set('loading', true);
        case FETCH_RESERVATIONS_CALENDAR:
        case FETCH_RESERVATIONS_CALENDAR_PROPERTY:
            return state
                .set('fetchingCalendar', true);
        case FETCH_RESERVATIONS_SUCCESS:
            return state
                .set('reservations', fromJS(action.data.results))
                .set('pagination', state.get('pagination').setCount(action.data.count))
                .set('loading', false);
        case FETCH_RESERVATIONS_CALENDAR_SUCCESS:
        case POPULATE_RESERVATION_CALENDAR_FROM_CACHE:
            if (action.data.filtersChanged) {
                return state
                    .set('reservationsCalendar', fromJS(action.data.data.results))
                    .set('calendarPagination', state.get('calendarPagination').setCount(action.data.data.count))
                    .setIn(['fetchedDates', 'from'], moment(action.data.from))
                    .setIn(['fetchedDates', 'to'], moment(action.data.to))
                    .set('fetchingCalendar', false);
            } else {
                return state
                    .set('reservationsCalendar', calendarMerger(state.get('reservationsCalendar'), fromJS(Object.assign({ reservations: [], rates: [] }, action.data.data.results))))
                    .set('calendarPagination', state.get('calendarPagination').setCount(action.data.data.count))
                    .setIn(['fetchedDates', 'from'], state.getIn(['fetchedDates', 'from']).isAfter(action.data.from) ? moment(action.data.from) : moment(state.getIn(['fetchedDates', 'from'])))
                    .setIn(['fetchedDates', 'to'], state.getIn(['fetchedDates', 'to']).isBefore(action.data.to) ? moment(action.data.to) : moment(state.getIn(['fetchedDates', 'to'])))
                    .set('fetchingCalendar', false);
            }
        case FETCH_RESERVATIONS_CALENDAR_PROPERTY_SUCCESS:
            return state
                .set('propertyCalendars', state.get('propertyCalendars').set(action.data.key, fromJS(Object.assign({ reservations: [], rates: [] }, action.data.value))))
                .set('fetchingCalendar', false);
        case FETCH_RESERVATIONS_ERROR:
        case FETCH_RESERVATIONS_CALENDAR_ERROR:
        case FETCH_RESERVATION_ERROR:
        case FETCH_RESERVATIONS_CALENDAR_PROPERTY_ERROR:
            return state
                .set('loading', false)
                .set('fetchingCalendar', false);
        case SEND_MESSAGE:
            return state
                .set('messageStatus', 'sending');
        case SEND_MESSAGE_SUCCESS:
            return state
                .set('messageStatus', 'success');
        case SEND_MESSAGE_ERROR:
            return state
                .set('messageStatus', 'error');
        case ADD_RESERVATION:
            return state
                .set('addReservationStatus', 'loading');
        case ADD_RESERVATION_SUCCESS:
            const rIndex = state.get('reservationsCalendar').findIndex(j => j.get('id') === action.data.id);
            let newState = state;
            if (action.data.calendarKey) {
                newState = state.setIn(['propertyCalendars', action.data.calendarKey, 'reservations'], state.getIn(['propertyCalendars', action.data.calendarKey, 'reservations']).push(fromJS(action.data.data)));
            }
            if (rIndex > -1) {
                newState = newState.setIn(['reservationsCalendar', rIndex, 'reservations'], state.getIn(['reservationsCalendar', rIndex, 'reservations']).push(fromJS(action.data.data)));
            }
            return newState
                .set('reservations', state.get('reservations').push(fromJS(action.data.data)))
                .set('addReservationStatus', 'success');
        case ADD_RESERVATION_ERROR:
            return state
                .set('addReservationStatus', action.data.non_field_errors[0]);
        case CHANGE_DISPLAY:
            return state
                .set('calendarView', action.data);
        case EDIT_RESERVATION_SUCCESS:
            const reservationIndex = state.get('reservations').findIndex(j => j.get('id') + '' === action.data.id);
            return state
                .setIn(['reservations', reservationIndex], state.getIn(['reservations', reservationIndex]).merge(action.data));
        case EDIT_GUEST_SUCCESS:
            const reservationIdx = state.get('reservations').findIndex(j => j.get('id') + '' === action.data.id);
            return state
                .setIn(['reservations', reservationIdx, 'guest'], state.getIn(['reservations', reservationIdx, 'guest']).merge(action.data));
        case FETCH_RESERVATION_MESSAGES:
            return state
                .set('fetchingMessages', true);
        case FETCH_RESERVATION_MESSAGES_ERROR:
            return state
                .set('fetchingMessages', false);
        case FETCH_RESERVATION_MESSAGES_SUCCESS:
            const resIdx = state.get('reservations').findIndex(j => j.get('id') === action.data.id);
            return state
                .setIn(['reservations', resIdx, 'messages'], fromJS(action.data.messages))
                .set('fetchingMessages', false);
        case FETCH_RESERVATION_EVENTS:
            return state
                .set('fetchingEvents', true);
        case FETCH_RESERVATION_EVENTS_ERROR:
            return state
                .set('fetchingEvents', false);
        case FETCH_RESERVATION_SUCCESS:
            return state
                .set('reservations', state.get('reservations').push(fromJS(action.data)))
                .set('loading', false);
        case FETCH_RESERVATION_EVENTS_SUCCESS:
            const resIndex = state.get('reservations').findIndex(j => j.get('id') === action.data.id);
            return state
                .setIn(['reservations', resIndex, 'events'], fromJS(action.data.events))
                .set('fetchingEvents', false);
        case FETCH_QUOTE:
            return state
                .set('quoteFetching', 'fetching');
        case FETCH_QUOTE_SUCCESS:
            return state
                .set('quote', new QuoteModel(action.data))
                .set('quoteFetching', 'ok');
        case FETCH_QUOTE_ERROR:
            return state
                .set('quoteFetching', 'error');
        case CREATE_BLOCKING_SUCCESS:
            const bIndex = state.get('reservationsCalendar').findIndex(j => j.get('id') === action.data.id);
            let newStateB = state;
            if (action.data.calendarKey) {
                newStateB = newStateB.setIn(['propertyCalendars', action.data.calendarKey, 'blockings'], state.getIn(['propertyCalendars', action.data.calendarKey, 'blockings']).push(fromJS(action.data.data)));
            }
            if (bIndex > -1) {
                newStateB = newStateB.setIn(['reservationsCalendar', bIndex, 'blockings'], state.getIn(['reservationsCalendar', bIndex, 'blockings']).push(fromJS(action.data.data)));
            }
            return newStateB;
        case DELETE_BLOCKING_SUCCESS:
            const cIndex = state.get('reservationsCalendar').findIndex(j => j.get('id') === action.data.prop);
            let newStateC = state;
            if (action.data.calendarKey) {
                newStateC = newStateC.setIn(['propertyCalendars', action.data.calendarKey, 'blockings'], state.getIn(['propertyCalendars', action.data.calendarKey, 'blockings']).filter(b => b.get('id') !== action.data.id));
            }
            if (cIndex > -1) {
                newStateC = newStateC.setIn(['reservationsCalendar', cIndex, 'blockings'], state.getIn(['reservationsCalendar', cIndex, 'blockings']).filter(b => b.get('id') !== action.data.id));
            }
            return newStateC;
        case CREATE_SEASONAL_RATING:
        case CREATE_CUSTOM_RATING:
            return state
                .set('addingRate', 'loading');
        case CREATE_SEASONAL_RATING_SUCCESS:
            return state
                .setIn(['propertyCalendars', action.data.calendarKey, 'rates'], state.getIn(['propertyCalendars', action.data.calendarKey, 'rates']).push(fromJS(Object.assign(action.data.data, { seasonal: true }))))
                .set('addingRate', 'ok');
        case CREATE_CUSTOM_RATING_SUCCESS:
            return state
                .setIn(['propertyCalendars', action.data.calendarKey, 'rates'], state.getIn(['propertyCalendars', action.data.calendarKey, 'rates']).push(fromJS(action.data.data)))
                .set('addingRate', 'ok');
        case CREATE_SEASONAL_RATING_ERROR:
        case CREATE_CUSTOM_RATING_ERROR:
            return state
                .set('addingRate', 'error');
        case SET_CALENDAR_VIEW:
            return state
                .set('calendarView', action.data);
        case SET_CALENDAR_CURRENT_DATE:
            return state
                .set('calendarCurrentDate', action.data);
        case OPEN_ICAL_EVENT_SUCCESS:
            if (action.data.calendarKey) {
                return state
                    .setIn(['propertyCalendars', action.data.calendarKey, 'ical_events'],
                        state.getIn(['propertyCalendars', action.data.calendarKey, 'ical_events'])
                            .update(state.getIn(['propertyCalendars', action.data.calendarKey, 'ical_events']).findIndex(j => j.get('id') === action.data.id), e => e.set('open', action.data.open)));
            } else {
                const reProp = state.get('reservationsCalendar').findIndex(j => j.get('id') === action.data.propId);
                const ical = state.getIn(['reservationsCalendar', reProp, 'ical_events']).findIndex(j => j.get('id') === action.data.id);
                return state
                    .setIn(['reservationsCalendar', reProp, 'ical_events', ical, 'open'], action.data.open);
            }
        case SYNC_CALENDAR_SUCCESS:
        case FETCH_CALENDAR_SUCCESS:
            return state
                .set('propertyCalendars', fromJS({}));
        case LOGOUT_SUCCESS:
            return initialState
                .set('pagination', new PaginationModel({}))
                .set('calendarPagination', new PaginationModel({}));
        default:
            return state;
    }
}

export default reservationsReducer;
