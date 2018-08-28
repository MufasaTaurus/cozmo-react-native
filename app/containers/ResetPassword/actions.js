
import {
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    SET_KEYS
} from './constants';

export function resetPassword(data) {
    return {
        type: RESET_PASSWORD,
        data
    };
}

export function resetPasswordSuccess(data) {
    return {
        type: RESET_PASSWORD_SUCCESS,
        data
    };
}

export function resetPasswordError(data) {
    return {
        type: RESET_PASSWORD_ERROR,
        data
    };
}

export function setKeys(data) {
    return {
        type: SET_KEYS,
        data
    };
}
