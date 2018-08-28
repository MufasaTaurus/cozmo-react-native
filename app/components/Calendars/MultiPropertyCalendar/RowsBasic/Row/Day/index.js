import React from 'react';
import moment from 'moment';
import Event from '../../../RowsBasic/Row/Event';
import ReservationModel from 'models/Reservation';

export class Day extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.selectedRange.from !== this.props.selectedRange.from ||
            nextProps.selectedRange.to !== this.props.selectedRange.to ||
            nextProps.hasEvent !== this.props.hasEvent ||
            nextProps.isStart !== this.props.isStart ||
            nextProps.isEnd !== this.props.isEnd ||
            nextState.renderedDay.toString() !== this.state.renderedDay.toString() ||
            nextState.className !== this.state.className
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            className: 'day',
            renderedDay: ''
        };
    }

    componentDidMount() {
        this.setState({
            className: this.getClassNameForDay(this.props.day),
            renderedDay: this.renderDay(this.props.day)
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.renderedDay.toString() !== this.state.renderedDay.toString() ||
            prevProps.hasEvent !== this.props.hasEvent ||
            prevProps.isStart !== this.props.isStart ||
            prevProps.isEnd !== this.props.isEnd ||
            prevState.className !== this.state.className) {
            this.setState({
                className: this.getClassNameForDay(this.props.day),
                renderedDay: this.renderDay(this.props.day)
            });
        }
    }

    isSelected(day) {
        if (this.props.selectedRange.from && this.props.selectedRange.to) {
            return day.isBetween(this.props.selectedRange.from, this.props.selectedRange.to, null, '[]');
        } else {
            return false;
        }
    }

    isSelectedFirstOrLast(day) {
        const from = this.props.selectedRange.from;
        const to = this.props.selectedRange.to;
        return from && from.isSame(day, 'day') || to && to.isSame(day, 'day');
    }

    getNumberOfDays(day) {
        const events = this.props.row.get('reservations');
        const event = events.filter((d) => moment(d.get('start_date')).isSame(day, 'day')).first();
        if (event) {
            return moment(event.get('end_date')).diff(moment(event.get('start_date')), 'd');
        } else {
            return 0;
        }
    }

    canSelect() {
        return !this.props.hasEvent;
    }

    getRateForDay(day) {
        const rate = this.props.row.get('rates')
            .filter(r => day.isBetween(moment(r.getIn(['time_frame', 'lower'])), moment(r.getIn(['time_frame', 'upper'])), 'day', '[]'))
            .first();
        return rate ? '$' + parseInt(rate.get('nightly'), 10) : '-';
    }

    getClassNameForDay() {
        const className = ['day'];

        if (this.props.hasEvent) {
            className.push('has-event');
        }
        if (this.props.isStart) {
            className.push('start');
        }
        if (this.props.isEnd) {
            className.push('end');
        }
        if (this.props.day.day() === 0 || this.props.day.day() === 6) {
            className.push('weekend');
        }

        return className.join(' ');
    }

    getReservationFromStartDay(day) {
        const events = this.props.row.get('reservations');
        let reservation = null;
        events.map(event => {
            if (moment(event.get('start_date')).isSame(day, 'day')) {
                reservation = new ReservationModel(event);
            }
        });

        return reservation;
    }

    getBlockingForDay(day) {
        const blockings = this.props.row.get('blockings');
        return blockings.filter(b => moment(b.get('time_frame').get('lower')).isSame(day, 'd')).first();
    }

    getBlockingDuration(blocking) {
        return moment(blocking.get('time_frame').get('upper')).diff(moment(blocking.get('time_frame').get('lower')), 'd');
    }

    getICalForDay(day) {
        return this.props.row.get('ical_events').filter(b => moment(b.getIn(['time_frame', 'lower'])).isSame(day, 'd')).first();
    }

    unblockDays(blocking) {
        this.props.unblock(blocking);
    }

    renderDay(day) {
        const canSelect = this.canSelect(day);
        const getEvent = () => {
            if (this.props.isStart) {
                const reservation = this.getReservationFromStartDay(day);
                const blocking = this.getBlockingForDay(day);
                const width = reservation ? this.getNumberOfDays(day) : this.getBlockingDuration(blocking);
                return <Event reservation={ reservation } blocking={ blocking } days={ width } onBlockingClick={ () => this.unblockDays(blocking) }/>;
            } else {
                return null;
            }
        };

        return (
            <div className="day-content"
                 onClick={ canSelect ? () => this.props.onSingleDaySelect(day) : () => {} }
                 onMouseDown={ canSelect ? () => this.props.startSelection(day) : () => {} }
                 onMouseUp={ canSelect ? () => this.props.endSelection() : () => {} }
                 onMouseEnter={ canSelect ? () => this.props.selectDay(day) : this.props.endSelection() }
            >
                { getEvent() }
            </div>
        );
    }

    render() {
        const day = this.props.day;
        const isSelected = this.isSelected(day);
        const isStartEnd = this.isSelectedFirstOrLast(day);
        return (
            <div className={ this.state.className + (isSelected ? ' selected' : '') + (isStartEnd ? ' first-or-last' : '') }>
                { this.state.renderedDay }
            </div>
        );
    }
}

export default Day;
