import airbnb from 'assets/images/airbnb.png';
import booking from 'assets/images/booking.png';
import homeaway from 'assets/images/homaway.png';
import tripadvisor from 'assets/images/tripadvisor.png';

export default class ImportTool {
    constructor(tool) {
        this.type = tool;
    }

    getLogo() {
        switch (this.type) {
            case 'airbnb':
            default:
                return airbnb;
            case 'booking':
                return booking;
            case 'homeaway':
                return homeaway;
            case 'tripadvisor':
                return tripadvisor;
        }
    }

    getName() {
        switch (this.type) {
            case 'airbnb':
            default:
                return 'Airbnb';
            case 'booking':
                return 'Booking.com';
            case 'homeaway':
                return 'HomeAway';
            case 'tripadvisor':
                return 'TripAdvisor';
        }
    }

    getDescription() {
        switch (this.type) {
            case 'Airbnb':
                return 'Recommended';
            case 'Booking':
                return 'Import one or more listings and one month’s reservation data';
            default:
                return '';
        }
    }
}
