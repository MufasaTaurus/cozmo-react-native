import Reservation from 'models/Reservation';
import Job from 'models/Job';
import { fromJS } from 'immutable';

export default class CleanerCalendar {
    constructor(event) {
        this.id = event.id;
        this.name = event.name;
        this.image = event.cover_image;
        this.address = event.address;
        this.reservations = event.reservations.map(r => new Reservation(fromJS(r)));
        this.jobs = event.jobs.map(j => new Job(fromJS(j)));
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getAddress() {
        return this.address;
    }

    getReservations() {
        return this.reservations;
    }

    getJobs() {
        return this.jobs;
    }
}
