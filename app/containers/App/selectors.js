import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectUser = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('user')
);

const makeSelectUsername = () => createSelector(
    selectGlobal,
    (globalState) => globalState.getIn(['user', 'first_name']) || globalState.getIn(['user', 'username'])
);

const makeSelectLoading = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('loading')
);

const makeSelectToken = () => createSelector(
    selectGlobal,
    (homeState) => homeState.get('user').get('token')
);

const makeSelectAlerts = () => createSelector(
    selectGlobal,
    (homeState) => homeState.get('alerts')
);

const makeSelectMulticalendarCache = () => createSelector(
    selectGlobal,
    (homeState) => homeState.getIn(['cache', 'multicalendar'])
);

const makeSelectVariables = () => createSelector(
    selectGlobal,
    (state) => state.get('variables')
);

const makeSelectProperties = () => createSelector(
    selectGlobal,
    (state) => state.get('properties')
);

const makeSelectTemplates = () => createSelector(
    selectGlobal,
    (state) => state.get('templates')
);

const selectTeam = () => createSelector(
    selectGlobal,
    (state) => state.get('team')
);

const selectCleaners = () => createSelector(
    selectGlobal,
    (state) => state.get('cleaners')
);

const selectWindowSize = () => createSelector(
    selectGlobal,
    (state) => state.get('windowSize')
);


const makeSelectLocationState = () => {
    let prevRoutingState;
    let prevRoutingStateJS;

    return (state) => {
        const routingState = state.get('route'); // or state.route

        if (!routingState.equals(prevRoutingState)) {
            prevRoutingState = routingState;
            prevRoutingStateJS = routingState.toJS();
        }

        return prevRoutingStateJS;
    };
};

export {
    selectGlobal,
    makeSelectUser,
    makeSelectToken,
    makeSelectLoading,
    makeSelectLocationState,
    makeSelectUsername,
    makeSelectAlerts,
    makeSelectMulticalendarCache,
    makeSelectVariables,
    makeSelectProperties,
    makeSelectTemplates,
    selectTeam,
    selectCleaners,
    selectWindowSize
};
