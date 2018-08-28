import { call, put, select, throttle } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import axios from 'axios';
import {
    FETCH_RESERVATIONS,
    FETCH_RESERVATIONS_CALENDAR,
    FETCH_RESERVATIONS_CALENDAR_PROPERTY,
    SEND_MESSAGE,
    DELETE_RESERVATION,
    EDIT_RESERVATION,
    EDIT_GUEST,
    ADD_RESERVATION,
    FETCH_RESERVATION_MESSAGES,
    FETCH_RESERVATION_EVENTS,
    FETCH_RESERVATION,
    FETCH_QUOTE,
    CREATE_BLOCKING,
    DELETE_BLOCKING,
    CREATE_SEASONAL_RATING,
    CREATE_CUSTOM_RATING,
    OPEN_ICAL_EVENT
} from './constants';
import {
    fetchReservations,
    fetchReservationsSuccess,
    fetchReservationsError,
    fetchReservationsCalendarSuccess,
    fetchReservationsCalendarError,
    sendMessageSuccess,
    sendMessageError,
    deleteReservationSuccess,
    deleteReservationError,
    editReservationSuccess,
    editReservationError,
    editGuestSuccess,
    editGuestError,
    addReservationSuccess,
    addReservationError,
    fetchReservationMessages,
    fetchReservationMessagesSuccess,
    fetchReservationMessagesError,
    fetchReservationEventsSuccess,
    fetchReservationEventsError,
    fetchReservationSuccess,
    fetchReservationError,
    fetchQuoteSuccess,
    fetchQuoteError,
    createBlockingSuccess,
    createBlockingError,
    fetchReservationsCalendarPropertySuccess,
    fetchReservationsCalendarPropertyError,
    createSeasonalRatingSuccess,
    createSeasonalRatingError,
    createCustomRatingSuccess,
    createCustomRatingError,
    deleteBlockingSuccess,
    deleteBlockingError,
    openIcalEventSuccess
} from './actions';
import { cacheMulticalendarData, handleSessionState, addAlert } from 'containers/App/actions';
import { makeSelectToken } from 'containers/App/selectors';
import { selectPagination, selectCalendarPagination } from './selectors';
import { push } from 'react-router-redux';
import { API_BASE } from 'utils/const';

const reservations = 'reservations/';
const messages = 'messages/';
const calendar = 'reservations/calendar/';
const properties = 'properties/';
const rates = 'charges/rates/';

let axiosInstance;

export function* watcher() {
    axiosInstance = axios.create({
        baseURL: API_BASE
    });

    yield takeEvery(FETCH_RESERVATIONS, getReservations);
    yield takeEvery(FETCH_RESERVATIONS_CALENDAR, getReservationsCalendar);
    yield throttle(500, FETCH_RESERVATIONS_CALENDAR_PROPERTY, getReservationsCalendarProperty);
    yield takeEvery(SEND_MESSAGE, sendMessage);
    yield takeEvery(DELETE_RESERVATION, deleteReservation);
    yield takeEvery(EDIT_RESERVATION, editReservation);
    yield takeEvery(EDIT_GUEST, editGuest);
    yield takeEvery(ADD_RESERVATION, addReservation);
    yield takeEvery(FETCH_RESERVATION_MESSAGES, getReservationMessages);
    yield takeEvery(FETCH_RESERVATION_EVENTS, getReservationEvents);
    yield takeEvery(FETCH_RESERVATION, getReservation);
    yield takeEvery(FETCH_QUOTE, getQuote);
    yield takeEvery(CREATE_BLOCKING, createBlocking);
    yield takeEvery(DELETE_BLOCKING, deleteBlocking);
    yield takeEvery(CREATE_SEASONAL_RATING, createSeasonalRating);
    yield takeEvery(CREATE_CUSTOM_RATING, createCustomRating);
    yield takeEvery(OPEN_ICAL_EVENT, openIcalEvent);
}

