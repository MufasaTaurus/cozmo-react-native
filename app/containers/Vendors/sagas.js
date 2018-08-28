import { call, put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import axios from 'axios';
import {
    FETCH_VENDORS,
    FETCH_JOBS,
    FETCH_ASSIGNED_PROPERTIES,
    ADD_VENDOR,
    UPDATE_VENDOR,
    DELETE_JOB,
    ADD_NEW_JOB,
    FETCH_CALENDAR,
    FETCH_RESERVATIONS_CALENDAR,
    DELETE_VENDOR,
    UPDATE_JOB,
    FETCH_JOB,
    REASSIGN_JOBS,
    FETCH_VENDORS_PROPERTIES,
    UPDATE_VENDORS_PROPERTY,
    ASSIGN_VENDOR,
    CHANGE_VENDORS_ORDER
} from './constants';
import {
    fetchVendors,
    fetchVendorsSuccess,
    fetchVendorsError,
    addVendorSuccess,
    addVendorError,
    fetchJobs,
    fetchJobsSuccess,
    fetchJobsError,
    fetchAssignedPropertiesSuccess,
    fetchAssignedPropertiesError,
    fetchCalendar,
    fetchCalendarSuccess,
    fetchCalendarError,
    fetchReservationsCalendarSuccess,
    fetchReservationsCalendarError,
    updateVendorSuccess,
    updateJobSuccess,
    fetchJobSuccess,
    reassignJobsSuccess,
    reassignJobsError,
    fetchVendorsPropertiesSuccess,
    fetchVendorsPropertiesError,
    updateVendorsPropertySuccess,
    updateVendorsPropertyError,
    assignVendorSuccess
} from './actions';
import { handleSessionState } from 'containers/App/actions';
import { makeSelectToken } from 'containers/App/selectors';
import { selectCalendarPagination, selectVendorsPropertiesPagination } from './selectors';
import { API_BASE } from 'utils/const';

const vendors = 'vendors/vendors/';
const jobs = 'vendors/jobs/';
const calendar = 'vendors/jobs/calendar/';
const reservationCalendar = 'vendors/jobs/reservation-calendar/';
const properties = '/assingments/';
const vendorsProperties = '/vendors/properties/';
const updateProperty = '/properties/';
const assignments = '/vendors/vendors/';

let axiosInstance;

export function* watcher() {
    axiosInstance = axios.create({
        baseURL: API_BASE
    });

    yield takeEvery(FETCH_VENDORS, getVendors);
    yield takeEvery(FETCH_JOBS, getJobs);
    yield takeEvery(ADD_VENDOR, addVendor);
    yield takeEvery(FETCH_ASSIGNED_PROPERTIES, getAssignedProperties);
    yield takeEvery(UPDATE_VENDOR, updateVendor);
    yield takeEvery(DELETE_JOB, deleteJob);
    yield takeEvery(ADD_NEW_JOB, addNewJob);
    yield takeEvery(FETCH_CALENDAR, getCalendar);
    yield takeEvery(FETCH_RESERVATIONS_CALENDAR, getReservationsCalendar);
    yield takeEvery(DELETE_VENDOR, deleteVendor);
    yield takeEvery(UPDATE_JOB, updateExistingJob);
    yield takeEvery(FETCH_JOB, getJob);
    yield takeEvery(REASSIGN_JOBS, reassignJobs);
    yield takeEvery(FETCH_VENDORS_PROPERTIES, getVendorsProperties);
    yield takeEvery(UPDATE_VENDORS_PROPERTY, updateVendorsProperty);
    yield takeEvery(ASSIGN_VENDOR, assignVendor);
    yield takeEvery(CHANGE_VENDORS_ORDER, changeVendorsOrder);
}

export function* getVendors() {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };
    try {
        const req = yield call(axiosInstance, vendors, data);
        yield put(fetchVendorsSuccess(req.data));
    } catch (err) {
        yield put(fetchVendorsError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* addVendor(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };
    try {
        const req = yield call(axiosInstance, vendors, data);
        yield put(addVendorSuccess(req.data));
        yield put(fetchVendors());
    } catch (err) {
        yield put(addVendorError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getJobs(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: {
            assignee: action.data.id,
            date: action.data.date,
            prop: action.data.prop
        }
    };
    try {
        const req = yield call(axiosInstance, jobs, data);
        yield put(fetchJobsSuccess({ id: action.data.id || action.data.key, jobs: req.data }));
    } catch (err) {
        yield put(fetchJobsError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getJob(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
    };
    try {
        const req = yield call(axiosInstance, jobs + action.data + '/', data);
        yield put(fetchJobSuccess(req.data));
    } catch (err) {
        //yield put(fetchJobsError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getAssignedProperties(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };
    try {
        const req = yield call(axiosInstance, vendors + action.data + properties, data);
        yield put(fetchAssignedPropertiesSuccess({ id: action.data, data: req.data }));
    } catch (err) {
        yield put(fetchAssignedPropertiesError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* updateVendor(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };
    try {
        const req = yield call(axiosInstance, vendors + action.data.id + '/', data);
        yield put(updateVendorSuccess(req.data));
    } catch (err) {
        yield put(handleSessionState(err.response.status));
    }
}

export function* deleteJob(action) {
    const data = {
        method: 'DELETE',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };
    try {
        yield call(axiosInstance, jobs + action.data.id + '/', data);
        yield put(fetchJobs({ id: action.data.vendor }));
    } catch (err) {
        yield put(handleSessionState(err.response.status));
    }
}

export function* addNewJob(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };
    try {
        yield call(axiosInstance, jobs, data);
        yield put(fetchCalendar({ month: action.data.time_frame.lower.substr(5, 2), year: action.data.time_frame.lower.substr(0, 4) }));
        yield put(fetchJobs({ id: action.data.assignee }));
    } catch (err) {
        yield put(handleSessionState(err.response.status));
    }
}

export function* updateExistingJob(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };
    try {
        const req = yield call(axiosInstance, jobs + action.data.id + '/', data);
        yield put(updateJobSuccess(req.data));
    } catch (err) {
        yield put(handleSessionState(err.response.status));
    }
}

export function* getCalendar(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: action.data
    };
    try {
        const req = yield call(axiosInstance, calendar, data);
        yield put(fetchCalendarSuccess({ key: action.data.month + '-' + action.data.year, data: req.data }));
    } catch (err) {
        yield put(fetchCalendarError());
        yield put(handleSessionState(err.response.status));
    }
}

export function* getReservationsCalendar(action) {
    const params = Object.assign({ page: (yield select(selectCalendarPagination())).getCurrentPage() }, action.data);
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: params,
    };
    try {
        const req = yield call(axiosInstance, reservationCalendar, data);
        yield put(fetchReservationsCalendarSuccess({ key: action.data.from + '-' + action.data.to, data: req.data }));
    } catch (err) {
        yield put(fetchReservationsCalendarError());
        yield put(handleSessionState(err.response.status));
    }
}

export function* deleteVendor(action) {
    const data = {
        method: 'DELETE',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
    };
    try {
        yield call(axiosInstance, vendors + action.data + '/', data);
        yield put(fetchVendors());
    } catch (err) {
        yield put(handleSessionState(err.response.status));
    }
}

export function* reassignJobs(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data,
    };
    try {
        const req = yield call(axiosInstance, vendors + action.data.id + '/jobs/reassign/', data);
        yield put(reassignJobsSuccess(req.data));
    } catch (err) {
        yield put(reassignJobsError());
        yield put(handleSessionState(err.response.status));
    }
}

export function* getVendorsProperties() {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: {
            page: (yield select(selectVendorsPropertiesPagination())).getCurrentPage(),
        }
    };
    try {
        const req = yield call(axiosInstance, vendorsProperties, data);
        yield put(fetchVendorsPropertiesSuccess(req.data));
    } catch (err) {
        yield put(fetchVendorsPropertiesError());
        yield put(handleSessionState(err.response.status));
    }
}

export function* updateVendorsProperty(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: {
            [action.data.section]: action.data.val
        }
    };
    try {
        const req = yield call(axiosInstance, updateProperty + action.data.id + '/', data);
        yield put(updateVendorsPropertySuccess(req.data));
    } catch (err) {
        yield put(updateVendorsPropertyError());
        yield put(handleSessionState(err.response.status));
    }
}

export function* assignVendor(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };
    try {
        const req = yield call(axiosInstance, assignments + action.data.id + '/assingments/', data);
        yield put(assignVendorSuccess(req.data));
    } catch (err) {
        //yield put(updateVendorsPropertyError());
        yield put(handleSessionState(err.response.status));
    }
}

export function* changeVendorsOrder(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: {
            order: action.data.order
        }
    };
    try {
        const req = yield call(axiosInstance, vendorsProperties + action.data.id + '/order/', data);
        //yield put(assignVendorSuccess(req.data));
    } catch (err) {
        yield put(handleSessionState(err.response.status));
    }
}

// Bootstrap sagas
export default [
    watcher
];
