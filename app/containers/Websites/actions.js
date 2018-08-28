import {
    FETCH_WEBSITES,
    FETCH_WEBSITES_SUCCESS,
    FETCH_WEBSITES_ERROR,
} from './constants';

export function fetchWebsites(data) {
    return {
        type: FETCH_WEBSITES,
        data
    };
}

export function fetchWebsitesSuccess(data) {
    return {
        type: FETCH_WEBSITES_SUCCESS,
        data
    };
}

export function fetchWebsitesError(data) {
    return {
        type: FETCH_WEBSITES_ERROR,
        data
    };
}
