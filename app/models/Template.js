import moment from 'moment';

export default class Template {
    constructor(tpl) {
        this.id = tpl.get('id');
        this.content = tpl.get('content');
        this.description = tpl.get('description');
        this.name = tpl.get('name');
        this.type = tpl.get('type');
        this.tags = tpl.get('tags');
        this.headline = tpl.get('headline');
        this.subject = tpl.get('subject');
        this.prop = tpl.get('prop');
        this.date = moment();
    }

    getId() {
        return this.id;
    }

    getDescription() {
        return this.description || '-';
    }

    getContent() {
        return this.content;
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.type || 'Email';
    }

    getTags() {
        return this.tags.toArray();
    }

    getHeadline() {
        return this.headline;
    }

    getSubject() {
        return this.subject;
    }

    getProp() {
        return this.prop;
    }

    getDate() {
        return this.date.format('MMMM DD, YYYY');
    }

    getTime() {
        return this.date.format('hh:mmA');
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setDescription(desc) {
        this.description = desc;
        return this;
    }

    setType(type) {
        this.type = type;
        return this;
    }

    setProp(prop) {
        this.prop = prop;
        return this;
    }

    getTagsIds() {
        return this.tags.map(t => t.get('id'));
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



