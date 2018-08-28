import airbnb from 'assets/images/airbnb.png';
import booking from 'assets/images/booking.png';
import homeaway from 'assets/images/homaway.png';
import tripadvisor from 'assets/images/tripadvisor-square.png';

export default class Channel {
    constructor(channel) {
        this.id = channel.get('id');
        this.type = channel.get('channel_type');
        this.status = channel.get('sync');
    }

    getId() {
        return this.id;
    }

    getName() {
        switch (this.type) {
            case 'Airbnb':
                return 'Airbnb';
            case 'Booking':
                return 'Booking.com';
            case 'HomeAway':
                return 'HomeAway';
            case 'TripAdvisor':
                return 'TripAdvisor';
            default:
                return '';
        }
    }

    getType() {
        return this.type;
    }

    getStatus() {
        return this.status;
    }

    getImage() {
        switch (this.type) {
            case 'Airbnb':
                return airbnb;
            case 'Booking':
                return booking;
            case 'HomeAway':
                return homeaway;
            case 'TripAdvisor':
                return tripadvisor;
            default:
                return '';
        }
    }

    getDescription() {
        switch (this.type) {
            case 'Airbnb':
                return 'Recommended';
            case 'Booking':
                return 'Import one or more listings and one month’s reservation data';
            case 'HomeAway':
                return 'Import one or more listings and one month’s reservation data';
            case 'TripAdvisor':
                return 'Import one or more listings and one month’s reservation data';
            default:
                return '';
        }
    }
}
