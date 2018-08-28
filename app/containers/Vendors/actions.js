import {
    FETCH_VENDORS,
    FETCH_VENDORS_SUCCESS,
    FETCH_VENDORS_ERROR,
    CHANGE_VENDORS_LIST_QUERY,
    ADD_VENDOR,
    ADD_VENDOR_SUCCESS,
    ADD_VENDOR_ERROR,
    FETCH_JOBS,
    FETCH_JOBS_SUCCESS,
    FETCH_JOBS_ERROR,
    FETCH_ASSIGNED_PROPERTIES,
    FETCH_ASSIGNED_PROPERTIES_SUCCESS,
    FETCH_ASSIGNED_PROPERTIES_ERROR,
    UPDATE_VENDOR,
    UPDATE_VENDOR_SUCCESS,
    DELETE_JOB,
    ADD_NEW_JOB,
    DELETE_VENDOR,
    FETCH_CALENDAR,
    FETCH_CALENDAR_SUCCESS,
    FETCH_CALENDAR_ERROR,
    FETCH_RESERVATIONS_CALENDAR,
    FETCH_RESERVATIONS_CALENDAR_SUCCESS,
    FETCH_RESERVATIONS_CALENDAR_ERROR,
    SET_SELECTED_JOB,
    UPDATE_JOB,
    UPDATE_JOB_SUCCESS,
    FETCH_JOB,
    FETCH_JOB_SUCCESS,
    REASSIGN_JOBS,
    REASSIGN_JOBS_SUCCESS,
    REASSIGN_JOBS_ERROR,
    CHANGE_CALENDAR_DISPLAY,
    FETCH_VENDORS_PROPERTIES,
    FETCH_VENDORS_PROPERTIES_SUCCESS,
    FETCH_VENDORS_PROPERTIES_ERROR,
    UPDATE_VENDORS_PROPERTY,
    UPDATE_VENDORS_PROPERTY_SUCCESS,
    UPDATE_VENDORS_PROPERTY_ERROR,
    ASSIGN_VENDOR,
    ASSIGN_VENDOR_SUCCESS,
    CHANGE_VENDORS_ORDER
} from './constants';

export function fetchVendors(data) {
    return {
        type: FETCH_VENDORS,
        data
    };
}

export function fetchVendorsSuccess(data) {
    return {
        type: FETCH_VENDORS_SUCCESS,
        data
    };
}

export function fetchVendorsError(data) {
    return {
        type: FETCH_VENDORS_ERROR,
        data
    };
}

export function changeVendorsListQuery(data) {
    return {
        type: CHANGE_VENDORS_LIST_QUERY,
        data
    };
}

export function addVendor(data) {
    return {
        type: ADD_VENDOR,
        data
    };
}

export function addVendorSuccess(data) {
    return {
        type: ADD_VENDOR_SUCCESS,
        data
    };
}

export function addVendorError(data) {
    return {
        type: ADD_VENDOR_ERROR,
        data
    };
}

export function fetchJobs(data) {
    return {
        type: FETCH_JOBS,
        data
    };
}

export function fetchJobsSuccess(data) {
    return {
        type: FETCH_JOBS_SUCCESS,
        data
    };
}

export function fetchJobsError(data) {
    return {
        type: FETCH_JOBS_ERROR,
        data
    };
}

export function fetchAssignedProperties(data) {
    return {
        type: FETCH_ASSIGNED_PROPERTIES,
        data
    };
}

export function fetchAssignedPropertiesSuccess(data) {
    return {
        type: FETCH_ASSIGNED_PROPERTIES_SUCCESS,
        data
    };
}

export function fetchAssignedPropertiesError(data) {
    return {
        type: FETCH_ASSIGNED_PROPERTIES_ERROR,
        data
    };
}

export function updateVendor(data) {
    return {
        type: UPDATE_VENDOR,
        data
    };
}

export function deleteJob(data) {
    return {
        type: DELETE_JOB,
        data
    };
}

export function addNewJob(data) {
    return {
        type: ADD_NEW_JOB,
        data
    };
}

export function fetchCalendar(data) {
    return {
        type: FETCH_CALENDAR,
        data
    };
}

export function fetchCalendarSuccess(data) {
    return {
        type: FETCH_CALENDAR_SUCCESS,
        data
    };
}

export function fetchCalendarError(data) {
    return {
        type: FETCH_CALENDAR_ERROR,
        data
    };
}

export function fetchReservationsCalendar(data) {
    return {
        type: FETCH_RESERVATIONS_CALENDAR,
        data
    };
}

export function fetchReservationsCalendarSuccess(data) {
    return {
        type: FETCH_RESERVATIONS_CALENDAR_SUCCESS,
        data
    };
}

export function fetchReservationsCalendarError(data) {
    return {
        type: FETCH_RESERVATIONS_CALENDAR_ERROR,
        data
    };
}

export function deleteVendor(data) {
    return {
        type: DELETE_VENDOR,
        data
    };
}

export function updateVendorSuccess(data) {
    return {
        type: UPDATE_VENDOR_SUCCESS,
        data
    };
}

export function setSelectedJob(data) {
    return {
        type: SET_SELECTED_JOB,
        data
    };
}

export function updateJob(data) {
    return {
        type: UPDATE_JOB,
        data
    };
}

export function updateJobSuccess(data) {
    return {
        type: UPDATE_JOB_SUCCESS,
        data
    };
}

export function reassignJobs(data) {
    return {
        type: REASSIGN_JOBS,
        data
    };
}

export function reassignJobsSuccess(data) {
    return {
        type: REASSIGN_JOBS_SUCCESS,
        data
    };
}

export function reassignJobsError(data) {
    return {
        type: REASSIGN_JOBS_ERROR,
        data
    };
}

export function fetchJob(data) {
    return {
        type: FETCH_JOB,
        data
    };
}

export function fetchJobSuccess(data) {
    return {
        type: FETCH_JOB_SUCCESS,
        data
    };
}

export function changeCalendarDisplay(data) {
    return {
        type: CHANGE_CALENDAR_DISPLAY,
        data
    };
}

export function fetchVendorsProperties(data) {
    return {
        type: FETCH_VENDORS_PROPERTIES,
        data
    };
}

export function fetchVendorsPropertiesSuccess(data) {
    return {
        type: FETCH_VENDORS_PROPERTIES_SUCCESS,
        data
    };
}

export function fetchVendorsPropertiesError(data) {
    return {
        type: FETCH_VENDORS_PROPERTIES_ERROR,
        data
    };
}

export function updateVendorsProperty(data) {
    return {
        type: UPDATE_VENDORS_PROPERTY,
        data
    };
}

export function updateVendorsPropertySuccess(data) {
    return {
        type: UPDATE_VENDORS_PROPERTY_SUCCESS,
        data
    };
}

export function updateVendorsPropertyError(data) {
    return {
        type: UPDATE_VENDORS_PROPERTY_ERROR,
        data
    };
}

export function assignVendor(data) {
    return {
        type: ASSIGN_VENDOR,
        data
    };
}

export function assignVendorSuccess(data) {
    return {
        type: ASSIGN_VENDOR_SUCCESS,
        data
    };
}

export function changeVendorOrder(data) {
    return {
        type: CHANGE_VENDORS_ORDER,
        data
    };
}
