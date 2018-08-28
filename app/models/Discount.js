export default class Discount {
    constructor(discount) {
        this.id = discount.id;
        this.days_before = discount.days_before;
        this.value = discount.value;
        this.type = discount.type || 'Early Bird';
        this.isPercentage = discount.is_percentage;
        this.calculation_method = discount.calculation_method || 'Daily';
        this.prop = discount.prop;
        this.error = discount.error;
    }

    getId() {
        return this.id;
    }

    getProp() {
        return this.prop;
    }

    getDaysBefore() {
        return this.days_before;
    }

    getType() {
        return this.type;
    }

    getValue() {
        return this.value;
    }

    getError() {
        return this.error;
    }

    getIsPercentage() {
        return this.isPercentage;
    }

    getCalculationMethod() {
        return this.calculation_method;
    }

    setType(type) {
        this.type = type;
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

    setCalculationMethod(calculation_method) {
        this.calculation_method = calculation_method;
        return this;
    }
}
