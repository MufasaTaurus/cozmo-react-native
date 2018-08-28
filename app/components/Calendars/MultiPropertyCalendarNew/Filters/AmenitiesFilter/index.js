import React from 'react';
import Filter from '.././Filter';
import SVG from 'components/SVG';
import './amenitiesFilter.less';

export class AmenitiesFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accessibility: [
                {
                    id: 'elevator',
                    icon: 'elevator',
                    name: 'Elevators Available',
                    active: false
                },
                {
                    id: 'wheelchair',
                    icon: 'wheelchair',
                    name: 'Wheelchair Accessible',
                    active: false
                }
            ],
            basic: [
                {
                    id: 'laundry',
                    icon: 'laundry',
                    name: 'Laundry Available',
                    active: false
                },
                {
                    id: 'kitchen',
                    icon: 'kitchen',
                    name: 'Kitchen',
                    active: false
                },
                {
                    id: 'internet',
                    icon: 'wifi',
                    name: 'Internet Available',
                    active: false
                },
                {
                    id: 'room_service',
                    icon: 'roomService',
                    name: 'Room Service',
                    active: false
                },
                {
                    id: 'parking',
                    icon: 'parking',
                    name: 'Parking Available',
                    active: false
                },
                {
                    id: 'cooling',
                    icon: 'ac',
                    name: 'Cooling',
                    active: false
                },
                {
                    id: 'car_rental',
                    icon: 'car',
                    name: 'Car Rental',
                    active: false
                },
                {
                    id: 'hot_tub',
                    icon: 'hottub',
                    name: 'Hot Tub',
                    active: false
                },
                {
                    id: 'free_breakfast',
                    icon: 'coffee',
                    name: 'Free Breakfast',
                    active: false
                },
                {
                    id: 'gym',
                    icon: 'gym',
                    name: 'Gym',
                    active: false
                },
                {
                    id: 'pool',
                    icon: 'pool',
                    name: 'Pool',
                    active: false
                },
                {
                    id: 'airport_shuttle',
                    icon: 'shuttle',
                    name: 'Airport Shuttle Service',
                    active: false
                }
            ],
            houseRules: [
                {
                    id: 'smoking',
                    icon: 'smoke',
                    name: 'Smoking Allowed',
                    active: false
                },
                {
                    id: 'children_friendly',
                    icon: 'prom',
                    name: 'Children Friendly',
                    active: false
                },
                {
                    id: 'pets',
                    icon: 'pet',
                    name: 'Pets Allowed',
                    active: false
                }
            ]
        };
    }

    toggleAmenity(section, name) {
        const sectionArray = this.state[section];
        sectionArray.forEach(a => {
            if (a.name === name) {
                a.active = !a.active;
            }
        });
        this.setState({
            [section]: sectionArray
        });
    }

    onApply() {
        const amens = [];
        this.state.accessibility.map(a => a.active && amens.push(a.id));
        this.state.basic.map(a => a.active && amens.push(a.id));
        this.state.houseRules.map(a => a.active && amens.push(a.id));

        amens.length ?
            this.props.onChange(amens)
            :
            this.props.onChange(undefined);
    }

    onReset() {
        this.state.accessibility.map(a => a.active = false);
        this.state.basic.map(a => a.active = false);
        this.state.houseRules.map(a => a.active = false);
        this.props.onReset();
    }

    render() {
        const content =
            <div className="amenities-filter-content">
                <div className="title">Basic</div>
                { amenities(this.state.basic, (name) => this.toggleAmenity('basic', name)) }
                <div className="title">Accessibility</div>
                { amenities(this.state.accessibility, (name) => this.toggleAmenity('accessibility', name)) }
                <div className="title">House Rule</div>
                { amenities(this.state.houseRules, (name) => this.toggleAmenity('houseRules', name)) }
            </div>;
        return (
            <div className="amenities-filter">
                <Filter
                    name={ 'Amenities' + (this.props.value ? ' (' + this.props.value.length + ')' : '') }
                    isApplied={ !!this.props.value }
                    icon="tv"
                    content={ content }
                    onApply={ () => this.onApply() }
                    onReset={ () => this.onReset() }
                />
            </div>
        );
    }
}

const amenities = (amens, onClick) => {
    return (
        <div className="amenities-list">
            { amens.map((am) => {
                return (
                    <div className={ 'amen' + (am.active ? ' active' : '') } key={ am.name } onClick={ () => onClick(am.name) }>
                        <div className="icon"><SVG icon={ am.icon } /></div>
                        <div>{ am.name }</div>
                    </div>
                );
            }) }
        </div>
    );
};

export default AmenitiesFilter;
