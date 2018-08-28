import { call, put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { push } from 'react-router-redux';
import axios from 'axios';
import values from 'lodash/values';
import {
    FETCH_PROPERTIES,
    INTEGRATION_LOGIN,
    UPDATE_PROPERTY,
    SUBMIT_PHONE_NUMBER,
    VERIFY_PIN,
    FETCH_LISTINGS,
    IMPORT_LISTINGS,
    NEW_PROPERTY_FINISH,
    NEW_PROPERTY_NEXT_STEP,
    ADD_PHOTO,
    UPDATE_PHOTO,
    DELETE_PHOTO,
    ORDER_PROPERTY_PHOTOS,
    FETCH_CALENDAR,
    CHECK_CALENDAR_URL,
    ADD_CALENDAR,
    DELETE_CALENDAR,
    UPDATE_CALENDAR,
    FETCH_RATES,
    ADD_TAX,
    DELETE_TAX,
    UPDATE_TAX,
    ADD_FEE,
    DELETE_FEE,
    UPDATE_FEE,
    ADD_DISCOUNT,
    DELETE_DISCOUNT,
    UPDATE_DISCOUNT,
    ADD_POI,
    FETCH_NEARBY_POIS,
    AUTOCOMPLETE_POI,
    REMOVE_POI,
    SYNC_CALENDAR,
    ADD_RATE,
    UPDATE_POI,
    FETCH_PROPERTIES_GROUPS,
    ADD_PROPERTIES_GROUP,
    UPDATE_PROPERTIES_GROUP,
    DELETE_PROPERTIES_GROUP,
    FETCH_CONNECTIONS,
    UPDATE_CONNECTION,
    ADD_CONNECTION,
    REMOVE_CONNECTION,
    SYNC_CONNECTION,
    FETCH_PROPERTY,
    FETCH_PROPERTIES_FILTERED,
    SET_SELECTED_GROUP,
} from './constants';
import {
    fetchProperties,
    fetchPropertiesSuccess,
    fetchPropertiesError,
    integrationLoginSuccess,
    integrationLoginError,
    integrationLoginNeedsVerification,
    integration2faSuccess,
    integration2faError,
    integration2faCodeSuccess,
    integration2faCodeError,
    fetchListings,
    fetchListingsSuccess,
    fetchListingsError,
    importListingsSuccess,
    importListingsError,
    updatePropertySuccess,
    updatePropertyError,
    createNewPropertySuccess,
    createNewPropertyError,
    addPhotoSuccess,
    addPhotoError,
    fetchCalendar,
    fetchCalendarSuccess,
    fetchCalendarError,
    checkCalendarUrlSuccess,
    checkCalendarUrlError,
    addCalendarSuccess,
    fetchRates,
    fetchRatesSuccess,
    fetchRatesError,
    newPropertyFinishSuccess,
    addPoiSuccess,
    addPoiError,
    fetchNearbyPoisSuccess,
    fetchNearbyPoisError,
    autocompletePoiSuccess,
    autocompletePoiError,
    removePoiSuccess,
    syncCalendarSuccess,
    syncCalendarError,
    addPropertiesGroupSuccess,
    addPropertiesGroupError,
    fetchPropertiesGroupsSuccess,
    fetchPropertiesGroupsError,
    fetchConnectionsSuccess,
    fetchConnectionsError,
    addConnectionSuccess,
    addConnectionError,
    removeConnectionSuccess,
    removeConnectionError,
    updateConnectionSuccess,
    updatePropertiesGroupSuccess,
    updatePropertiesGroupError,
    deletePropertiesGroupSuccess,
    deletePropertiesGroupError,
    fetchPropertySuccess,
    fetchPropertyError,
    fetchPropertiesFiltered,
    fetchPropertiesFilteredSuccess,
    fetchPropertiesFilteredError,
} from './actions';
import { makeSelectToken } from 'containers/App/selectors';
import { handleSessionState, addAlert } from 'containers/App/actions';
import {
    makeSelectUsername,
    makeSelectPassword,
    makeSelectMethod,
    makeSelectPin,
    makeSelectTool,
    makeSelectSelectedPhoneNumber,
    makeSelectIntegrationId,
    makeSelectPropertiesToImport,
    makeSelectNewProperty,
    makeSelectNewPropertyCurrentStep,
    selectPropertiesPagination,
    selectSelectedGroup,
} from './selectors';
import { API_BASE } from 'utils/const';

const properties = 'properties/';
const integrations = 'integrations/';
const pois = 'pois/categories/';
const poisAutocomplete = 'pois/autocomplete/';
const calendars = 'calendars/';
const groups = 'properties-groups/';
const connections = 'rental-connections/';
let axiosInstance;

export function* watcher() {
    axiosInstance = axios.create({
        baseURL: API_BASE
    });

    yield takeEvery(FETCH_PROPERTIES, getProperties);
    yield takeEvery(INTEGRATION_LOGIN, integrationLogin);
    yield takeEvery(UPDATE_PROPERTY, updateProperty);
    yield takeEvery(SUBMIT_PHONE_NUMBER, integration2fa);
    yield takeEvery(VERIFY_PIN, integration2faVerifyCode);
    yield takeEvery(FETCH_LISTINGS, integrationFetchListings);
    yield takeEvery(IMPORT_LISTINGS, integrationImportListings);
    yield takeEvery(NEW_PROPERTY_NEXT_STEP, createNewProperty);
    yield takeEvery(NEW_PROPERTY_NEXT_STEP, updateNewProperty);
    yield takeEvery(NEW_PROPERTY_FINISH, updateNewProperty);
    yield takeEvery(ADD_PHOTO, addPhoto);
    yield takeEvery(DELETE_PHOTO, deletePhoto);
    yield takeEvery(UPDATE_PHOTO, updatePhoto);
    yield takeEvery(ORDER_PROPERTY_PHOTOS, orderPhotos);
    yield takeEvery(FETCH_CALENDAR, fetchPropertyCalendar);
    yield takeEvery(CHECK_CALENDAR_URL, checkCalendarUrl);
    yield takeEvery(ADD_CALENDAR, addCalendar);
    yield takeEvery(DELETE_CALENDAR, deleteCalendar);
    yield takeEvery(UPDATE_CALENDAR, updateCalendar);
    yield takeEvery(FETCH_RATES, getRates);
    yield takeEvery(ADD_TAX, addTax);
    yield takeEvery(DELETE_TAX, deleteTax);
    yield takeEvery(UPDATE_TAX, updateTax);
    yield takeEvery(ADD_FEE, addFee);
    yield takeEvery(DELETE_FEE, deleteFee);
    yield takeEvery(UPDATE_FEE, updateFee);
    yield takeEvery(ADD_DISCOUNT, addDiscount);
    yield takeEvery(DELETE_DISCOUNT, deleteDiscount);
    yield takeEvery(UPDATE_DISCOUNT, updateDiscount);
    yield takeEvery(ADD_POI, addPoi);
    yield takeEvery(FETCH_NEARBY_POIS, getNearbyPois);
    yield takeEvery(AUTOCOMPLETE_POI, autocompletePoi);
    yield takeEvery(REMOVE_POI, removePoi);
    yield takeEvery(SYNC_CALENDAR, syncCalendar);
    yield takeEvery(ADD_RATE, addRate);
    yield takeEvery(UPDATE_POI, updatePoi);
    yield takeEvery(FETCH_PROPERTIES_GROUPS, getPropertiesGroup);
    yield takeEvery(ADD_PROPERTIES_GROUP, addPropertiesGroup);
    yield takeEvery(UPDATE_PROPERTIES_GROUP, updatePropertiesGroup);
    yield takeEvery(DELETE_PROPERTIES_GROUP, deletePropertiesGroup);
    yield takeEvery(FETCH_CONNECTIONS, getConnections);
    yield takeEvery(UPDATE_CONNECTION, updateConnection);
    yield takeEvery(ADD_CONNECTION, addConnection);
    yield takeEvery(REMOVE_CONNECTION, removeConnection);
    yield takeEvery(SYNC_CONNECTION, syncConnection);
    yield takeEvery(FETCH_PROPERTY, getProperty);
    yield takeEvery(FETCH_PROPERTIES_FILTERED, getPropertiesFiltered);
    yield takeEvery(SET_SELECTED_GROUP, getPropertiesFiltered);
}

export function* getProperties() {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: {
            page: (yield select(selectPropertiesPagination())).getCurrentPage(),
        }
    };

    try {
        const req = yield call(axiosInstance, properties, data);
        yield put(fetchPropertiesSuccess(req.data));
    } catch (err) {
        yield put(fetchPropertiesError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getPropertiesFiltered() {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: {
            page: (yield select(selectPropertiesPagination())).getCurrentPage(),
            group: (yield select(selectSelectedGroup())),
        }
    };

    try {
        const req = yield call(axiosInstance, properties, data);
        yield put(fetchPropertiesFilteredSuccess(req.data));
    } catch (err) {
        yield put(fetchPropertiesFilteredError(err.response));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getProperty(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
    };

    try {
        const req = yield call(axiosInstance, properties + action.data + '/', data);
        yield put(fetchPropertySuccess(req.data));
    } catch (err) {
        yield put(fetchPropertyError(err.response));
        yield put(push('/properties'));
        yield put(handleSessionState(err.response.status));
    }
}

export function* updateProperty(params) {
    const isRooms = params.data.section === 'rooms';
    if (isRooms) {
        const roomsData = {
            method: 'PUT',
            headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
            data: params.data.val
        };
        try {
            yield call(axiosInstance, properties + params.data.id + '/rooms/bulk/', roomsData);
        } catch (err) {
            yield put(handleSessionState(err.response.status));
        }

        return false;
    }

    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: {
            [params.data.section]: params.data.val
        }
    };
    try {
        const req = yield call(axiosInstance, properties + params.data.id + '/', data);
        yield put(updatePropertySuccess(req.data));
        if (data.data.group) { yield put(fetchPropertiesFiltered()); }
    } catch (err) {
        yield put(updatePropertyError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* integrationLogin() {
    const channel = yield select(makeSelectTool());
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: {
            username: (yield select(makeSelectUsername())),
            password: (yield select(makeSelectPassword())),
            secret: (yield select(makeSelectPassword()))
        }
    };

    try {
        const req = yield call(axiosInstance, integrations + channel + '/', data);
        if (req.status === 202) {
            yield put(integrationLoginNeedsVerification(req.data));
        } else {
            yield put(integrationLoginSuccess(req.data));
        }
    } catch (err) {
        yield put(integrationLoginError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* integration2fa() {
    const channel = yield select(makeSelectTool());
    let data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: {
            phone_id: (yield select(makeSelectSelectedPhoneNumber())),
            method: (yield select(makeSelectMethod()))
        }
    };

    if (data.data.method === 'email') {
        delete data.data.phone_id;
    }

    const id = yield select(makeSelectIntegrationId());

    try {
        const req = yield call(axiosInstance, integrations + channel + '/' + id + '/2fa/', data);
        yield put(integration2faSuccess(req.data));
    } catch (err) {
        yield put(integration2faError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* integration2faVerifyCode() {
    const channel = yield select(makeSelectTool());
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: {
            code: (yield select(makeSelectPin()))
        }
    };

    const id = yield select(makeSelectIntegrationId());

    try {
        const req = yield call(axiosInstance, integrations + channel + '/' + id + '/2fa/confirm/', data);
        yield put(integration2faCodeSuccess());
        yield put(fetchListings());
    } catch (err) {
        yield put(integration2faCodeError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* integrationFetchListings() {
    const channel = yield select(makeSelectTool());
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };
    const id = (yield select(makeSelectIntegrationId())) + '/';
    try {
        const req = yield call(axiosInstance, integrations + channel + '/' + id, data);
        yield put(fetchListingsSuccess(req.data.listings));
    } catch (err) {
        yield put(fetchListingsError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* integrationImportListings() {
    const channel = yield select(makeSelectTool());
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: {
            listings: (yield select(makeSelectPropertiesToImport())).toArray()
        }
    };
    const id = (yield select(makeSelectIntegrationId()));
    try {
        const req = yield call(axiosInstance, integrations + channel + '/' + id + '/import/', data);
        yield put(importListingsSuccess());
        yield put(fetchProperties());
    } catch (err) {
        yield put(importListingsError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* createNewProperty() {
    if ((yield select(makeSelectNewProperty())).get('id')) {
        return;
    }
    const data = {
        method: 'POST',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + (yield select(makeSelectToken())),
        },
        data: yield select(makeSelectNewProperty())
    };

    try {
        const req = yield call(axiosInstance, properties, data);
        yield put(createNewPropertySuccess(req.data));
    } catch (err) {
        yield put(createNewPropertyError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* updateNewProperty(action) {
    const id = (yield select(makeSelectNewProperty())).get('id');
    const roomStep = (yield select(makeSelectNewPropertyCurrentStep())) === 3;
    const finish = action.type === NEW_PROPERTY_FINISH;
    if (!id) {
        return;
    }
    let property = yield select(makeSelectNewProperty());

    if (finish) {
        property = property.set('status', 'Active');
    }
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: property
    };

    try {
        const req = yield call(axiosInstance, properties + id + '/', data);
        if (finish) {
            yield put(newPropertyFinishSuccess());
            yield put(fetchProperties());
        }
        //yield put(createNewPropertySuccess(req.data));
    } catch (err) {
        //yield put(createNewPropertyError(err));
        yield put(handleSessionState(err.response.status));
    }

    if (roomStep && data.data.get('rooms').size) {
        const roomsData = {
            method: 'PUT',
            json: true,
            headers: data.headers,
            data: data.data.get('rooms')
        };
        try {
            const req = yield call(axiosInstance, properties + id + '/rooms/bulk/', roomsData);
            //yield put(createNewPropertySuccess(req.data));
        } catch (err) {
            //yield put(createNewPropertyError(err));
            yield put(handleSessionState(err.response.status));
        }
    }
}

export function* addPhoto(action) {
    const fileData = new FormData();
    fileData.append('url', action.data.file, action.data.file.name);
    fileData.append('order', action.data.order);
    const data = {
        method: 'POST',
        json: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'JWT ' + (yield select(makeSelectToken())),
        },
        data: fileData
    };

    try {
        const req = yield call(axiosInstance, properties + action.data.id + '/images/', data);
        yield put(addPhotoSuccess(req.data));
    } catch (err) {
        yield put(addPhotoError(err.response.data.url));
        yield put(handleSessionState(err.response.status));
    }
}

export function* deletePhoto(action) {
    const data = {
        method: 'DELETE',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + (yield select(makeSelectToken())),
        }
    };

    try {
        const req = yield call(axiosInstance, properties + action.data.id + '/images/' + action.data.imageId + '/', data);
        //yield put(createNewPropertySuccess(req.data));
    } catch (err) {
        //yield put(createNewPropertyError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* orderPhotos(action) {
    const data = {
        method: 'POST',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + (yield select(makeSelectToken())),
        },
        data: {
            order: action.data.order
        }
    };

    try {
        const req = yield call(axiosInstance, properties + action.data.id + '/images/order/', data);
        //yield put(createNewPropertySuccess(req.data));
    } catch (err) {
        //yield put(createNewPropertyError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* updatePhoto(action) {
    const formData = new FormData();
    formData.append('caption', action.data.caption);
    const data = {
        method: 'PATCH',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + (yield select(makeSelectToken())),
        },
        data: formData
    };

    try {
        const req = yield call(axiosInstance, properties + action.data.id + '/images/' + action.data.imageId + '/', data);
        //yield put(createNewPropertySuccess(req.data));
    } catch (err) {
        //yield put(createNewPropertyError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* fetchPropertyCalendar(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: {
            prop: action.data.id
        }
    };

    try {
        const req = yield call(axiosInstance, 'calendars/', data);
        yield put(fetchCalendarSuccess({ data: req.data, create: action.data.create } ));
    } catch (err) {
        yield put(fetchCalendarError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* checkCalendarUrl(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: {
            url: action.data
        }
    };

    try {
        const req = yield call(axiosInstance, 'calendars/check_url/', data);
        yield put(checkCalendarUrlSuccess(req.data));
    } catch (err) {
        yield put(checkCalendarUrlError(err.response.data.url));
        yield put(handleSessionState(err.response.status));
    }
}

export function* addCalendar(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, 'calendars/' + action.data.id + '/external/', data);
        yield put(fetchCalendar({ id: action.data.propertyId, create: action.data.create }));
        yield put(addCalendarSuccess(req.data));
    } catch (err) {
        yield put(addAlert({ message: 'Couldn\'t add Calendar...', type: 'error' }));
        yield put(handleSessionState(err.response.status));
    }
}

export function* deleteCalendar(action) {
    const data = {
        method: 'DELETE',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };

    try {
        const req = yield call(axiosInstance, 'calendars/' + action.data.id + '/external/' + action.data.calId + '/', data);
        yield put(fetchCalendar({ id: action.data.propertyId, create: action.data.create }));
        //yield put(checkCalendarUrlSuccess(req.data));
    } catch (err) {
        //yield put(checkCalendarUrlError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* syncCalendar(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };

    try {
        const req = yield call(axiosInstance, calendars + action.data.id + '/external/' + action.data.calId + '/fetch/', data);
        yield put(syncCalendarSuccess({ propId: action.data.propId, data: req.data }));
    } catch (err) {
        yield put(syncCalendarError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* updateCalendar(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: {
            name: action.data.name,
            url: action.data.url,
            description: action.data.description,
            enabled: action.data.enabled,
            color: action.data.color
        }
    };

    try {
        const req = yield call(axiosInstance, 'calendars/' + action.data.id + '/external/' + action.data.calId + '/', data);
        yield put(fetchCalendar({ id: action.data.propertyId, create: action.data.create }));
        //yield put(checkCalendarUrlSuccess(req.data));
    } catch (err) {
        //yield put(checkCalendarUrlError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getRates(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        params: {
            prop: action.data
        }
    };

    try {
        const req = yield call(axiosInstance, 'charges/', data);
        yield put(fetchRatesSuccess(req.data));
    } catch (err) {
        yield put(fetchRatesError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* addRate(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, '/charges/rates/', data);
        //yield put(fetchRatesSuccess(req.data));
    } catch (err) {
        //yield put(fetchRatesError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* addTax(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, 'charges/taxes/', data);
        yield put(fetchRates(action.data.prop));
    } catch (err) {
        yield put(fetchCalendarError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* deleteTax(action) {
    const data = {
        method: 'DELETE',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };

    try {
        const req = yield call(axiosInstance, 'charges/taxes/' + action.data.id + '/', data);
        yield put(fetchRates(action.data.prop));
    } catch (err) {
        yield put(fetchCalendarError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* updateTax(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, 'charges/taxes/' + action.data.id + '/', data);
        yield put(fetchRates(action.data.prop));
    } catch (err) {
        yield put(fetchCalendarError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* addFee(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, 'charges/fees/', data);
        yield put(fetchRates(action.data.prop));
    } catch (err) {
        yield put(fetchCalendarError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* deleteFee(action) {
    const data = {
        method: 'DELETE',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };

    try {
        const req = yield call(axiosInstance, 'charges/fees/' + action.data.id + '/', data);
        yield put(fetchRates(action.data.prop));
    } catch (err) {
        yield put(fetchCalendarError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* updateFee(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, 'charges/fees/' + action.data.id + '/', data);
        yield put(fetchRates(action.data.prop));
    } catch (err) {
        yield put(fetchCalendarError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* addDiscount(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, 'charges/discounts/', data);
        yield put(fetchRates(action.data.prop));
    } catch (err) {
        yield put(fetchCalendarError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* deleteDiscount(action) {
    const data = {
        method: 'DELETE',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };

    try {
        const req = yield call(axiosInstance, 'charges/discounts/' + action.data.id + '/', data);
        yield put(fetchRates(action.data.prop));
    } catch (err) {
        yield put(fetchCalendarError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* updateDiscount(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, 'charges/discounts/' + action.data.id + '/', data);
        yield put(fetchRates(action.data.prop));
    } catch (err) {
        yield put(fetchCalendarError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* addPoi(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, properties + (action.data.id || action.data[0].id) + '/pois/', data);
        yield put(addPoiSuccess({ poi: req.data, id: action.data.id || action.data[0].id }));
    } catch (err) {
        yield put(addPoiError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getNearbyPois(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, pois, data);
        yield put(fetchNearbyPoisSuccess({ pois: req.data.pois, id: action.data.id }));
        if (!values(req.data.pois).filter(p => p.length).length) {
            yield put(addAlert({ message: 'No suggested POIs nearby' }));
        }
    } catch (err) {
        yield put(fetchNearbyPoisError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* autocompletePoi(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, poisAutocomplete, data);
        yield put(autocompletePoiSuccess(req.data.pois));
    } catch (err) {
        yield put(autocompletePoiError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* removePoi(action) {
    const data = {
        method: 'DELETE',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };

    try {
        yield call(axiosInstance, properties + action.data.id + '/pois/' + (action.data.poi ? action.data.poi : 'bulk') + '/' , data);
        yield put(removePoiSuccess());
    } catch (err) {
        yield put(handleSessionState(err.response.status));
    }
}

export function* updatePoi(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, properties + action.data.prop + '/pois/' + action.data.id + '/', data);
        //yield put(removePoiSuccess());
    } catch (err) {
        yield put(handleSessionState(err.response.status));
    }
}

export function* getPropertiesGroup(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };

    try {
        const req = yield call(axiosInstance, groups, data);
        yield put(fetchPropertiesGroupsSuccess(req.data));
    } catch (err) {
        yield put(fetchPropertiesGroupsError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* addPropertiesGroup(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, groups, data);
        yield put(addPropertiesGroupSuccess(req.data));
    } catch (err) {
        yield put(addPropertiesGroupError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* updatePropertiesGroup(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, groups + action.data.id + '/', data);
        yield put(updatePropertiesGroupSuccess(req.data));
    } catch (err) {
        yield put(updatePropertiesGroupError(err));
        yield put(handleSessionState(err.response.status));
    }
}


export function* deletePropertiesGroup(action) {
    const data = {
        method: 'DELETE',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
    };

    try {
        const req = yield call(axiosInstance, groups + action.data + '/', data);
        yield put(deletePropertiesGroupSuccess(action.data));
    } catch (err) {
        yield put(deletePropertiesGroupError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* getConnections(action) {
    const data = {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };

    try {
        const req = yield call(axiosInstance, connections, data);
        yield put(fetchConnectionsSuccess(req.data));
    } catch (err) {
        yield put(fetchConnectionsError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* updateConnection(action) {
    const data = {
        method: 'PATCH',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, connections + action.data.id + '/', data);
        yield put(addAlert({ message: 'Connection has been updated' }));
        yield put(updateConnectionSuccess(req.data));
    } catch (err) {
        //yield put(fetchConnectionsError(err));
        yield put(addAlert({ message: 'There was an error...' }));
        yield put(handleSessionState(err.response.status));
    }
}

export function* addConnection(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) },
        data: action.data
    };

    try {
        const req = yield call(axiosInstance, connections, data);
        yield put(addConnectionSuccess(req.data));
    } catch (err) {
        yield put(addConnectionError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* removeConnection(action) {
    const data = {
        method: 'DELETE',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };

    try {
        yield call(axiosInstance, connections + action.data + '/', data);
        yield put(removeConnectionSuccess(action.data));
        yield put(push('/properties/connections'));
    } catch (err) {
        yield put(removeConnectionError(err));
        yield put(handleSessionState(err.response.status));
    }
}

export function* syncConnection(action) {
    const data = {
        method: 'POST',
        headers: { 'Authorization': 'JWT ' + (yield select(makeSelectToken())) }
    };

    try {
        yield call(axiosInstance, connections + action.data + '/sync/', data);
        yield put(addAlert({ message: 'Connection was added to Sync Queue' }));
    } catch (err) {
        yield put(addAlert({ message: 'Could not sync Connection', type: 'error' }));
        yield put(handleSessionState(err.response.status));
    }
}

// Bootstrap sagas
export default [
    watcher
];
