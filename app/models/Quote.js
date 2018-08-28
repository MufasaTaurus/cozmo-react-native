import FeeModel from './Fee';

export default class Quote {
    constructor(quote) {
        this.adults = quote.adults;
        this.from = quote.arrival_date;
        this.to = quote.departure_date;
        this.totalPrice = quote.total_price;
        this.pets = quote.pets;
        this.nights = quote.nights;
        this.currency = quote.currency;
        this.children = quote.children;
        this.discounts = quote.discounts;
        this.fees = (quote.fees || []).map(f => new FeeModel(f));
        this.rates = quote.rates;
        this.available = quote.available;
        // rates
//     :
//     [{duration: 3, amount: "960.00"}]
    }

    getTotalPrice() {
        return '$' + this.totalPrice;
    }

    getNights() {
        return this.nights + ' night' + (this.nights > 1 ? 's' : '');
    }

    getDates() {
        return this.from + ' - ' + this.to;
    }

    getFees() {
        return this.fees;
    }

    getBasePrice() {
        return this.rates[0].amount;
    }

    isAvailable() {
        return this.available;
    }

    getGuests() {
        const adultStr = this.adults === 1 ? ' Adult' : ' Adults';
        const childStr = this.children === 1 ? ' Child' : ' Children';
        return this.adults + adultStr + (this.children > 0 ? ', ' + this.children + childStr : '') ;
    }
}
