import React from 'react';
//import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import Toolbar from './Toolbar';
import Rows from './Rows';
import RowsBasic from './RowsBasic';
import Filters from './Filters';
import Spinner from 'components/Spinner';
import DetailView from './DetailView';
import deferComponentRender from 'components/DeferComponentRender';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectReservationsCalendar, makeSelectFetchingCalendar, selectCalendarPagination, makeSelectCalendarView } from 'containers/Reservations/selectors';
import { fetchReservationsCalendar, populateCalendarFromCache, setCalendarView } from 'containers/Reservations/actions';
import { push } from 'react-router-redux';
import './multiPropertyCalendar.less';

export class MultiPropertyCalendar extends React.Component {

    constructor(props) {
        super(props);
        this.startDate = moment().subtract(7, 'd');
        this.currentDate = moment().subtract(7, 'd');
        this.state = {
            query: undefined,
            filters: { price: {} },
            days: this.generateDays(moment(this.startDate).add(1, 'Y')),
            currentMonth: moment()
        };

        // fetch 3 months
        this.fetchData(moment(this.currentDate), moment(this.currentDate).add(89, 'd'));
        this.currentDate = moment(this.currentDate).add(89, 'd');
        this.initialLoading = true;

        //this.registerFetchData = debounce(this.registerFetchData.bind(this), 500);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.loading && !nextProps.loading) {
            this.initialLoading = false;
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
        const nextStartDate = moment(this.currentDate).add(89, 'd');
        this.currentDate = moment(nextStartDate);
        this.fetchData(moment(nextStartDate), moment(nextStartDate).add(89, 'd'));
    }

    prevPeriod() {
        const prevStartDate = moment(this.currentDate.subtract(90, 'd'));
        this.currentDate = moment(prevStartDate);
        this.fetchData(moment(prevStartDate), moment(prevStartDate).add(89, 'd'));
    }

    nextPage() {
        if (this.props.pagination.canGoNext()) {
            this.props.pagination.nextPage();
            this.fetchData(moment(this.currentDate), moment(this.currentDate).add(89, 'd'));
        }
    }

    handleQueryChange(value) {
        this.setState({ query: value });
        this.registerFetchData();
    }

    onFiltersChange(filters) {
        this.setState({ filters: filters });
        if (filters.dates.from && filters.dates.to) {
            if (filters.dates.from.isBetween(this.state.days[0], this.state.days[this.state.days.length - 1])) {
                // scroll to date
                const isBasic = this.props.calendarView === 'basic';
                const rows = isBasic ? document.getElementById('rows-basic') : document.getElementById('rows');
                const header = document.getElementById('header');
                const offset = (filters.dates.from.diff(this.state.days[0], 'd') + 1) * 62;
                rows.scrollLeft = offset;
                header.scrollLeft = offset;
            } else {
                this.registerFetchData(filters.dates.from);
                this.startDate = moment(filters.dates.from);
                this.currentDate = moment(filters.dates.from).add(89, 'd');
            }
        }
        this.registerFetchData();
    }

    registerFetchData(from = moment(this.currentDate)) {
        this.props.pagination.setPage(1);
        this.fetchData(from, moment(from).add(89, 'd'), true);
    }

    goToToday() {
        const isBasic = this.props.calendarView === 'basic';
        const rows = isBasic ? document.getElementById('rows-basic') : document.getElementById('rows');
        const header = document.getElementById('header');
        rows.scrollLeft = isBasic ? 154 : 438;
        header.scrollLeft = isBasic ? 154 : 438;
    }

    goToMonth(day) {
        const rows = document.getElementById('rows');
        const header = document.getElementById('header');
        if (day.isBetween(this.startDate, this.currentDate)) {
            const offset = day.diff(this.startDate, 'd') * 62;
            rows.scrollLeft = offset;
            header.scrollLeft = offset;
        } else {
            this.startDate = moment(day);
            this.currentDate = moment(day).add(89, 'd');
            this.registerFetchData(day);
            rows.scrollLeft = 0;
            header.scrollLeft = 0;
        }
    }

    scrollNext() {
        const isBasic = this.props.calendarView === 'basic';
        const rows = isBasic ? document.getElementById('rows-basic') : document.getElementById('rows');
        const header = document.getElementById('header');
        const offset = 1488;
        rows.scrollLeft += offset;
        header.scrollLeft += offset;
    }

    scrollPrev() {
        const isBasic = this.props.calendarView === 'basic';
        const rows = isBasic ? document.getElementById('rows-basic') : document.getElementById('rows');
        const header = document.getElementById('header');
        const offset = 1488;
        rows.scrollLeft -= offset;
        header.scrollLeft -= offset;
    }

    setCalendarView() {
        this.props.setCalendarView(this.props.calendarView === 'basic' ? 'detail' : 'basic');
    }

    generateDays(endDate) {
        const days = [];
        let day = moment(this.startDate);
        const firstDay = moment(day);
        //const lastDay = moment(endDate);
        const lastDay = endDate || moment(this.currentDate);
        //const lastDay = moment(day).add(89, 'd');
        while (day.isBetween(firstDay, lastDay, 'day', '[)')) {
            days.push(moment(day));
            day.add(1, 'day');
        }

        return days;
    }

    render() {
        return (
            <div className="multi-property-calendar">
                { this.initialLoading && this.props.loading && <div className="disabler"><Spinner /></div> }
                <Toolbar
                    days={ this.state.days }
                    numberOfProperties={ this.props.pagination.getCount() }
                    goToToday={ () => this.goToToday() }
                    goToMonth={ (day) => this.goToMonth(day) }
                    setCalendarView={ () => this.setCalendarView() }
                    calendarView={ this.props.calendarView }
                    currentMonth={ this.state.currentMonth }
                    prev={ this.scrollPrev.bind(this) }
                    next={ this.scrollNext.bind(this) } />
                <Filters onChange={ (filters) => this.onFiltersChange(filters) }/>
                { this.props.calendarView === 'basic' ?
                    <RowsBasic
                        rows={ this.props.reservationsCalendar }
                        query={ this.state.query }
                        handleSearchQueryChange={ this.handleQueryChange.bind(this) }
                        loading={ this.props.loading }
                        fetchNextPeriod={ () => this.nextPeriod() }
                        fetchNextPage={ () => this.nextPage() }
                        numberOfProperties={ this.props.pagination.getCount() }
                        datesFilter={ this.state.filters.dates }
                        onCurrentMonthChange={ (value) => this.setState({ currentMonth: value }) }
                        days={ this.state.days } />
                    :
                    <Rows
                        rows={ this.props.reservationsCalendar }
                        query={ this.state.query }
                        handleSearchQueryChange={ this.handleQueryChange.bind(this) }
                        loading={ this.props.loading }
                        fetchNextPeriod={ () => this.nextPeriod() }
                        fetchNextPage={ () => this.nextPage() }
                        numberOfProperties={ this.props.pagination.getCount() }
                        datesFilter={ this.state.filters.dates }
                        onCurrentMonthChange={ (value) => this.setState({ currentMonth: value }) }
                        days={ this.state.days } />
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    reservationsCalendar: makeSelectReservationsCalendar(),
    loading: makeSelectFetchingCalendar(),
    pagination: selectCalendarPagination(),
    calendarView: makeSelectCalendarView()
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchReservationCalendar: (data) => dispatch(fetchReservationsCalendar(data)),
        populateCalendarFromCache: (data) => dispatch(populateCalendarFromCache(data)),
        gotToReservationDetails: (id) => dispatch(push('reservations/' + id)),
        setCalendarView: (view) => dispatch(setCalendarView(view)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiPropertyCalendar);
