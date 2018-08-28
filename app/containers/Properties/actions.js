import {
    START_IMPORT,
    STOP_IMPORT,
    NEXT_STEP,
    PREV_STEP,
    SELECT_TOOL,
    CHANGE_SEARCH_QUERY,
    CHANGE_USERNAME,
    CHANGE_PASSWORD,
    SET_METHOD,
    SET_PIN,
    SET_PROPERTIES_TO_IMPORT,
    FETCH_PROPERTIES,
    FETCH_PROPERTIES_SUCCESS,
    FETCH_PROPERTIES_ERROR,
    SELECT_PROPERTY,
    INTEGRATION_LOGIN,
    INTEGRATION_LOGIN_SUCCESS,
    INTEGRATION_LOGIN_ERROR,
    INTEGRATION_LOGIN_NEEDS_VERIFICATION,
    INTEGRATION_2FA_SUCCESS,
    INTEGRATION_2FA_ERROR,
    INTEGRATION_2FA_CODE_SUCCESS,
    INTEGRATION_2FA_CODE_ERROR,
    FETCH_LISTINGS,
    FETCH_LISTINGS_SUCCESS,
    FETCH_LISTINGS_ERROR,
    CHANGE_DISPLAY,
    UPDATE_PROPERTY,
    UPDATE_PROPERTY_SUCCESS,
    UPDATE_PROPERTY_ERROR,
    SELECT_PHONE_NUMBER,
    SUBMIT_PHONE_NUMBER,
    VERIFY_PIN,
    IMPORT_LISTINGS,
    IMPORT_LISTINGS_SUCCESS,
    IMPORT_LISTINGS_ERROR,
    UPDATE_NEW_PROPERTY,
    NEW_PROPERTY_SET_STEP,
    NEW_PROPERTY_NEXT_STEP,
    NEW_PROPERTY_PREV_STEP,
    NEW_PROPERTY_FINISH,
    NEW_PROPERTY_FINISH_SUCCESS,
    CREATE_NEW_PROPERTY_SUCCESS,
    CREATE_NEW_PROPERTY_ERROR,
    ADD_PHOTO,
    ADD_PHOTO_SUCCESS,
    ADD_PHOTO_ERROR,
    DELETE_PHOTO,
    UPDATE_PHOTO,
    SELECT_DRAFT,
    UPDATE_PROPERTY_PHOTOS,
    ORDER_PROPERTY_PHOTOS,
    FETCH_CALENDAR,
    FETCH_CALENDAR_SUCCESS,
    FETCH_CALENDAR_ERROR,
    CHECK_CALENDAR_URL,
    CHECK_CALENDAR_URL_SUCCESS,
    CHECK_CALENDAR_URL_ERROR,
    RESET_CALENDAR_URL_ERROR,
    RESET_CALENDAR_EVENTS,
    SYNC_CALENDAR,
    SYNC_CALENDAR_SUCCESS,
    SYNC_CALENDAR_ERROR,
    ADD_CALENDAR,
    ADD_CALENDAR_SUCCESS,
    UPDATE_CALENDAR,
    DELETE_CALENDAR,
    FETCH_RATES,
    FETCH_RATES_SUCCESS,
    FETCH_RATES_ERROR,
    ADD_RATE,
    ADD_TAX,
    DELETE_TAX,
    UPDATE_TAX,
    ADD_FEE,
    DELETE_FEE,
    UPDATE_FEE,
    ADD_DISCOUNT,
    DELETE_DISCOUNT,
    UPDATE_DISCOUNT,
    FINISH_IMPORT_WHEN_NO_LISTINGS,
    ADD_POI,
    ADD_POI_SUCCESS,
    ADD_POI_ERROR,
    ADD_YELP_POI,
    REMOVE_YELP_POIS,
    FETCH_NEARBY_POIS,
    FETCH_NEARBY_POIS_SUCCESS,
    FETCH_NEARBY_POIS_ERROR,
    AUTOCOMPLETE_POI,
    AUTOCOMPLETE_POI_SUCCESS,
    AUTOCOMPLETE_POI_ERROR,
    REMOVE_POI,
    REMOVE_POI_SUCCESS,
    UPDATE_POI,
    ADD_PROPERTIES_GROUP,
    ADD_PROPERTIES_GROUP_SUCCESS,
    ADD_PROPERTIES_GROUP_ERROR,
    FETCH_PROPERTIES_GROUPS,
    FETCH_PROPERTIES_GROUPS_SUCCESS,
    FETCH_PROPERTIES_GROUPS_ERROR,
    UPDATE_PROPERTIES_GROUP,
    UPDATE_PROPERTIES_GROUP_SUCCESS,
    UPDATE_PROPERTIES_GROUP_ERROR,
    DELETE_PROPERTIES_GROUP,
    DELETE_PROPERTIES_GROUP_SUCCESS,
    DELETE_PROPERTIES_GROUP_ERROR,
    FETCH_CONNECTIONS,
    FETCH_CONNECTIONS_SUCCESS,
    FETCH_CONNECTIONS_ERROR,
    UPDATE_CONNECTION,
    UPDATE_CONNECTION_SUCCESS,
    UPDATE_CONNECTION_ERROR,
    ADD_CONNECTION,
    ADD_CONNECTION_SUCCESS,
    ADD_CONNECTION_ERROR,
    REMOVE_CONNECTION,
    REMOVE_CONNECTION_SUCCESS,
    REMOVE_CONNECTION_ERROR,
    SYNC_CONNECTION,
    FETCH_PROPERTY,
    FETCH_PROPERTY_SUCCESS,
    FETCH_PROPERTY_ERROR,
    SET_SELECTED_GROUP,
    FETCH_PROPERTIES_FILTERED,
    FETCH_PROPERTIES_FILTERED_SUCCESS,
    FETCH_PROPERTIES_FILTERED_ERROR,
} from './constants';

