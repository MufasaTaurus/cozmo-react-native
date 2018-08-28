import React from 'react';
import Pagination from 'components/Pagination';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectReservationsCalendar, makeSelectFetchingCalendar, selectCalendarPagination } from 'containers/Reservations/selectors';
import { makeSelectMulticalendarCache } from 'containers/App/selectors';
import { fetchReservationsCalendar, populateCalendarFromCache } from 'containers/Reservations/actions';
import { push } from 'react-router-redux';
import Toolbar from './Toolbar';
import Header from './Header';
import Rows from './Rows';
import moment from 'moment';
import './multicalendar.less';


export class Multicalendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(),
            numberOfDays: 14,
            hideRate: false,
            query: ''
        };

        this.fetchData(moment(), moment().add(this.state.numberOfDays - 1, 'd'));
    }

    fetchData(from, to) {
        const format = 'YYYY-MM-DD';
        const fromDate = from.format(format);
        const toDate = to.format(format);
        const key = fromDate + toDate + this.props.pagination.getCurrentPage();
        const cachedData = this.props.cachedData.get(key);
        if (cachedData) {
            this.props.populateCalendarFromCache(cachedData);
        } else {
            this.props.fetchReservationCalendar({
                from: fromDate,
                to: toDate
            });
        }
    }

    getPage() {
        this.fetchData(moment(), moment().add(this.state.numberOfDays - 1, 'd'));
    }

    toggleRateVisibility() {
        this.setState({ hideRate: !this.state.hideRate});
    }

    nextPeriod() {
        const nextStartDate = moment(this.state.currentDate.add(this.state.numberOfDays, 'd'));
        this.setState({
            currentDate: moment(nextStartDate)
        });

        this.fetchData(moment(nextStartDate), moment(nextStartDate).add(this.state.numberOfDays - 1, 'd'));
    }

    prevPeriod() {
        const prevStartDate = moment(this.state.currentDate.subtract(this.state.numberOfDays, 'd'));
        this.setState({
            currentDate: moment(prevStartDate)
        });

        this.fetchData(moment(prevStartDate), moment(prevStartDate).add(this.state.numberOfDays - 1, 'd'));
    }

    changeNumberOfDays(days) {
        this.setState({ numberOfDays: days });
    }

    handleQueryChange(value) {
        this.setState({ query: value });
    }

    generateDays() {
        const days = [];
        let day = moment(this.state.currentDate);
        const firstDay = moment(day);
        const lastDay = moment(moment(day).add(this.state.numberOfDays, 'd'));
        while (day.isBetween(firstDay, lastDay, 'day', '[)')) {
            days.push(moment(day));
            day.add(1, 'day');
        }

        return days;
    }


    render() {
        const days = this.generateDays();
        return (
            <div className="multicalendar">
                <Toolbar
                    days={ days }
                    toggleRate={ this.toggleRateVisibility.bind(this) }
                    ratesHidden={ this.state.hideRate }
                    changeNumberOfDays={ this.changeNumberOfDays.bind(this) }
                    numberOfDays={ this.state.numberOfDays }
                    prev={ this.prevPeriod.bind(this) }
                    next={ this.nextPeriod.bind(this) } />
                <Header
                    query={ this.state.query }
                    handleSearchQueryChange={ this.handleQueryChange.bind(this) }
                    days={ days } />
                <Rows
                    rows={ this.props.reservationsCalendar }
                    query={ this.state.query }
                    loading={ this.props.loading }
                    hideRate={ this.state.hideRate }
                    onEventClick={ this.props.gotToReservationDetails }
                    days={ days } />
                <div className="vj-pagination-wrapper">
                    <Pagination pagination={ this.props.pagination } onChange={ () => this.getPage() }/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    reservationsCalendar: makeSelectReservationsCalendar(),
    loading: makeSelectFetchingCalendar(),
    cachedData: makeSelectMulticalendarCache(),
    pagination: selectCalendarPagination()
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchReservationCalendar: (data) => dispatch(fetchReservationsCalendar(data)),
        populateCalendarFromCache: (data) => dispatch(populateCalendarFromCache(data)),
        gotToReservationDetails: (id) => dispatch(push('reservations/' + id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Multicalendar);

