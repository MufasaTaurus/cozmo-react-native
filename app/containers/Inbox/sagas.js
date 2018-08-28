import {call, put, select} from 'redux-saga/effects';
import {takeEvery} from 'redux-saga';
import axios from 'axios';
import {
    FETCH_TICKETS,
    FETCH_TICKET,
    ARCHIVE_TICKETS,
    SET_TICKETS_DISPLAY,
    CREATE_NEW_TICKET,
    EDIT_TICKETS,
    SEARCH_TICKETS,
    MERGE_TICKETS,
    FETCH_GUEST,
    UPDATE_GUEST,
    FETCH_GUEST_TICKETS,
    FETCH_GUEST_RESERVATIONS
} from './constants';
import {
    fetchTickets,
    fetchTicketsSuccess,
    fetchTicketsError,
    fetchTicketSuccess,
    fetchTicketError,
    createNewTicketSuccess,
    createNewTicketError,
    editTicketsSuccess,
    editTicketsError,
    archiveTicketsSuccess,
    archiveTicketsError,
    searchTicketsSuccess,
    searchTicketsError,
    mergeTicketsSuccess,
    mergeTicketsError,
    updateGuestSuccess,
    updateGuestError,
    fetchGuestSuccess,
    fetchGuestError,
    fetchGuestTickets,
    fetchGuestTicketsSuccess,
    fetchGuestTicketsError,
    fetchGuestReservations,
    fetchGuestReservationsSuccess,
    fetchGuestReservationsError
} from './actions';
import { handleSessionState, addAlert } from 'containers/App/actions';
import { makeSelectToken } from 'containers/App/selectors';
import { selectPagination, selectDisplay, selectGuest } from './selectors';
import { API_BASE } from 'utils/const';

const tickets = 'crm/tickets/';
const contacts = 'crm/contacts/';
const reservations = 'reservations/';

let axiosInstance;

export function* watcher() {
    axiosInstance = axios.create({
        baseURL: API_BASE
    });

    yield takeEvery(FETCH_TICKETS, getTickets);
    yield takeEvery(SET_TICKETS_DISPLAY, getTickets);
    yield takeEvery(FETCH_TICKET, getTicket);
    yield takeEvery(CREATE_NEW_TICKET, createNewTicket);
    yield takeEvery(EDIT_TICKETS, editTickets);
    yield takeEvery(ARCHIVE_TICKETS, archiveTickets);
    yield takeEvery(SEARCH_TICKETS, searchTickets);
    yield takeEvery(MERGE_TICKETS, mergeTickets);
    yield takeEvery(FETCH_GUEST, getGuest);
    yield takeEvery(UPDATE_GUEST, updateGuest);
    yield takeEvery(FETCH_GUEST_TICKETS, getGuestTickets);
    yield takeEvery(FETCH_GUEST_RESERVATIONS, getGuestReservations);
}

export function* getTickets() {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: {
            page: (yield select(selectPagination())).getCurrentPage(),
            filter: (yield select(selectDisplay()))
        }
    };
    try {
        const req = yield call(axiosInstance, tickets, data);
        yield put(fetchTicketsSuccess(req.data));
    } catch (err) {
        yield put(fetchTicketsError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getTicket(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
    };
    try {
        const req = yield call(axiosInstance, tickets + action.data + '/', data);
        yield put(fetchTicketSuccess(req.data));
    } catch (err) {
        yield put(fetchTicketError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* createNewTicket(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };
    try {
        const req = yield call(axiosInstance, tickets, data);
        yield put(createNewTicketSuccess(req.data));
        yield put(addAlert({ message: 'Ticket #' + req.data.id +' created.' }));
    } catch (err) {
        yield put(createNewTicketError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* editTickets(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };
    try {
        const req = yield call(axiosInstance, tickets + 'update/', data);
        yield put(editTicketsSuccess(req.data));
        if (action.data.tickets.length > 1) {
            yield put(addAlert({ message: 'Tickets have been edited.' }));
        }
    } catch (err) {
        yield put(editTicketsError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* archiveTickets(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: { tickets: action.data }
    };
    try {
        const req = yield call(axiosInstance, tickets + 'archive/', data);
        yield put(archiveTicketsSuccess(req.data));
        let message = 'Ticket has been deleted.';
        if (action.data.length > 1) {
            message = 'Tickets have been deleted.';
        }
        yield put(addAlert({ message: message }));
        yield put(fetchTickets());
    } catch (err) {
        yield put(archiveTicketsError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* searchTickets(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: { search: action.data }
    };
    try {
        const req = yield call(axiosInstance, tickets, data);
        yield put(searchTicketsSuccess(req.data));
    } catch (err) {
        yield put(searchTicketsError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* mergeTickets(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: { tickets: action.data.tickets }
    };
    try {
        const req = yield call(axiosInstance, tickets + action.data.id + '/merge/', data);
        yield put(mergeTicketsSuccess(req.data));
        yield put(fetchTickets());
        yield put(addAlert({ message: 'Tickets have been merged with #' + action.data.id }));
    } catch (err) {
        yield put(mergeTicketsError(err.response));
        yield put(addAlert({ message: 'Tickets not have been merged.' }));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getGuest(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
    };
    try {
        const req = yield call(axiosInstance, contacts + action.data + '/', data);
        yield put(fetchGuestSuccess(req.data));
        yield put(fetchGuestTickets(action.data));
        yield put(fetchGuestReservations(action.data));
    } catch (err) {
        yield put(fetchGuestError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* updateGuest(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data.data
    };
    try {
        const req = yield call(axiosInstance, contacts + action.data.id, data);
        yield put(updateGuestSuccess(req.data));
        yield put(addAlert({ message: 'Contact has been updated.' }));
    } catch (err) {
        yield put(updateGuestError(err.response));
        yield put(addAlert({ message: 'Update error occurred.' }));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getGuestTickets(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: {
            page: (yield select(selectGuest())).getTicketsPagination().getCurrentPage(),
            requester: action.data
        }
    };
    try {
        const req = yield call(axiosInstance, tickets, data);
        yield put(fetchGuestTicketsSuccess(req.data));
    } catch (err) {
        yield put(fetchGuestTicketsError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getGuestReservations(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: { guest: action.data }
    };
    try {
        const req = yield call(axiosInstance, reservations, data);
        yield put(fetchGuestReservationsSuccess(req.data));
    } catch (err) {
        yield put(fetchGuestReservationsError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

// Bootstrap sagas
export default [
    watcher
];
