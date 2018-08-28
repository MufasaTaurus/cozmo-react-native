import React from 'react';
import keys from 'lodash/keys';
import moment from 'moment';
import Jobs from './Jobs';
import SVG from 'components/SVG';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMonthlyCalendar, makeSelectJobsLoading } from 'containers/Vendors/selectors';
import { fetchCalendar } from 'containers/Vendors/actions';
import './monthlyCalendar.less';

export class MonthlyCalendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(),
            today: moment(),
            calendarKey: moment().format('MM-YYYY'),
            minDate: moment().date(1).subtract(1, 'M'),
            maxDate: moment().date(1).add(3, 'M'),
        };
    }

    componentWillMount() {
        this.fetchData(this.state.currentDate);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.loading && !nextProps.loading) {
            const date = this.state.currentDate;
            this.props.fetchCalendar({ month: date.format('MM'), year: date.format('YYYY') });
        }
    }

    nextPeriod() {
        const next = moment(this.state.currentDate).add(1, 'M');
        this.setState({ currentDate: next });
        this.fetchData(next);
    }

    prevPeriod() {
        const next = moment(this.state.currentDate).subtract(1, 'M');
        this.setState({ currentDate: next });
        this.fetchData(next);
    }

    canGoBack() {
        return this.state.currentDate.isAfter(this.state.minDate);
    }

    canGoForward() {
        return this.state.currentDate.isBefore(this.state.maxDate);
    }

    selectJobsForDay(day) {
        this.props.onDaySelected(day);
    }

    fetchData(date) {
        const month = date.format('MM');
        const year = date.format('YYYY');
        const key = month + '-' + year;
        const cachedData = this.props.events.get(key);
        this.setState({ calendarKey: key });
        if (!cachedData) {
            this.props.fetchCalendar({ month: month, year: year });
        }
    }

    generateDays() {
        const currentDate = this.state.currentDate;
        const firstDayOfMonth = moment({ year: currentDate.year(), month: currentDate.month(), day: 1 });
        const numberOfDaysInMonth = currentDate.daysInMonth();
        const firstDay = firstDayOfMonth.day();
        const previousMonthLastDay = firstDayOfMonth.subtract(1, 'd').date();
        const weeksInMonth = Math.ceil((numberOfDaysInMonth + firstDay) / 7);
        const monthDays = [];

        const isMonthBefore = (before, now) => {
            return before < now || (before === 11 && now === 0);
        };

        let day = 1;
        let month = currentDate.month();
        if (firstDay !== 0) {
            day = previousMonthLastDay - firstDay + 1;
            month = currentDate.month() - 1 < 0 ? 11 : currentDate.month() - 1;
        }
        for (let w = 0; w < weeksInMonth; w++) {
            const week = [];
            for (let i = 0; i < 7; i++) {
                week.push(moment({ day: day, month: month, year: currentDate.year() }));
                if (day === previousMonthLastDay && isMonthBefore(month, currentDate.month())) {
                    day = 0;
                    month = currentDate.month();
                }
                if (day === numberOfDaysInMonth && month === currentDate.month()) {
                    day = 0;
                    month = currentDate.month() + 1 < 12 ? currentDate.month() + 1 : 0;
                }
                day++;
            }
            monthDays.push(week);
        }

        return monthDays;
    }

    getHeaderDate() {
        return this.state.currentDate.format('MMMM YYYY');
    }

    isToday(day) {
        return this.state.today.isSame(day, 'day');
    }

    getClassNameForDay(day) {
        const className = ['day'];

        if (day.month() !== this.state.currentDate.month()) {
            className.push('disabled');
        }
        if (this.isToday(day)) {
            className.push('today');
        }

        return className.join(' ');
    }

    getJobsForDay(day) {
        const jobsComponents = [];
        const events = this.props.events.get(this.state.calendarKey);
        if (events) {
            const jobs = events.filter(e => e.date === day.format('YYYY-MM-DD'))[0];
            if (jobs) {
                keys(jobs.jobs).map(key => {
                    jobsComponents.push(<Jobs
                        status={ key }
                        number={ jobs.jobs[key] }
                        key={ key }
                        selected={ this.props.selected.day && this.props.selected.day.isSame(day, 'd') && this.props.selected.status ===  key }
                        onSelect={ (evt) => { this.selectJobsForDay(day); evt.stopPropagation();} }/>);
                });
            }
        }

        return jobsComponents;
    }

    render() {
        const days = this.generateDays();
        return (
            <div className="vendors-monthly-calendar">
                <div className="calendar-header">
                    <div className="dates">
                        <span className="arrow prev">
                            { this.canGoBack() &&
                                <SVG icon="play" size="20" onClick={ () => this.prevPeriod() }/>
                            }
                        </span>
                        <span className="period">{ this.getHeaderDate() }</span>
                        <span className="arrow next">
                            { this.canGoForward() &&
                                <SVG icon="play" size="20" onClick={ () => this.nextPeriod() }/>
                            }
                        </span>
                    </div>
                    <div className="switcher">
                        <div className="option active">Month</div>
                        <div className="option" onClick={ () => this.props.changeView('week') }>Week</div>
                    </div>
                </div>
                <div className="calendar">
                    <div className="header">
                        <div className="day-header">Sun</div>
                        <div className="day-header">Mon</div>
                        <div className="day-header">Tue</div>
                        <div className="day-header">Wed</div>
                        <div className="day-header">Thu</div>
                        <div className="day-header">Fri</div>
                        <div className="day-header">Sat</div>
                    </div>
                    <div className="rows">
                        { days.map((week, index) => {
                            return (
                                <div className="row" key={ index }>
                                    { week.map((day, index) => {
                                        const className = this.getClassNameForDay(day);
                                        return (
                                            <div
                                                key={ index }
                                                className={ className }
                                                onClick={ () => this.props.openJobCreation(day) }
                                            >
                                                <div className="day-number">{ day.format('D') }</div>
                                                { this.getJobsForDay(day) }
                                            </div>
                                        );
                                    }) }
                                </div>
                            );
                        }) }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    events: selectMonthlyCalendar(),
    loading: makeSelectJobsLoading(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchCalendar: (data) => dispatch(fetchCalendar(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyCalendar);