export function startImport(data) {
    return {
        type: START_IMPORT,
        data
    };
}

export function stopImport(data) {
    return {
        type: STOP_IMPORT,
        data
    };
}

export function nextStep(data) {
    return {
        type: NEXT_STEP,
        data
    };
}

export function prevStep(data) {
    return {
        type: PREV_STEP,
        data
    };
}

export function selectTool(data) {
    return {
        type: SELECT_TOOL,
        data
    };
}

export function changeSearchQuery(data) {
    return {
        type: CHANGE_SEARCH_QUERY,
        data
    };
}

export function changeUsername(data) {
    return {
        type: CHANGE_USERNAME,
        data
    };
}

export function changePassword(data) {
    return {
        type: CHANGE_PASSWORD,
        data
    };
}

export function setMethod(data) {
    return {
        type: SET_METHOD,
        data
    };
}

export function setPin(data) {
    return {
        type: SET_PIN,
        data
    };
}

export function setPropertiesToImport(data) {
    return {
        type: SET_PROPERTIES_TO_IMPORT,
        data
    };
}

export function fetchProperties(data) {
    return {
        type: FETCH_PROPERTIES,
        data
    };
}

export function fetchPropertiesSuccess(data) {
    return {
        type: FETCH_PROPERTIES_SUCCESS,
        data
    };
}

export function fetchPropertiesError(data) {
    return {
        type: FETCH_PROPERTIES_ERROR,
        data
    };
}

export function selectProperty(data) {
    return {
        type: SELECT_PROPERTY,
        data
    };
}

export function integrationLogin(data) {
    return {
        type: INTEGRATION_LOGIN,
        data
    };
}

export function integrationLoginSuccess(data) {
    return {
        type: INTEGRATION_LOGIN_SUCCESS,
        data
    };
}

export function integrationLoginError(data) {
    return {
        type: INTEGRATION_LOGIN_ERROR,
        data
    };
}

export function changeDisplay(data) {
    return {
        type: CHANGE_DISPLAY,
        data
    };
}

export function updateProperty(data) {
    return {
        type: UPDATE_PROPERTY,
        data
    };
}

export function integrationLoginNeedsVerification(data) {
    return {
        type: INTEGRATION_LOGIN_NEEDS_VERIFICATION,
        data
    };
}

export function selectPhoneNumber(data) {
    return {
        type: SELECT_PHONE_NUMBER,
        data
    };
}

