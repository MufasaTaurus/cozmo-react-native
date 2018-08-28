import React from 'react';
import { fromJS } from 'immutable';
import Map from 'components/Map';
import Section from '../Section/index';
import TextField from 'components/TextField';
import TitleHeader from 'components/TitleHeader';
import PlacesAutocomplete from 'components/PlacesAutocomplete';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateProperty, updateNewProperty } from 'containers/Properties/actions';
import { makeSelectSelectedProperty, makeSelectNewProperty } from 'containers/Properties/selectors';
import PropertyModel from 'models/Property';
import './location.less';

export class Location extends React.Component {

    saveChanges(section, val) {
        if (this.props.create) {
            this.props.updateNewProperty(this.props.newProperty.set(section, val));
        } else {
            this.props.updateProperty({
                id: this.props.property.get('id'),
                section: section,
                val: val
            });
        }
    }

    formatLocation(data) {
        const location = {};
        data.map(part => {
            if (part.types.indexOf('postal_code') > -1) {
                location.postal = part.long_name;
                return;
            }
            if (part.types.indexOf('country') > -1) {
                location.country = part.short_name;
                return;
            }
            if (part.types.indexOf('locality') > -1) {
                location.city = part.long_name;
                return;
            }
            if (part.types.indexOf('administrative_area_level_1') > -1) {
                location.region = part.short_name;
                return;
            }
            if (part.types.indexOf('neighborhood') > -1) {
                location.district = part.long_name;
                return;
            }
            if (part.types.indexOf('street_number') > -1) {
                location.streetNumber = part.long_name;
                return;
            }
            if (part.types.indexOf('route') > -1) {
                location.street = part.long_name;
            }
        });

        return location;
    }

    onSelectLocation(point) {
        const location = this.formatLocation(point.address_components);
        this.saveChanges('coordinates', fromJS({
            latitude: point.geometry.location.lat().toFixed(5),
            longitude: point.geometry.location.lng().toFixed(5)
        }));
        this.saveChanges('full_address', point.formatted_address);
        this.saveChanges('address', [location.streetNumber, location.street, location.city].filter(a => a).join(', '));
        this.saveChanges('postal_code', location.postal);
        this.saveChanges('location', {
            country: location.country,
            region: location.region,
            district: location.district,
            city: location.city
        });
    }

    onAddressChange(val) {
        this.saveChanges('full_address', val);
    }

    render() {
        const property = new PropertyModel(this.props.create ? this.props.newProperty : this.props.property);
        const locations = [{ coordinates: property.getCoordinates(), isProperty: true }];
        return (
            <section className="location step">
                <TitleHeader title="Location" icon="pin"/>
                <div className="map" style={{ width:'100%', height: '400px' }}>
                    <div className="map-disabler"/>
                    <Map locations={ locations } withLabel={ false } />
                </div>
                { this.props.create ?
                    <Section
                        title={ 'Address' }
                        customContent={
                            <PlacesAutocomplete
                                defaultValue={ property.getAddress() }
                                onChange={ (val) => this.onAddressChange(val) }
                                onSelect={ (val) => this.onSelectLocation(val) } />
                        }/>
                    :
                    <Section
                        title={ 'Address' }
                        customContent={
                            <TextField
                                disabled
                                value={ property.getAddress() }
                                id="address"
                            />
                        }
                        readonly={ true }/>
                }
                <Section
                    title={ 'Special Directions (Optional)' }
                    text={ property.getDirections() }
                    counter={ 500 }
                    id="sd"
                    onSaveChanges={ (val) => this.saveChanges('arrival_instruction', fromJS({ description: val })) }/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Location);
