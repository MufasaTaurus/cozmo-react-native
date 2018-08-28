import React from 'react';
import TextField from 'components/TextField';
import Select from 'components/Select';
import DropdownInput from 'components/DropdownInput';
import './discount.less';

export class Discount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: props.discount.getType(),
            days_before: props.discount.getDaysBefore(),
            discount: props.discount.getValue(),
            isPercent: props.discount.getIsPercentage(),
        };
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
    }

    render() {
        const discount = this.props.discount;
        return (
            <div className="pricing-discounts-discount">
                <div>
                    <span className="short">
                        <Select
                            label="Type of discount"
                            defaultValue={ this.state.type }
                            onChange={ (val) => { discount.setType(val); this.handleChange('type', val); } }
                            options={[
                                { name: 'Early Bird Discount', value: 'Early Bird' },
                                { name: 'Late Bird Discount', value: 'Late Bird' },
                            ]}
                        />
                    </span>
                    <div>
                        <span className="short">
                            <TextField
                                id="end"
                                label="Discount Ends"
                                type="number"
                                min="0"
                                addonRight="Days"
                                hasError={ discount.getError() }
                                onChange={ evt => {
                                    discount.setDaysBefore(evt.target.value);
                                    this.handleChange('days_before', evt.target.value);
                                } }
                                value={ this.state.days_before }
                            />
                        </span>
                        <span className="short second">
                            <DropdownInput
                                id="disc"
                                label="Discount"
                                className="small"
                                type="number"
                                min="0"
                                max={ this.state.isPercent ? '100' : '' }
                                hasError={ discount.getError() }
                                onChange={ evt => {
                                    discount.setValue(evt.target.value);
                                    this.handleChange('discount', evt.target.value);
                                } }
                                options={ [
                                    { name: '$', value: 'usd' },
                                    { name: '%', value: 'percent' },
                                ] }
                                onOptionChange={ option => {
                                    discount.setIsPercentage(option.value === 'percent');
                                    this.handleChange('isPercent', option.value === 'percent');
                                } }
                                defaultOption={ currency }
                                value={ this.state.discount }
                            />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Discount;

