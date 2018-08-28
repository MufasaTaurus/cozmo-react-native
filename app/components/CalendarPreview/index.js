import React from 'react';
import moment from 'moment';
import './calendarPreview.less';

export class CalendarPreview extends React.Component {

    constructor(props) {
        super(props);
        const date = moment().date(1);
        this.state = {
            currentDate: date,
            eventsDays: this.getEventDays(this.props.events),
            events: this.props.events,
            minDate: moment(date).subtract(3, 'M'),
            maxDate: moment(date).add(1, 'y'),
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            events: nextProps.events,
            eventsDays: this.getEventDays(nextProps.events)
        });
    }

    getEventDays(events) {
        const eventsDays = [];
        events.map((event) => {
            const start = moment(event.get('start'));
            const end = moment(event.get('end'));
            let day = start;
            while (day.isBetween(start, end, 'day', '[]')) {
                eventsDays.push(moment(day));
                day.add(1, 'day');
            }
        });

        return eventsDays;
    }

    prevMonth() {
        this.setState({
            currentDate: this.state.currentDate.subtract(1, 'M')
        });
    }

    nextMonth() {
        this.setState({
            currentDate: this.state.currentDate.add(1, 'M')
        });
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
                week.push(moment({ day: day, month: month, year: currentDate.year()}));
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

    hasEvent(day) {
        return this.state.eventsDays.filter((d) => d.isSame(day, 'day')).length > 0;
    }

    isStart(day) {
        return (this.state.events.filter((d) => moment(d.get('start')).isSame(day, 'day'))).size > 0;
    }

    isEnd(day) {
        return (this.state.events.filter((d) => moment(d.get('end')).isSame(day, 'day'))).size > 0;
    }

    isStartOrEndInOtherEvent(day) {
        const yesterday = moment(day).subtract(1, 'd');
        const tomorrow = moment(day).add(1, 'd');
        return this.hasEvent(yesterday) && this.hasEvent(tomorrow);
    }

    getClassNameForDay(day) {
        const className = [];

        if (day.month() !== this.state.currentDate.month()) {
            className.push('disabled');
        }
        if (this.hasEvent(day)) {
            className.push('has-event');
        }
        if (this.isStart(day)) {
            className.push('start');
        }
        if (this.isEnd(day)) {
            className.push('end');
        }
        if (this.isStartOrEndInOtherEvent(day)) {
            className.push('in-other-event');
        }

        return className.join(' ');
    }

    render() {
        return (
            <div className="calendar-preview">
                <div className="header">
                    { this.state.currentDate.isAfter(this.state.minDate) ?
                        <div className="arrow prev" onClick={ () => this.prevMonth() }>&#9652;</div>
                        : '' }
                    <div className="month">
                        { this.state.currentDate.format('MMMM YYYY') }
                    </div>
                    { this.state.currentDate.isBefore(this.state.maxDate) ?
                        <div className="arrow next" onClick={ () => this.nextMonth() }>&#9652;</div>
                        : '' }
                </div>
                <div className="body">
                    <div className="days-names">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                    </div>
                    { this.generateDays().map((week, index) => {
                        return (
                            <div className={ 'week' + (this.props.color ? ' ' + this.props.color : '') } key={ index }>
                                { week.map((day, index) => {
                                    const className = this.getClassNameForDay(day);
                                    return (
                                        <div
                                            key={ index }
                                            className={ className }
                                        >
                                            { day.format('D') }
                                        </div>
                                    );
                                }) }
                            </div>
                        );
                    }) }
                </div>
            </div>
        );
    }
}

CalendarPreview.defaultProps = {
    events: []
};

export default CalendarPreview;

