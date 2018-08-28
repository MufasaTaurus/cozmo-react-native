import React from 'react';
import debounce from 'lodash/debounce';
import AutoComplete from 'components/AutoComplete';

export class PlacesAutocomplete extends React.Component {

    constructor(props) {
        super(props);
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.autocompleteOK = google.maps.places.PlacesServiceStatus.OK;
        this.geocoder = new google.maps.Geocoder;
        this.fetchPredictions = debounce(this.fetchPredictions.bind(this), 300);
        this.state = {
            autocompleteItems: [],
            predictions: []
        };
    }

    fetchPredictions(value) {
        if (value.length) {
            this.autocompleteService.getPlacePredictions({
                //...this.props.options,
                input: value
            }, (predictions, status) => this.autocompleteCallback(predictions, status));

            this.props.onChange(value);
        }
    }

    autocompleteCallback(predictions, status) {
        if (status !== this.autocompleteOK) {
            //this.props.onError(status);
            this.clearAutocomplete();
            return;
        }

        // transform snake_case to camelCase
        const formattedSuggestion = (structured_formatting) => ({
            mainText: structured_formatting.main_text,
            secondaryText: structured_formatting.secondary_text,
        });

        this.setState({
            autocompleteItems: predictions.map((p, idx) => ({
                suggestion: p.description,
                placeId: p.place_id,
                index: idx,
                formattedSuggestion: formattedSuggestion(p.structured_formatting),
            })),
            predictions: predictions.map((p) => p.description)
        });
    }

    clearAutocomplete() {
        this.setState({
            autocompleteItems: []
        });
    }

    getLocation(item) {
        this.geocoder.geocode({ 'placeId': item.placeId }, (results, status) => {
            if (status === this.autocompleteOK) {
                this.props.onSelect(results[0]);
            }
        });
    }

    render() {
        return (
            <AutoComplete
                data={ this.state.predictions }
                onBlur={ this.props.onBlur }
                defaultValue={ this.props.defaultValue }
                onChange={ this.fetchPredictions }
                placeholder={ this.props.placeholder }
                onSelect={ (index) => this.getLocation(this.state.autocompleteItems[index]) }
            />
        );
    }
}

export default PlacesAutocomplete;
