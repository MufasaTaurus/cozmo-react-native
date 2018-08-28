import { call, put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { API_BASE } from 'utils/const';
import { LOGIN, LOGIN_WITH_GOOGLE } from './constants';
import { loginError, loginWithGoogleError, homeLoginSuccess, homeLoginWithGoogleSuccess } from './actions';
import { loginSuccess, loginWithGoogleSuccess } from 'containers/App/actions';

import axios from 'axios';
import { makeSelectGoogleUser } from './selectors';

const auth = 'auth/';

export function* watcher() {
    yield takeEvery(LOGIN, login);
    yield takeEvery(LOGIN_WITH_GOOGLE, checkAccessToken);
}

export function* login(action) {
    const data = {
        method: 'POST',
        data:{
            username: action.data.username,
            password: action.data.password
        }
    };
    try {
        const user = yield call(axios, API_BASE + auth + 'login/', data);
        yield put(loginSuccess(user.data));
    } catch (err) {
        yield put(loginError(err.response.data.non_field_errors ? err.response.data.non_field_errors[0] : ''));
    }
}

export function* checkAccessToken() {
    const data = {
        method: 'POST',
        data: yield select(makeSelectGoogleUser())
    };

    try {
        const response = yield call(axios, API_BASE + auth + 'social/google/', data);
        yield put(loginWithGoogleSuccess(response.data));
    } catch (err) {
        yield put(loginWithGoogleError(err));
    }
}

// Bootstrap sagas
export default [
    watcher
];
