import React from 'react';
import { fromJS } from 'immutable';
import throttle from 'lodash/throttle';
import moment from 'moment';
import Month from './Month';
import CreateEvent from 'components/Calendars/CreateEvent';
import PropertyInfo from '../../PropertyInfo';
import Tooltip from '../../../Tooltip';
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
            unblock: null,
            eventDays: {},
            visibleDay: moment().subtract(7, 'd'),
            reservationsStarts: {},
            reservationsEnds: {},
            blockingsStarts: {},
            blockingsEnds: {},
        };

        //this.getFirstVisibleDay = throttle(this.getFirstVisibleDay.bind(this), 300);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.row.equals(this.props.row)) {
            this.populateRow(nextProps.row);
        }
    }

    componentDidMount() {
        const rows = document.getElementById('rows-basic');
        const property = document.getElementById('info' + this.props.row.get('id'));
        const originalTop = property.offsetTop;

        rows.addEventListener('scroll', () => {
            // @todo: check if there was a change
            property.style.top = originalTop - rows.scrollTop + 'px';
            //this.updateVisible(rows.scrollLeft);
            //this.getFirstVisibleDay(rows.scrollLeft);
        }, { passive: true });

        this.setState({
            eventDays: this.getEventDays((this.props.row.get('reservations').concat(this.props.row.get('blockings'))) || fromJS([])),
            reservationsStarts: this.getReservationsStarts(this.props.row.get('reservations')),
            reservationsEnds: this.getReservationsEnds(this.props.row.get('reservations')),
            blockingsStarts: this.getBlockingsStarts(this.props.row.get('blockings')),
            blockingsEnds: this.getBlockingsEnds(this.props.row.get('blockings')),
        });
    }

    updateVisible(scroll) {
        const currentDay = this.props.originalDays[Math.floor(scroll / 22)];
        if (Math.abs(currentDay.diff(this.state.visibleDay, 'd')) > 12) {
            this.setState({ visibleDay: currentDay });
        }
    }

    populateRow(data) {
        this.setState({
            eventDays: this.getEventDays(data.get('reservations').concat(data.get('blockings'))),
            reservationsStarts: this.getReservationsStarts(data.get('reservations')),
            reservationsEnds: this.getReservationsEnds(data.get('reservations')),
            blockingsStarts: this.getBlockingsStarts(data.get('blockings')),
            blockingsEnds: this.getBlockingsEnds(data.get('blockings')),
        });
    }

    getFirstVisibleDay(scroll) {
        //this.setState({ firstVisibleDay: this.startDate.add(Math.ceil(scroll / 62), 'd') });
        this.firstVisibleDay = moment(this.startDate).add(Math.ceil(scroll / 62), 'd');
        //console.error(this.firstVisibleDay.diff(this.originalFirstVisibleDay, 'd'))
        if (this.firstVisibleDay.diff(this.originalFirstVisibleDay, 'd') > 20) {
            this.originalFirstVisibleDay = this.firstVisibleDay;
            this.forceUpdate();
        }
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

    showTooltipForDay(day, e) {
        const classList = e.currentTarget.classList;
        if (classList.contains('has-event') || classList.contains('start') || classList.contains('end')) {
            const key = day.format('DDMMYY');
            this.setState({ tooltip: this.state.tooltip === key ? '' : key });
        }
    }

    renderDay(day) {
        if (!day.isBetween(moment(this.firstVisibleDay).subtract(5, 'd'), moment(this.firstVisibleDay).add(45, 'd'))) {
            return '';
        }
        return (
            <div className="day-content"
                 onMouseDown={ () => this.startSelection(day) }
                 onMouseUp={ () => this.endSelection() }
                 onMouseEnter={ () => this.selectDay(day) }
            >
                { this.state.tooltip === day.format('DDMMYY') &&
                    <Tooltip reservation={ (() => this.getReservation(day))() } visible={ true } onClose={ () => this.setState({ tooltip: '' }) }/>
                }
            </div>
        );
    }

    render() {
        return (
            <div className="row">
                <PropertyInfo row={ this.props.row } basic/>
                <div className="days">
                    { this.props.days.map((m, index) => <Month
                        eventDays={ this.state.eventDays }
                        reservationsStarts={ this.state.reservationsStarts }
                        reservationsEnds={ this.state.reservationsEnds }
                        blockingsStarts={ this.state.blockingsStarts }
                        blockingsEnds={ this.state.blockingsEnds }
                        selectedRange={ this.state.selectedRange }
                        startSelection={ (day) => this.startSelection(day) }
                        endSelection={ () => this.endSelection() }
                        selectDay={ (day) => this.selectDay(day) }
                        onSingleDaySelect={ (day) => this.onSingleDaySelect(day) }
                        days={ m }
                        key={ index }
                        visibleDay={ this.props.visibleDay }
                        unblock={ (blocking) => this.unblock(blocking) }
                        row={ this.props.row }
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


