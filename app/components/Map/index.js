import React from 'react';
import isEqual from 'lodash/isEqual';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { compose, withStateHandlers } from 'recompose';
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import './map.less';

export class Map extends React.Component {

    shouldComponentUpdate(nextProps) {

        return (
            !isEqual(this.props.locations, nextProps.locations) ||
            !isEqual(this.props.centerLocation, nextProps.centerLocation)
        );
    }

    getPropertyLocation() {
        if (this.props.locations.length) {
            return this.props.locations.map((loc, index) => {
                return {
                    position: {
                        lat: parseFloat(loc.coordinates.get('latitude')),
                        lng: parseFloat(loc.coordinates.get('longitude')),
                    },
                    id: loc.id,
                    key: index,
                    defaultAnimation: loc.defaultAnimation || 2,
                    name: loc.name,
                    address: loc.address,
                    image: loc.image,
                    url: loc.url,
                    category: loc.category,
                    isAdded: loc.isAdded,
                    isProperty: loc.isProperty
                };
            });
        } else {
            return [];
        }
    }

    getDefaultCenter() {
        let lat = 39.5140265;
        let lng = -103.7125898;
        if (this.props.centerLocation.coordinates) {
            lat = parseFloat(this.props.centerLocation.coordinates.get('latitude', 39.5140265));
            lng = parseFloat(this.props.centerLocation.coordinates.get('longitude', -103.7125898));
        } else if (this.props.locations.length) {
            lat = parseFloat(this.props.locations[0].coordinates.get('latitude', 39.5140265));
            lng = parseFloat(this.props.locations[0].coordinates.get('longitude', -103.7125898));
        }
        return {
            lat: lat,
            lng: lng
        };
    }

    getDefaultZoom() {
        if (this.props.locations.length && this.props.locations[0].coordinates.get('latitude')) {
            return 14;
        } else {
            return 4;
        }
    }

    onAddPoi (evt, poi) {
        if (evt.target && evt.target.classList[0] === 'add-poi') {
            this.props.onAddPoi && this.props.onAddPoi(poi);
        }

    }

    render() {
        const GoogleMapWrapper = compose(withStateHandlers(() => ({
            isOpen: {},
        }), {
            onToggleOpen: () => (index, open) => ({
                isOpen: { [index]: open },
            })
        }), withGoogleMap)(props => (
            <GoogleMap
                ref={ props.onMapLoad }
                defaultZoom={ this.getDefaultZoom() }
                defaultCenter={ this.getDefaultCenter() }
                onClick={ props.onMapClick }
            >
                {props.markers.map((marker, index) => (
                    <MarkerWithLabel
                        {...marker}
                        onMouseOver={ () => props.onToggleOpen(index, true) }
                        //onMouseOut={ () => props.onToggleOpen(index, false) }
                        onClick={ (evt) => this.onAddPoi(evt, marker) }
                        labelVisible={ props.withLabel && !marker.isProperty && !!props.isOpen[index] }
                        clickable={ true }
                        labelAnchor={new google.maps.Point(10, 125)}
                    >
                        <div className="pin-popup">
                            <div className="image" style={{ backgroundImage: `url("${marker.image}")` }}>
                                { marker.isAdded ?
                                    <div className="remove-poi">added</div>
                                    :
                                    <div className="add-poi">add</div>
                                }
                            </div>
                            <div className="info">
                                <div className="name">{ marker.name }</div>
                                <div className="address">{ marker.address }</div>
                            </div>
                        </div>
                    </MarkerWithLabel>
                ))}
            </GoogleMap>
        ));

        return (
            <GoogleMapWrapper
                containerElement={ <div className="map-wrapper" /> }
                mapElement={ <div className="map" /> }
                onMapLoad={ () => {}}
                onMapClick={ () => {} }
                markers={ this.getPropertyLocation() }
                onMarkerRightClick={ () => {} }
                withLabel={ this.props.withLabel }
                toggleInfoBox={ (index, open) => this.toggleInfoBox(index, open) }
            />
        );
    }
}

Map.defaultProps = {
    centerLocation: {},
};

export default Map;
