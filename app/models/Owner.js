export default class Owner {
    constructor(owner) {
        this.id = owner.id;
        this.firstName = owner.first_name;
        this.lastName = owner.last_name;
        this.note = owner.note;
        this.properties = [ new OwnerProperty({ id: 1 }), new OwnerProperty({ id: 2 }), new OwnerProperty({ id: 3 }) ];
    }

    getId() {
        return this.id;
    }

    getFirstName() {
        return this.firstName || 'Jane';
    }

    getLastName() {
        return this.lastName || 'Doe';
    }

    getFullName() {
        return [this.firstName, this.lastName].join(' ').trim() || 'Jane Doe';
    }

    getNote() {
        return this.note || '';
    }

    getProperties() {
        return this.properties;
    }

    getAvatar() {
        return 'https://cdn.voyajoy.com/images/preview.jpg';
    }

    getPhone() {
        return '505 505 505';
    }

    getEmail() {
        return 'owner@voyajoy.com';
    }

    getPropertiesNumber() {
        return '10 properties';
    }
}

class OwnerProperty {
    constructor(property) {
        this.id = property.id;
        this.name = 'Beach Park Apt Near Water #1';
        this.address = '9692 Romaguera Parks';
        this.state = 'CA';
        this.city = 'Ricardomouth';
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getImage() {
        return 'https://cdn.voyajoy.com/images/preview.jpg';
    }

    getAddress() {
        return this.address;
    }

    getState() {
        return this.state;
    }

    getCity() {
        return this.city;
    }

    getOwner() {
        return 'Loretta Harris';
    }

    getBRBA() {
        return '3BR 3BA';
    }

    getType() {
        return 'Condominium';
    }

    getRoomType() {
        return 'Entire Property';
    }
}
