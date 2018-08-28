export default class Tag {
    constructor(job) {
        this.id = job.get('id');
        this.name = job.get('name');
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    filterTag(query = '') {
        const lowerCasedQuery = query.toLowerCase();
        return (
            this.name.toLowerCase().indexOf(lowerCasedQuery) > -1
        );
    }
}
