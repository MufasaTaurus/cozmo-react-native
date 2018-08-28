
import {createSelector} from 'reselect';

const selectAnalytics = (state) => state.get('analytics');


const makeSelectReports = () => createSelector(
    selectAnalytics,
    (state) => state.get('reports')
);

const selectSelectedProperty = () => createSelector(
    selectAnalytics,
    (state) => state.get('selectedProperty')
);

export {
    selectAnalytics,
    makeSelectReports,
    selectSelectedProperty
};
