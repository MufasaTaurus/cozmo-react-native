import React from 'react';
import { fromJS } from 'immutable';
import moment from 'moment';
import Month from './Month';
import CreateEvent from 'components/Calendars/CreateEvent';
import PropertyInfo from '../../PropertyInfo';
import ReservationModel from 'models/Reservation';

export class Row extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectionMode: false,
            selectedRange: { from: null, to: null },
            selected: null,
            createEvent: false,
            unblock: null,
            eventDays: {},
            icalDays: {},
            visibleDay: moment().subtract(7, 'd'),
            reservationsStarts: {},
            reservationsEnds: {},
            blockingsStarts: {},
            blockingsEnds: {},
            iCalsStarts: {},
            iCalsEnds: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.row.equals(this.props.row)) {
            this.populateRow(nextProps.row);
        }
    }

    componentDidMount() {
        this.setState({
            //eventDays: this.getEventDays((this.props.row.get('reservations').concat(this.props.row.get('blockings'))) || fromJS([])),
            eventDays: this.getEventDays(this.props.row.get('blockings') || fromJS([])),
            //reservationsStarts: this.getReservationsStarts(this.props.row.get('reservations')),
            //reservationsEnds: this.getReservationsEnds(this.props.row.get('reservations')),
            blockingsStarts: this.getBlockingsStarts(this.props.row.get('blockings')),
            blockingsEnds: this.getBlockingsEnds(this.props.row.get('blockings')),
            icalDays: this.getEventDays(this.props.row.get('ical_events') || fromJS([])),
            iCalsStarts: this.getBlockingsStarts(this.props.row.get('ical_events') || fromJS([])),
            iCalsEnds: this.getBlockingsEnds(this.props.row.get('ical_events') || fromJS([]))
        });
    }

    populateRow(data) {
        this.setState({
            //eventDays: this.getEventDays(data.get('reservations').concat(data.get('blockings'))),
            eventDays: this.getEventDays(data.get('blockings')),
            //reservationsStarts: this.getReservationsStarts(data.get('reservations')),
            //reservationsEnds: this.getReservationsEnds(data.get('reservations')),
            blockingsStarts: this.getBlockingsStarts(data.get('blockings')),
            blockingsEnds: this.getBlockingsEnds(data.get('blockings')),
            icalDays: this.getEventDays(data.get('ical_events')),
            iCalsStarts: this.getBlockingsStarts(data.get('ical_events')),
            iCalsEnds: this.getBlockingsEnds(data.get('ical_events'))
        });
    }

    getEventDays(events) {
        const eventsDays = {};
        events.map((event) => {
            const start = moment(event.get('start_date') || event.getIn(['time_frame', 'lower']));
            const end = moment(event.get('end_date') || event.getIn(['time_frame', 'upper'])).subtract(1, 'd');
            let day = moment(start).add(1, 'd');
            while (day.isBetween(start, end, 'day', '[]')) {
                eventsDays[moment(day).format('DDMMYY')] = true;
                day.add(1, 'day');
            }
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

    cancelSelection() {
        this.setState({
            selectionMode: false,
            selectedRange: { from: null, to: null }
        });
    }

    cancelEventCreate() {
        this.setState({
            createEvent: false,
            selected: null,
            selectionMode: false,
            unblock: null,
            selectedRange: { from: null, to: null }
        });
    }

    getReservation(day) {
        const events = this.props.row.get('reservations');
        let reservation = new ReservationModel(fromJS({}));
        events.map(event => {
            if (day.isBetween(moment(event.get('start_date')), moment(event.get('end_date')), 'd', '[]')) {
                reservation = new ReservationModel(event);
            }
        });

        return reservation;
    }

    render() {
        return (
            <div className="row" onMouseLeave={ () => this.endSelection() }>
                <PropertyInfo row={ this.props.row } index={ this.props.index } basic/>
                <div className="days">
                    { this.props.days.map((m, index) => <Month
                        eventDays={ this.state.eventDays }
                        reservationsStarts={ this.state.reservationsStarts }
                        reservationsEnds={ this.state.reservationsEnds }
                        blockingsStarts={ this.state.blockingsStarts }
                        blockingsEnds={ this.state.blockingsEnds }
                        iCalsStarts={ this.state.iCalsStarts }
                        iCalsEnds={ this.state.iCalsEnds }
                        icalDays={ this.state.icalDays }
                        selectedRange={ this.state.selectedRange }
                        startSelection={ (day) => this.startSelection(day) }
                        endSelection={ () => this.endSelection() }
                        selectDay={ (day) => this.selectDay(day) }
                        onSingleDaySelect={ (day) => this.onSingleDaySelect(day) }
                        days={ m }
                        key={ index }
                        rowIndex={ this.props.index }
                        originalDays={ this.props.originalDays }
                        visibleDay={ this.props.visibleDay }
                        unblock={ (blocking) => this.unblock(blocking) }
                        row={ this.props.row }
                        openIcalEvent={ this.props.openIcalEvent }
                        />) }
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


