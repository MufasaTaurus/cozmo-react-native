import React from 'react';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import SVG from 'components/SVG';
import onClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { autocompletePoi } from 'containers/Properties/actions';
import { selectAutocomplete } from 'containers/Properties/selectors';
import { Poi } from 'models/Property';
import './yelpAutocomplete.less';

export class YelpAutocomplete extends React.Component {

    constructor(props) {
        super(props);
        this.fetchPredictions = debounce(this.fetchPredictions.bind(this), 300);
        this.state = {
            predictions: [],
            query: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.query) {
            this.setState({
                predictions: nextProps.predictions
                    .map(p => {
                        const poi = new Poi(p);
                        return ({
                            name: poi.getName(),
                            street: poi.getAddress(),
                            image: poi.getImage(),
                            address: poi.getAddress(),
                            url: poi.getUrl(),
                            category: poi.getCategory(),
                            coordinates: {
                                latitude: poi.getLatitude(),
                                longitude: poi.getLongitude()
                            }
                        });
                    })
                    .toArray()
            });
        }
    }

    handleClickOutside() {
        this.setState({ predictions: [] });
    }

    onChange(value) {
        this.setState({ query: value });
        this.fetchPredictions(value);
    }

    fetchPredictions(value) {
        if (value.length) {
            this.props.fetchPredictions({
                text: value,
                latitude: this.props.coordinates.get('latitude'),
                longitude: this.props.coordinates.get('longitude')
            });
        } else {
            this.setState({ predictions: [] });
        }
    }

    selectItem(item) {
        this.setState({
            query: '',
            predictions: [],
        });
        this.props.onSelection(item);
    }

    clearAutocomplete() {
        this.setState({
            predictions: []
        });
    }

    render() {
        return (
            <div className="yelp-autocomplete">
                <span className="yelp-autocomplete-icon"><SVG icon="search" size="20"/></span>
                <input className="yelp-autocomplete-input"
                       type="text"
                       placeholder="Search anything"
                       value={ this.state.query }
                       onChange={ (evt) => this.onChange(evt.target.value) }
                />
                { this.state.predictions.length ?
                    <div className="yelp-autocomplete-predictions">
                        <div className="yelp-autocomplete-predictions-items">
                            { this.state.predictions.map((p, index) => {
                                return (
                                    <div
                                        className="yelp-autocomplete-predictions-items-item"
                                        onClick={ () => this.selectItem(p) }
                                        key={ index }>
                                        <SVG className="pin-icon" icon="pin"/>
                                        <div className="address">
                                            <div className="name">{ p.name }</div>
                                            <div className="street">{ p.street }</div>
                                        </div>
                                    </div>
                                );
                            }) }
                        </div>
                    </div> : '' }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    predictions: selectAutocomplete(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchPredictions: (data) => dispatch(autocompletePoi(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(YelpAutocomplete));
