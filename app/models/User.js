export default class User {
    constructor(user, isMe) {
        this.id = user.get('pk');
        this.first_name = user.get('first_name');
        this.last_name = user.get('last_name');
        this.avatar = user.get('avatar');
        this.me = isMe;
    }

    getId() {
        return this.id;
    }

    getFullName() {
        return [this.first_name, this.last_name].join(' ');
    }

    getFirstName() {
        return this.first_name || 'User';
    }

    isMe() {
        return this.me;
    }

    getAvatar() {
        return this.avatar;
    }

    filterUser(query = '') {
        const lowerCasedQuery = query.toLowerCase();
        return (
            this.getFullName().toLowerCase().indexOf(lowerCasedQuery) > -1
        );
    }
}
