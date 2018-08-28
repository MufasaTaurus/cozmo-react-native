import React from 'react';
import SVG from 'components/SVG';
import Section from '../Section/index';
import TitleHeader from 'components/TitleHeader';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateProperty, updateNewProperty } from 'containers/Properties/actions';
import { makeSelectSelectedProperty, makeSelectNewProperty } from 'containers/Properties/selectors';
import PropertyModel from 'models/Property';
import './amenities.less';

export class Amenities extends React.Component {

    constructor(props) {
        super(props);
        this.property = new PropertyModel(this.props.create ? this.props.newProperty : this.props.property);
        this.state = {
            accessibility: [
                {
                    id: 'elevator',
                    icon: 'elevator',
                    name: 'Elevators Available',
                    active: this.property.getBasicAmenity('elevator')
                },
                {
                    id: 'wheelchair',
                    icon: 'wheelchair',
                    name: 'Wheelchair Accessible',
                    active: this.property.getBasicAmenity('wheelchair')
                }
            ],
            basic: [
                {
                    id: 'laundry',
                    icon: 'laundry',
                    name: 'Laundry Available',
                    active: this.property.getBasicAmenity('laundry')
                },
                {
                    id: 'kitchen',
                    icon: 'kitchen',
                    name: 'Kitchen',
                    active: this.property.getBasicAmenity('kitchen')
                },
                {
                    id: 'internet',
                    icon: 'wifi',
                    name: 'Internet Available',
                    active: this.property.getBasicAmenity('internet')
                },
                {
                    id: 'room_service',
                    icon: 'roomService',
                    name: 'Room Service',
                    active: this.property.getBasicAmenity('room_service')
                },
                {
                    id: 'parking',
                    icon: 'parking',
                    name: 'Parking Available',
                    active: this.property.getBasicAmenity('parking')
                },
                {
                    id: 'cooling',
                    icon: 'ac',
                    name: 'Cooling',
                    active: this.property.getBasicAmenity('cooling')
                },
                {
                    id: 'car_rental',
                    icon: 'car',
                    name: 'Car Rental',
                    active: this.property.getBasicAmenity('car_rental')
                },
                {
                    id: 'hot_tub',
                    icon: 'hottub',
                    name: 'Hot Tub',
                    active: this.property.getBasicAmenity('hot_tub')
                },
                {
                    id: 'free_breakfast',
                    icon: 'coffee',
                    name: 'Free Breakfast',
                    active: this.property.getBasicAmenity('free_breakfast')
                },
                {
                    id: 'gym',
                    icon: 'gym',
                    name: 'Gym',
                    active: this.property.getBasicAmenity('gym')
                },
                {
                    id: 'pool',
                    icon: 'pool',
                    name: 'Pool',
                    active: this.property.getBasicAmenity('pool')
                },
                {
                    id: 'airport_shuttle',
                    icon: 'shuttle',
                    name: 'Airport Shuttle Service',
                    active: this.property.getBasicAmenity('airport_shuttle')
                }
            ],
            houseRules: [
                {
                    id: 'smoking',
                    icon: 'smoke',
                    name: 'Smoking Allowed',
                    active: this.property.getBasicAmenity('smoking')
                },
                {
                    id: 'children_friendly',
                    icon: 'prom',
                    name: 'Children Friendly',
                    active: this.property.getBasicAmenity('children_friendly')
                },
                {
                    id: 'pets',
                    icon: 'pet',
                    name: 'Pets Allowed',
                    active: this.property.getBasicAmenity('pets')
                }
            ]
        };
    }

    componentWillReceiveProps(nextProps) {
        this.property = new PropertyModel(nextProps.create ? nextProps.newProperty : nextProps.property);
    }

    toggleAmenity(section, name) {
        let sectionArray = this.state[section];
        let isActive = false;
        let id = '';
        sectionArray.forEach((a) => {
            if (a.name === name) {
                isActive = !a.active;
                id = a.id;
                a.active = isActive;
            }
        });
        this.setState({
            [section]: sectionArray
        });

        const amens = this.property.getBasicAmenities();
        this.saveChanges('basic_amenities', amens.set(id, isActive));
    }

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

    render() {
        return (
            <section className="amenities step">
                <TitleHeader title="Amenities (optional)" icon="tv" subtitle="Click to enable/disable"/>
                <Section
                    title={ 'Basic' }
                    customContent={ amenities(this.state.basic, (name) => this.toggleAmenity('basic', name)) }/>
                <Section
                    title={ 'Accessibility' }
                    customContent={ amenities(this.state.accessibility, (name) => this.toggleAmenity('accessibility', name)) }/>
                <Section
                    title={ 'House Rules' }
                    customContent={ amenities(this.state.houseRules, (name) => this.toggleAmenity('houseRules', name)) }/>
                <Section
                    title={ 'Additional Amenities' }
                    counter={ 500 }
                    id="amens"
                    onSaveChanges={ (val) => this.saveChanges('additional_amenities', val) }
                    text={ this.property.getAdditionalAmenities() }/>
            </section>
        );
    }
}

const amenities = (amens, onClick) => {
    return (
        <div>
            <div className="amenities-list">
            {
                amens.map((am) => {
                    return (
                        <div className={ 'amen' + (am.active ? ' active' : '') } key={ am.name } onClick={ () => onClick(am.name) }>
                            <div className="icon"><SVG icon={ am.icon } /></div>
                            <div>{ am.name }</div>
                        </div>
                    );
                })
            }
            </div>
        </div>
    );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Amenities);
