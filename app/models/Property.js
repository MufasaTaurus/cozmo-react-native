import { fromJS } from 'immutable';

export default class Property {
    constructor(property) {
        this.id = property.get('id');
        this.name = property.get('name', '');
        this.image = property.get('cover_image') || '//cdn.voyajoy.com/images/preview.jpg';
        this.address = property.get('address', '') || property.get('full_address', '');
        this.basicAmenities = property.get('basic_amenities') || fromJS({});
        this.additionalAmenities = property.get('additional_amenities') || '';
        this.arrivalInstruction = property.get('arrival_instruction') || fromJS({});
        this.directions = this.arrivalInstruction.get('description');
        this.type = property.get('property_type');
        this.description = property.get('description');
        this.summary = property.get('summary');
        this.max_guests = property.get('max_guests');
        this.rentalType = property.get('rental_type');
        this.bathrooms = property.get('bathrooms');
        this.calendar = property.get('calendar');
        this.bedrooms = property.get('bedrooms');
        this.status = property.get('status');
        this.source = property.get('source');
        this.location = property.get('location') || fromJS({});
        this.rates = property.get('rates', fromJS([]));
        this.additionalFees = property.get('additional_fees', fromJS([])).map(f => new AdditionalFee(f));
        this.rooms = property.get('rooms');
        this.discounts = property.get('discounts', fromJS([]));
        this.thingsToDo = property.get('things_to_do');
        this.owner = property.get('owner');
        this.images = property.get('images', fromJS([])).map(i => new Image(i));
        this.coordinates = property.get('coordinates') || fromJS({});
        const pois = property.get('pois') || fromJS([]);
        this.pois = pois.map(p => new Poi(p));
        const yelpPois = property.get('yelpPois') || fromJS([]);
        this.yelpPois = yelpPois.map(p => new Poi(p));
        this.schedulingAssistant = property.get('scheduling_assistant');
        this.vendors = (property.get('vendors') || fromJS([])).sortBy(v => v.get('order')).map(v => new Cleaner(v));
        this.originalVendors = property.get('vendors');
        this.scheduler = new Scheduler(property.get('scheduling_assistant', fromJS({})));
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

    getImage() {
        return this.image;
    }

    getType() {
        return this.type;
    }

    getRoomType() {
        return this.rentalType;
    }

    getDescription() {
        return this.description;
    }

    getMaxGuests() {
        return this.max_guests;
    }

    getSummary() {
        return this.summary;
    }

    getScheduler() {
        return this.scheduler;
    }

    getCalendar() {
        return this.calendar;
    }

    getCalendarId() {
        return this.calendar.get('id');
    }

    getICals() {
        return this.calendar.get('external_cals') || fromJS([]);
    }

    getRates() {
        return this.rates;
    }

    getSource() {
        return this.source;
    }

    getBathroomsNumber() {
        return this.bathrooms;
    }

    getBedroomsNumber() {
        return this.bedrooms;
    }

    getOwner() {
        return this.owner || 'Owner';
    }

    getImages() {
        return this.images;
    }

    getBasicAmenity(amenity) {
        return this.basicAmenities.get(amenity, false);
    }

    getBasicAmenities() {
        return this.basicAmenities;
    }

    getAdditionalAmenities() {
        return this.additionalAmenities;
    }

    getArrivalInstruction() {
        return this.arrivalInstruction;
    }

    getDirections() {
        return this.directions;
    }

    getStatus() {
        return this.status;
    }

    getBRBA() {
        return (this.getBedroomsNumber() || 0) + 'BR\n' + (this.getBathroomsNumber() || 0) + 'BA';
    }

    getThingsToDo() {
        return this.thingsToDo;
    }

    getDiscounts() {
        return this.discounts;
    }

    getCoordinates() {
        return this.coordinates;
    }

    getPois() {
        return this.pois;
    }

    getYelpPois() {
        return this.yelpPois;
    }

    getAllPois() {
        return this.pois.concat(this.yelpPois);
    }

    getPoisCoordinates() {
        return this.pois.map(p => p.getCoordinates());
    }

    getAllPoisCoordinates() {
        return this.pois.concat(this.yelpPois).map(p => p.getCoordinates());
    }

    getAdditionalFees() {
        return this.additionalFees;
    }

    getCleaningFee() {
        return this.additionalFees.filter(f => f.isCleaningFee()).first();
    }

    getSecurityDeposit() {
        return this.additionalFees.filter(f => f.isSecurityDeposit()).first();
    }

    getTax() {
        return this.additionalFees.filter(f => f.isTax()).first();
    }

    getOriginalVendors() {
        return this.originalVendors;
    }

    hasYelpPois() {
        return this.yelpPois.size > 0;
    }

    hasAmenities() {
        return this.additionalAmenities || this.basicAmenities.filter(a => a === true).size > 0;
    }

    hasThingsToDo() {
        return this.thingsToDo || this.getPois().size > 0;
    }

    hasRooms() {
        return !!(this.bedrooms && this.bedrooms.size > 0 || this.rooms && this.rooms.size > 0);
    }

    getSchedulingAssistant() {
        return this.schedulingAssistant;
    }

    getVendors() {
        return this.vendors;
    }

    getCity() {
        return this.location.get('city') || '-';
    }

    getState() {
        return this.location.get('region') || '-';
    }

    filterProperties(query = '') {
        const lowerCasedQuery = query.toLowerCase();
        return (
            this.name.toLowerCase().indexOf(lowerCasedQuery) > -1 ||
            this.address.toLowerCase().indexOf(lowerCasedQuery) > -1
        );
    }

    filterByStatus(status = 'Active') {
        return this.status === status;
    }
}

export class Poi {
    constructor(poi) {
        this.id = poi.get('id');
        this.name = poi.get('name', '');
        this.coordinates = poi.get('coordinates') || fromJS({});
        this.image = poi.get('image_url') || poi.get('image');
        this.address = poi.getIn(['location', 'display_address']) || fromJS([]);
        this.altAddress = poi.get('address');
        this.url = poi.get('url');
        this.description = poi.get('description');
        const altCategory = poi.get('categories', fromJS([])).first();
        this.category = poi.get('category') || (altCategory ? altCategory.get('alias') : '');
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getCoordinates() {
        return this.coordinates;
    }

    getImage() {
        return this.image;
    }

    getAddress() {
        return this.address.join(' ').trim() || this.altAddress || '-';
    }

    getCategory() {
        return this.category;
    }

    getDescription() {
        return this.description;
    }

    getUrl() {
        return this.url;
    }

    getLatitude() {
        return this.getCoordinates().get('latitude').toFixed(5);
    }

    getLongitude() {
        return this.getCoordinates().get('longitude').toFixed(5);
    }
}

export class Image {
    constructor(image) {
        this.id = image.get('id');
        this.url = image.get('url');
        this.caption = image.get('caption');
        this.order = image.get('order');
    }

