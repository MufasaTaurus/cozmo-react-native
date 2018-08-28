import React from 'react';
import moment from 'moment';
import './dateRangePicker.less';

export class DateRangePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: props.defaultValue || props.value || { from: null, to: null },
            currentDate: moment()
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selected: nextProps.defaultValue
        });
    }

    selectDate(date) {
        let from;
        let to;
        if (this.state.selected.from) {
            if (this.state.selected.to) {
                from = date;
                to = null;
            } else {
                if (this.state.selected.from.isBefore(date)) {
                    from = this.state.selected.from;
                    to = date;
                } else {
                    from = date;
                    to = this.state.selected.from;
                }
            }
        } else {
            from = date;
            to = null;
        }
        const dateRange = { from: from, to: to };
        this.setState({
            selected: dateRange
        });
        this.onAfterSelection(dateRange);
    }

    onAfterSelection(dateRange) {
        if (this.props.onSelect) {
            this.props.onSelect(dateRange);
        }
    }

    prevMonth() {
        this.setState({ currentDate: this.state.currentDate.subtract(1, 'M') });
    }

    nextMonth() {
        this.setState({ currentDate: this.state.currentDate.add(1, 'M') });
    }

    isToday(day) {
        return moment().isSame(day, 'day');
    }

    isSelected(day) {
        return (
            this.state.selected.from && this.state.selected.from.isSame(day, 'day') ||
            this.state.selected.to && this.state.selected.to.isSame(day, 'day'));
    }

    getClassNameForDay(day) {
        const className = ['day'];
        const from = this.state.selected.from;
        const to = this.state.selected.to;

        if (day.month() !== this.state.currentDate.month()) {
            className.push('disabled');
        }
        if (this.isToday(day)) {
            className.push('today');
        }
        if (this.isSelected(day)) {
            className.push('selected');
        }
        if (from && to && day.isBetween(from, to, null, '[]')) {
            className.push('in-range');
        }
        if (day.isSame(from)) {
            className.push('start');
        }
        if (day.isSame(to)) {
            className.push('end');
        }

        return className.join(' ');
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

    render() {
        return (
            <div className="date-range-picker-calendar">
                <div className="date-range-picker-calendar-calendar">
                    <div className="picker-header">
                        <div className="arrow prev" onClick={ () => this.prevMonth() }>&#9652;</div>
                        <div className="month">{ this.state.currentDate.format('MMMM YYYY') }</div>
                        <div className="arrow next" onClick={ () => this.nextMonth() }>&#9652;</div>
                    </div>
                    <div className="body">
                        <div className="days-names">
                            <div className="day">S</div>
                            <div className="day">M</div>
                            <div className="day">T</div>
                            <div className="day">W</div>
                            <div className="day">T</div>
                            <div className="day">F</div>
                            <div className="day">S</div>
                        </div>
                        { this.generateDays().map((week, index) => {
                            return (
                                <div className="week" key={ index }>
                                    { week.map((day, index) => {
                                        const className = this.getClassNameForDay(day);
                                        return (
                                            <div
                                                key={ index }
                                                className={ className }
                                                onClick={ () => this.selectDate(day) }
                                            >
                                                <div className="day-number">{ day.format('D') }</div>
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

export default DateRangePicker;
