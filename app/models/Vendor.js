import moment from 'moment';

export default class Vendor {
    constructor(vendor) {
        this.id = vendor.get('id');
        this.firstName = vendor.get('first_name');
        this.lastName = vendor.get('last_name');
        this.email = vendor.get('email', '');
        this.phone = vendor.get('phone', '');
        this.type = vendor.get('account_type');
        this.avatar = vendor.get('avatar', 'https://cdn.voyajoy.com/images/preview.jpg');
        this.notificationEnabled = vendor.get('notification_enabled');
        this.notificationPreffered = vendor.get('notification_preffered');
        this.dateCreated = vendor.get('date_added');
        this.dateUpdated = vendor.get('date_updated');
        this.assignmentsNumber = vendor.get('assignments');
        this.jobsNumber = vendor.get('jobs_count');
        this.active = vendor.get('is_active');
        this.assignedProperties = vendor.get('assigned_properties');
    }


    getFullName() {
        const fullName = ([this.firstName, this.lastName].join(' ')).trim();
        return fullName || 'Vendor';
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getType() {
        return this.type;
    }

    getAvatar() {
        return this.avatar || 'https://cdn.voyajoy.com/images/preview.jpg';
    }

    getEmail() {
        return this.email;
    }

    getPhone() {
        return this.phone || '';
    }

    getId() {
        return this.id;
    }

    getAssignmentsNumber() {
        return this.assignmentsNumber;
    }

    getAssignedProperties() {
        return this.assignedProperties;
    }

    getDateCreated() {
        return moment(this.dateCreated).format('YYYY-MM-DD');
    }

    getDateUpdated() {
        return moment(this.dateUpdated).format('YYYY-MM-DD');
    }

    getNotificationEnabled() {
        return this.notificationEnabled;
    }

    getNotificationPreffered() {
        return this.notificationPreffered;
    }

    getJobsNumber() {
        return this.jobsNumber;
    }

    isActive() {
        return this.active;
    }

    filterVendor(query = '') {
        const lowerCasedQuery = query.toLowerCase();
        return (
            this.email.toLowerCase().indexOf(lowerCasedQuery) > -1 ||
            this.getPhone().toLowerCase().indexOf(lowerCasedQuery) > -1 ||
            this.getFullName().toLowerCase().indexOf(lowerCasedQuery) > -1
        );
    }
}

