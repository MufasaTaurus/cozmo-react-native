/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_WITH_GOOGLE,
    LOGIN_WITH_GOOGLE_ERROR,
    LOGIN_WITH_GOOGLE_SUCCESS
} from './constants';

export function login(data) {
    return {
        type: LOGIN,
        data
    };
}

export function homeLoginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        data
    };
}

export function loginError(data) {
    return {
        type: LOGIN_ERROR,
        data
    };
}

export function loginWithGoogle(data) {
    return {
        type: LOGIN_WITH_GOOGLE,
        data
    };
}

export function homeLoginWithGoogleSuccess(data) {
    return {
        type: LOGIN_WITH_GOOGLE_SUCCESS,
        data
    };
}

export function loginWithGoogleError(data) {
    return {
        type: LOGIN_WITH_GOOGLE_ERROR,
        data
    };
}
