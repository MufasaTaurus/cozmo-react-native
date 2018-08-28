import React from 'react';
import moment from 'moment';
import onClickOutside from 'react-onclickoutside';
import './datePicker.less';

export class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: props.defaultValue || props.value || moment(),
            currentDate: moment(),
            open: false,
        };
    }

    handleClickOutside() {
        this.setState({ open: false });
        this.props.disableOnClickOutside();
    }

    toggleOpen() {
        this.setState({ open: !this.state.open });
        if (this.state.open) {
            this.props.disableOnClickOutside();
        } else {
            this.props.enableOnClickOutside();
        }
    }

    selectDate(date) {
        this.setState({
            selected: date,
            open: false,
        });
        this.onAfterSelection(date);
    }

    onAfterSelection(date) {
        if (this.props.onSelect) {
            this.props.onSelect(date);
        }
    }

    getSelectedDate() {
        return this.state.selected ? this.state.selected.format('MMMM DD, YYYY') : '';
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
        return this.state.selected.isSame(day, 'day');
    }

    getClassNameForDay(day) {
        const className = ['day'];

        if (day.month() !== this.state.currentDate.month()) {
            className.push('disabled');
        }
        if (this.isToday(day)) {
            className.push('today');
        }
        if (this.isSelected(day)) {
            className.push('selected');
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
        const { label } = this.props;
        return (
            <div className="date-picker-group">
                { label && <span className="date-picker-label">{ label }</span> }
                <div className="date-picker">
                    <div className="date-picker-selected-date" onClick={ () => this.toggleOpen() }>
                        <div className="value">{ this.getSelectedDate() }</div>
                        <span className="arrow-down">&#9662;</span>
                    </div>
                    { this.state.open &&
                    <div className="date-picker-dropdown">
                        <div className="date-picker-calendar">
                            <div className="calendar">
                                <div className="header">
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
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default onClickOutside(DatePicker);
