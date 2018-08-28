import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectLogging = () => createSelector(
    selectHome,
    (homeState) => homeState.get('logging')
);

const makeSelectLoginError = () => createSelector(
    selectHome,
    (homeState) => homeState.get('loginError')
);

const makeSelectGoogleUser = () => createSelector(
    selectHome,
    (homeState) => homeState.get('googleUser')
);

const makeSelectGoogleLoginError = () => createSelector(
    selectHome,
    (homeState) => homeState.get('googleLoginError')
);


export {
    selectHome,
    makeSelectLogging,
    makeSelectLoginError,
    makeSelectGoogleUser,
    makeSelectGoogleLoginError
};
