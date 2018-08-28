import { call, put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { API_BASE } from 'utils/const';
import axios from 'axios';
import { FINISH_ONBOARDING, SUBMIT_FIRST_STEP } from './constants';
import { makeSelectToken } from 'containers/App/selectors';
import { push } from 'react-router-redux';
import { finishOnboardingSuccess, finishOnboardingError, submitFirstStepSuccess, submitFirstStepError } from './actions';
import { updateUserSuccess } from 'containers/App/actions';

const auth = 'auth/user/';

export function* watcher() {
    yield takeEvery(SUBMIT_FIRST_STEP, submitFirstStep);
    yield takeEvery(FINISH_ONBOARDING, submitOnboarding);
}

export function* submitFirstStep(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };
    try {
        const req = yield call(axios, API_BASE + auth, data);
        yield put(updateUserSuccess(req.data));
        yield put(submitFirstStepSuccess(req.data));
    } catch (err) {
        yield put(submitFirstStepError(err.response));
    }
}

export function* submitOnboarding(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };
    try {
        const req = yield call(axios, API_BASE + auth, data);
        yield put(updateUserSuccess(req.data));
        yield put(finishOnboardingSuccess(req.data));
        yield put(push('/properties'));
    } catch (err) {
        yield put(finishOnboardingError(err.response));
    }
}

// Bootstrap sagas
export default [
    watcher
];
