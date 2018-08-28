import React from 'react';
import debounce from 'lodash/debounce';
import TextField from 'components/TextField';
import Select from 'components/Select';
import Discounts from './Discounts';
import Fees from './Fees';
import TitleHeader from 'components/TitleHeader';
import Section from '../Section';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateProperty, updateNewProperty, addRate, addFee, updateFee } from 'containers/Properties/actions';
import { makeSelectSelectedProperty, makeSelectNewProperty } from 'containers/Properties/selectors';
import { fromJS } from 'immutable';
import PropertyModel from 'models/Property';
import './pricing.less';

export class Pricing extends React.Component {

    constructor(props) {
        super(props);
        const prop = new PropertyModel(props.create ? props.newProperty : props.property);
        const rate = prop.getRates().first() || fromJS([]);
        const security = prop.getSecurityDeposit();
        const cleaning = prop.getCleaningFee();
        const tax = prop.getTax();
        this.state = {
            nightly: parseInt(rate.get('nightly')) || '',
            weekend: parseInt(rate.get('weekend')) || '',
            weekly: parseInt(rate.get('weekly')) || '',
            monthly: parseInt(rate.get('monthly')) || '',
            extra_person: parseInt(rate.get('extra_person')) || '',
            cleaningFee: cleaning ? parseInt(cleaning.getValue()) : '',
            taxFee: tax ? parseInt(tax.getValue()) : '',
            securityFee: security ? parseInt(security.getValue()) : '',
            currency: '$'
        };

        this.currency = [
            { name: 'USD', value: '$' },
            { name: 'PLN', value: 'zł' },
        ];

        this.saveChanges = debounce(this.saveChanges.bind(this), 1000);
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
        this.saveChanges(field, value);
    }

    saveChanges(section, val) {
        const prop = new PropertyModel(this.props.create ? this.props.newProperty : this.props.property);
        const rate = {
            nightly: this.state.nightly,
            weekend: this.state.weekend,
            weekly: this.state.weekly,
            monthly: this.state.monthly,
            extra_person: this.state.extra_person,
            prop: prop.getId(),
            time_frame: {} // nulls are for creating a base rate
        };
        if (this.props.create) {
            const prop = this.props.newProperty.set('rates', fromJS([fromJS(rate)]));
            //this.props.addRate(prop);
            this.props.updateNewProperty(prop);
        } else {
            this.props.addRate(rate);
        }
    }

    getBaseRatesSection() {
        return (
            <div>
                <div className="column">
                    <TextField
                        id="nightly"
                        onChange={ (evt) => this.handleChange('nightly', parseInt(evt.target.value)) }
                        label="Nightly"
                        type="number"
                        placeholder="-"
                        addonLeft="$"
                        value={ this.state.nightly }
                    />
                </div>
                <div className="column second-field">
                    <TextField
                        id="weekend"
                        onChange={ (evt) => this.handleChange('weekend', parseInt(evt.target.value)) }
                        label="Weekend"
                        type="number"
                        placeholder="-"
                        addonLeft="$"
                        value={ this.state.weekend }
                    />
                </div>
            </div>
        );
    }

    getLengthStaySection() {
        return (
            <div className="column">
                <div className="side-by-side">
                    <TextField
                        id="r-week"
                        onChange={ (evt) => this.handleChange('weekly', parseInt(evt.target.value)) }
                        label="Weekly"
                        type="number"
                        placeholder="-"
                        addonLeft="%"
                        value={ this.state.weekly }
                    />
                    <div className="second-field">
                        <TextField
                            id="r-month"
                            onChange={ (evt) => this.handleChange('monthly', parseInt(evt.target.value)) }
                            label="Monthly"
                            type="number"
                            placeholder="-"
                            addonLeft="%"
                            value={ this.state.monthly }
                        />
                    </div>
                </div>
            </div>
        );
    }

    getCurrencySection() {
        return (
            <div className="column">
                <Select
                    onChange={ (val) => this.handleChange('currency', val) }
                    id="curr"
                    options={ this.currency }
                    defaultValue={ this.state.currency }
                />
            </div>
        );
    }

    render() {
        return (
            <section className="pricing-details step">
                <TitleHeader title="Rates" icon="money" iconSize={ 24 }/>
                <Section
                    title={ 'Base Rates' }
                    customContent={ this.getBaseRatesSection() }
                />
                <Section
                    title={ 'Length of Stay Rates' }
                    customContent={ this.getLengthStaySection() }
                />
                <Section
                    title={ 'Fees' }
                    customContent={ <Fees create={ this.props.create }/> }
                />
                <Section
                    title={ 'Discounts' }
                    customContent={ <Discounts create={ this.props.create }/> }
                />
                <Section
                    title={ 'Currency' }
                    customContent={ this.getCurrencySection() }
                />
            </section>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    property: makeSelectSelectedProperty(),
    newProperty: makeSelectNewProperty()
});

export function mapDispatchToProps(dispatch) {
    return {
        updateProperty: (data) => dispatch(updateProperty(data)),
        updateNewProperty: (data) => dispatch(updateNewProperty(data)),
        addRate: (data) => dispatch(addRate(data)),
        addFee: (data) => dispatch(addFee(data)),
        updateFee: (data) => dispatch(updateFee(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
