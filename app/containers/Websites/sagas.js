import { call, put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import axios from 'axios';
import {
    FETCH_WEBSITES,
} from './constants';
import {
    fetchWebsitesSuccess,
    fetchWebsitesError,
} from './actions';
import { handleSessionState } from 'containers/App/actions';
import { makeSelectToken } from 'containers/App/selectors';
import { API_BASE } from 'utils/const';

const owners = 'owners/';

let axiosInstance;

export function* watcher() {
    axiosInstance = axios.create({
        baseURL: API_BASE
    });

    yield takeEvery(FETCH_WEBSITES, getWebsites);
}

export function* getWebsites() {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };
    try {
        const req = yield call(axiosInstance, owners, data);
        yield put(fetchWebsitesSuccess(req.data));
    } catch (err) {
        yield put(fetchWebsitesError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

// Bootstrap sagas
export default [
    watcher
];
