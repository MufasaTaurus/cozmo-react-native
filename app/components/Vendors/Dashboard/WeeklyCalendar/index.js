import React from 'react';
import moment from 'moment';
import ButtonNew from 'components/ButtonNew';
import SearchBox from 'components/SearchBox';
import SVG from 'components/SVG';
import Pagination from 'components/Pagination';
import Spinner from 'components/Spinner';
import Job from './Job';
import Reservation from './Reservation';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectWeeklyCalendar, selectCalendarPagination, selectLoadingCalendar, makeSelectJobsLoading } from 'containers/Vendors/selectors';
import { fetchReservationsCalendar } from 'containers/Vendors/actions';
import './weeklyCalendar.less';

export class WeeklyCalendar extends React.Component {

    constructor(props) {
        super(props);
        const firstDay = moment().subtract(moment().day(), 'd');
        this.state = {
            currentDate: firstDay,
            numberOfDays: 7,
            today: moment(),
            calendarKey: firstDay.format('YYYY-MM-DD') + '-' + moment(firstDay).add(6, 'd').format('YYYY-MM-DD') + props.pagination.getCurrentPage(),
            minDate: moment().date(1).subtract(1, 'M'),
            maxDate: moment().date(1).add(3, 'M'),
        };
    }

    componentWillMount () {
        this.fetchData(this.state.currentDate, moment(this.state.currentDate).add(this.state.numberOfDays - 1, 'd'));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.loadingJobs && !nextProps.loadingJobs) {
            this.props.fetchReservationsCalendar({
                from: this.state.currentDate.format('YYYY-MM-DD'),
                to: moment(this.state.currentDate).add(this.state.numberOfDays - 1, 'd').format('YYYY-MM-DD')
            });
        }
    }

    nextPeriod() {
        const nextStartDate = moment(this.state.currentDate.add(this.state.numberOfDays, 'd'));
        this.setState({ currentDate: moment(nextStartDate) });
        this.fetchData(moment(nextStartDate), moment(nextStartDate).add(this.state.numberOfDays - 1, 'd'));
    }

    prevPeriod() {
        const prevStartDate = moment(this.state.currentDate.subtract(this.state.numberOfDays, 'd'));
        this.setState({ currentDate: moment(prevStartDate) });
        this.fetchData(moment(prevStartDate), moment(prevStartDate).add(this.state.numberOfDays - 1, 'd'));
    }

    canGoBack() {
        return this.state.currentDate.isAfter(this.state.minDate);
    }

    canGoForward() {
        return this.state.currentDate.isBefore(this.state.maxDate);
    }

    fetchData(fromDate, toDate) {
        const from = fromDate.format('YYYY-MM-DD');
        const to = toDate.format('YYYY-MM-DD');
        const key = from + '-' + to + this.props.pagination.getCurrentPage();
        const cachedData = this.props.events.get(key);
        this.setState({ calendarKey: key });
        if (!cachedData) {
            this.props.fetchReservationsCalendar({ from: from, to: to });
        }
    }

    fetchPage() {
        this.fetchData(this.state.currentDate, moment(this.state.currentDate).add(this.state.numberOfDays - 1, 'd'));
    }

    goToToday() {
        this.setState({ currentDate: moment().subtract(moment().day(), 'd') });
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

    getHeaderDates() {
        const firstDay = moment(this.state.currentDate);
        const lastDay = moment(moment(firstDay).add(this.state.numberOfDays, 'd'));
        return firstDay.format('D') + '-' + lastDay.format('D MMMM YYYY');
    }

    isToday(day) {
        return this.state.today.isSame(day, 'day');
    }

    getRows(days) {
        let rows = [];
        const events = this.props.events.get(this.state.calendarKey);
        if (events) {
            rows = events.map(e => this.getRow(days, e));
        }
        return rows;
    }

    getRow(days, event) {
        return (
            <div className="row" key={ event.getId() }>
                <div className="row-property">
                    <div className="property-name">{ event.getName() }</div>
                    <div className="property-address">{ event.getAddress() }</div>
                </div>
                { this.getWeek(days, event) }
            </div>
        );
    }

    getWeek(days, event) {
        return days.map(day => this.getDay(day, event));
    }

    getDay(day, event) {
        const reservation = this.getReservationForDay(day, event.getReservations());
        const reservationContinue = day.day() === 0 ? this.getReservationFromContinuingDay(day, event.getReservations()) : null;
        const job = this.getJobForDay(day, event.getJobs());
        const exitClean = !job && this.hasExitClean(day, event.getReservations());
        return (
            <div
                className={ 'day' + (this.isToday(day) ? ' today' : '') }
                onClick={ () => this.props.openJobCreation(day, event.getId()) }
                key={ day.format('DD') }>
                { reservation && <Reservation reservation={ reservation }/> }
                { reservationContinue &&
                    <Reservation
                        reservation={ reservationContinue }
                        continuing={ day.diff(reservationContinue.getStartDate(), 'days') } />
                }
                { job && <Job job={ job }/> }
                { exitClean && <Job unassigned/> }
            </div>
        );
    }

    getReservationForDay(day, reservations) {
        return reservations.filter(r => r.getStartDate().isSame(day, 'day'))[0];
    }

    getJobForDay(day, jobs) {
        return jobs.filter(j => j.getStartDay().isSame(day, 'day'))[0];
    }

    hasExitClean(day, reservations) {
        return reservations.filter(r => r.getEndDate().isSame(day, 'day'))[0];
    }

    getReservationFromContinuingDay(day, reservations) {
        let res = null;
        reservations.map(r => {
            if (day.isBetween(r.getStartDate(), moment(r.getEndDate()).add(1, 'd'), '[]', 'day')) {
                res = r;
            }
        });
        return res;
    }

    render() {
        const days = this.generateDays();
        return (
            <div className="vendors-weekly-calendar">
                <div className="calendar-header">
                    <div className="today">
                        <ButtonNew label="Today" className="small green ghost" onClick={ () => this.goToToday() }/>
                    </div>
                    <div className="dates">
                        <span className="arrow prev">
                            { this.canGoBack() &&
                                <SVG icon="play" size="20" onClick={ () => this.prevPeriod() }/>
                            }
                        </span>
                        <span className="period">{ this.getHeaderDates() }</span>
                        <span className="arrow next">
                            { this.canGoForward() &&
                                <SVG icon="play" size="20" onClick={ () => this.nextPeriod() }/>
                            }
                        </span>
                    </div>
                    <div className="switcher">
                        <div className="option" onClick={ () => this.props.changeView('month') }>Month</div>
                        <div className="option active">Week</div>
                    </div>
                </div>
                <div className="calendar">
                    <div className="header">
                        <div className="search">
                            <SearchBox/>
                        </div>
                        { days.map(d => {
                            const day = d.format('ddd D');
                            return (
                                <div
                                    className={ 'day-header' + (this.isToday(d) ? ' today' : '') }
                                    key={ day }>{ day }
                                </div>
                            );
                        })}
                    </div>
                    <div className="rows">
                        { this.props.loading && <div className="rows-disabler"><Spinner/></div> }
                        { this.getRows(days) }
                    </div>
                </div>
                <div className="vj-pagination-wrapper">
                    <Pagination pagination={ this.props.pagination } onChange={ () => this.fetchPage() }/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    events: selectWeeklyCalendar(),
    pagination: selectCalendarPagination(),
    loading: selectLoadingCalendar(),
    loadingJobs: makeSelectJobsLoading(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchReservationsCalendar: (data) => dispatch(fetchReservationsCalendar(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyCalendar);
