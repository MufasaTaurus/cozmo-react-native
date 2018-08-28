import React from 'react';
import PropertyName from 'components/PropertyName';
import SearchBox from 'components/SearchBox';
import onClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectProperties } from 'containers/App/selectors';
import { fromJS } from 'immutable';
import './propertyPicker.less';

export class PropertyPickerSmall extends React.Component {

    constructor(props) {
        super(props);
        let property = this.props.properties.first() || fromJS({});
        if (props.defaultValue) {
            const defaultProperty = this.props.properties.filter(p => p.get('id') === props.defaultValue).first();
            if (defaultProperty) {
                property = defaultProperty;
            }
        }
        this.state = {
            selectedProperty: property,
            open: false,
            query: ''
        };
    }

    componentWillMount() {
        this.onAfterSelection(this.state.selectedProperty);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.properties.size && nextProps.properties.size) {
            this.selectProperty(nextProps.properties.first() || fromJS({}));
        }
    }

    handleClickOutside() {
        this.setState({ open: false });
        this.props.disableOnClickOutside();
    }

    toggleOpen() {
        this.setState({ open: !this.state.open });
        if (this.state.open) {
            this.props.disableOnClickOutside();
        } else {
            this.props.enableOnClickOutside();
        }
    }

    selectProperty(property) {
        this.setState({
            selectedProperty: property,
            open: false,
            query: ''
        });
        this.onAfterSelection(property);
    }

    onAfterSelection(property) {
        if (this.props.onSelect) {
            this.props.onSelect(property);
        }
    }

    handleSearchQueryChange(query) {
        this.setState({ query: query });
    }

    filterProperty(property, query = '') {
        return (
            property.get('name').toLowerCase().indexOf(query.toLowerCase()) > -1 ||
            property.get('full_address').toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    }

    render() {
        return (
            <div className="property-picker-group">
                { this.props.label && <span className="property-picker-label">{ this.props.label }</span> }
                <div className="property-picker-small">
                    <div className="property-picker-selected-property" onClick={ () => this.toggleOpen() }>
                        <div className="value">{ this.state.selectedProperty.get('name') }</div>
                        <span className="arrow-down">&#9662;</span>
                    </div>
                    { this.state.open ?
                        <div className="property-picker-dropdown">
                            <div className="search-box-wrapper">
                                <SearchBox
                                    placeholder={ 'Search' }
                                    onChange={ (evt) => this.handleSearchQueryChange(evt.target.value) }
                                    value={ this.state.query }
                                />
                            </div>
                            <div className="property-picker-properties">
                                <div
                                    key='all'
                                    className="property-picker-properties-property"
                                    onClick={ () => this.selectProperty(fromJS({ name: 'All properties', id: '' })) }>
                                    All properties
                                </div>
                                { this.props.properties
                                    .filter(p => this.filterProperty(p, this.state.query))
                                    .map(property => {
                                        return (
                                            <div
                                                key={ property.get('id') }
                                                className="property-picker-properties-property"
                                                onClick={ () => this.selectProperty(property) }>
                                                { property.get('name') }
                                            </div>
                                        );
                                    }) }
                            </div>
                        </div>
                        : '' }
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    properties: makeSelectProperties(),
});

export default connect(mapStateToProps)(onClickOutside(PropertyPickerSmall));
