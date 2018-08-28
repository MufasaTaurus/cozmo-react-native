import { createSelector } from 'reselect';

const selectSettings = (state) => state.get('settings');

const makeSelectChannels = () => createSelector(
    selectSettings,
    (state) => state.get('channels')
);

const makeSelectIntegrations = () => createSelector(
    selectSettings,
    (state) => state.get('integrations')
);

const makeSelectIntegrationsDisplay = () => createSelector(
    selectSettings,
    (state) => state.get('integrationsDisplay')
);

const selectLoading = () => createSelector(
    selectSettings,
    (state) => state.get('loading')
);

const selectfetchingInstallUrl = () => createSelector(
    selectSettings,
    (state) => state.get('fetchingInstallUrl')
);

const selectResettingPassword = () => createSelector(
    selectSettings,
    (state) => state.get('resettingPassword')
);

const selectChangingPassword = () => createSelector(
    selectSettings,
    (state) => state.get('changingPassword')
);

export {
    makeSelectChannels,
    selectLoading,
    makeSelectIntegrations,
    makeSelectIntegrationsDisplay,
    selectfetchingInstallUrl,
    selectResettingPassword,
    selectChangingPassword
};
