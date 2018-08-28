import moment from 'moment';

export default class PropertiesGroup {
    constructor(group) {
        this.id = group.id;
        this.name = group.name;
        this.description = group.description;
        this.templates = group.templates;
        this.date = moment(group.date_updated);
        this.propertiesCount = group.properties_count;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description || '-';
    }

    getTemplates() {
        return this.templates || '-';
    }

    getDate() {
        return this.date.format('MMMM DD, YYYY');
    }

    getTime() {
        return this.date.format('h:mmA');
    }

    getPropertiesCount() {
        return this.propertiesCount;
    }

    filterGroup(query = '') {
        const lowerCasedQuery = query.toLowerCase();
        return (
            this.name.toLowerCase().indexOf(lowerCasedQuery) > -1 ||
            this.description.toLowerCase().indexOf(lowerCasedQuery) > -1
        );
    }
}