export function submitPhoneNumber(data) {
    return {
        type: SUBMIT_PHONE_NUMBER,
        data
    };
}

export function integration2faSuccess(data) {
    return {
        type: INTEGRATION_2FA_SUCCESS,
        data
    };
}

export function integration2faError(data) {
    return {
        type: INTEGRATION_2FA_ERROR,
        data
    };
}

export function verifyPin(data) {
    return {
        type: VERIFY_PIN,
        data
    };
}

export function fetchListings(data) {
    return {
        type: FETCH_LISTINGS,
        data
    };
}

export function fetchListingsSuccess(data) {
    return {
        type: FETCH_LISTINGS_SUCCESS,
        data
    };
}

export function fetchListingsError(data) {
    return {
        type: FETCH_LISTINGS_ERROR,
        data
    };
}

export function importListings(data) {
    return {
        type: IMPORT_LISTINGS,
        data
    };
}

export function importListingsSuccess(data) {
    return {
        type: IMPORT_LISTINGS_SUCCESS,
        data
    };
}

export function importListingsError(data) {
    return {
        type: IMPORT_LISTINGS_ERROR,
        data
    };
}

export function integration2faCodeSuccess(data) {
    return {
        type: INTEGRATION_2FA_CODE_SUCCESS,
        data
    };
}

export function integration2faCodeError(data) {
    return {
        type: INTEGRATION_2FA_CODE_ERROR,
        data
    };
}

export function updateNewProperty(data) {
    return {
        type: UPDATE_NEW_PROPERTY,
        data
    };
}

export function wizardNextStep(data) {
    return {
        type: NEW_PROPERTY_NEXT_STEP,
        data
    };
}

export function wizardPrevStep(data) {
    return {
        type: NEW_PROPERTY_PREV_STEP,
        data
    };
}

export function wizardSetStep(data) {
    return {
        type: NEW_PROPERTY_SET_STEP,
        data
    };
}

export function updatePropertySuccess(data) {
    return {
        type: UPDATE_PROPERTY_SUCCESS,
        data
    };
}

export function updatePropertyError(data) {
    return {
        type: UPDATE_PROPERTY_ERROR,
        data
    };
}

export function wizardFinish(data) {
    return {
        type: NEW_PROPERTY_FINISH,
        data
    };
}

export function createNewPropertySuccess(data) {
    return {
        type: CREATE_NEW_PROPERTY_SUCCESS,
        data
    };
}

export function createNewPropertyError(data) {
    return {
        type: CREATE_NEW_PROPERTY_ERROR,
        data
    };
}

export function addPhoto(data) {
    return {
        type: ADD_PHOTO,
        data
    };
}

export function deletePhoto(data) {
    return {
        type: DELETE_PHOTO,
        data
    };
}

export function selectDraft(data) {
    return {
        type: SELECT_DRAFT,
        data
    };
}

export function addPhotoSuccess(data) {
    return {
        type: ADD_PHOTO_SUCCESS,
        data
    };
}

export function addPhotoError(data) {
    return {
        type: ADD_PHOTO_ERROR,
        data
    };
}

export function updatePropertyPhotos(data) {
    return {
        type: UPDATE_PROPERTY_PHOTOS,
        data
    };
}

export function orderPropertyPhotos(data) {
    return {
        type: ORDER_PROPERTY_PHOTOS,
        data
    };
}

export function updatePhoto(data) {
    return {
        type: UPDATE_PHOTO,
        data
    };
}

export function fetchCalendar(data) {
    return {
        type: FETCH_CALENDAR,
        data
    };
}

export function fetchCalendarSuccess(data) {
    return {
        type: FETCH_CALENDAR_SUCCESS,
        data
    };
}

export function fetchCalendarError(data) {
    return {
        type: FETCH_CALENDAR_ERROR,
        data
    };
}

export function checkCalendarUrl(data) {
    return {
        type: CHECK_CALENDAR_URL,
        data
    };
}

export function checkCalendarUrlSuccess(data) {
    return {
        type: CHECK_CALENDAR_URL_SUCCESS,
        data
    };
}

export function checkCalendarUrlError(data) {
    return {
        type: CHECK_CALENDAR_URL_ERROR,
        data
    };
}

