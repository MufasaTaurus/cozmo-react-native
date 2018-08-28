import { createSelector } from 'reselect';

const selectSignup = (state) => state.get('signup');

const makeSelectSignupSuccess = () => createSelector(
    selectSignup,
    (state) => state.get('signupSuccess')
);

const makeSelectSignupError = () => createSelector(
    selectSignup,
    (state) => state.get('signupError')
);

const makeSelectGoogleUser = () => createSelector(
    selectSignup,
    (state) => state.get('googleUser')
);

const makeSelectVerificationKey = () => createSelector(
    selectSignup,
    (state) => state.get('key')
);

const makeSelectVerificationSuccess = () => createSelector(
    selectSignup,
    (state) => state.get('verificationSuccess')
);

const makeSelectVerificationError = () => createSelector(
    selectSignup,
    (state) => state.get('verificationError')
);

const makeSelectForgotPasswordEmail = () => createSelector(
    selectSignup,
    (state) => state.get('forgotPasswordEmail')
);

const makeSelectForgotPasswordEmailSent = () => createSelector(
    selectSignup,
    (state) => state.get('forgotPasswordEmailSent')
);

export {
    selectSignup,
    makeSelectSignupSuccess,
    makeSelectSignupError,
    makeSelectGoogleUser,
    makeSelectVerificationKey,
    makeSelectVerificationSuccess,
    makeSelectVerificationError,
    makeSelectForgotPasswordEmail,
    makeSelectForgotPasswordEmailSent
};
