import PropertyModel from 'models/Property';
import { fromJS } from 'immutable';

export default class Assignment {
    constructor(assignment) {
        this.id = assignment.id;
        this.cleaningFee = assignment.cleaning_fee;
        this.ordering = assignment.ordering;
        this.property = new PropertyModel(fromJS(assignment.property));
    }

    getId() {
        return this.id;
    }

    getCleaningFee() {
        return '$ ' + this.cleaningFee;
    }

    getOrdering() {
        return this.ordering;
    }

    getProperty() {
        return this.property;
    }

    filterAssignments(query = '') {
        const lowerCasedQuery = query.toLowerCase();
        return (
            this.property.getName().toLowerCase().indexOf(lowerCasedQuery) > -1 ||
            this.property.getAddress().toLowerCase().indexOf(lowerCasedQuery) > -1
        );
    }
}
