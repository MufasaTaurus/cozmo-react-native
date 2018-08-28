import moment from 'moment';

export default class ReservationMessage {
    constructor(message) {
        this.date = moment(message.get('date'));
        this.reservation = message.get('reservation');
        this.sender = message.get('sender');
        this.subject = message.get('subject');
        this.text = message.get('text');
        this.outgoing = message.get('outgoing');
        this.attachments = message.get('attachments').map(a => new Attachment(a));
    }

    getDate() {
        return this.date;
    }

    getSender() {
        return this.sender;
    }

    getSenderEmail() {
        return this.sender.get('email');
    }

    getSenderFullName() {
        return [this.sender.get('first_name'), this.sender.get('last_name')].join(' ').trim() || 'Sender';
    }

    getSenderAvatar() {
        return this.sender.get('avatar');
    }

    getSubject() {
        return this.subject;
    }

    getText() {
        return this.text;
    }

    getAttachments() {
        return this.attachments;
    }

    isOutgoing() {
        return this.outgoing;
    }
}

class Attachment {
    constructor(attachment) {
        this.name = attachment.get('name');
        this.url = attachment.get('url');
    }

    getName() {
        return this.name;
    }

    getUrl() {
        return this.url;
    }
}
