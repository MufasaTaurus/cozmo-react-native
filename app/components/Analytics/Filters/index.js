import React from 'react';
import PropertyPicker from 'components/PropertyPicker';
import SearchBox from 'components/SearchBox';
import Dropdown from 'components/Dropdown';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import moment from 'moment';
//import {fetchVendors} from 'containers/Vendors/actions';
//import {searchQuery} from 'containers/Vendors/selectors';
import './filters.less';


export class Filters extends React.Component {

    getDropdownOptions() {
        const months = [];
        const currentMonth = moment();
        const prevMonths = 12;
        let counter = moment(currentMonth);

        while (currentMonth.diff(counter, 'month') < prevMonths) {
            months.push({ name: counter.format('MMMM YYYY'), value: counter });
            counter.subtract(1, 'month');
        }

        return months;
    }

    render() {
        return (
            <div className="analytics-filters">
                <div className="property">
                    <div className="filter-label">Property</div>
                    <PropertyPicker
                        onSelect={ this.props.onPropertyChange }
                        //defaultValue={ this.state.prop }
                    />
                </div>
                <div className="date">
                    <div className="filter-label">Month</div>
                    <Dropdown options={ this.getDropdownOptions() }/>
                </div>
                <div className="search">
                    <SearchBox
                        placeholder={ 'Search...' }
                        //onChange={ (evt) => this.handleSearchQueryChange(evt.target.value) }
                        //value={ this.props.searchQuery }
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    //searchQuery: makeSelectSearchQuery(),
    // loading: makeSelectLoading()
});

export function mapDispatchToProps(dispatch) {
    return {
        //fetchVendors: () => dispatch(fetchVendors()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