export function addCalendar(data) {
    return {
        type: ADD_CALENDAR,
        data
    };
}

export function addCalendarSuccess(data) {
    return {
        type: ADD_CALENDAR_SUCCESS,
        data
    };
}

export function deleteCalendar(data) {
    return {
        type: DELETE_CALENDAR,
        data
    };
}

export function updateCalendar(data) {
    return {
        type: UPDATE_CALENDAR,
        data
    };
}

export function fetchRates(data) {
    return {
        type: FETCH_RATES,
        data
    };
}

export function fetchRatesSuccess(data) {
    return {
        type: FETCH_RATES_SUCCESS,
        data
    };
}

export function fetchRatesError(data) {
    return {
        type: FETCH_RATES_ERROR,
        data
    };
}

export function addTax(data) {
    return {
        type: ADD_TAX,
        data
    };
}

export function deleteTax(data) {
    return {
        type: DELETE_TAX,
        data
    };
}

export function updateTax(data) {
    return {
        type: UPDATE_TAX,
        data
    };
}

export function addFee(data) {
    return {
        type: ADD_FEE,
        data
    };
}

export function deleteFee(data) {
    return {
        type: DELETE_FEE,
        data
    };
}

export function updateFee(data) {
    return {
        type: UPDATE_FEE,
        data
    };
}

export function addDiscount(data) {
    return {
        type: ADD_DISCOUNT,
        data
    };
}

export function deleteDiscount(data) {
    return {
        type: DELETE_DISCOUNT,
        data
    };
}

export function updateDiscount(data) {
    return {
        type: UPDATE_DISCOUNT,
        data
    };
}

export function resetUrlError(data) {
    return {
        type: RESET_CALENDAR_URL_ERROR,
        data
    };
}

export function resetCalendarEvents(data) {
    return {
        type: RESET_CALENDAR_EVENTS,
        data
    };
}

export function newPropertyFinishSuccess(data) {
    return {
        type: NEW_PROPERTY_FINISH_SUCCESS,
        data
    };
}

export function finishWhenNoListings(data) {
    return {
        type: FINISH_IMPORT_WHEN_NO_LISTINGS,
        data
    };
}

export function addPoi(data) {
    return {
        type: ADD_POI,
        data
    };
}

export function addPoiSuccess(data) {
    return {
        type: ADD_POI_SUCCESS,
        data
    };
}

export function addPoiError(data) {
    return {
        type: ADD_POI_ERROR,
        data
    };
}

export function fetchNearbyPois(data) {
    return {
        type: FETCH_NEARBY_POIS,
        data
    };
}

export function fetchNearbyPoisSuccess(data) {
    return {
        type: FETCH_NEARBY_POIS_SUCCESS,
        data
    };
}

export function fetchNearbyPoisError(data) {
    return {
        type: FETCH_NEARBY_POIS_ERROR,
        data
    };
}

export function autocompletePoi(data) {
    return {
        type: AUTOCOMPLETE_POI,
        data
    };
}

export function autocompletePoiSuccess(data) {
    return {
        type: AUTOCOMPLETE_POI_SUCCESS,
        data
    };
}

export function autocompletePoiError(data) {
    return {
        type: AUTOCOMPLETE_POI_ERROR,
        data
    };
}

export function removePoi(data) {
    return {
        type: REMOVE_POI,
        data
    };
}

export function removePoiSuccess(data) {
    return {
        type: REMOVE_POI_SUCCESS,
        data
    };
}

export function syncCalendar(data) {
    return {
        type: SYNC_CALENDAR,
        data
    };
}

export function syncCalendarSuccess(data) {
    return {
        type: SYNC_CALENDAR_SUCCESS,
        data
    };
}

export function syncCalendarError(data) {
    return {
        type: SYNC_CALENDAR_ERROR,
        data
    };
}

export function addRate(data) {
    return {
        type: ADD_RATE,
        data
    };
}

export function addYelpPoi(data) {
    return {
        type: ADD_YELP_POI,
        data
    };
}

export function updatePoi(data) {
    return {
        type: UPDATE_POI,
        data
    };
}

export function addPropertiesGroup(data) {
    return {
        type: ADD_PROPERTIES_GROUP,
        data
    };
}