export function* getReservations() {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: {
            page: (yield select(selectPagination())).getCurrentPage(),
        }
    };

    try {
        const req = yield call(axiosInstance, reservations, data);
        yield put(fetchReservationsSuccess(req.data));
    } catch (err) {
        yield put(fetchReservationsError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getReservation(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
    };

    try {
        const req = yield call(axiosInstance, reservations + action.data + '/', data);
        yield put(fetchReservationSuccess(req.data));
    } catch (err) {
        yield put(fetchReservationError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* sendMessage(action) {
    const formData = new FormData();
    formData.append('sender', 'voyajoy@voyajoy.com');
    formData.append('subject', 'Reservation Message');
    formData.append('reservation', action.data.reservation);
    formData.append('text', action.data.text);
    action.data.files.map(f => {
        formData.append('files', f.file, f.file.name);
    });

    const data = {
        method: 'POST',
        headers: {
            'Authorization': 'JWT ' + (yield select(makeSelectToken())),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    };

    try {
        const req = yield call(axiosInstance, messages, data);
        yield put(sendMessageSuccess(req.data));
        yield put(fetchReservationMessages(action.data.reservation));
    } catch (err) {
        yield put(sendMessageError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getReservationsCalendar(action) {
    const page = (yield select(selectCalendarPagination())).getCurrentPage();
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: {
            from: action.data.from,
            to: action.data.to,
            page: page,
            capacity: action.data.capacity,
            bedrooms: action.data.bedrooms,
            bathrooms: action.data.bathrooms,
            search: action.data.search,
            features: action.data.features,
            price_min: action.data.price ? action.data.price.min : undefined,
            price_max: action.data.price ? action.data.price.max : undefined,
            ordering: action.data.ordering,
        }
    };

    try {
        const req = yield call(axiosInstance, calendar, data);
        yield put(fetchReservationsCalendarSuccess({ data: req.data, filtersChanged: action.data.filtersChanged, from: action.data.from, to: action.data.to }));
        //yield put(cacheMulticalendarData({ key: action.data.from + action.data.to + page, value: req.data }));
    } catch (err) {
        yield put(fetchReservationsCalendarError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getReservationsCalendarProperty(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: {
            from: action.data.from,
            to: action.data.to,
        }
    };

    try {
        const req = yield call(axiosInstance, calendar + action.data.id + '/', data);
        yield put(fetchReservationsCalendarPropertySuccess({ key: action.data.id + action.data.from, value: req.data }));
    } catch (err) {
        yield put(fetchReservationsCalendarPropertyError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* deleteReservation(action) {
    const data = {
        method: 'DELETE',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };

    try {
        const req = yield call(axiosInstance, reservations + action.data + '/', data);
        yield put(deleteReservationSuccess(req.data));
        yield put(fetchReservations());
        yield put(push('/reservations'));
    } catch (err) {
        yield put(deleteReservationError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* editReservation(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data.data
    };

    try {
        const req = yield call(axiosInstance, reservations + action.data.id + '/', data);
        yield put(editReservationSuccess(req.data));
    } catch (err) {
        yield put(editReservationError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* editGuest(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data.data
    };

    try {
        const req = yield call(axiosInstance, reservations + action.data.id + '/guest/', data);
        yield put(editGuestSuccess(req.data));
    } catch (err) {
        yield put(editGuestError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}
export function* addReservation(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, reservations, data);
        yield put(addReservationSuccess({ data: req.data, calendarKey: action.data.calendarKey, id: action.data.prop }));
        yield put(addAlert({ message: 'Reservation has been created' }));
    } catch (err) {
        yield put(addReservationError(err.response.data));
        yield put(addAlert({ message: 'Couldn\'t create Reservation', type: 'error' }));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getReservationMessages(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: {
            reservation: action.data
        }
    };

    try {
        const req = yield call(axiosInstance, messages, data);
        yield put(fetchReservationMessagesSuccess({ messages: req.data, id: action.data }));
    } catch (err) {
        yield put(fetchReservationMessagesError(err.response.data));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getReservationEvents(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
    };

    try {
        const req = yield call(axiosInstance, reservations + action.data + '/events/', data);
        yield put(fetchReservationEventsSuccess({ events: req.data, id: action.data }));
    } catch (err) {
        yield put(fetchReservationEventsError(err.response.data));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getQuote(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: action.data
    };

    try {
        const req = yield call(axiosInstance, properties + action.data.prop + '/quotes/', data);
        yield put(fetchQuoteSuccess(req.data));
    } catch (err) {
        yield put(fetchQuoteError(err.response.data));
        yield put(handleSessionState(err.response.status));
    }
}

export function* createBlocking(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, properties + action.data.id + '/blockings/', data);
        yield put(createBlockingSuccess({ data: req.data, id: action.data.id, calendarKey: action.data.calendarKey }));
        yield put(addAlert({ message: 'Blocking has been created' }));
    } catch (err) {
        yield put(createBlockingError(err.response.data));
        yield put(addAlert({ message: 'Could\'t create blocking...', type: 'error' }));
        yield put(handleSessionState(err.response.status));
    }
}

export function* deleteBlocking(action) {
    const data = {
        method: 'DELETE',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };

    try {
        yield call(axiosInstance, properties + action.data.id + '/blockings/' + action.data.blocking + '/', data);
        yield put(deleteBlockingSuccess({ calendarKey: action.data.calendarKey, id: action.data.blocking, prop: action.data.id }));
        yield put(addAlert({ message: 'Blocking has been deleted' }));
    } catch (err) {
        yield put(deleteBlockingError(err.response.data));
        yield put(addAlert({ message: 'Could\'t delete blocking...', type: 'error' }));
        yield put(handleSessionState(err.response.status));
    }
}

export function* createSeasonalRating(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, properties + action.data.id + '/seasonal_rates/', data);
        yield put(createSeasonalRatingSuccess({ data: req.data, id: action.data.id, calendarKey: action.data.calendarKey, }));
        yield put(addAlert({ message: 'Seasonal Rate has been created' }));
    } catch (err) {
        yield put(createSeasonalRatingError(err.response.data));
        yield put(addAlert({ message: 'Could\'t create Seasonal Rate...', type: 'error' }));
        yield put(handleSessionState(err.response.status));
    }
}

export function* createCustomRating(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, rates, data);
        yield put(createCustomRatingSuccess({ data: req.data, id: action.data.id, calendarKey: action.data.calendarKey, }));
        yield put(addAlert({ message: 'Custom Rate has been created' }));
    } catch (err) {
        yield put(createCustomRatingError(err.response.data));
        yield put(addAlert({ message: 'Could\'t create Custom Rate...', type: 'error' }));
        yield put(handleSessionState(err.response.status));
    }
}

export function* openIcalEvent(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: { open: action.data.open }
    };

    try {
        const req = yield call(axiosInstance, 'calendars/external_calendar_events/' + action.data.id + '/', data);
        yield put(openIcalEventSuccess({ data: req.data, id: action.data.id, calendarKey: action.data.calendarKey, open: action.data.open, propId: action.data.propId }));
        yield put(addAlert({ message: 'Event updated successfully' }));
    } catch (err) {
        //yield put(createCustomRatingError(err.response.data));
        yield put(addAlert({ message: 'Could\'t open event...', type: 'error' }));
        yield put(handleSessionState(err.response.status));
    }
}

// Bootstrap sagas
export default [
    watcher
];
