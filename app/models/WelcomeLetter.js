export default class WelcomeLetter {
    constructor(letter) {
        this.id = letter.id;
        this.name = letter.name;
        this.prop = letter.prop;
        this.propertyName = letter.prop_name;
        this.template = letter.template;
        this.content = letter.content;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getPropertyId() {
        return this.prop;
    }

    getPropertyName() {
        return this.propertyName;
    }

    getTemplate() {
        return this.template;
    }

    getContent() {
        return this.content;
    }

    filterLetter(query = '') {
        const lowerCasedQuery = query.toLowerCase();
        return (
            this.name.toLowerCase().indexOf(lowerCasedQuery) > -1 ||
            this.propertyName.toLowerCase().indexOf(lowerCasedQuery) > -1 ||
            this.content.toLowerCase().indexOf(lowerCasedQuery) > -1
        );
    }
}
