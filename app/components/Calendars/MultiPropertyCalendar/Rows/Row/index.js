import React from 'react';
import { fromJS } from 'immutable';
import VirtualList from 'react-tiny-virtual-list';
import throttle from 'lodash/throttle';
import moment from 'moment';
import Tooltip from '../../../Tooltip';
import CreateEvent from 'components/Calendars/CreateEvent';
import Event from './Event';
import Day from './Day';
import Month from './Month';
import PropertyInfo from '../../PropertyInfo';
import ReservationModel from 'models/Reservation';

export class Row extends React.Component {

    constructor(props) {
        super(props);
        this.startDate = moment().subtract(7, 'd');
        this.originalFirstVisibleDay = moment().subtract(7, 'd');
        this.firstVisibleDay = moment().subtract(7, 'd');
        this.state = {
            selectionMode: false,
            selectedRange: { from: null, to: null },
            selected: null,
            createEvent: false,
            eventDays: {},
            blockedDays: {},
            icalDays: {},
            reservationsStarts: {},
            reservationsEnds: {},
            blockingsStarts: {},
            blockingsEnds: {},
            iCalsStarts: {},
            iCalsEnds: {},
            unblock: null
        };

        //this.getFirstVisibleDay = throttle(this.getFirstVisibleDay.bind(this), 300);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.row.equals(this.props.row)) {
            //console.error('populate row')
            this.populateRow(nextProps.row);
        }
    }

    componentDidMount() {
        const rows = document.getElementById('rows');
        const property = document.getElementById('info' + this.props.row.get('id'));
        const originalTop = property.offsetTop;

        rows.addEventListener('scroll', () => {
            property.style.top = originalTop - rows.scrollTop + 'px';
            //this.getFirstVisibleDay(rows.scrollLeft);
        }, { passive: true });

        this.setState({
            eventDays: this.getEventDays(this.props.row.get('reservations') || fromJS([])),
            blockedDays: this.getBlockedDays(this.props.row.get('blockings') || fromJS([])),
            icalDays: this.getBlockedDays(this.props.row.get('ical_events') || fromJS([])),
            reservationsStarts: this.getReservationsStarts(this.props.row.get('reservations') || fromJS([])),
            reservationsEnds: this.getReservationsEnds(this.props.row.get('reservations') || fromJS([])),
            blockingsStarts: this.getBlockingsStarts(this.props.row.get('blockings') || fromJS([])),
            blockingsEnds: this.getBlockingsEnds(this.props.row.get('blockings') || fromJS([])),
            iCalsStarts: this.getBlockingsStarts(this.props.row.get('ical_events') || fromJS([])),
            iCalsEnds: this.getBlockingsEnds(this.props.row.get('ical_events') || fromJS([]))
        });
    }

    populateRow(data) {
        this.setState({
            eventDays: this.getEventDays(data.get('reservations')),
            blockedDays: this.getBlockedDays(data.get('blockings')),
            icalDays: this.getBlockedDays(data.get('ical_events')),
            reservationsStarts: this.getReservationsStarts(data.get('reservations')),
            reservationsEnds: this.getReservationsEnds(data.get('reservations')),
            blockingsStarts: this.getBlockingsStarts(data.get('blockings')),
            blockingsEnds: this.getBlockingsEnds(data.get('blockings')),
            iCalsStarts: this.getBlockingsStarts(data.get('ical_events')),
            iCalsEnds: this.getBlockingsEnds(data.get('ical_events'))
        });
    }

    // getFirstVisibleDay(scroll) {
    //     //this.setState({ firstVisibleDay: this.startDate.add(Math.ceil(scroll / 62), 'd') });
    //     this.firstVisibleDay = moment(this.startDate).add(Math.ceil(scroll / 62), 'd');
    //     //console.error(this.firstVisibleDay.diff(this.originalFirstVisibleDay, 'd'))
    //     if (this.firstVisibleDay.diff(this.originalFirstVisibleDay, 'd') > 20) {
    //         this.originalFirstVisibleDay = this.firstVisibleDay;
    //         this.forceUpdate();
    //     }
    // }

    getEventDays(events) {
        //const lastVisibleDay = moment(this.firstVisibleDay).add(40, 'd');
        //const eventsDays = [];
        const eventsDays = {};
        events.map((event) => {
            const start = moment(event.get('start_date'));
            const end = moment(event.get('end_date')).subtract(1, 'd');
            //if (start.isAfter(lastVisibleDay)) {
                let day = moment(start).add(1, 'd');
                while (day.isBetween(start, end, 'day', '[]')) {
                    //eventsDays.push(moment(day));
                    eventsDays[moment(day).format('DDMMYY')] = true;
                    day.add(1, 'day');
                }
            //}
        });

        return eventsDays;
    }

    getBlockedDays(events) {
        //const firstVisibleDay = this.props.firstVisibleDay.subtract(3, 'd');
        const lastVisibleDay = moment(this.firstVisibleDay).add(40, 'd');
        const eventsDays = {};
        events.map((event) => {
            const start = moment(event.get('time_frame').get('lower'));
            const end = moment(event.get('time_frame').get('upper')).subtract(1, 'd');
            //if (start.isAfter(lastVisibleDay)) {
                let day = moment(start).add(1, 'd');
                while (day.isBetween(start, end, 'day', '[]')) {
                    //eventsDays.push(moment(day));
                    eventsDays[moment(day).format('DDMMYY')] = true;
                    day.add(1, 'day');
                }
            //}
        });

        return eventsDays;
    }

    getReservationsStarts(events) {
        const starts = {};
        events.map(res => {
            starts[moment(res.get('start_date')).format('DDMMYY')] = true;
        });

        return starts;
    }

    getReservationsEnds(events) {
        const ends = {};
        events.map(res => {
            ends[moment(res.get('end_date')).format('DDMMYY')] = true;
        });

        return ends;
    }

    getBlockingsStarts(events) {
        const starts = {};
        events.map(res => {
            starts[moment(res.get('time_frame').get('lower')).format('DDMMYY')] = true;
        });

        return starts;
    }

    getBlockingsEnds(events) {
        const ends = {};
        events.map(res => {
            ends[moment(res.get('time_frame').get('upper')).format('DDMMYY')] = true;
        });

        return ends;
    }

    unblock(blocking) {
        this.setState({
            unblock: blocking,
            selected: {
                prop: {
                    id: this.props.row.get('id'),
                    name: this.props.row.get('name'),
                    address: this.props.row.get('address'),
                    image: this.props.row.get('cover_image')
                }
            },
            createEvent: true,
        });
    }

    isSelected(day) {
        if (this.state.selectedRange.from && this.state.selectedRange.to) {
            return day.isBetween(this.state.selectedRange.from, this.state.selectedRange.to, null, '[]');
        } else {
            return false;
        }
    }

    isSelectedFirstOrLast(day) {
        const from = this.state.selectedRange.from;
        const to = this.state.selectedRange.to;
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

    isFirstDayOfFilter(day) {
        if (this.props.datesFilter) {
            return day.isSame(this.props.datesFilter.from, 'd');
        } else {
            return false;
        }
    }

    isLastDayOfFilter(day) {
        if (this.props.datesFilter) {
            return day.isSame(this.props.datesFilter.to, 'd');
        } else {
            return false;
        }
    }

    getRateForDay(day) {
        const rate = this.props.row.get('rates')
            .filter(r => day.isBetween(moment(r.getIn(['time_frame', 'lower'])), moment(r.getIn(['time_frame', 'upper'])), 'day', '[]'))
            .first();
        return rate ? '$' + parseInt(rate.get('nightly'), 10) : '-';
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

    startSelection(day) {
        this.setState({
            selectedRange: { from: day, to: null },
            selectionMode: true,
        });
    }

    endSelection() {
        this.setState({ selectionMode: false });
        if (this.state.selectedRange.from && this.state.selectedRange.to) {
            this.setState({
                selected: {
                    dates: this.state.selectedRange,
                    prop: {
                        id: this.props.row.get('id'),
                        name: this.props.row.get('name'),
                        address: this.props.row.get('address'),
                        image: this.props.row.get('cover_image')
                    }
                },
                createEvent: true
            });
        }
    }

    selectDay(day) {
        if (this.state.selectionMode) {
            const from = this.state.selectedRange.from;
            if (from.isSameOrBefore(day)) {
                this.setState({ selectedRange: { from: from, to: day } });
            } else {
                const to = this.state.selectedRange.to;
                this.setState({ selectedRange: { from: day, to: to } });
            }
        }
    }

    onSingleDaySelect(day) {
        if (this.state.createEvent) { return; }
        this.setState({
            selectedRange: { from: day, to: day },
            selected: {
                dates: { from: day, to: day },
                prop: {
                    id: this.props.row.get('id'),
                    name: this.props.row.get('name'),
                    address: this.props.row.get('address'),
                    image: this.props.row.get('cover_image')
                }
            },
            createEvent: true,
        });
    }

    cancelEventCreate() {
        this.setState({
            createEvent: false,
            selected: null,
            selectionMode: false,
            selectedRange: { from: null, to: null }
        });
    }

    render() {
        //console.error(this.state.selectedRange.from)
        //console.error(this.state.selectedRange.to)
        const eventDays = Object.assign(this.state.eventDays, this.state.blockedDays);
        //const months = [this.props.days.slice(0, 30), this.props.days.slice(31, 60)];
        return (
            <div className="row">
                <PropertyInfo row={ this.props.row }/>
                <div className="days">
                    {/*{ this.props.days.map(day => <Day*/}
                        {/*key={ day.format('DDMMYY') }*/}
                        {/*day={ day }*/}
                        {/*eventDays={ eventDays }*/}
                        {/*icalDays={ this.state.icalDays }*/}
                        {/*startSelection={ () => this.startSelection(day) }*/}
                        {/*endSelection={ () => this.endSelection() }*/}
                        {/*selectDay={ () => this.selectDay(day) }*/}
                        {/*selectedRange={ this.state.selectedRange }*/}
                        {/*row={ this.props.row }/>) }*/}
                    { this.props.days.map((m, index) => <Month
                        eventDays={ eventDays }
                        reservationsStarts={ this.state.reservationsStarts }
                        reservationsEnds={ this.state.reservationsEnds }
                        blockingsStarts={ this.state.blockingsStarts }
                        blockingsEnds={ this.state.blockingsEnds }
                        iCalsStarts={ this.state.iCalsStarts }
                        iCalsEnds={ this.state.iCalsEnds }
                        selectedRange={ this.state.selectedRange }
                        startSelection={ (day) => this.startSelection(day) }
                        endSelection={ () => this.endSelection() }
                        selectDay={ (day) => this.selectDay(day) }
                        onSingleDaySelect={ (day) => this.onSingleDaySelect(day) }
                        unblock={ (blocking) => this.unblock(blocking) }
                        days={ m }
                        key={ index }
                        row={ this.props.row }
                        icalDays={ this.state.icalDays }/>) }
                </div>
                <CreateEvent
                    open={ this.state.createEvent }
                    selected={ this.state.selected }
                    unblock={ this.state.unblock }
                    onCancel={ () => this.cancelEventCreate() }/>
            </div>
        );
    }
}

export default Row;


