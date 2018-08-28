import { fromJS } from 'immutable';
import IntegrationModel from 'models/Integration';
import {
    FETCH_CHANNELS,
    FETCH_CHANNELS_SUCCESS,
    FETCH_CHANNELS_ERROR,
    FETCH_MARKETPLACE,
    FETCH_MARKETPLACE_SUCCESS,
    FETCH_MARKETPLACE_ERROR,
    FETCH_INSTALL_LINK,
    FETCH_INSTALL_LINK_SUCCESS,
    FETCH_INSTALL_LINK_ERROR,
    CHANGE_INTEGRATIONS_DISPLAY,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR
} from './constants';
import { LOGOUT_SUCCESS } from 'containers/App/constants';

// The initial state of the App
const initialState = fromJS({
    channels: [],
    loading: true,
    integrations: {},
    integrationsDisplay: 'All',
    fetchingInstallUrl: false,
    resettingPassword: 'success',
    changingPassword: 'success'
});

function templatesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CHANNELS:
        case FETCH_MARKETPLACE:
            return state
                .set('loading', true);
        case FETCH_CHANNELS_SUCCESS:
            return state
                .set('channels', fromJS(action.data))
                .set('loading', false);
        case FETCH_CHANNELS_ERROR:
        case FETCH_MARKETPLACE_ERROR:
            return state
                .set('loading', false);
        case CHANGE_INTEGRATIONS_DISPLAY:
            return state
                .set('integrationsDisplay', action.data);
        case FETCH_MARKETPLACE_SUCCESS:
            return state
                .set('integrations', fromJS(action.data).map(i => new IntegrationModel(i)))
                .set('loading', false);
        case FETCH_INSTALL_LINK:
            return state
                .set('fetchingInstallUrl', true);
        case FETCH_INSTALL_LINK_SUCCESS:
            const integrationIndex = state.get('integrations').findIndex(i => i.getId() === action.data.id);
            return state
                .setIn(['integrations', integrationIndex], state.getIn(['integrations', integrationIndex]).setInstallUrl(action.data.url))
                .set('fetchingInstallUrl', false);
        case RESET_PASSWORD_SUCCESS:
            return state
                .set('resettingPassword', 'success');
        case RESET_PASSWORD_ERROR:
            return state
                .set('resettingPassword', 'error');
        case RESET_PASSWORD:
            return state
                .set('resettingPassword', 'sending');
        case CHANGE_PASSWORD_SUCCESS:
            return state
                .set('changingPassword', 'success');
        case CHANGE_PASSWORD_ERROR:
            return state
                .set('changingPassword', action.data.data);
        case CHANGE_PASSWORD:
            return state
                .set('changingPassword', 'sending');
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

export default templatesReducer;
