import moment from 'moment';
import Guest from './Guest';
import { toJS } from 'immutable';

export default class Ticket {
    constructor(ticket) {
        this.id = ticket.get('id');
        this.status = ticket.get('status');
        this.priority = ticket.get('priority');
        this.summary = ticket.get('summary');
        this.tags = ticket.get('tags');
        this.title = ticket.get('title');
        this.type = ticket.get('type');
        this.assignee = ticket.get('assignee');
        this.requester = ticket.get('requester');
        this.creationDate = moment(ticket.get('date_created'));
    }

    getId() {
        return this.id;
    }

    getStatus() {
        return this.status;
    }

    getPriority() {
        return this.priority;
    }

    getPriorityName() {
        switch (this.priority) {
            case 1:
                return 'low';
            case 2:
                return 'medium';
            case 3:
                return 'high';
            case 4:
            default:
                return 'urgent';
        }
    }

    getAssignee() {
        const name = this.assignee && [this.assignee.get('first_name'), this.assignee.get('last_name')].join(' ').trim();
        return name || 'Unassigned';
    }

    getAssigneeId() {
        return this.assignee ? this.assignee.get('id') : null;
    }

    getTags() {
        return this.tags.toArray();
    }

    getTitle() {
        return this.title;
    }

    getSummary() {
        return this.summary;
    }

    getCreationDate() {
        return this.creationDate.format('MMM DD, YYYY');
    }

    getDate() {
        return this.creationDate;
    }

    getType() {
        return this.type;
    }

    getCreationTime() {
        return this.creationDate.format('hh:MMA');
    }

    getRequester() {
        return this.requester ? [this.requester.get('first_name'), this.requester.get('last_name')].join(' ').trim() : 'Requester';
    }

    getRequesterEmail() {
        return this.requester.get('email');
    }

    getRequesterPhone() {
        return this.requester.get('phone');
    }

    getRequesterId() {
        return this.requester.get('id');
    }

    isAssigned() {
        return !!this.assignee;
    }

    isDeleted() {
        return this.status === 'Deleted';
    }

    hasRequester() {
        return !!this.requester;
    }

    shouldDisplayTicket(display) {
        switch (display) {
            case 'all':
            default:
                return true;
            case 'deleted':
                return this.isDeleted();
            case 'assigned':
                return this.isAssigned();
            case 'unassigned':
                return !this.isAssigned();
        }
    }

    shouldFilterTicket(filters) {
        const priority = filters.get('priority');
        const status = filters.get('status');
        const type = filters.get('type');
        const assignee = filters.get('assignee');

        if (priority && priority !== this.priority) {
            return false;
        }
        if (status && status !== this.status) {
            return false;
        }
        if (type && type !== this.type) {
            return false;
        }
        if (assignee && assignee !== this.getAssigneeId()) {
            return false;
        }
        return true;
    }

    filterTemplate(query = '') {
        const lowerCasedQuery = query.toLowerCase();
        const tags = this.tags.join('|');
        return (
            this.name.toLowerCase().indexOf(lowerCasedQuery) > -1 ||
            this.content.toLowerCase().indexOf(lowerCasedQuery) > -1 ||
            tags.toLowerCase().indexOf(lowerCasedQuery) > -1
        );
    }
}
