import {
    CHECK_SECRET,
    CHECK_SECRET_SUCCESS,
    CHECK_SECRET_ERROR,
} from './constants';

export function checkSecret(data) {
    return {
        type: CHECK_SECRET,
        data
    };
}

export function checkSecretSuccess(data) {
    return {
        type: CHECK_SECRET_SUCCESS,
        data
    };
}

export function checkSecretError(data) {
    return {
        type: CHECK_SECRET_ERROR,
        data
    };
}
