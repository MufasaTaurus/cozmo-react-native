import { fromJS } from 'immutable';
import { LOCAL_STORAGE_NEW_PROPERTY_KEY } from 'utils/const';
import mapKeys from 'lodash/mapKeys';
import isArray from 'lodash/isArray';
import PropertiesGroupModel from 'models/PropertiesGroup';
import RentalConnectionModel from 'models/RentalConnection';
import PaginationModel from 'models/Pagination';
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
    FETCH_LISTINGS_SUCCESS,
    FETCH_LISTINGS_ERROR,
    CHANGE_DISPLAY,
    SELECT_PHONE_NUMBER,
    SUBMIT_PHONE_NUMBER,
    VERIFY_PIN,
    IMPORT_LISTINGS,
    IMPORT_LISTINGS_SUCCESS,
    IMPORT_LISTINGS_ERROR,
    UPDATE_NEW_PROPERTY,
    NEW_PROPERTY_NEXT_STEP,
    NEW_PROPERTY_PREV_STEP,
    NEW_PROPERTY_SET_STEP,
    UPDATE_PROPERTY_SUCCESS,
    NEW_PROPERTY_FINISH,
    NEW_PROPERTY_FINISH_SUCCESS,
    CREATE_NEW_PROPERTY_SUCCESS,
    CREATE_NEW_PROPERTY_ERROR,
    SELECT_DRAFT,
    ADD_PHOTO,
    ADD_PHOTO_SUCCESS,
    ADD_PHOTO_ERROR,
    UPDATE_PROPERTY_PHOTOS,
    FETCH_CALENDAR,
    FETCH_CALENDAR_SUCCESS,
    FETCH_CALENDAR_ERROR,
    CHECK_CALENDAR_URL,
    CHECK_CALENDAR_URL_SUCCESS,
    CHECK_CALENDAR_URL_ERROR,
    RESET_CALENDAR_URL_ERROR,
    RESET_CALENDAR_EVENTS,
    ADD_CALENDAR_SUCCESS,
    FETCH_RATES,
    FETCH_RATES_SUCCESS,
    FINISH_IMPORT_WHEN_NO_LISTINGS,
    ADD_POI,
    ADD_POI_SUCCESS,
    FETCH_NEARBY_POIS,
    FETCH_NEARBY_POIS_SUCCESS,
    AUTOCOMPLETE_POI_SUCCESS,
    REMOVE_POI,
    REMOVE_POI_SUCCESS,
    ADD_YELP_POI,
    REMOVE_YELP_POIS,
    SYNC_CALENDAR,
    SYNC_CALENDAR_SUCCESS,
    SYNC_CALENDAR_ERROR,
    FETCH_PROPERTIES_GROUPS,
    FETCH_PROPERTIES_GROUPS_SUCCESS,
    FETCH_PROPERTIES_GROUPS_ERROR,
    ADD_PROPERTIES_GROUP_SUCCESS,
    UPDATE_PROPERTIES_GROUP_SUCCESS,
    DELETE_PROPERTIES_GROUP_SUCCESS,
    FETCH_CONNECTIONS,
    FETCH_CONNECTIONS_ERROR,
    FETCH_CONNECTIONS_SUCCESS,
    ADD_CONNECTION,
    ADD_CONNECTION_SUCCESS,
    ADD_CONNECTION_ERROR,
    REMOVE_CONNECTION_SUCCESS,
    UPDATE_CONNECTION_SUCCESS,
    FETCH_PROPERTY,
    FETCH_PROPERTY_SUCCESS,
    FETCH_PROPERTY_ERROR,
    FETCH_RATES_ERROR,
    SET_SELECTED_GROUP,
    FETCH_PROPERTIES_FILTERED,
    FETCH_PROPERTIES_FILTERED_SUCCESS,
    FETCH_PROPERTIES_FILTERED_ERROR,
} from './constants';
import { LOGOUT_SUCCESS } from 'containers/App/constants';

const newProperty = fromJS({
    name: '',
    status: 'Draft',
    basic_amenities: {},
    images: [],
    calendar: {
        external_cals : []
    },
    property_type: 'Apartment',
    rental_type: 'Private',
    arrival_instruction: {},
    rooms: [],
    rates: [],
    pois: [],
    additional_fees: [],
    id: getNewPropertyProgress().id
});

