import { call, put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { RESET_PASSWORD } from './constants';
import { API_BASE } from 'utils/const';
import { resetPasswordSuccess, resetPasswordError } from './actions';
import axios from 'axios';
import { makeSelectUid, makeSelectToken } from './selectors';

const auth = 'auth/';

export function* watcher() {
    yield takeEvery(RESET_PASSWORD, resetPassword);
}

export function* resetPassword(action) {
    const data = {
        method: 'POST',
        data: {
            token: yield select(makeSelectToken()),
            uid: yield select(makeSelectUid()),
            new_password1: action.data.password,
            new_password2: action.data.password
        }
    };
    try {
        const user = yield call(axios, API_BASE + auth + 'password/reset/confirm/', data);
        yield put(resetPasswordSuccess(user));
    } catch (err) {
        yield put(resetPasswordError(err));
    }
}

// Bootstrap sagas
export default [
    watcher
];
