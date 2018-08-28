
import {createSelector} from 'reselect';

const selectVendors = (state) => state.get('vendors');

const makeSelectVendors = () => createSelector(
    selectVendors,
    (state) => state.get('vendors')
);

const makeSelectJobs = () => createSelector(
    selectVendors,
    (state) => state.get('jobs')
);

const makeSelectAssignedProperties = () => createSelector(
    selectVendors,
    (state) => state.get('assignedProperties')
);

const makeSelectJobsLoading = () => createSelector(
    selectVendors,
    (state) => state.get('loadingJobs')
);

const makeSelectLoading = () => createSelector(
    selectVendors,
    (state) => state.get('loading')
);

const makeSelectVendorsListQuery = () => createSelector(
    selectVendors,
    (state) => state.get('vendorsListQuery')
);

const selectMonthlyCalendar = () => createSelector(
    selectVendors,
    (state) => state.get('calendars').get('monthly')
);

const selectWeeklyCalendar = () => createSelector(
    selectVendors,
    (state) => state.get('calendars').get('weekly')
);

const selectAddingVendor = () => createSelector(
    selectVendors,
    (state) => state.get('addingVendor')
);

const selectSelectedJob = () => createSelector(
    selectVendors,
    (state) => state.get('selectedJob')
);

const selectCalendarPagination = () => createSelector(
    selectVendors,
    (state) => state.get('calendarPagination')
);

const selectLoadingCalendar = () => createSelector(
    selectVendors,
    (state) => state.get('loadingCalendar')
);

const selectCalendarDisplay = () => createSelector(
    selectVendors,
    (state) => state.get('calendarDisplay')
);

const selectVendorsPropertiesPagination = () => createSelector(
    selectVendors,
    (state) => state.get('vendorsPropertiesPagination')
);

const selectVendorsProperties = () => createSelector(
    selectVendors,
    (state) => state.get('vendorsProperties')
);

export {
    makeSelectVendors,
    makeSelectLoading,
    makeSelectVendorsListQuery,
    makeSelectJobs,
    makeSelectJobsLoading,
    makeSelectAssignedProperties,
    selectMonthlyCalendar,
    selectWeeklyCalendar,
    selectAddingVendor,
    selectSelectedJob,
    selectCalendarPagination,
    selectLoadingCalendar,
    selectCalendarDisplay,
    selectVendorsProperties,
    selectVendorsPropertiesPagination
};
