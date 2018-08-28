import {
    FETCH_REPORTS,
    SET_SELECTED_PROPERTY
} from './constants';

export function fetchReports(data) {
    return {
        type: FETCH_REPORTS,
        data
    };
}

export function setSelectedProperty(data) {
    return {
        type: SET_SELECTED_PROPERTY,
        data
    };
}
