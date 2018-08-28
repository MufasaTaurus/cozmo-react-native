import {
    SIGNUP_FORM_SUBMIT,
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    SIGNUP_WITH_GOOGLE,
    SIGNUP_WITH_GOOGLE_SUCCESS,
    SIGNUP_WITH_GOOGLE_ERROR,
    SIGNUP_VERIFY_EMAIL,
    SIGNUP_VERIFY_EMAIL_SUCCESS,
    SIGNUP_VERIFY_EMAIL_ERROR,
    FORGOT_PASSWORD_EMAIL_CHANGE,
    FORGOT_PASSWORD_EMAIL_SENT,
    FORGOT_PASSWORD_SEND_EMAIL
} from './constants';

export function signupFormSubmit(data) {
    return {
        type: SIGNUP_FORM_SUBMIT,
        data
    };
}

export function signup(data) {
    return {
        type: SIGNUP,
        data
    };
}

export function signupSuccess(data) {
    return {
        type: SIGNUP_SUCCESS,
        data
    };
}

export function signupError(data) {
    return {
        type: SIGNUP_ERROR,
        data
    };
}

export function signupWithGoogle(data) {
    return {
        type: SIGNUP_WITH_GOOGLE,
        data
    };
}

export function localSignupWithGoogleSuccess(data) {
    return {
        type: SIGNUP_WITH_GOOGLE_SUCCESS,
        data
    };
}

export function signupWithGoogleError(data) {
    return {
        type: SIGNUP_WITH_GOOGLE_ERROR,
        data
    };
}

export function accountVerification(data) {
    return {
        type: SIGNUP_VERIFY_EMAIL,
        data
    };
}

export function accountVerificationSuccess(data) {
    return {
        type: SIGNUP_VERIFY_EMAIL_SUCCESS,
        data
    };
}

export function accountVerificationError(data) {
    return {
        type: SIGNUP_VERIFY_EMAIL_ERROR,
        data
    };
}

export function forgotPasswordEmailChange(data) {
    return {
        type: FORGOT_PASSWORD_EMAIL_CHANGE,
        data
    };
}

export function forgotPasswordEmailSent(data) {
    return {
        type: FORGOT_PASSWORD_EMAIL_SENT,
        data
    };
}

export function forgotPasswordSendEmail(data) {
    return {
        type: FORGOT_PASSWORD_SEND_EMAIL,
        data
    };
}