    getId() {
        return this.id;
    }

    getUrl() {
        return this.url;
    }

    getCaption() {
        return this.caption;
    }

    getOrder() {
        return this.order;
    }
}

class AdditionalFee {
    constructor(fee) {
        this.id = fee.get('id');
        this.calculationMethod = fee.get('calculation_method');
        this.taxType = fee.get('fee_tax_type');
        this.value = fee.get('value');
    }

    getId() {
        return this.id;
    }

    getCalculationMethod() {
        return this.calculationMethod;
    }

    getTaxType() {
        return this.taxType;
    }

    getValue() {
        return this.value;
    }

    isCleaningFee() {
        return this.taxType === 'Cleaning Fee';
    }

    isSecurityDeposit() {
        return this.taxType === 'Security Deposit';
    }

    isTax() {
        return this.taxType === 'Other Fee';
    }
}

class Cleaner {
    constructor(cleaner) {
        this.id = cleaner.get('id');
        this.firstName = cleaner.get('first_name');
        this.lastName = cleaner.get('last_name');
        this.email = cleaner.get('email');
        this.phone = cleaner.get('phone');
        this.order = cleaner.get('order');
    }

    getId() {
        return this.id;
    }

    getFullName() {
        return [this.firstName, this.lastName].join(' ').trim();
    }

    getEmail() {
        return this.email;
    }

    getPhone() {
        return this.phone;
    }

    getOrder() {
        return this.order;
    }

    setOrder(order) {
        this.order = order;
        return this;
    }
}

class Scheduler {
    constructor(scheduler) {
        this.id = scheduler.get('id');
        this.auto = scheduler.get('automatically_assign');
        this.from = scheduler.get('cleaning_from_time') || '';
        this.to = scheduler.get('cleaning_to_time') || '';
        this.created = scheduler.get('date_created');
        this.updated = scheduler.get('date_updated');
        this.estimate = scheduler.get('time_estimate');
    }

    getId() {
        return this.id;
    }

    isAuto() {
        return this.auto;
    }

    getFrom() {
        return this.from.substr(0, 5);
    }

    getTo() {
        return this.to.substr(0, 5);
    }

    getEstimate() {
        return parseInt(this.estimate.split(':')[0]);
    }
}
