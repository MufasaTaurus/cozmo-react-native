import { fromJS } from 'immutable';
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_WITH_GOOGLE,
    LOGIN_WITH_GOOGLE_SUCCESS,
    LOGIN_WITH_GOOGLE_ERROR,
} from './constants';
import { LOGOUT_SUCCESS }  from 'containers/App/constants';

// The initial state of the App
const initialState = fromJS({
    logging: false,
    loginError: '',
    googleUser: {},
    googleLoginError: ''
});

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return state
                .set('logging', true);
        case LOGIN_SUCCESS:
        case LOGIN_WITH_GOOGLE_SUCCESS:
            return state
                .set('logging', false)
                .set('loginError', '')
                .set('googleLoginError', '');
        case LOGIN_ERROR:
            return state
                .set('logging', false)
                .set('loginError', action.data === 'E-mail is not verified.' ? 'Please verify your email first.' : 'Email and password don\'t match. Try again.');
        case LOGIN_WITH_GOOGLE:
            return state
                .set('logging', true)
                .setIn(['googleUser', 'access_token'], action.data.accessToken)
                .setIn(['googleUser', 'code'], action.data.code || '');
        case LOGIN_WITH_GOOGLE_ERROR:
            return state
                .set('logging', false)
                .set('googleLoginError', 'Can\'t login with Google...');
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

export default homeReducer;
