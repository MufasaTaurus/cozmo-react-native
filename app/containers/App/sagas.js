import { call, put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { API_BASE } from 'utils/const';
import { push } from 'react-router-redux';
import {
    LOGOUT,
    FETCH_TEMPLATES,
    HANDLE_SESSION_STATE,
    LOGIN_SUCCESS,
    LOGIN_WITH_GOOGLE_SUCCESS,
    SIGNUP_WITH_GOOGLE_SUCCESS,
    UPDATE_USER
} from './constants';
import {
    addAlert,
    logoutSuccess,
    handleSessionState,
    fetchBasicPropertiesInfoSuccess,
    fetchCleanersBasicInfoSuccess,
    fetchTemplatesSuccess,
    fetchTemplatesError,
    updateUserSuccess,
    updateUserError
} from 'containers/App/actions';
import axios from 'axios';
import { makeSelectToken } from './selectors';
import { selectTemplatesPagination } from 'containers/Templates/selectors';

const auth = 'auth/';

export function* watcher() {
    yield takeEvery(LOGOUT, logout);
    yield takeEvery(FETCH_TEMPLATES, getTemplates);
    yield takeEvery(LOGIN_SUCCESS, fetchBasicPropertiesInfo);
    yield takeEvery(LOGIN_SUCCESS, fetchCleanersBasicInfo);
    yield takeEvery(LOGIN_WITH_GOOGLE_SUCCESS, fetchBasicPropertiesInfo);
    yield takeEvery(LOGIN_WITH_GOOGLE_SUCCESS, fetchCleanersBasicInfo);
    yield takeEvery(SIGNUP_WITH_GOOGLE_SUCCESS, fetchBasicPropertiesInfo);
    yield takeEvery(SIGNUP_WITH_GOOGLE_SUCCESS, fetchCleanersBasicInfo);
    yield takeEvery(UPDATE_USER, updateUser);

    yield takeEvery(HANDLE_SESSION_STATE, handleSession);
}

export function* logout() {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };

    try {
        const response = yield call(axios, API_BASE + auth + 'logout/', data);
        yield put(push('/'));
        yield put(logoutSuccess(response));
    } catch (err) {
        yield put(logoutSuccess(err));
    }
}

export function* fetchBasicPropertiesInfo() {
    const token = yield select(makeSelectToken());
    if (!token) {
        return;
    }
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + token }
    };

    try {
        const response = yield call(axios, API_BASE + 'properties/?basic=true', data);
        yield put(fetchBasicPropertiesInfoSuccess(response.data));
    } catch (err) {
        yield put(handleSessionState(err.response.status));
    }
}

export function* fetchCleanersBasicInfo() {
    const token = yield select(makeSelectToken());
    if (!token) { return; }
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + token }
    };

    try {
        const response = yield call(axios, API_BASE + 'vendors/vendors/?basic=true', data);
        yield put(fetchCleanersBasicInfoSuccess(response.data));
    } catch (err) {
        yield put(handleSessionState(err.response.status));
    }
}

export function* getTemplates() {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: {
            page: (yield select(selectTemplatesPagination())).getCurrentPage(),
        }
    };
    try {
        const req = yield call(axios, API_BASE + 'messages/templates/', data);
        yield put(fetchTemplatesSuccess(req.data));
    } catch (err) {
        yield put(fetchTemplatesError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* updateUser(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const response = yield call(axios, API_BASE + auth + 'user/', data);
        yield put(updateUserSuccess(response.data));
    } catch (err) {
        yield put(updateUserError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* handleSession(action) {
    const status = action.data;
    if (status === 401) {
        yield put(logoutSuccess());
        yield put(push('/'));
        yield put(addAlert({ message: 'Your session has expired', type: 'error' }));
    } else if (status >= 500) {
        yield put(addAlert({ message: 'An error has occurred, please try again', type: 'error' }));
    }
}

// Bootstrap sagas
export default [
    watcher,
    fetchBasicPropertiesInfo,
    fetchCleanersBasicInfo
];
