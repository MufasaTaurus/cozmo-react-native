import Pagination from './Pagination';
import { fromJS } from 'immutable';

export default class Guest {
    constructor(guest) {
        this.id = guest.id;
        this.first_name = guest.first_name;
        this.last_name = guest.last_name;
        this.note = guest.note;
        this.email = guest.email;
        this.secondary_email = guest.secondary_email;
        this.phone = guest.phone;
        this.secondary_phone = guest.secondary_phone;
        this.avatar = guest.avatar;
        this.tickets = guest.tickets || fromJS([]);
        this.ticketsPagination = new Pagination({ currentPage: 1 });
        this.reservations = guest.reservations || fromJS([]);
    }

    getId() {
        return this.id;
    }

    getName() {
        return [this.first_name, this.last_name].join(' ').trim() || 'Guest';
    }

    getAvatar() {
        return 'https://cdn.voyajoy.com/images/preview.jpg';
    }

    getEmail() {
        return this.email;
    }

    getPhone() {
        return this.phone;
    }

    getSecondaryPhone() {
        return this.secondary_phone;
    }

    getTickets() {
        return this.tickets;
    }

    getReservations() {
        return this.reservations;
    }

    getTicketsPagination() {
        return this.ticketsPagination;
    }

    getContact() {
        const contact = [];
        this.email && contact.push({ icon: 'email', value: this.email });
        this.secondary_email && contact.push({ icon: 'email', value: this.secondary_email });
        this.phone && contact.push({ icon: 'phone', value: this.phone });
        this.secondary_phone && contact.push({ icon: 'phone', value: this.secondary_phone });

        return contact;
    }

    getNote() {
        return this.note || '';
    }

    setData(data) {
        this.email = data.email;
        this.phone = data.phone;
        this.secondary_phone = data.secondary_phone;
        this.note = data.note;
    }

    setNote(note) {
        this.note = note;
    }

    setTickets(tickets) {
        this.tickets = tickets;
        return this;
    }

    setTicketsCount(count) {
        this.ticketsPagination.setCount(count);
        return this;
    }

    setReservations(reservations) {
        this.reservations = reservations;
        return this;
    }
}
