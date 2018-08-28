import moment from 'moment';
import { fromJS } from 'immutable';

export default class Reservation {
    constructor(reservation) {
        this.id = reservation.get('id');
        this.startDate = moment(reservation.get('start_date'));
        this.endDate = moment(reservation.get('end_date'));
        this.duration = this.endDate.diff(this.startDate, 'days');
        this.fromToDate = this.startDate.format('MMM DD') + ' - ' + this.endDate.format('MMM DD, YYYY');
        this.price = reservation.get('price');
        this.paid = reservation.get('paid');
        this.propertyName = reservation.getIn(['property', 'name'], '');
        this.propertyAddress = reservation.getIn(['property', 'street'], '');
        this.guest = reservation.get('guest') || fromJS({});
        this.guestFirstName = this.guest.get('first_name');
        this.guestLastName = this.guest.get('last_name');
        this.guestAvatar = this.guest.get('avatar') || 'https://cdn.voyajoy.com/images/preview.jpg';
        this.guestEmail = this.guest.get('email');
        this.guestPhone = this.guest.get('phone');
        this.propertyAvatar = reservation.getIn(['property', 'cover_image'], 'https://cdn.voyajoy.com/images/preview.jpg');
        this.numberOfGuestsAdults = reservation.get('guests_adults');
        this.numberOfGuestsChildren = reservation.get('guests_children');
        this.listingUrl = reservation.get('listing_url');
        this.messages = reservation.get('messages') || fromJS([]);
        const events = reservation.get('events') || fromJS([]);
        this.events = events.map(e => new ReservationEvent(e));
        this.source = 'Airbnb';
    }

    getStartDate(format) {
        let date = this.startDate;
        if (format) {
            date = date.format(format);
        }
        return date;
    }

    getEndDate(format) {
        let date = this.endDate;
        if (format) {
            date = date.format(format);
        }
        return date;
    }

    getDuration() {
        return this.duration + ' Night' + (this.duration > 1 ? 's' : '');
    }

    getDurationNumber() {
        return this.duration;
    }

    getGuestFullName() {
        const name = [this.guestFirstName, this.guestLastName].join(' ').trim();
        return name || 'Guest';
    }

    getGuestFirstName() {
        return this.guestFirstName;
    }

    getGuestLastName() {
        return this.guestLastName;
    }

    getGuestAvatar() {
        return this.guestAvatar;
    }

    getGuestEmail() {
        return this.guestEmail;
    }

    getGuestPhone() {
        return this.guestPhone;
    }

    getPropertyAvatar() {
        return this.propertyAvatar;
    }

    getPropertyName() {
        return this.propertyName;
    }

    getPropertyAddress() {
        return this.propertyAddress;
    }

    getListingUrl() {
        return this.listingUrl;
    }

    getNumberOfGuests() {
        const adultStr = this.numberOfGuestsAdults === 1 ? ' Adult' : ' Adults';
        const childStr = this.numberOfGuestsChildren === 1 ? ' Child' : ' Children';
        return this.numberOfGuestsAdults + adultStr + (this.numberOfGuestsChildren > 0 ? ', ' + this.numberOfGuestsChildren + childStr : '') ;
    }

    getId() {
        return this.id;
    }

    getPrice() {
        return '$' + this.price;
    }

    getPaid() {
        return '$' + this.paid;
    }

    getFromTo() {
        return this.fromToDate;
    }

    getMessages() {
        return this.messages;
    }

    getSource() {
        return this.source;
    }

    getEvents() {
        return this.events;
    }

    getReservationEvent() {
        return fromJS([
            {
                start: this.getStartDate('YYYY-MM-DD'),
                end: this.getEndDate('YYYY-MM-DD')
            }
        ]);
    }

    isPaid() {
        return parseFloat(this.price) <= parseFloat(this.paid) ? 'Paid' : 'Unpaid';
    }

    filterReservations(query = '') {
        const lowerCasedQuery = query.toLowerCase();
        return (
            this.propertyName.toLowerCase().indexOf(lowerCasedQuery) > -1 ||
            this.propertyAddress.toLowerCase().indexOf(lowerCasedQuery) > -1 ||
            this.getGuestFullName().toLowerCase().indexOf(lowerCasedQuery) > -1
        );
    }
}

export class ReservationEvent {
    constructor(event) {
        this.id = event.get('id');
        this.type = event.get('event_type');
        this.date = moment(event.get('timestamp'));
    }

    getId() {
        return this.id;
    }

    getType() {
        return this.type;
    }

    getDate() {
        return this.date;
    }

    getIcon() {
        switch (this.type) {
            case 'Inquiry received':
            case 'Template sent':
                return 'conversation';
            case 'Terms signed':
                return 'edit';
            case 'Reservation created':
                return 'event';
            case 'Reservation modified':
                return 'settings';
            case 'Reservation canceled':
                return 'cancel';
            case 'Email received':
            case 'Email sent':
                return 'email';
            case 'Refund issued':
            case 'Payment received':
                return 'money';
            default:
                return '';
        }
    }
}
