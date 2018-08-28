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
    TOGGLE_CHANNEL,
    CHANGE_INTEGRATIONS_DISPLAY,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR
} from './constants';

export function fetchChannels(data) {
    return {
        type: FETCH_CHANNELS,
        data
    };
}

export function fetchChannelsSuccess(data) {
    return {
        type: FETCH_CHANNELS_SUCCESS,
        data
    };
}

export function fetchChannelsError(data) {
    return {
        type: FETCH_CHANNELS_ERROR,
        data
    };
}

export function fetchMarketplace(data) {
    return {
        type: FETCH_MARKETPLACE,
        data
    };
}

export function fetchMarketplaceSuccess(data) {
    return {
        type: FETCH_MARKETPLACE_SUCCESS,
        data
    };
}

export function fetchMarketplaceError(data) {
    return {
        type: FETCH_MARKETPLACE_ERROR,
        data
    };
}

export function fetchInstallLink(data) {
    return {
        type: FETCH_INSTALL_LINK,
        data
    };
}

export function fetchInstallLinkSuccess(data) {
    return {
        type: FETCH_INSTALL_LINK_SUCCESS,
        data
    };
}

export function fetchInstallLinkError(data) {
    return {
        type: FETCH_INSTALL_LINK_ERROR,
        data
    };
}

export function toggleChannel(data) {
    return {
        type: TOGGLE_CHANNEL,
        data
    };
}

export function changeIntegrationsDisplay(data) {
    return {
        type: CHANGE_INTEGRATIONS_DISPLAY,
        data
    };
}

export function resetPassword(data) {
    return {
        type: RESET_PASSWORD,
        data
    };
}

export function resetPasswordSuccess(data) {
    return {
        type: RESET_PASSWORD_SUCCESS,
        data
    };
}

export function resetPasswordError(data) {
    return {
        type: RESET_PASSWORD_ERROR,
        data
    };
}

export function changePassword(data) {
    return {
        type: CHANGE_PASSWORD,
        data
    };
}

export function changePasswordSuccess(data) {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        data
    };
}

export function changePasswordError(data) {
    return {
        type: CHANGE_PASSWORD_ERROR,
        data
    };
}
