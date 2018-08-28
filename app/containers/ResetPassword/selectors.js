
import { createSelector } from 'reselect';

const selectResetPassword = (state) => state.get('resetPassword');

const makeSelectLoading = () => createSelector(
    selectResetPassword,
    (state) => state.get('loading')
);

const makeSelectResetPasswordError = () => createSelector(
    selectResetPassword,
    (state) => state.get('error')
);

const makeSelectResetPasswordSuccess = () => createSelector(
    selectResetPassword,
    (state) => state.get('success')
);

const makeSelectToken = () => createSelector(
    selectResetPassword,
    (state) => state.get('token')
);

const makeSelectUid = () => createSelector(
    selectResetPassword,
    (state) => state.get('uid')
);

export {
    makeSelectLoading,
    makeSelectResetPasswordError,
    makeSelectResetPasswordSuccess,
    makeSelectToken,
    makeSelectUid
};
