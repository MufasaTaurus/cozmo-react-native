import {call, put, select} from 'redux-saga/effects';
import {takeEvery} from 'redux-saga';
import { API_BASE } from 'utils/const';
import {} from './constants';
import {

} from './actions';

import axios from 'axios';
import {} from './selectors';

const auth = 'auth/';

export function* watcher() {

}

// Bootstrap sagas
export default [
    watcher
];
