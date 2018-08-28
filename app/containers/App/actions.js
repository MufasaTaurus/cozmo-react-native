import {
    LOGIN_SUCCESS,
    LOGIN_WITH_GOOGLE_SUCCESS,
    SIGNUP_WITH_GOOGLE_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT,
    ADD_ALERT,
    REMOVE_ALERT,
    UPDATE_USER_PLAN,
    HANDLE_SESSION_STATE,
    CHACHE_MULTICALENDAR_DATA,
    FETCH_PROPERTIES_BASIC_INFO,
    FETCH_PROPERTIES_BASIC_INFO_SUCCESS,
    FETCH_TEMPLATES,
    FETCH_TEMPLATES_SUCCESS,
    FETCH_TEMPLATES_ERROR,
    FETCH_CLEANERS_BASIC_INFO,
    FETCH_CLEANERS_BASIC_INFO_SUCCESS,
    CHUNK_FAILED_TO_LOAD,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    UPDATE_WINDOW_SIZE
} from './constants';

export function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        data
    };
}

export function loginWithGoogleSuccess(data) {
    return {
        type: LOGIN_WITH_GOOGLE_SUCCESS,
        data
    };
}

export function signupWithGoogleSuccess(data) {
    return {
        type: SIGNUP_WITH_GOOGLE_SUCCESS,
        data
    };
}

export function logoutSuccess(data) {
    return {
        type: LOGOUT_SUCCESS,
        data
    };
}

export function logout(data) {
    return {
        type: LOGOUT,
        data
    };
}

export function addAlert(data) {
    return {
        type: ADD_ALERT,
        data
    };
}

export function removeAlert(data) {
    return {
        type: REMOVE_ALERT,
        data
    };
}

export function updateUserPlan(data) {
    return {
        type: UPDATE_USER_PLAN,
        data
    };
}

export function handleSessionState(data) {
    return {
        type: HANDLE_SESSION_STATE,
        data
    };
}

export function cacheMulticalendarData(data) {
    return {
        type: CHACHE_MULTICALENDAR_DATA,
        data
    };
}

export function fetchPropertiesBasicInfo(data) {
    return {
        type: FETCH_PROPERTIES_BASIC_INFO,
        data
    };
}

export function fetchBasicPropertiesInfoSuccess(data) {
    return {
        type: FETCH_PROPERTIES_BASIC_INFO_SUCCESS,
        data
    };
}

export function fetchTemplates(data) {
    return {
        type: FETCH_TEMPLATES,
        data
    };
}

export function fetchTemplatesSuccess(data) {
    return {
        type: FETCH_TEMPLATES_SUCCESS,
        data
    };
}

export function fetchTemplatesError(data) {
    return {
        type: FETCH_TEMPLATES_ERROR,
        data
    };
}

export function fetchCleanersBasicInfo(data) {
    return {
        type: FETCH_CLEANERS_BASIC_INFO,
        data
    };
}

export function fetchCleanersBasicInfoSuccess(data) {
    return {
        type: FETCH_CLEANERS_BASIC_INFO_SUCCESS,
        data
    };
}

export function chunkFailedToLoad(data) {
    return {
        type: CHUNK_FAILED_TO_LOAD,
        data
    };
}

export function updateUser(data) {
    return {
        type: UPDATE_USER,
        data
    };
}

export function updateUserSuccess(data) {
    return {
        type: UPDATE_USER_SUCCESS,
        data
    };
}

export function updateUserError(data) {
    return {
        type: UPDATE_USER_ERROR,
        data
    };
}

export function updateWindowSize(data) {
    return {
        type: UPDATE_WINDOW_SIZE,
        data
    };
}
