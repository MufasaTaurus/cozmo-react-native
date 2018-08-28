import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { push } from 'react-router-redux';
import axios from 'axios';
import {
    CHECK_SECRET,
} from './constants';
import {
    checkSecretSuccess,
    checkSecretError,
} from './actions';
import { API_BASE } from 'utils/const';

const shadow = 'auth/shadow/';

let axiosInstance;

export function* watcher() {
    axiosInstance = axios.create({
        baseURL: API_BASE
    });

    yield takeEvery(CHECK_SECRET, checkSecret);
}

export function* checkSecret(action) {
    const data = {
        method: 'POST',
        data: {
            secret: action.data.secret
        }
    };
    try {
        const req = yield call(axiosInstance, shadow, data);
        yield put(checkSecretSuccess(req.data));
        yield put(push('/'));
    } catch (err) {
        yield put(checkSecretError(err.response));
    }
}

// Bootstrap sagas
export default [
    watcher
];
