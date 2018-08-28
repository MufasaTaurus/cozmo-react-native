import React from 'react';
import isEqual from 'lodash/isEqual';
import Pagination from 'components/Pagination';
import DateFilter from './DateFilter';
import LocationFilter from './LocationFilter';
import PriceFilter from './PriceFilter';
import CapacityFilter from './CapacityFilter';
import BedroomsFilter from './BedroomsFilter';
import BathroomsFilter from './BathroomsFilter';
import AmenitiesFilter from './AmenitiesFilter';
import SortBy from './SortBy';
import './filters.less';

export class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            capacity: undefined,
            bedrooms: undefined,
            bathrooms: undefined,
            price: { min: undefined, max: undefined },
            location: undefined,
            amenities: undefined,
            dates: { from: null, to: null },
            ordering: null,
        };
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return !isEqual(nextState, this.state);
    // }

    onChange(filter, value) {
        this.setState({
            [filter]: value
        });
        setTimeout(() => this.props.onChange(this.state), 0);
    }

    canReset() {
        const s = this.state;
        return !!(
            s.capacity ||
            s.bedrooms ||
            s.bathrooms ||
            s.price.min || s.price.max ||
            s.location ||
            s.amenities || s.dates.from || s.dates.to);
    }

    resetAll() {
        this.setState({
            capacity: undefined,
            bedrooms: undefined,
            bathrooms: undefined,
            price: { min: undefined, max: undefined },
            location: undefined,
            amenities: undefined,
            dates: { from: null, to: null }
        });
        setTimeout(() => this.props.onChange(this.state), 0);
    }

    render() {
        const canReset = this.canReset();
        return (
            <div className="calendar-filters">
                <span className="refine">Refine Search:</span>
                <div className="filters">
                    <DateFilter
                        value={ this.state.dates }
                        onReset={ () => this.onChange('dates', { from: null, to: null }) }
                        onChange={ (val) => this.onChange('dates', val) }
                    />
                    {/*<LocationFilter*/}
                        {/*value={ this.state.location }*/}
                        {/*onReset={ () => this.onChange('location', '') }*/}
                        {/*onChange={ (val) => this.onChange('location', val) }*/}
                    {/*/>*/}
                    {/*<PriceFilter*/}
                        {/*value={ this.state.price }*/}
                        {/*onReset={ () => this.onChange('price', { min: undefined, max: undefined }) }*/}
                        {/*onChange={ (val) => this.onChange('price', val) }*/}
                        {/*disabled={ !(this.state.dates.from && this.state.dates.to) }*/}
                    {/*/>*/}
                    <CapacityFilter
                        value={ this.state.capacity }
                        onReset={ () => this.onChange('capacity', undefined) }
                        onChange={ (val) => this.onChange('capacity', val) }
                    />
                    <BedroomsFilter
                        value={ this.state.bedrooms }
                        onReset={ () => this.onChange('bedrooms', undefined) }
                        onChange={ (val) => this.onChange('bedrooms', val) }
                    />
                    <BathroomsFilter
                        value={ this.state.bathrooms }
                        onReset={ () => this.onChange('bathrooms', undefined) }
                        onChange={ (val) => this.onChange('bathrooms', val) }
                    />
                    {/*<AmenitiesFilter*/}
                        {/*value={ this.state.amenities }*/}
                        {/*onReset={ () => this.onChange('amenities', undefined) }*/}
                        {/*onChange={ (val) => this.onChange('amenities', val) }*/}
                    {/*/>*/}
                </div>
                { canReset &&
                    <div className="reset-filters-button" onClick={ () => this.resetAll() }>
                        Reset all
                    </div>
                }
                <div className="pagination-wrapper">
                    <Pagination pagination={ this.props.pagination } onChange={ this.props.onPaginationChange }/>
                </div>
                <SortBy
                    value={ this.state.ordering }
                    onChange={ (val) => this.onChange('ordering', val) }
                />
            </div>
        );
    }
}

export default Filters;
