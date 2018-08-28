import React from 'react';
import { fromJS } from 'immutable';
import SearchBox from 'components/SearchBox';
import CleanerName from 'components/CleanerName';
import onClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCleaners } from 'containers/App/selectors';
import VendorModel from 'models/Vendor';
import './cleanerPicker.less';

export class CleanerPicker extends React.Component {

    constructor(props) {
        super(props);
        let cleaner = this.props.cleaners.first() || new VendorModel(fromJS({}));
        if (props.defaultValue) {
            const defaultProperty = this.props.cleaners.filter(c => c.getId() === props.defaultValue).first();
            if (defaultProperty) {
                cleaner = defaultProperty;
            }
        }
        this.state = {
            selected: cleaner,
            open: false,
            query: ''
        };
    }

    componentWillMount() {
        this.onAfterSelection(this.state.selected);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.cleaners.size && nextProps.cleaners.size) {
            this.selectCleaner(nextProps.cleaners.first() || new VendorModel(fromJS({})));
        }
    }

    handleClickOutside() {
        this.setState({ open: false });
        this.props.disableOnClickOutside();
    }

    getCleaners() {
        const cleaners = { assigned: [], rest: [] };
        if (this.props.property) {
            this.props.cleaners.map(cleaner => {
                if (cleaner.getAssignedProperties().indexOf(this.props.propId) > -1) {
                    cleaner.filterVendor(this.state.query) && cleaners.assigned.push(cleaner);
                } else {
                    cleaner.filterVendor(this.state.query) && cleaners.rest.push(cleaner);
                }
            });
        } else {
            cleaners.rest = this.props.cleaners.filter(c => c.filterVendor(this.state.query));
        }

        return cleaners;
    }

    toggleOpen() {
        this.setState({ open: !this.state.open });
        if (this.state.open) {
            this.props.disableOnClickOutside();
        } else {
            this.props.enableOnClickOutside();
        }
    }

    selectCleaner(cleaner) {
        this.setState({
            selected: cleaner,
            open: false,
            query: ''
        });
        this.onAfterSelection(cleaner);
    }

    onAfterSelection(property) {
        if (this.props.onSelect) {
            this.props.onSelect(property);
        }
    }

    handleSearchQueryChange(query) {
        this.setState({ query: query });
    }

    render() {
        const cleaners = this.getCleaners();
        return (
            <div className="cleaner-picker-group">
                { this.props.label && <span className="cleaner-picker-label">{ this.props.label }</span> }
                <div className="cleaner-picker">
                    <div className="cleaner-picker-selected-cleaner" onClick={ () => this.toggleOpen() }>
                        <div className="value"><CleanerName fullName={ this.state.selected.getFullName() }/></div>
                        <span className="arrow-down">&#9662;</span>
                    </div>
                    { this.state.open &&
                        <div className="cleaner-picker-dropdown">
                            <div className="search-box-wrapper">
                                <SearchBox
                                    placeholder={ 'Search' }
                                    onChange={ (evt) => this.handleSearchQueryChange(evt.target.value) }
                                    value={ this.state.query }
                                />
                            </div>
                            <div className="cleaner-picker-cleaners">
                                { cleaners.assigned.length > 0 &&
                                    <div>
                                        <div className="title">Cleaners for this property</div>
                                        { cleaners.assigned
                                            .map(cleaner => {
                                                return (
                                                    <div
                                                        key={ cleaner.getId() }
                                                        className="cleaner-picker-cleaners-cleaner"
                                                        onClick={ () => this.selectCleaner(cleaner) }>
                                                        <CleanerName fullName={ cleaner.getFullName() }/>
                                                    </div>
                                                );
                                            })
                                        }
                                        <div className="title">All Cleaners</div>
                                    </div>
                                }
                                { cleaners.rest
                                    .map(cleaner => {
                                        return (
                                            <div
                                                key={ cleaner.getId() }
                                                className="cleaner-picker-cleaners-cleaner"
                                                onClick={ () => this.selectCleaner(cleaner) }>
                                                <CleanerName fullName={ cleaner.getFullName() }/>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    cleaners: selectCleaners(),
});

export default connect(mapStateToProps)(onClickOutside(CleanerPicker));