export function addPropertiesGroupSuccess(data) {
    return {
        type: ADD_PROPERTIES_GROUP_SUCCESS,
        data
    };
}

export function addPropertiesGroupError(data) {
    return {
        type: ADD_PROPERTIES_GROUP_ERROR,
        data
    };
}

export function fetchPropertiesGroups(data) {
    return {
        type: FETCH_PROPERTIES_GROUPS,
        data
    };
}

export function fetchPropertiesGroupsSuccess(data) {
    return {
        type: FETCH_PROPERTIES_GROUPS_SUCCESS,
        data
    };
}

export function fetchPropertiesGroupsError(data) {
    return {
        type: FETCH_PROPERTIES_GROUPS_ERROR,
        data
    };
}

export function fetchConnections(data) {
    return {
        type: FETCH_CONNECTIONS,
        data
    };
}

export function fetchConnectionsSuccess(data) {
    return {
        type: FETCH_CONNECTIONS_SUCCESS,
        data
    };
}

export function fetchConnectionsError(data) {
    return {
        type: FETCH_CONNECTIONS_ERROR,
        data
    };
}

export function updateConnection(data) {
    return {
        type: UPDATE_CONNECTION,
        data
    };
}

export function updateConnectionSuccess(data) {
    return {
        type: UPDATE_CONNECTION_SUCCESS,
        data
    };
}

export function updateConnectionError(data) {
    return {
        type: UPDATE_CONNECTION_ERROR,
        data
    };
}

export function addConnection(data) {
    return {
        type: ADD_CONNECTION,
        data
    };
}

export function addConnectionSuccess(data) {
    return {
        type: ADD_CONNECTION_SUCCESS,
        data
    };
}

export function addConnectionError(data) {
    return {
        type: ADD_CONNECTION_ERROR,
        data
    };
}

export function removeConnection(data) {
    return {
        type: REMOVE_CONNECTION,
        data
    };
}

export function removeConnectionSuccess(data) {
    return {
        type: REMOVE_CONNECTION_SUCCESS,
        data
    };
}

export function removeConnectionError(data) {
    return {
        type: REMOVE_CONNECTION_ERROR,
        data
    };
}

export function updatePropertiesGroup(data) {
    return {
        type: UPDATE_PROPERTIES_GROUP,
        data
    };
}

export function updatePropertiesGroupSuccess(data) {
    return {
        type: UPDATE_PROPERTIES_GROUP_SUCCESS,
        data
    };
}

export function updatePropertiesGroupError(data) {
    return {
        type: UPDATE_PROPERTIES_GROUP_ERROR,
        data
    };
}

export function deletePropertiesGroup(data) {
    return {
        type: DELETE_PROPERTIES_GROUP,
        data
    };
}

export function deletePropertiesGroupSuccess(data) {
    return {
        type: DELETE_PROPERTIES_GROUP_SUCCESS,
        data
    };
}

export function deletePropertiesGroupError(data) {
    return {
        type: DELETE_PROPERTIES_GROUP_ERROR,
        data
    };
}

export function syncConnection(data) {
    return {
        type: SYNC_CONNECTION,
        data
    };
}

export function fetchProperty(data) {
    return {
        type: FETCH_PROPERTY,
        data
    };
}

export function fetchPropertySuccess(data) {
    return {
        type: FETCH_PROPERTY_SUCCESS,
        data
    };
}

export function fetchPropertyError(data) {
    return {
        type: FETCH_PROPERTY_ERROR,
        data
    };
}

export function removeYelpPois(data) {
    return {
        type: REMOVE_YELP_POIS,
        data
    };
}

export function setSelectedGroup(data) {
    return {
        type: SET_SELECTED_GROUP,
        data
    };
}

export function fetchPropertiesFiltered(data) {
    return {
        type: FETCH_PROPERTIES_FILTERED,
        data
    };
}

export function fetchPropertiesFilteredSuccess(data) {
    return {
        type: FETCH_PROPERTIES_FILTERED_SUCCESS,
        data
    };
}

export function fetchPropertiesFilteredError(data) {
    return {
        type: FETCH_PROPERTIES_FILTERED_ERROR,
        data
    };
}