// The initial state of the App
const initialState = fromJS({
    properties: [],
    propertiesFiltered: [],
    propertiesPagination: new PaginationModel({}),
    selectedGroup: null,
    fetchPropertiesLoading: true,
    display: 'active',
    selectedProperty: '',
    propertiesGroups: [],
    loadingGroups: true,
    connections: [],
    loadingConnections: true,
    connectionPropertiesCount: {},
    addingConnection: '',
    import: false,
    currentStep: 0,
    selectedTool: '',
    searchQuery: '',
    username: '',
    password: '',
    method: 'text',
    pin: '',
    phones: [],
    integrationId: '',
    selectedPhoneNumber: '',
    propertiesToImport: [],
    listings: [],
    loading: false,
    loginError: '',
    newProperty: newProperty,
    loadingNewPropertyWizard: false,
    createNewCurrentStep: getNewPropertyProgress().step,
    createNewMaxStep: getNewPropertyProgress().step,
    uploadingImage: false,
    uploadedImage: {},
    calendarURLError: 'checking',
    calendarChecking: false,
    calendarEvents: [],
    autocomplete: [],
    syncingCalendar: ''
});

function saveNewPropertyProgress(id, step) {
    if (step === 0) {
        localStorage.removeItem(LOCAL_STORAGE_NEW_PROPERTY_KEY);
    } else {
        localStorage.setItem(LOCAL_STORAGE_NEW_PROPERTY_KEY, JSON.stringify({ id: id, step: step }));
    }
}

function getNewPropertyProgress() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NEW_PROPERTY_KEY)) || { id: 0, step: 0 };
}

