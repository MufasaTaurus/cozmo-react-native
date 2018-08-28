import { call, put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { API_BASE } from 'utils/const';
import { SIGNUP, SIGNUP_WITH_GOOGLE, SIGNUP_VERIFY_EMAIL, FORGOT_PASSWORD_SEND_EMAIL } from './constants';
import {
    signupSuccess,
    signupError,
    localSignupWithGoogleSuccess,
    signupWithGoogleError,
    accountVerificationSuccess,
    accountVerificationError,
    forgotPasswordEmailSent
} from './actions';

import { signupWithGoogleSuccess } from 'containers/App/actions';
import axios from 'axios';
import { makeSelectGoogleUser, makeSelectVerificationKey, makeSelectForgotPasswordEmail } from './selectors';

const auth = 'auth/';

export function* watcher() {
    yield takeEvery(SIGNUP, signupUser);
    yield takeEvery(SIGNUP_WITH_GOOGLE, checkAccessTokenGoogle);
    yield takeEvery(SIGNUP_VERIFY_EMAIL, verifyAccount);
    yield takeEvery(FORGOT_PASSWORD_SEND_EMAIL, remindPassword);
}

export function* signupUser(action) {
    const data = {
        method: 'POST',
        data: action.data
    };

    try {
        const response = yield call(axios, API_BASE + auth + 'registration/', data);
        yield put(signupSuccess(response));
    } catch (err) {
        yield put(signupError(err));
    }
}

export function* checkAccessTokenGoogle() {
    const data = {
        method: 'POST',
        data: yield select(makeSelectGoogleUser())
    };

    try {
        const response = yield call(axios, API_BASE + auth + 'social/google/', data);
        yield put(signupWithGoogleSuccess(response.data));
        yield put(localSignupWithGoogleSuccess(response.data));
    } catch (err) {
        yield put(signupWithGoogleError(err));
    }
}

export function* verifyAccount() {
    const data = {
        method: 'POST',
        data: {
            key: yield select(makeSelectVerificationKey())
        }
    };

    try {
        const response = yield call(axios, API_BASE + auth + 'registration/verify-email/', data);
        yield put(accountVerificationSuccess(response));
    } catch (err) {
        yield put(accountVerificationError(err));
    }
}

export function* remindPassword() {
    const data = {
        method: 'POST',
        data: {
            email: yield select(makeSelectForgotPasswordEmail())
        }
    };

    try {
        const response = yield call(axios, API_BASE + auth + 'password/reset/', data);
        yield put(forgotPasswordEmailSent(response));
    } catch (err) {
        yield put(accountVerificationError(err));
    }
}

// Bootstrap sagas
export default [
    watcher
];
