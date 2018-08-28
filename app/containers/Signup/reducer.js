import { fromJS } from 'immutable';
import {
    SIGNUP_FORM_SUBMIT,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    SIGNUP_WITH_GOOGLE,
    SIGNUP_WITH_GOOGLE_SUCCESS,
    SIGNUP_WITH_GOOGLE_ERROR,
    SIGNUP_VERIFY_EMAIL,
    SIGNUP_VERIFY_EMAIL_SUCCESS,
    SIGNUP_VERIFY_EMAIL_ERROR,
    FORGOT_PASSWORD_EMAIL_CHANGE,
    FORGOT_PASSWORD_EMAIL_SENT
} from './constants';

// The initial state of the App
const initialState = fromJS({
    googleUser: {
        access_token: '',
        code: ''
    },
    submitted: false,
    signupSuccess: false,
    signupError: false,
    signupGoogleSuccess: false,
    signupGoogleError: false,
    key: '',
    verificationSuccess: false,
    verificationError: false,
    forgotPasswordEmail: '',
    forgotPasswordEmailSent: false
});

function signupReducer(state = initialState, action) {
    switch (action.type) {
        case SIGNUP_FORM_SUBMIT:
            return state
                .set('submitted', true);
        case SIGNUP_SUCCESS:
            return state
                .set('signupSuccess', true);
        case SIGNUP_ERROR:
            return state
                .set('signupError', true);
        case SIGNUP_WITH_GOOGLE:
            return state
                .setIn(['googleUser', 'access_token'], action.data.accessToken)
                .setIn(['googleUser', 'code'], action.data.code || '');
        case SIGNUP_WITH_GOOGLE_SUCCESS:
            return state
                .set('signupGoogleSuccess', true);
        case SIGNUP_WITH_GOOGLE_ERROR:
            return state
                .set('signupGoogleError', true);
        case SIGNUP_VERIFY_EMAIL:
            return state
                .set('key', action.data);
        case SIGNUP_VERIFY_EMAIL_SUCCESS:
            return state
                .set('verificationSuccess', true);
        case SIGNUP_VERIFY_EMAIL_ERROR:
            return state
                .set('verificationError', true);
        case FORGOT_PASSWORD_EMAIL_CHANGE:
            return state
                .set('forgotPasswordEmail', action.data.email);
        case FORGOT_PASSWORD_EMAIL_SENT:
            return state
                .set('forgotPasswordEmailSent', true);
        default:
            return state;
    }
}

export default signupReducer;
