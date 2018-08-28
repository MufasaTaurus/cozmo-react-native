import { fromJS } from 'immutable';
import { LOCAL_STORAGE_USER_KEY } from 'utils/const';
import variables from 'utils/variables';
import UserModel from 'models/User';
import VendorModel from 'models/Vendor';
import { ADD_VENDOR_SUCCESS } from 'containers/Vendors/constants';
import { CHECK_SECRET_SUCCESS } from 'containers/Shadow/constants';
import {
    LOGIN_SUCCESS,
    LOGIN_WITH_GOOGLE_SUCCESS,
    SIGNUP_WITH_GOOGLE_SUCCESS,
    LOGOUT_SUCCESS,
    ADD_ALERT,
    REMOVE_ALERT,
    UPDATE_USER_PLAN,
    CHACHE_MULTICALENDAR_DATA,
    FETCH_PROPERTIES_BASIC_INFO_SUCCESS,
    FETCH_CLEANERS_BASIC_INFO_SUCCESS,
    FETCH_TEMPLATES_SUCCESS,
    CHUNK_FAILED_TO_LOAD,
    UPDATE_USER_SUCCESS,
    UPDATE_WINDOW_SIZE
} from './constants';

// The initial state of the App
const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));
const initialState = fromJS({
    loading: false,
    user: user || {},
    team: user ? user.organization.users.map(t => new UserModel(fromJS(t), t.pk === user.pk)) : [],
    properties: [],
    cleaners: [],
    alerts: [],
    variables: variables,
    templates: [],
    cache: {
        multicalendar: {}
    },
    windowSize: window.innerWidth
});

function appReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case LOGIN_WITH_GOOGLE_SUCCESS:
        case SIGNUP_WITH_GOOGLE_SUCCESS:
        case CHECK_SECRET_SUCCESS:
            let user = action.data.user;
            user.token = action.data.token;
            localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
            return state
                .set('logging', false)
                .set('user', fromJS(user))
                .set('team', fromJS(user.organization.users).map(t => new UserModel(t, t.pk === user.pk)));
        case LOGOUT_SUCCESS:
            localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
            return state
                .set('user', fromJS({}))
                .set('team', fromJS([]))
                .set('properties', fromJS([]))
                .set('cleaners', fromJS([]))
                .set('alerts', fromJS([]))
                .set('templates', fromJS([]))
                .setIn(['cache', 'multicalendar'], fromJS({}));
        case ADD_ALERT:
            return state
                .set('alerts', state.get('alerts').push(fromJS(action.data)));
        case REMOVE_ALERT:
            return state
                .set('alerts', state.get('alerts').delete(action.data));
        case ADD_VENDOR_SUCCESS:
            return state
                .set('cleaners', state.get('cleaners').push(new VendorModel(fromJS(action.data))));
        case FETCH_PROPERTIES_BASIC_INFO_SUCCESS:
            return state
                .set('properties', fromJS(action.data));
        case FETCH_CLEANERS_BASIC_INFO_SUCCESS:
            return state
                .set('cleaners', fromJS(action.data.map(v => new VendorModel(fromJS(v)))));
        case UPDATE_USER_PLAN:
            const updatedUser = state.get('user').set('plan', fromJS(action.data));
            localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updatedUser));
            return state
                .set('user', updatedUser);
        case FETCH_TEMPLATES_SUCCESS:
            return state
                .set('templates', fromJS(action.data.results));
        case UPDATE_USER_SUCCESS:
            const updated = state.get('user').merge(fromJS(action.data));
            localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updated));
            return state
                .set('user', fromJS(updated))
                .set('alerts', state.get('alerts').push(fromJS({ message: 'Your changes has been saved' })));
        case CHACHE_MULTICALENDAR_DATA:
            return state
                .setIn(['cache', 'multicalendar', action.data.key], action.data.value);
        case CHUNK_FAILED_TO_LOAD:
            return state
                .set('alerts', state.get('alerts').unshift(fromJS({ message: 'Can not load asset. Please refresh browser', type: 'error' })));
        case UPDATE_WINDOW_SIZE:
            return state
                .set('windowSize', action.data);
        default:
            return state;
    }
}

export default appReducer;
