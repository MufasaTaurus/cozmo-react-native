import moment from 'moment';
import { fromJS } from 'immutable';

export default class Job {
    constructor(job) {
        this.id = job.get('id');
        this.type = job.get('type');
        this.status = job.get('status');
        this.subtasks = job.get('subtasks');
        this.startTime = job.getIn(['time_frame', 'lower']);
        this.endTime = job.getIn(['time_frame', 'upper']);
        this.cost = job.get('cost');
        this.description = job.get('description');
        this.entryInstructions = job.get('entry_instructions');
        this.dateAdded = job.get('date_added');
        this.isActive = job.get('is_active');
        this.assignee = job.get('assignee');
        this.estimate = job.get('time_estimate');
        this.notifications = job.get('notifications', fromJS([])).map(n => new Notification(n));
        this.propertyId = job.getIn(['property', 'id']);
        this.propertyName = job.getIn(['property', 'name']);
        this.propertyAddress = job.getIn(['property', 'full_address']);
        this.propertyImage = job.getIn(['property', 'cover_image']);
    }

    getType() {
        return this.type;
    }

    getStatus() {
        return this.status;
    }

    getStatusColor() {
        switch (this.status) {
            case 'Accepted':
                return '#1DB1D1';
            case 'Completed':
                return '#81D135';
            case 'Pending':
                return '#9B9B9B';
            case 'In Progress':
                return '#F3A536';
            case 'Incomplete':
            default:
                return '#CE0B24';
        }
    }

    getId() {
        return this.id;
    }

    getCost() {
        return '$ ' + this.cost;
    }

    getDescription() {
        return this.description;
    }

    getAssignee() {
        return this.assignee;
    }

    getAssigneeName() {
        return (this.assignee ? this.assignee.get('first_name') : undefined) || 'Cleaner';
    }

    getPropertyId() {
        return this.propertyId;
    }

    getPropertyName() {
        return this.propertyName;
    }

    getPropertyAddress() {
        return this.propertyAddress;
    }

    getPropertyImage() {
        return this.propertyImage;
    }

    getIsActive() {
        return this.isActive;
    }

    getEntryInstructions() {
        return this.entryInstructions;
    }

    getEstimate() {
        return parseInt(this.estimate.split(':')[0]);
    }

    getNotifications() {
        return this.notifications;
    }

    getDateAdded() {
        return moment(this.dateAdded);
    }

    getTimeFrame() {
        return moment(this.startTime).format('dddd h:mmA') ;
    }

    getHourFrame() {
        return moment(this.startTime).format('h:mma') + '-' + moment(this.endTime).format('h:mma');
    }

    getDate() {
        return moment(this.startTime).format('MMMM DD, YYYY');
    }

    getStartDay() {
        return moment(this.startTime);
    }

    filterJob(query = '') {
        const lowerCasedQuery = query.toLowerCase();
        return (
            this.propertyName.toLowerCase().indexOf(lowerCasedQuery) > -1 ||
            this.propertyAddress.toLowerCase().indexOf(lowerCasedQuery) > -1
        );
    }
}

class Notification {
    constructor(notification) {
        this.content = notification.get('content');
        this.created = notification.get('date_created');
    }

    getContent() {
        return this.content;
    }

    getCreated() {
        return moment(this.created).format('MMM DD, YYYY h:mmA');
    }
}


