import React from 'react';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import Toolbar from './Toolbar';
import Rows from './Rows';
import RowsBasic from './RowsBasic';
import Filters from './Filters';
import Spinner from 'components/Spinner';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectReservationsCalendar, makeSelectFetchingCalendar, selectCalendarPagination, makeSelectCalendarView, selectCalendarFetchedDates } from 'containers/Reservations/selectors';
import { fetchReservationsCalendar, populateCalendarFromCache, setCalendarView, openIcalEvent } from 'containers/Reservations/actions';
import { push } from 'react-router-redux';
import './multiPropertyCalendar.less';

export class MultiPropertyCalendar extends React.Component {

    constructor(props) {
        super(props);
        this.daysCount = 59;
        this.startDate = moment().subtract(7, 'd');
        this.state = {
            query: undefined,
            filters: { price: {}, dates: { from: null, to: null } },
            currentDate: moment(this.startDate),
            loading: false
        };

        // fetch 3 months
        this.fetchData(moment(this.state.currentDate), moment(this.state.currentDate).add(this.daysCount - 1, 'd'));
        this.fetchData(moment(this.state.currentDate).add(this.daysCount, 'd'), moment(this.state.currentDate).add(2 * this.daysCount - 1, 'd'));
        this.initialLoading = true;

        this.registerFetchData = debounce(this.registerFetchData.bind(this), 300);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.loading && !nextProps.loading) {
            this.initialLoading = false;
            this.setState({ loading: false });
        }
    }

    fetchData(from, to, filtersChanged) {
        const format = 'YYYY-MM-DD';
        const fromDate = from.format(format);
        const toDate = to.format(format);
        this.props.fetchReservationCalendar({
            from: fromDate,
            to: toDate,
            search: this.state.query,
            capacity: this.state.filters.capacity,
            bedrooms: this.state.filters.bedrooms,
            bathrooms: this.state.filters.bathrooms,
            features: this.state.filters.amenities,
            price: this.state.filters.price,
            ordering: this.state.filters.ordering,
            filtersChanged: filtersChanged
        });
    }

    nextPeriod() {
        const nextStartDate = moment(this.state.currentDate).add(this.daysCount, 'd');
        this.setState({ currentDate: moment(nextStartDate) });
        if (!moment(nextStartDate).isBetween(this.props.fetchedDates.get('from'), this.props.fetchedDates.get('to'))) {
            this.setState({ loading: true });
        }
        this.fetchData(moment(nextStartDate).add(this.daysCount, 'd'), moment(nextStartDate).add(2 * this.daysCount - 1, 'd'));
    }

    prevPeriod() {
        const prevStartDate = moment(this.state.currentDate).subtract(this.daysCount, 'd');
        this.setState({ currentDate: moment(prevStartDate) });
        if (!moment(prevStartDate).isBetween(this.props.fetchedDates.get('from'), this.props.fetchedDates.get('to'))) {
            this.setState({ loading: true });
        }
        this.fetchData(moment(prevStartDate).subtract(this.daysCount, 'd'), moment(prevStartDate).subtract(this.daysCount - 1, 'd'));
    }

    nextPage() {
        this.fetchData(moment(this.state.currentDate), moment(this.state.currentDate).add(this.daysCount - 1, 'd'));
    }

    handleQueryChange(value) {
        this.setState({ query: value || undefined });
        setTimeout(() => this.registerFetchData(), 0);
    }

    onFiltersChange(filters) {
        this.setState({ filters: filters });
        if (filters.dates.from && filters.dates.to) {
            this.setState({ currentDate: filters.dates.from });
        } else {
            this.setState({ currentDate: moment(this.startDate) });
        }
        this.registerFetchData(filters.dates.from);
    }

    registerFetchData(from = moment(this.currentDate)) {
        this.props.pagination.setPage(1);
        this.fetchData(from, moment(from).add(this.daysCount - 1, 'd'), true);
    }

    goToToday() {
        this.setState({ currentDate: moment() });
    }

    goToMonth(day) {
        this.setState({ currentDate: day.date(1) });
    }

    setCalendarView() {
        const isBasic = this.props.calendarView === 'basic';
        this.props.setCalendarView(isBasic ? 'detail' : 'basic');
        this.daysCount = isBasic ? 21 : 59;
    }

    generateDays(endDate) {
        const days = [];
        let day = moment(this.state.currentDate);
        const firstDay = moment(day);
        const lastDay = endDate || moment(this.state.currentDate).add(this.daysCount, 'd');
        while (day.isBetween(firstDay, lastDay, 'day', '[)')) {
            days.push(moment(day));
            day.add(1, 'day');
        }

        return days;
    }

    render() {
        const days = this.generateDays();
        return (
            <div className="multi-property-calendar">
                { this.initialLoading && this.props.loading && <div className="disabler"><Spinner /></div> }
                <Toolbar
                    days={ days }
                    numberOfProperties={ this.props.pagination.getCount() }
                    goToToday={ () => this.goToToday() }
                    goToMonth={ (day) => this.goToMonth(day) }
                    setCalendarView={ () => this.setCalendarView() }
                    calendarView={ this.props.calendarView }
                    currentMonth={ this.state.currentDate }
                    prev={ this.prevPeriod.bind(this) }
                    next={ this.nextPeriod.bind(this) } />
                <Filters
                    onChange={ (filters) => this.onFiltersChange(filters) }
                    pagination={ this.props.pagination }
                    onPaginationChange={ () => this.nextPage() } />
                { this.props.calendarView === 'basic' ?
                    <RowsBasic
                        rows={ this.props.reservationsCalendar }
                        query={ this.state.query }
                        handleSearchQueryChange={ this.handleQueryChange.bind(this) }
                        loading={ this.state.loading }
                        fetchNextPeriod={ () => this.nextPeriod() }
                        fetchPrevPeriod={ () => this.prevPeriod() }
                        numberOfProperties={ this.props.pagination.getCount() }
                        datesFilter={ this.state.filters.dates }
                        openIcalEvent={ this.props.openIcalEvent }
                        onCurrentMonthChange={ (value) => this.setState({ currentMonth: value }) }
                        days={ days } />
                    :
                    <Rows
                        rows={ this.props.reservationsCalendar }
                        query={ this.state.query }
                        handleSearchQueryChange={ this.handleQueryChange.bind(this) }
                        loading={ this.props.loading }
                        fetchNextPeriod={ () => this.nextPeriod() }
                        fetchPrevPeriod={ () => this.prevPeriod() }
                        numberOfProperties={ this.props.pagination.getCount() }
                        datesFilter={ this.state.filters.dates }
                        openIcalEvent={ this.props.openIcalEvent }
                        onCurrentMonthChange={ (value) => this.setState({ currentMonth: value }) }
                        days={ days } />
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    reservationsCalendar: makeSelectReservationsCalendar(),
    loading: makeSelectFetchingCalendar(),
    pagination: selectCalendarPagination(),
    calendarView: makeSelectCalendarView(),
    fetchedDates: selectCalendarFetchedDates()
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchReservationCalendar: (data) => dispatch(fetchReservationsCalendar(data)),
        populateCalendarFromCache: (data) => dispatch(populateCalendarFromCache(data)),
        gotToReservationDetails: (id) => dispatch(push('reservations/' + id)),
        setCalendarView: (view) => dispatch(setCalendarView(view)),
        openIcalEvent: (data) => dispatch(openIcalEvent(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiPropertyCalendar);
