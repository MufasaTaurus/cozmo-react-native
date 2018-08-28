import { fromJS } from 'immutable';
import {
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    SET_KEYS
} from './constants';

// The initial state of the App
const initialState = fromJS({
    token: '',
    uid: '',
    loading: false,
    error: false,
    success: false
});

function resetPasswordReducer(state = initialState, action) {
    switch (action.type) {
        case RESET_PASSWORD:
            return state
                .set('loading', true);
        case RESET_PASSWORD_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('success', true);
        case RESET_PASSWORD_ERROR:
            return state
                .set('loading', false)
                .set('success', false)
                .set('error', true);
        case SET_KEYS:
            return state
                .set('token', action.data.token)
                .set('uid', action.data.uid);
        default:
            return state;
    }
}

export default resetPasswordReducer;
