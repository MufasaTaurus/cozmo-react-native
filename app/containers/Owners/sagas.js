import { call, put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import axios from 'axios';
import {
    FETCH_OWNERS,
    ADD_OWNER,
    UPDATE_OWNER
} from './constants';
import {
    fetchOwnersSuccess,
    fetchOwnersError,
    addOwnerSuccess,
    addOwnerError
} from './actions';
import { handleSessionState } from 'containers/App/actions';
import { makeSelectToken } from 'containers/App/selectors';
import { push } from 'react-router-redux';
import { API_BASE } from 'utils/const';

const owners = 'owners/';

let axiosInstance;

export function* watcher() {
    axiosInstance = axios.create({
        baseURL: API_BASE
    });

    yield takeEvery(FETCH_OWNERS, getOwners);
    yield takeEvery(ADD_OWNER, addOwner);
    yield takeEvery(UPDATE_OWNER, updateOwner);
}

export function* getOwners() {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };
    try {
        const req = yield call(axiosInstance, owners, data);
        yield put(fetchOwnersSuccess(req.data));
    } catch (err) {
        yield put(fetchOwnersError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* addOwner() {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };
    try {
        const req = yield call(axiosInstance, owners, data);
        yield put(addOwnerSuccess(req.data));
    } catch (err) {
        yield put(addOwnerError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* updateOwner() {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };
    try {
        const req = yield call(axiosInstance, owners, data);
        //yield put(addOwnerSuccess(req.data));
    } catch (err) {
        //yield put(addOwnerError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

// Bootstrap sagas
export default [
    watcher
];
