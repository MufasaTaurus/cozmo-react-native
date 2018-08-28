export default class Fee {
    constructor(fee) {
        this.id = fee.id;
        this.name = fee.name;
        this.days_before = fee.days_before;
        this.value = fee.value || fee.amount;
        this.fee_type = fee.fee_type || 'Security Deposit';
        this.isPercentage = fee.is_percentage;
        this.calculation_method = 'Per Stay';
        this.prop = fee.prop;
        this.error = fee.error;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getProp() {
        return this.prop;
    }

    getDaysBefore() {
        return this.days_before;
    }

    getType() {
        return this.fee_type;
    }

    getValue() {
        return this.value;
    }

    getIsPercentage() {
        return this.isPercentage;
    }

    getError() {
        return this.error;
    }

    setType(type) {
        this.fee_type = type;
        return this;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setProp(prop) {
        this.prop = prop;
        return this;
    }

    setDaysBefore(ends) {
        this.days_before = ends;
        return this;
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    setError(error) {
        this.error = error;
        return this;
    }

    setIsPercentage(isPercentage) {
        this.isPercentage = isPercentage;
        return this;
    }
}
