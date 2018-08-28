import { createSelector } from 'reselect';

const selectWebsitesState = (state) => state.get('websites');

const selectWebsites = () => createSelector(
    selectWebsitesState,
    (state) => state.get('websites')
);

export {
    selectWebsites,
};
