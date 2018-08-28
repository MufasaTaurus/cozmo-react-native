import { fromJS } from 'immutable';
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
    FETCH_CALENDAR,
    FETCH_CALENDAR_SUCCESS,
    FETCH_CALENDAR_ERROR,
    FETCH_RESERVATIONS_CALENDAR,
    FETCH_RESERVATIONS_CALENDAR_SUCCESS,
    FETCH_RESERVATIONS_CALENDAR_ERROR,
    UPDATE_VENDOR_SUCCESS,
    UPDATE_JOB_SUCCESS,
    SET_SELECTED_JOB,
    FETCH_JOB_SUCCESS,
    CHANGE_CALENDAR_DISPLAY,
    FETCH_VENDORS_PROPERTIES,
    FETCH_VENDORS_PROPERTIES_SUCCESS,
    FETCH_VENDORS_PROPERTIES_ERROR,
    UPDATE_VENDORS_PROPERTY_SUCCESS,
    ASSIGN_VENDOR_SUCCESS
} from './constants';
import { LOGOUT_SUCCESS } from 'containers/App/constants';
import CleanerCalendarModel from 'models/CleanerCalendar';
import AssignmentModel from 'models/Assignment';
import PaginationModel from 'models/Pagination';
import JobModel from 'models/Job';
import PropertyModel from 'models/Property';

const initialState = fromJS({
    vendors: [],
    loading: true,
    jobs: {},
    loadingJobs: true,
    assignedProperties: {},
    loadingAssignedProperties: true,
    vendorsListQuery: '',
    calendars: {
        monthly: {},
        weekly: {}
    },
    calendarPagination: new PaginationModel({}),
    selectedJob: null,
    loadingCalendar: false,
    addingVendor: '',
    calendarDisplay: 'week',
    vendorsProperties: [],
    vendorsPropertiesPagination: new PaginationModel({}),
});

function vendorsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_VENDORS:
        case FETCH_VENDORS_PROPERTIES:
            return state
                .set('loading', true);
        case FETCH_VENDORS_SUCCESS:
            return state
                .set('vendors', fromJS(action.data))
                .set('loading', false);
        case FETCH_JOBS:
            return state
                .set('loadingJobs', true);
        case FETCH_JOBS_ERROR:
            return state
                .set('loadingJobs', false);
        case FETCH_JOBS_SUCCESS:
            return state
                .set('jobs', state.get('jobs').set(`${action.data.id}`, fromJS(action.data.jobs).map(j => new JobModel(j))))
                .set('loadingJobs', false);
        case FETCH_VENDORS_ERROR:
        case FETCH_VENDORS_PROPERTIES_ERROR:
            return state
                .set('loading', false);
        case CHANGE_VENDORS_LIST_QUERY:
            return state
                .set('vendorsListQuery', action.data);
        case FETCH_ASSIGNED_PROPERTIES:
            return state
                .set('loadingAssignedProperties', true);
        case FETCH_ASSIGNED_PROPERTIES_SUCCESS:
            return state
                .set('assignedProperties',
                    state.get('assignedProperties')
                        .set(`${action.data.id}`, action.data.data.map(a => new AssignmentModel(a))))
                .set('loadingAssignedProperties', false);
        case FETCH_ASSIGNED_PROPERTIES_ERROR:
            return state
                .set('loadingAssignedProperties', false);
        case FETCH_CALENDAR:
        case FETCH_RESERVATIONS_CALENDAR:
            return state
                .set('loadingCalendar', true);
        case FETCH_CALENDAR_SUCCESS:
            return state
                .setIn(['calendars', 'monthly'], state.getIn(['calendars', 'monthly']).set(action.data.key, action.data.data))
                .set('loadingCalendar', false);
        case FETCH_RESERVATIONS_CALENDAR_SUCCESS:
            return state
                .setIn(['calendars', 'weekly'],
                    state.getIn(['calendars', 'weekly'])
                        .set(action.data.key + state.get('calendarPagination').getCurrentPage(), action.data.data.results.map(d => new CleanerCalendarModel(d))))
                .set('calendarPagination', state.get('calendarPagination').setCount(action.data.data.count))
                .set('loadingCalendar', false);
        case FETCH_CALENDAR_ERROR:
        case FETCH_RESERVATIONS_CALENDAR_ERROR:
            return state
                .set('loadingCalendar', false);
        case SET_SELECTED_JOB:
            return state
                .set('selectedJob', action.data);
        case ADD_VENDOR:
            return state
                .set('addingVendor', 'adding');
        case ADD_VENDOR_SUCCESS:
            return state
                .set('addingVendor', '');
        case ADD_VENDOR_ERROR:
            return state
                .set('addingVendor', action.data.data);
        case UPDATE_VENDOR_SUCCESS:
            return state
                .set('vendors', state.get('vendors').update(state.get('vendors').findKey(v => v.get('id') === action.data.id), () => fromJS(action.data)));
        case UPDATE_JOB_SUCCESS:
        case FETCH_JOB_SUCCESS:
            return state
                .set('selectedJob', new JobModel(fromJS(action.data)));
        case CHANGE_CALENDAR_DISPLAY:
            return state
                .set('calendarDisplay', action.data);
        case FETCH_VENDORS_PROPERTIES_SUCCESS:
            return state
                .set('vendorsProperties', fromJS(action.data.results.map(p => new PropertyModel(fromJS(p)))))
                .set('vendorsPropertiesPagination', state.get('vendorsPropertiesPagination').setCount(action.data.count))
                .set('loading', false);
        case UPDATE_VENDORS_PROPERTY_SUCCESS:
            return state
                .set('vendorsProperties', state.get('vendorsProperties')
                    .update(state.get('vendorsProperties')
                        .findKey((prop) => prop.getId() === action.data.id), (prop) => fromJS(new PropertyModel(fromJS(Object.assign(action.data, { vendors: prop.getOriginalVendors() }))))));
        case ASSIGN_VENDOR_SUCCESS:
            return state
                .set('vendorsProperties', state.get('vendorsProperties')
                    .update(state.get('vendorsProperties')
                        .findKey((prop) => prop.getId() === action.data.id), (prop) => fromJS(new PropertyModel(fromJS(Object.assign(action.data, { vendors: prop.getOriginalVendors() }))))));
        case LOGOUT_SUCCESS:
            return initialState
                .set('calendarPagination', new PaginationModel({}));
        default:
            return state;
    }
}

export default vendorsReducer;
