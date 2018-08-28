import { call, put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import axios from 'axios';
import {
    ADD_TEMPLATE,
    DELETE_TEMPLATE,
    EDIT_TEMPLATE,
    FETCH_TAGS,
    ADD_NEW_TAG,
    FETCH_LETTERS,
    FETCH_TEMPLATE
} from './constants';
import {
    fetchTagsSuccess,
    addNewTagSuccess,
    fetchLettersSuccess,
    fetchLettersError,
    addTemplateSuccess,
    addTemplateError,
    fetchTemplateSuccess
} from './actions';
import {
    handleSessionState,
    fetchTemplates,
    addAlert
} from 'containers/App/actions';
import { makeSelectToken } from 'containers/App/selectors';
import {} from './selectors';
import { push } from 'react-router-redux';
import { API_BASE } from 'utils/const';

const templates = 'messages/templates/';
const tags = 'messages/tags/';
const letters = 'messages/welcome_templates/';

let axiosInstance;

export function* watcher() {
    axiosInstance = axios.create({
        baseURL: API_BASE
    });

    yield takeEvery(ADD_TEMPLATE, addTemplate);
    yield takeEvery(DELETE_TEMPLATE, deleteTemplate);
    yield takeEvery(EDIT_TEMPLATE, editTemplate);
    yield takeEvery(FETCH_TAGS, getTags);
    yield takeEvery(ADD_NEW_TAG, addTag);
    yield takeEvery(FETCH_LETTERS, fetchLetters);
    yield takeEvery(FETCH_TEMPLATE, fetchTemplate);
}

export function* addTemplate(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };
    try {
        const req = yield call(axiosInstance, templates, data);
        yield put(fetchTemplates());
        //yield put(push('/templates'));
        //yield put(push('/templates/' + req.data.id));
        yield put(addTemplateSuccess());
    } catch (err) {
        yield put(addTemplateError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* deleteTemplate(action) {
    const data = {
        method: 'DELETE',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };
    try {
        yield call(axiosInstance, templates + action.data + '/', data);
        yield put(fetchTemplates());
    } catch (err) {
        yield put(handleSessionState(err.response.status));
    }
}

export function* editTemplate(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };
    try {
        const req = yield call(axiosInstance, templates + action.data.id + '/', data);
        yield put(fetchTemplates());
        yield put(addAlert({ message: 'Email has been saved' }));
        //yield put(push('/templates'));
    } catch (err) {
        //yield put(fetchTemplatesError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getTags() {
    const data = {
        method: 'GET',
        headers: {
            'Authorization': 'JWT ' + (yield select(makeSelectToken()))
        }
    };
    try {
        const req = yield call(axiosInstance, tags, data);
        yield put(fetchTagsSuccess(req.data));
    } catch (err) {
        yield put(handleSessionState(err.response.status));
    }
}

export function* addTag(action) {
    const data = {
        method: 'POST',
        headers: {
            'Authorization': 'JWT ' + (yield select(makeSelectToken()))
        },
        data: {
            name: action.data
        }
    };
    try {
        const req = yield call(axiosInstance, tags, data);
        yield put(addNewTagSuccess(req.data));
    } catch (err) {
        yield put(handleSessionState(err.response.status));
    }
}

export function* fetchLetters() {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
    };
    try {
        const req = yield call(axiosInstance, letters, data);
        yield put(fetchLettersSuccess(req.data));
    } catch (err) {
        yield put(fetchLettersError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* fetchTemplate(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
    };
    try {
        const req = yield call(axiosInstance, templates + action.data + '/', data);
        yield put(fetchTemplateSuccess(req.data));
    } catch (err) {
        yield put(handleSessionState(err.response.status));
    }
}

// Bootstrap sagas
export default [
    watcher
];