function propertiesReducer(state = initialState, action) {
    switch (action.type) {
        case START_IMPORT:
            return state
                .set('import', true);
        case STOP_IMPORT:
            return state
                .set('import', false);
        case NEXT_STEP:
            return state
                .set('currentStep', state.get('currentStep') + 1);
        case PREV_STEP:
            return state
                .set('currentStep', state.get('currentStep') - 1);
        case SELECT_TOOL:
            return state
                .set('selectedTool', action.data)
                .set('currentStep', state.get('currentStep') + 1);
        case CHANGE_SEARCH_QUERY:
            return state
                .set('searchQuery', action.data);
        case CHANGE_USERNAME:
            return state
                .set('username', action.data);
        case CHANGE_PASSWORD:
            return state
                .set('password', action.data);
        case SET_METHOD:
            return state
                .set('method', action.data);
        case SET_PIN:
            return state
                .set('pin', action.data);
        case SET_PROPERTIES_TO_IMPORT:
            return state
                .set('propertiesToImport', action.data);
        case FETCH_PROPERTIES:
        case FETCH_PROPERTIES_FILTERED:
        case FETCH_PROPERTY:
            return state
                .set('fetchPropertiesLoading', true);
        case FETCH_PROPERTIES_SUCCESS:
            return state
                .set('fetchPropertiesLoading', false)
                .set('properties', fromJS(action.data.results))
                .set('propertiesPagination', state.get('propertiesPagination').setCount(action.data.count));
        case FETCH_PROPERTY_SUCCESS:
            return state
                .set('selectedProperty', fromJS(action.data))
                .set('newProperty', fromJS(action.data))
                .set('fetchPropertiesLoading', false);
        case FETCH_PROPERTIES_ERROR:
        case FETCH_PROPERTIES_FILTERED_ERROR:
        case FETCH_PROPERTY_ERROR:
            return state
                .set('fetchPropertiesLoading', false);
        case SELECT_PROPERTY:
            return state
                .set('selectedProperty', action.data);
        case INTEGRATION_LOGIN_SUCCESS:
            return state
                .set('loading', false)
                .set('loginError', '')
                .set('listings', fromJS(action.data.listings))
                .set('integrationId', action.data.id)
                .set('currentStep', 5);
        case INTEGRATION_LOGIN_ERROR:
            return state
                .set('loginError', fromJS(action.data))
                .set('loading', false);
        case INTEGRATION_LOGIN:
        case SUBMIT_PHONE_NUMBER:
        case VERIFY_PIN:
        case IMPORT_LISTINGS:
        case FETCH_CALENDAR:
        case FETCH_RATES:
        case ADD_POI:
        case FETCH_NEARBY_POIS:
            return state
                .set('loading', true);
        case INTEGRATION_LOGIN_NEEDS_VERIFICATION:
            let increment = 1;
            state.get('selectedTool') === 'homeaway' ? increment++ : '';
            return state
                .set('loading', false)
                .set('phones', fromJS(action.data.phones))
                .set('integrationId', action.data.id)
                .set('currentStep', state.get('currentStep') + increment);
        case INTEGRATION_2FA_SUCCESS:
            return state
                .set('currentStep', 4)
                .set('loading', false);
        case INTEGRATION_2FA_ERROR:
        case IMPORT_LISTINGS_ERROR:
        case FETCH_LISTINGS_ERROR:
        case INTEGRATION_2FA_CODE_ERROR:
        case INTEGRATION_2FA_CODE_SUCCESS:
        case FETCH_CALENDAR_ERROR:
        case FETCH_RATES_ERROR:
        case REMOVE_POI_SUCCESS:
            return state
                .set('loading', false);
        case CHANGE_DISPLAY:
            return state
                .set('display', action.data);
        case SELECT_PHONE_NUMBER:
            return state
                .set('selectedPhoneNumber', action.data);
        case FETCH_LISTINGS_SUCCESS:
            return state
                .set('listings', fromJS(action.data))
                .set('currentStep', 5);
        case IMPORT_LISTINGS_SUCCESS:
            return state
                .set('loading', false)
                .set('import', false)
                .set('currentStep', 0);
        case UPDATE_NEW_PROPERTY:
            return state
                .set('newProperty', action.data);
        case NEW_PROPERTY_SET_STEP:
            return state
                .set('createNewCurrentStep', action.data);
        case NEW_PROPERTY_NEXT_STEP:
            const nextStep = state.get('createNewCurrentStep') + 1;
            saveNewPropertyProgress(state.getIn(['newProperty', 'id']), nextStep);
            return state
                .set('createNewCurrentStep', nextStep)
                .set('createNewMaxStep', nextStep);
        case NEW_PROPERTY_PREV_STEP:
            return state
                .set('createNewCurrentStep', state.get('createNewCurrentStep') - 1);
        case UPDATE_PROPERTY_SUCCESS:
            saveNewPropertyProgress(action.data.id, state.get('createNewCurrentStep'));
            return state
                .set('selectedProperty', fromJS(action.data))
                .set('properties',
                    state.get('properties')
                        .update(state.get('properties')
                            .findKey((prop) => prop.get('id') === action.data.id), () => fromJS(action.data)));
        case NEW_PROPERTY_FINISH:
            saveNewPropertyProgress(state.getIn(['newProperty', 'id']), 0);
            return state
                .set('createNewCurrentStep', 0)
                .set('createNewMaxStep', 0)
                .set('display', 'active')
                .set('loadingNewPropertyWizard', true);
        case NEW_PROPERTY_FINISH_SUCCESS:
            return state
                .set('newProperty', newProperty)
                .setIn(['newProperty', 'id'], 0);
        case CREATE_NEW_PROPERTY_SUCCESS:
            saveNewPropertyProgress(action.data.id, state.get('createNewCurrentStep'));
            return state
                .set('newProperty', state.get('newProperty').set('id', action.data.id).setIn(['calendar', 'id'], action.data.calendar.id))
                .set('loadingNewPropertyWizard', false);
        case CREATE_NEW_PROPERTY_ERROR:
            return state
                .set('loadingNewPropertyWizard', false);
        case SELECT_DRAFT:
            return state
                .set('newProperty', state.get('newProperty').merge(action.data).filter((p) => p !== null));
        case ADD_PHOTO:
            return state
                .set('uploadingImage', true);
        case ADD_PHOTO_SUCCESS:
            return state
                .set('uploadingImage', false)
                .set('uploadedImage', fromJS(action.data));
        case ADD_PHOTO_ERROR:
            return state
                .set('uploadingImage', false);
        case UPDATE_PROPERTY_PHOTOS:
            return state
                .setIn(['selectedProperty', 'images'], action.data);
        case FETCH_CALENDAR_SUCCESS:
            const place = action.data.create ? 'newProperty' : 'selectedProperty';
            return state
                .set('loading', false)
                .setIn([place, 'calendar'], fromJS(action.data.data[0]));
        case CHECK_CALENDAR_URL:
            return state
                .set('calendarChecking', true);
        case CHECK_CALENDAR_URL_SUCCESS:
            return state
                .set('calendarURLError', 'ok')
                .set('calendarEvents', fromJS(action.data.events))
                .set('calendarChecking', false);
        case CHECK_CALENDAR_URL_ERROR:
            return state
                .set('calendarURLError', '[error]' + action.data)
                .set('calendarChecking', false);
        case RESET_CALENDAR_URL_ERROR:
            return state
                .set('calendarURLError', 'checking');
        case RESET_CALENDAR_EVENTS:
            return state
                .set('calendarEvents', fromJS([]));
        case ADD_CALENDAR_SUCCESS:
            return state
                .set('calendarURLError', 'check')
                .set('calendarEvents', fromJS([]));
        case SYNC_CALENDAR:
            return state
                .set('syncingCalendar', 'checking');
        case SYNC_CALENDAR_SUCCESS:
            //const q = state.get('properties').findIndex(p => p.get('id') === action.data.propId);
            //const cal = state.getIn(['properties', q, 'calendar', 'external_cals']).findIndex(p => p.get('id') === action.data.data.id);
            const cal2 = state.getIn(['selectedProperty', 'calendar', 'external_cals']).findIndex(p => p.get('id') === action.data.data.id);
            return state
                //.setIn(['properties', q, 'calendar', 'external_cals', cal], fromJS(action.data.data))
                .setIn(['selectedProperty', 'calendar', 'external_cals', cal2], fromJS(action.data.data))
                .set('syncingCalendar', 'ok');
        case SYNC_CALENDAR_ERROR:
            return state
                .set('syncingCalendar', 'error');
        case FETCH_RATES_SUCCESS:
            return state
                .set('loading', false)
                .setIn(['selectedProperty', 'fees'], fromJS(action.data[0].fees))
                .setIn(['selectedProperty', 'additional_fees'], fromJS(action.data[0].fees))
                .setIn(['selectedProperty', 'rates'], fromJS(action.data[0].rates))
                .setIn(['selectedProperty', 'taxes'], fromJS(action.data[0].taxes))
                .setIn(['selectedProperty', 'discounts'], fromJS(action.data[0].discounts))
                .setIn(['newProperty', 'additional_fees'], fromJS(action.data[0].fees))
                .setIn(['newProperty', 'discounts'], fromJS(action.data[0].discounts));
        case FINISH_IMPORT_WHEN_NO_LISTINGS:
            return state
                .set('import', false)
                .set('currentStep', 0);
        case ADD_POI_SUCCESS:
            //const i = state.get('properties').findIndex(p => p.get('id') === action.data.id);
            const setPoi = (item) => {
                return isArray(action.data.poi) ?
                    item.concat(action.data.poi.map(p => fromJS(p))) :
                    item.push(fromJS(action.data.poi));
            };
            return state
                //.setIn(['properties', i, 'pois'], setPoi(state.getIn(['properties', i, 'pois'])))
                .setIn(['selectedProperty', 'pois'], setPoi(state.getIn(['selectedProperty', 'pois'])))
                .setIn(['newProperty', 'pois'], setPoi(state.getIn(['newProperty', 'pois'])))
                .set('loading', false);
        case FETCH_NEARBY_POIS_SUCCESS:
            //const j = state.get('properties').findIndex(p => p.get('id') === action.data.id);
            const pois = [];
            mapKeys(action.data.pois, (val, key) => { val.map(v => { v.category = key; pois.push(v); }); });
            return state
                //.setIn(['properties', j, 'yelpPois'], fromJS(pois))
                .setIn(['selectedProperty', 'yelpPois'], fromJS(pois))
                .setIn(['newProperty', 'yelpPois'], fromJS(pois))
                .set('loading', false);
        case AUTOCOMPLETE_POI_SUCCESS:
            return state
                .set('autocomplete', fromJS(action.data));
        case REMOVE_POI:
            //const k = state.get('properties').findIndex(p => p.get('id') === action.data.id);
            if (action.data.poi) {
                return state
                    .setIn(['selectedProperty', 'pois'], state.getIn(['selectedProperty', 'pois']).filter(p => p.get('id') !== action.data.poi))
                    //.setIn(['properties', k, 'pois'], state.getIn(['properties', k, 'pois']).filter(p => p.get('id') !== action.data.poi))
                    .setIn(['newProperty', 'pois'], state.getIn(['newProperty', 'pois']).filter(p => p.get('id') !== action.data.poi))
                    .set('loading', true);
            } else {
                return state
                    .setIn(['selectedProperty', 'pois'], fromJS([]))
                    //.setIn(['properties', k, 'pois'], fromJS([]))
                    .setIn(['newProperty', 'pois'], fromJS([]))
                    .set('loading', true);
            }
        case ADD_YELP_POI:
            //const l = state.get('properties').findIndex(p => p.get('id') === action.data.id);
            return state
                .setIn(['selectedProperty', 'yelpPois'], action.data.pois)
                //.setIn(['properties', l, 'yelpPois'], action.data.pois)
                .setIn(['newProperty', 'yelpPois'], action.data.pois);
        case REMOVE_YELP_POIS:
            //const m = state.get('properties').findIndex(p => p.get('id') === action.data.id);
            return state
                .setIn(['selectedProperty', 'yelpPois'], fromJS([]))
                .setIn(['newProperty', 'yelpPois'], fromJS([]));
                //.setIn(['properties', m, 'yelpPois'], fromJS([]));
        case FETCH_PROPERTIES_GROUPS:
            return state
                .set('loadingGroups', true);
        case FETCH_PROPERTIES_GROUPS_SUCCESS:
            return state
                .set('propertiesGroups', fromJS(action.data.map(g => new PropertiesGroupModel(g))))
                .set('loadingGroups', false);
        case FETCH_PROPERTIES_GROUPS_ERROR:
            return state
                .set('loadingGroups', false);
        case ADD_PROPERTIES_GROUP_SUCCESS:
            return state
                .set('propertiesGroups', state.get('propertiesGroups').push(new PropertiesGroupModel(action.data)));
        case UPDATE_PROPERTIES_GROUP_SUCCESS:
            return state
                .set('propertiesGroups', state.get('propertiesGroups')
                    .update(state.get('propertiesGroups')
                        .findKey(c => c.getId() === action.data.id), () => new PropertiesGroupModel(action.data)));
        case DELETE_PROPERTIES_GROUP_SUCCESS:
            return state
                .set('propertiesGroups', state.get('propertiesGroups').filter(g => g.getId() !== action.data));
        case FETCH_CONNECTIONS:
            return state
                .set('loadingConnections', true);
        case FETCH_CONNECTIONS_ERROR:
            return state
                .set('loadingConnections', false);
        case FETCH_CONNECTIONS_SUCCESS:
            return state
                .set('connections', fromJS(action.data.map(c => new RentalConnectionModel(c))))
                .set('loadingConnections', false);
        case ADD_CONNECTION:
            return state
                .set('addingConnection', 'adding')
                .set('connectionPropertiesCount', '');
        case ADD_CONNECTION_SUCCESS:
            return state
                .set('connections', state.get('connections').push(new RentalConnectionModel(action.data)))
                .set('connectionPropertiesCount', { properties: action.data.properties, id: action.data.id })
                .set('addingConnection', '');
        case ADD_CONNECTION_ERROR:
            return state
                .set('addingConnection', action.data);
        case REMOVE_CONNECTION_SUCCESS:
            return state
                .set('connections', state.get('connections').filter(c => c.getId() + '' !== action.data));
        case UPDATE_CONNECTION_SUCCESS:
            return state
                .set('connections', state.get('connections')
                    .update(state.get('connections')
                        .findKey(c => c.getId() === action.data.id), () => new RentalConnectionModel(action.data)));
        case LOGOUT_SUCCESS:
            return initialState
                .set('propertiesPagination', new PaginationModel({}));
        case SET_SELECTED_GROUP:
            return state
                .set('propertiesPagination', state.get('propertiesPagination').setPage(1))
                .set('fetchPropertiesLoading', true)
                .set('selectedGroup', action.data.group);
        case FETCH_PROPERTIES_FILTERED_SUCCESS:
            return state
                .set('fetchPropertiesLoading', false)
                .set('propertiesFiltered', fromJS(action.data.results))
                .set('propertiesPagination', state.get('propertiesPagination').setCount(action.data.count));
        default:
            return state;
    }
}

export default propertiesReducer;
