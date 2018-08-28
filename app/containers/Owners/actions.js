import {
    FETCH_OWNERS,
    FETCH_OWNERS_SUCCESS,
    FETCH_OWNERS_ERROR,
    ADD_OWNER,
    ADD_OWNER_SUCCESS,
    ADD_OWNER_ERROR,
    UPDATE_OWNER,
    UPDATE_OWNER_SUCCESS,
    UPDATE_OWNER_ERROR
} from './constants';

export function fetchOwners(data) {
    return {
        type: FETCH_OWNERS,
        data
    };
}

export function fetchOwnersSuccess(data) {
    return {
        type: FETCH_OWNERS_SUCCESS,
        data
    };
}

export function fetchOwnersError(data) {
    return {
        type: FETCH_OWNERS_ERROR,
        data
    };
}

export function addOwner(data) {
    return {
        type: ADD_OWNER,
        data
    };
}

export function addOwnerSuccess(data) {
    return {
        type: ADD_OWNER_SUCCESS,
        data
    };
}

export function addOwnerError(data) {
    return {
        type: ADD_OWNER_ERROR,
        data
    };
}

export function updateOwner(data) {
    return {
        type: UPDATE_OWNER,
        data
    };
}

export function updateOwnerSuccess(data) {
    return {
        type: UPDATE_OWNER_SUCCESS,
        data
    };
}

export function updateOwnerError(data) {
    return {
        type: UPDATE_OWNER_ERROR,
        data
    };
}
