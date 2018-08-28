import { call, put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import axios from 'axios';
import {
    FETCH_CHANNELS,
    FETCH_MARKETPLACE,
    FETCH_INSTALL_LINK,
    TOGGLE_CHANNEL,
    RESET_PASSWORD,
    CHANGE_PASSWORD
} from './constants';
import {
    fetchChannelsSuccess,
    fetchChannelsError,
    fetchMarketplaceSuccess,
    fetchMarketplaceError,
    fetchInstallLinkSuccess,
    fetchInstallLinkError,
    resetPasswordSuccess,
    resetPasswordError,
    changePasswordSuccess,
    changePasswordError
} from './actions';
import { handleSessionState, addAlert } from 'containers/App/actions';
import { makeSelectToken } from 'containers/App/selectors';
import {} from './selectors';
import { API_BASE } from 'utils/const';

const integrations = 'integrations/settings/';
const marketplace = 'marketplace/';

let axiosInstance;

export function* watcher() {
    axiosInstance = axios.create({
        baseURL: API_BASE
    });

    yield takeEvery(FETCH_CHANNELS, getChannels);
    yield takeEvery(FETCH_MARKETPLACE, getMarketplace);
    yield takeEvery(FETCH_INSTALL_LINK, getInstallLink);
    yield takeEvery(TOGGLE_CHANNEL, toggleChannel);
    yield takeEvery(RESET_PASSWORD, resetPassword);
    yield takeEvery(CHANGE_PASSWORD, changePassword);
}

export function* getChannels() {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };
    try {
        const req = yield call(axiosInstance, integrations, data);
        yield put(fetchChannelsSuccess(req.data));
    } catch (err) {
        yield put(fetchChannelsError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getMarketplace() {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };
    try {
        const req = yield call(axiosInstance, marketplace, data);
        yield put(fetchMarketplaceSuccess(req.data));
    } catch (err) {
        yield put(fetchMarketplaceError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getInstallLink(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };
    try {
        const req = yield call(axios, action.data.url, data);
        yield put(fetchInstallLinkSuccess({ id: action.data.id, url: req.data.url }));
    } catch (err) {
        yield put(fetchInstallLinkError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* toggleChannel(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: { sync: action.data.sync }
    };
    try {
        const req = yield call(axiosInstance, integrations + action.data.id + '/', data);
        //yield put(fetchChannelsSuccess(req.data));
    } catch (err) {
        //yield put(fetchChannelsError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* resetPassword(action) {
    const data = {
        method: 'POST',
        data: {
            email: action.data
        }
    };

    try {
        const response = yield call(axiosInstance, 'auth/password/reset/', data);
        yield put(resetPasswordSuccess(response.data));
    } catch (err) {
        yield put(resetPasswordError(err.response));
        yield put(addAlert({ message: 'Could not sent the email...', type: 'error' }));
        yield put(handleSessionState(err.response.status));
    }
}

export function* changePassword(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: {
            old_password: action.data.oldPassword,
            new_password1: action.data.newPassword,
            new_password2: action.data.newPassword,
        }
    };

    try {
        const response = yield call(axiosInstance, 'auth/password/change/', data);
        yield put(changePasswordSuccess(response.data));
    } catch (err) {
        yield put(changePasswordError(err.response));
        //yield put(addAlert({ message: 'Could not sent the email...', type: 'error' }));
        yield put(handleSessionState(err.response.status));
    }
}

// Bootstrap sagas
export default [
    watcher
];
