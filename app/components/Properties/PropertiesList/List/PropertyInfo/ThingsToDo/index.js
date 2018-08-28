import React from 'react';
import debounce from 'lodash/debounce';
import Section from '../Section/index';
import Poi from './Poi/index';
import TitleHeader from 'components/TitleHeader';
import YelpAutocomplete from 'components/YelpAutocomplete';
import ButtonNew from 'components/ButtonNew';
import TextField from 'components/TextField';
import SVG from 'components/SVG';
import Map from 'components/Map';
import Spinner from 'components/Spinner';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateProperty, updateNewProperty, addPoi, removePoi, fetchNearbyPois, addYelpPoi, updatePoi, removeYelpPois } from 'containers/Properties/actions';
import { makeSelectSelectedProperty, makeSelectNewProperty, makeSelectLoading } from 'containers/Properties/selectors';
import PropertyModel from 'models/Property';
import { fromJS } from 'immutable';
import './thingsToDo.less';

export class ThingsToDo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startFromScratch: false,
            description: '',
            focusedLocation: {},
        };

        this.onDescChange = debounce(this.onDescChange.bind(this), 1000);
    }

    componentWillReceiveProps(nextProps) {
        const property = new PropertyModel(this.props.create ? this.props.newProperty : this.props.property);
        const nextProperty = new PropertyModel(nextProps.create ? nextProps.newProperty : nextProps.property);
        if (property.getYelpPois().size < nextProperty.getYelpPois().size) {
            this.props.addPoi(nextProperty.getYelpPois().toArray().map(poi => { return {
                id: nextProperty.getId(),
                name: poi.getName(),
                image: poi.getImage(),
                address: poi.getAddress(),
                url: poi.getUrl(),
                category: poi.getCategory(),
                coordinates: {
                    latitude: poi.getLatitude(),
                    longitude: poi.getLongitude()
                }
            };}));
            this.props.removeYelpPois({ id: nextProperty.getId() });
        }
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

    onSelectLocation(loc) {
        const poi = fromJS({
            id: loc.id,
            name: loc.name,
            coordinates: {
                latitude: loc.coordinates.latitude.toFixed(5),
                longitude: loc.coordinates.longitude.toFixed(5)
            },
            image: loc.image,
            address: loc.address,
            url: loc.url,
            category: loc.category
        });
        if (this.props.create) {
            const newPois = this.props.newProperty.get('yelpPois', fromJS([])).push(poi);
            this.props.updateNewProperty(this.props.newProperty.set('yelpPois', newPois));
        } else {
            const newPois = this.props.property.get('yelpPois', fromJS([])).push(poi);
            this.props.addYelpPoi({ id: this.props.property.get('id'), pois: newPois });
        }
    }

    onAddPoi(poi) {
        const property = this.props.create ? this.props.newProperty : this.props.property;
        this.props.addPoi({
            id: property.get('id'),
            name: poi.name,
            image: poi.image,
            address: poi.address,
            url: poi.url,
            category: poi.category,
            coordinates: {
                latitude: poi.position.lat.toFixed(5),
                longitude: poi.position.lng.toFixed(5)
            }
        });
    }

    onRemovePoi(id) {
        const property = this.props.create ? this.props.newProperty : this.props.property;
        this.props.removePoi({
            id: property.get('id'),
            poi: id
        });
    }

    onImageClick(location) {
        this.setState({ focusedLocation: location });
    }

    importFromYelp() {
        const property = new PropertyModel(this.props.create ? this.props.newProperty : this.props.property);
        this.props.fetchNearbyPois({
            latitude: property.getCoordinates().get('latitude'),
            longitude: property.getCoordinates().get('longitude'),
            radius: 3000,
            id: property.getId()
        });
    }

    canUseYelp() {
        const property = new PropertyModel(this.props.create ? this.props.newProperty : this.props.property);
        const latitude = property.getCoordinates().get('latitude');
        const longitude = property.getCoordinates().get('longitude');

        return latitude && longitude;
    }

    generateLocationArray(locations, type) {
        const isAdded = type === 'pois';
        return locations
            .toArray()
            .map(p => {
                return ({
                    id: p.getId(),
                    coordinates: p.getCoordinates(),
                    name: p.getName(),
                    address: p.getAddress(),
                    image: p.getImage(),
                    url: p.getUrl(),
                    category: p.getCategory(),
                    isAdded: isAdded,
                });
            });
    }

    onDescChange(value, id) {
        const property = new PropertyModel(this.props.create ? this.props.newProperty : this.props.property);
        this.props.updatePoi({
            description: value,
            id: id,
            prop: property.getId()
        });
    }

    render() {
        const property = this.props.create ? this.props.newProperty : this.props.property;
        const canUseYelp = this.canUseYelp();
        const propertyModel = new PropertyModel(property);
        const locations = (
            this.generateLocationArray(propertyModel.getYelpPois(), 'yelp')
            .concat(
                this.generateLocationArray(propertyModel.getPois(), 'pois'),
                [{ coordinates: propertyModel.getCoordinates(), isProperty: true }]
            )
        );
        const mapWithList = (
            <div className="map-with-list">
                { this.props.loading && <div className="disabler"><Spinner/></div> }
                <div className="start-over-button" onClick={ () => this.onRemovePoi() }>
                    <SVG icon="sync" className="icon" size={ 14 } />
                    Start Over
                </div>
                <div className="map-wrapper">
                    <div className="map">
                        <div className="places-wrapper">
                            <div className="places-input">
                                <YelpAutocomplete
                                    coordinates={ propertyModel.getCoordinates() }
                                    onSelection={ (loc) => this.onSelectLocation(loc) }/>
                            </div>
                        </div>
                        <Map
                            centerLocation={ this.state.focusedLocation }
                            locations={ locations }
                            withLabel={ true }
                            onAddPoi={ (poi) => this.onAddPoi(poi) }
                            onRemovePoi={ (poi) => this.onRemovePoi(poi) }
                        />
                    </div>
                </div>
                <div className="pois-list">
                    { propertyModel.getPois().map(loc => {
                        if (loc.getId()) {
                            return <Poi
                                key={ loc.getId() }
                                id={ loc.getId() }
                                name={ loc.getName() }
                                image={ loc.getImage() }
                                address={ loc.getAddress() }
                                category={ loc.getCategory() }
                                desc={ loc.getDescription() }
                                onRemove={ () => this.onRemovePoi(loc.getId()) }
                                onImageClick={ () => this.onImageClick(loc) }
                                onDescChange={ (value) => this.onDescChange(value, loc.getId()) }
                            />;
                        }
                    }) }
                </div>
            </div>
        );
        const emptyState = (
            <div className="pois">
                { this.props.loading && <div className="disabler"><Spinner/></div> }
                <div className="pois-empty-state">
                    <div><SVG icon="pinWithHeart" size="70"/></div>
                    <div className="title">Add pins of fun location</div>
                    <div className="subtitle">Add pins of interesting locations to your welcome letter.</div>
                    <div className="separator">
                        <div className="line"/>
                        <div className="text">start from</div>
                        <div className="line"/>
                    </div>
                    <div className="option-buttons">
                        <ButtonNew
                            ghost
                            onClick={ propertyModel.hasYelpPois() ? () => {} : () => this.importFromYelp() }
                            disabled={ !canUseYelp }
                            label="Yelp top rated"/>
                        <ButtonNew
                            ghost
                            onClick={ () => this.setState({ startFromScratch: true }) }
                            label="Scratch"/>
                    </div>
                </div>
            </div>
        );
        return (
            <section className="things-to-do step">
                <TitleHeader title="Things to do (optional)" icon="heart"/>
                <Section
                    title="Description"
                    customContent={
                        <TextField
                            multiLine
                            defaultValue={ propertyModel.getThingsToDo() }
                            onChange={ (evt) => this.saveChanges('things_to_do', evt.target.value) }
                            id="desc"/>
                    }
                />
                { locations.length > 1 || this.state.startFromScratch ?
                    <Section
                        title="Points of Interest"
                        customContent={ mapWithList }
                    />
                    :
                    emptyState
                }
            </section>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    property: makeSelectSelectedProperty(),
    loading: makeSelectLoading(),
    newProperty: makeSelectNewProperty()
});

export function mapDispatchToProps(dispatch) {
    return {
        updateProperty: (data) => dispatch(updateProperty(data)),
        updateNewProperty: (data) => dispatch(updateNewProperty(data)),
        addPoi: (data) => dispatch(addPoi(data)),
        removePoi: (data) => dispatch(removePoi(data)),
        fetchNearbyPois: (data) => dispatch(fetchNearbyPois(data)),
        addYelpPoi: (data) => dispatch(addYelpPoi(data)),
        updatePoi: (data) => dispatch(updatePoi(data)),
        removeYelpPois: (data) => dispatch(removeYelpPois(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThingsToDo);
