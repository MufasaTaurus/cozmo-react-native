import React from 'react';
import Filter from '.././Filter';
import PlacesAutocomplete from 'components/PlacesAutocomplete';
import './location.less';

export class LocationFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: props.value
        };
    }

    onApply() {
        this.props.onChange(this.state.location);
    }

    onSelectLocation(point) {
        this.setState({ location: point.address_components[0].long_name });
    }

    render() {
        const content =
            <div className="form">
                <PlacesAutocomplete
                    defaultValue={ this.state.location }
                    placeholder="Search Location"
                    onSelect={ (val) => this.onSelectLocation(val) } />
            </div>;
        return (
            <div className="location-filter">
                <Filter
                    name={ this.props.value ? this.props.value : 'Location' }
                    isApplied={ !!this.props.value }
                    icon="pin"
                    content={ content }
                    onApply={ () => this.onApply() }
                    { ...this.props }
                />
            </div>
        );
    }
}

export default LocationFilter;
