import moment from 'moment';

export default class Calendar {
    constructor(calendar) {
        this.id = calendar.get('id');
        this.name = calendar.get('name');
        this.url = calendar.get('url');
        this.description = calendar.get('description');
        this.events = calendar.get('events_count');
        this.enabled = calendar.get('enabled');
        this.status = calendar.get('status', 'active');
        this.updated = moment(calendar.get('date_updated'));
        this.logs = calendar.get('logs').take(3).map(log => new CalendarLog(log));
        this.color = calendar.get('color');
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getUrl() {
        return this.url;
    }

    getEvents() {
        return this.events;
    }

    getStatus() {
        return this.status;
    }

    getEnabled() {
        return this.enabled;
    }

    getDescription() {
        return this.description;
    }

    getDateUpdated() {
        return this.updated.format('MMM DD, YYYY');
    }

    getTimeUpdated() {
        return this.updated.format('hh:mm A');
    }

    getLogs() {
        return this.logs;
    }

    getColor() {
        return this.color ? this.color.get('hex_color') || '#757575' : '#757575';
    }

    getColorId() {
        return this.color ? this.color.get('name') : null;
    }

    getColorName() {
        return this.color ? this.getColorNameFromName(this.color.get('name')) : 'grey';
    }

    getColorNameFromName(name){
        switch (name) {
            case 'Pink Lemonade':
                return 'pink';
            case 'Royal Gold':
                return 'yellow';
            case 'Green Tea':
                return 'green';
            case 'Midnight Blue':
                return 'darkblue';
            case 'Sweet Plum':
                return 'darkviolet';
            case 'Courageous Red':
                return 'red';
            case 'Sunset Yellow':
                return 'brown';
            case 'Jungle Teal':
                return 'greyish';
            case 'Ocean Blue':
                return 'blue';
            case 'Fighting Fushia':
                return 'violet';
            default:
                return 'grey';
        }
    }
}

class CalendarLog {
    constructor(log) {
        this.id = log.get('id');
        this.name = log.get('name');
        this.description = log.get('description');
        this.eventCount = log.get('events');
        this.status = log.get('success', 'active');
        this.date = moment(log.get('date_added'));
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getEvents() {
        return this.eventCount;
    }

    getStatus() {
        return this.status ? 'success' : 'fail';
    }

    getDescription() {
        return this.description;
    }

    getDate() {
        return this.date.format('MMM DD, YYYY hh:mm A');
    }
}
