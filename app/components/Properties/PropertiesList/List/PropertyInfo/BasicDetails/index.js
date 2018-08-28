import React from 'react';
import debounce from 'lodash/debounce';
import TextField from 'components/TextField';
import TitleHeader from 'components/TitleHeader';
import Select from 'components/Select';
import Section from '../Section/index';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateProperty, updateNewProperty } from 'containers/Properties/actions';
import { makeSelectSelectedProperty, makeSelectNewProperty } from 'containers/Properties/selectors';
import PropertyModel from 'models/Property';
import './basicDetails.less';

export class BasicDetails extends React.Component {

    constructor(props) {
        super(props);
        const property = new PropertyModel(props.create ? props.newProperty : props.property);
        this.state = {
            name: property.getName(),
            summary: property.getSummary(),
            description: property.getDescription(),
            bedrooms: property.getBedroomsNumber(),
            bathrooms: property.getBathroomsNumber(),
            max_guests: property.getMaxGuests(),
            nameError: false
        };
        this.maxPeopleOptions = [
            { name: '1', value: 1 },
            { name: '2', value: 2 },
            { name: '3', value: 3 },
            { name: '4', value: 4 },
            { name: '5', value: 5 },
            { name: '6', value: 6 },
            { name: '7', value: 7 },
            { name: '8', value: 8 },
            { name: '9', value: 9 },
            { name: '10', value: 10 },
            { name: '11', value: 11 },
            { name: '12', value: 12 },
            { name: '13', value: 13 },
            { name: '14', value: 14 },
            { name: '15', value: 15 },
            { name: '16', value: 16 },
            { name: '17', value: 17 },
            { name: '18', value: 18 },
            { name: '19', value: 19 },
            { name: '20', value: 20 },
            { name: '21', value: 21 },
            { name: '22', value: 22 },
            { name: '23', value: 23 },
            { name: '24', value: 24 },
            { name: '25', value: 25 },
            { name: '26', value: 26 },
            { name: '27', value: 27 },
            { name: '28', value: 28 },
            { name: '29', value: 29 },
            { name: '30', value: 30 },
            { name: '31', value: 31 },
            { name: '32', value: 32 },
            { name: '33', value: 33 },
            { name: '34', value: 34 },
            { name: '35', value: 35 },
            { name: '36', value: 36 },
            { name: '37', value: 37 },
            { name: '38', value: 38 },
            { name: '39', value: 39 },
            { name: '40', value: 40 }
        ];
        this.bedroomsOptions = [
            { name: 'Studio', value: '0.0' },
            { name: '1', value: '1.0' },
            { name: '2', value: '2.0' },
            { name: '3', value: '3.0' },
            { name: '4', value: '4.0' },
            { name: '5', value: '5.0' },
            { name: '6', value: '6.0' },
            { name: '7', value: '7.0' },
            { name: '8', value: '8.0' },
            { name: '9', value: '9.0' },
            { name: '10', value: '10.0' },
            { name: '11', value: '11.0' },
            { name: '12', value: '12.0' },
            { name: '13', value: '13.0' },
            { name: '14', value: '14.0' },
            { name: '15', value: '15.0' },
            { name: '16', value: '16.0' },
            { name: '17', value: '17.0' },
            { name: '18', value: '18.0' },
            { name: '19', value: '19.0' },
            { name: '20', value: '20.0' }
        ];
        this.bathroomsOptions = [
            { name: '0.5', value: '0.5' },
            { name: '1.0', value: '1.0' },
            { name: '1.5', value: '1.5' },
            { name: '2.0', value: '2.0' },
            { name: '2.5', value: '2.5' },
            { name: '3.0', value: '3.0' },
            { name: '3.5', value: '3.5' },
            { name: '4.0', value: '4.0' },
            { name: '4.5', value: '4.5' },
            { name: '5.0', value: '5.0' },
            { name: '5.5', value: '5.5' },
            { name: '6.0', value: '6.0' },
            { name: '6.5', value: '6.5' },
            { name: '7.0', value: '7.0' },
            { name: '7.5', value: '7.5' },
            { name: '8.0', value: '8.0' },
            { name: '8.5', value: '8.5' },
            { name: '9.0', value: '9.0' },
            { name: '9.5', value: '9.5' },
            { name: '10.0', value: '10.0' },
        ];
        this.propertyTypeOptions = [
            { name: 'Apartment', value: 'Apartment' },
            { name: 'House', value: 'House' },
            { name: 'Condo', value: 'Condo' },
            { name: 'Other', value: 'Other' },
        ];
        this.roomTypesOptions = [
            { name: 'Private', value: 'Private' },
            { name: 'Shared', value: 'Shared' },
            { name: 'Entire Home', value: 'Entire Home' },
        ];
        this.saveChanges = debounce(this.saveChanges.bind(this), 1000);
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
        if (this.props.create) {
            this.saveChangesForNewProperty(field, value);
        } else {
            this.saveChanges(field, value);
        }
    }

