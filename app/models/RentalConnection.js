import moment from 'moment';

export default class RentalConnection {
    constructor(connection) {
        this.id = connection.id;
        this.type = connection.api_type;
        this.code = connection.code;
        this.username = connection.username;
        this.properties = connection.properties;
        this.lastSync = connection.last_sync;
        this.apiKey = connection.api_key;
        this.clientId = connection.client_id;
        this.status = connection.status;
    }

    getId() {
        return this.id;
    }

    getName() {
        switch (this.type) {
            case 'Isi':
                return 'ISI Weblink';
            case 'Escapia':
                return 'Escapia';
            default:
                return '';
        }
    }

    getType() {
        return this.type;
    }

    getUsername() {
        return this.username;
    }

    getCode() {
        return this.type === 'Isi' ? this.code : '-';
    }

    getApiKey() {
        return this.apiKey;
    }

    getClientId() {
        return this.clientId;
    }

    getProperties() {
        return this.properties;
    }

    getLastDateSynced() {
        return this.lastSync.date ? moment(this.lastSync.date).format('MMM DD, YYYY') : '-';
    }

    getLastTimeSynced() {
        return this.lastSync.date ? moment(this.lastSync.date).format('hh:mm A') : '-';
    }

    getStatus() {
        if (this.lastSync.hasOwnProperty('status')) {
            return this.lastSync.status;
        } else {
            return 'Syncing';
        }
    }

    isEnabled() {
        return this.status === 'Enabled';
    }

    isHidden() {
        return this.status === 'Disabled Hidden';
    }

    hasSyncError() {
        return this.getStatus() === 'Error';
    }
}
