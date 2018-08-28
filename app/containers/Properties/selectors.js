import { createSelector }  from 'reselect';

const selectProperties = (state) => state.get('properties');

const makeSelectProperties = () => createSelector(
    selectProperties,
    (state) => state.get('properties')
);

const makeSelectCurrentStep = () => createSelector(
    selectProperties,
    (state) => state.get('currentStep')
);

const makeSelectImport = () => createSelector(
    selectProperties,
    (state) => state.get('import')
);

const makeSelectTool = () => createSelector(
    selectProperties,
    (state) => state.get('selectedTool')
);

const makeSelectSearchQuery = () => createSelector(
    selectProperties,
    (state) => state.get('searchQuery')
);

const makeSelectUsername = () => createSelector(
    selectProperties,
    (state) => state.get('username')
);

const makeSelectPassword = () => createSelector(
    selectProperties,
    (state) => state.get('password')
);

const makeSelectMethod = () => createSelector(
    selectProperties,
    (state) => state.get('method')
);

const makeSelectPin = () => createSelector(
    selectProperties,
    (state) => state.get('pin')
);

const makeSelectPropertiesToImport = () => createSelector(
    selectProperties,
    (state) => state.get('propertiesToImport')
);

const makeSelectSelectedProperty = () => createSelector(
    selectProperties,
    (state) => state.get('selectedProperty')
);

const makeSelectLoading = () => createSelector(
    selectProperties,
    (state) => state.get('loading')
);

const makeSelectLoginError = () => createSelector(
    selectProperties,
    (state) => state.get('loginError')
);

const makeSelectDisplay = () => createSelector(
    selectProperties,
    (state) => state.get('display')
);

const makeSelectPhones = () => createSelector(
    selectProperties,
    (state) => state.get('phones')
);

const makeSelectSelectedPhoneNumber = () => createSelector(
    selectProperties,
    (state) => state.get('selectedPhoneNumber')
);

const makeSelectIntegrationId = () => createSelector(
    selectProperties,
    (state) => state.get('integrationId')
);

const makeSelectListings = () => createSelector(
    selectProperties,
    (state) => state.get('listings')
);

const makeSelectFetchPropertiesLoading = () => createSelector(
    selectProperties,
    (state) => state.get('fetchPropertiesLoading')
);

const makeSelectNewProperty = () => createSelector(
    selectProperties,
    (state) => state.get('newProperty')
);

const makeSelectNewPropertyCurrentStep = () => createSelector(
    selectProperties,
    (state) => state.get('createNewCurrentStep')
);

const selectNewPropertyMaxStep = () => createSelector(
    selectProperties,
    (state) => state.get('createNewMaxStep')
);

const makeSelectNewPropertyLoading = () => createSelector(
    selectProperties,
    (state) => state.get('loadingNewPropertyWizard')
);

const makeSelectUploadedImage = () => createSelector(
    selectProperties,
    (state) => state.get('uploadedImage')
);

const makeSelectUploadingImage = () => createSelector(
    selectProperties,
    (state) => state.get('uploadingImage')
);

const makeSelectCalendarURLError = () => createSelector(
    selectProperties,
    (state) => state.get('calendarURLError')
);

const makeSelectCalendarEvents = () => createSelector(
    selectProperties,
    (state) => state.get('calendarEvents')
);

const selectAutocomplete = () => createSelector(
    selectProperties,
    (state) => state.get('autocomplete')
);

const selectCalendarChecking = () => createSelector(
    selectProperties,
    (state) => state.get('calendarChecking')
);

const selectSyncingCalendar = () => createSelector(
    selectProperties,
    (state) => state.get('syncingCalendar')
);

const selectPropertiesGroup = () => createSelector(
    selectProperties,
    (state) => state.get('propertiesGroups')
);

const selectLoadingGroups = () => createSelector(
    selectProperties,
    (state) => state.get('loadingGroups')
);

const selectConnections = () => createSelector(
    selectProperties,
    (state) => state.get('connections')
);

const selectLoadingConnections = () => createSelector(
    selectProperties,
    (state) => state.get('loadingConnections')
);

const selectAddingConnection = () => createSelector(
    selectProperties,
    (state) => state.get('addingConnection')
);

const selectPropertiesPagination = () => createSelector(
    selectProperties,
    (state) => state.get('propertiesPagination')
);

const selectPropertiesFiltered = () => createSelector(
    selectProperties,
    (state) => state.get('propertiesFiltered')
);

const selectSelectedGroup = () => createSelector(
    selectProperties,
    (state) => state.get('selectedGroup')
);

const selectConnectionPropertiesCount = () => createSelector(
    selectProperties,
    (state) => state.get('connectionPropertiesCount')
);

export {
    makeSelectProperties,
    makeSelectCurrentStep,
    makeSelectImport,
    makeSelectTool,
    makeSelectSearchQuery,
    makeSelectUsername,
    makeSelectPassword,
    makeSelectMethod,
    makeSelectPin,
    makeSelectPropertiesToImport,
    makeSelectSelectedProperty,
    makeSelectLoading,
    makeSelectLoginError,
    makeSelectDisplay,
    makeSelectPhones,
    makeSelectSelectedPhoneNumber,
    makeSelectIntegrationId,
    makeSelectListings,
    makeSelectFetchPropertiesLoading,
    makeSelectNewProperty,
    makeSelectNewPropertyCurrentStep,
    selectNewPropertyMaxStep,
    makeSelectNewPropertyLoading,
    makeSelectUploadedImage,
    makeSelectUploadingImage,
    makeSelectCalendarURLError,
    makeSelectCalendarEvents,
    selectAutocomplete,
    selectCalendarChecking,
    selectSyncingCalendar,
    selectPropertiesGroup,
    selectLoadingGroups,
    selectConnections,
    selectLoadingConnections,
    selectAddingConnection,
    selectPropertiesPagination,
    selectSelectedGroup,
    selectPropertiesFiltered,
    selectConnectionPropertiesCount
};