    getAmenities() {
        const property = new PropertyModel(this.props.create ? this.props.newProperty : this.props.property);
        return (
            <div className="property-details">
                <div className="details-left">
                    <Select
                        id="prop-type"
                        label="Property type"
                        placeholder="-"
                        defaultValue={ property.getType() }
                        onChange={ (val) => this.handleChange('property_type', val) }
                        options={ this.propertyTypeOptions }
                    />
                    <div className="fields">
                        <div className="field-left">
                            <Select
                                id="bed"
                                label="Bedrooms"
                                placeholder="-"
                                defaultValue={ this.state.bedrooms }
                                onChange={ (val) => this.handleChange('bedrooms', val) }
                                options={ this.bedroomsOptions }/>
                        </div>
                        <div className="field-right">
                            <Select
                                id="bath"
                                label="Bathrooms"
                                placeholder="-"
                                defaultValue={ this.state.bathrooms }
                                onChange={ (val) => this.handleChange('bathrooms', val) }
                                options={ this.bathroomsOptions }/>
                        </div>
                    </div>
                </div>
                <div className="details-right">
                    <Select
                        label="Room type"
                        placeholder="-"
                        defaultValue={ property.getRoomType() }
                        onChange={ (val) => this.handleChange('rental_type', val) }
                        options={ this.roomTypesOptions }
                    />
                    <div className="field">
                        <Select
                            id="people"
                            label="Max people"
                            placeholder="-"
                            defaultValue={ this.state.max_guests }
                            onChange={ (val) => this.handleChange('max_guests', val) }
                            options={ this.maxPeopleOptions }
                        />
                    </div>
                </div>
            </div>
        );
    }

    getDescription() {
        return (
            <div>
                <TextField
                    id="headline"
                    label="Headline"
                    onChange={ (evt) => this.handleChange('name', evt.target.value) }
                    value={ this.state.name }
                    hasError={ this.state.nameError ? 'Required' : false }
                    counter={ 50 }
                />
                <TextField
                    id="summary"
                    label="Summary"
                    onChange={ (evt) => this.handleChange('summary', evt.target.value) }
                    value={ this.state.summary }
                    multiLine
                    counter={ 500 }
                />
                <TextField
                    id="desc"
                    onChange={ (evt) => this.handleChange('description', evt.target.value) }
                    value={ this.state.description }
                    multiLine
                    label="Description"
                />
            </div>
        );
    }

    saveChanges(section, val) {
        if (section === 'name' && val === '') {
            this.setState({ nameError: true });
        } else {
            this.props.updateProperty({
                id: this.props.property.get('id'),
                section: section,
                val: val
            });
            if (this.state.nameError) {
                this.setState({ nameError: false });
            }
        }
    }

    saveChangesForNewProperty(section, val) {
        this.props.updateNewProperty(this.props.newProperty.set(section, val));
    }

    render() {
        return (
            <section className="basic-details step">
                <TitleHeader title="Basic Details" icon="puzzle"/>
                <Section
                    title={ 'Description' }
                    customContent={ this.getDescription() }
                    />
                <Section
                    title={ 'Property Details' }
                    customContent={ this.getAmenities() }
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
        updateNewProperty: (data) => dispatch(updateNewProperty(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicDetails);
