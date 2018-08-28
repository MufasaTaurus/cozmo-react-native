import React from 'react';
import moment from 'moment';
import SVG from 'components/SVG';
import CreateEvent from '.././CreateEvent';
import ButtonNew from 'components/ButtonNew';
import Spinner from 'components/Spinner';
import MonthPicker from 'components/Calendars/MonthPicker';
import Event from './Event';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectPropertyCalendars, makeSelectFetchingCalendar, selectCalendarCurrentDate } from 'containers/Reservations/selectors';
import { fetchReservationsCalendarProperty, setCalendarCurrentDate, openIcalEvent } from 'containers/Reservations/actions';
import { selectWindowSize } from 'containers/App/selectors';
import ReservationModel from 'models/Reservation';
import './propertyCalendar.less';

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment().date(1),
            today: moment(),
            calendarKey: moment().format('MM-YYYY'),
            selectionMode: false,
            selectedRange: { from: null, to: null },
            createEvent: false,
            selected: null,
            blockings: null,
            reservations: null,
            icals: null,
            rates: null,
            eventDays: [],
            eventDaysWOIcal: [],
            baseRate: null,
            selectedRate: [],
            activeEvent: null,
            hoveredEvent: null
        };
    }

    componentWillMount() {
        this.fetchData(this.state.currentDate);
    }

    componentWillReceiveProps(nextProps) {
        // if (!nextProps.loading && this.props.loading) {
        //     this.fetchData(nextProps.currentMonth || this.state.currentDate);
        // }
        const month = nextProps.calendars.get(this.state.calendarKey);
        if (month) {
            this.populateWithData(month);
        }
        // if (nextProps.currentMonth && !nextProps.currentMonth.isSame(this.state.currentDate, 'd')) {
        //     this.setState({ currentDate: nextProps.currentMonth });
        //     this.fetchData(nextProps.currentMonth);
        // }

        if (nextProps.windowSize !== this.props.windowSize) {
            this.forceUpdate();
        }
    }

    nextPeriod() {
        const next = moment(this.state.currentDate).add(1, 'M');
        this.setState({ currentDate: next });
        //this.props.setCurrentDate(next);
        this.fetchData(next);
    }

    prevPeriod() {
        const next = moment(this.state.currentDate).subtract(1, 'M');
        this.setState({ currentDate: next });
        this.fetchData(next);
    }

    setToday() {
        const today = moment(this.state.today).date(1);
        this.setState({ currentDate: today });
        this.fetchData(today);
    }

    setMonth(day) {
        this.setState({ currentDate: day });
        this.fetchData(day);
    }

    fetchData(date) {
        //this.props.setCurrentDate(date);
        const propId = this.props.property.get('id');
        const from = moment(date).subtract(7, 'd').format('YYYY-MM-DD');
        const to = moment(date).add(1, 'M').add(6, 'd').format('YYYY-MM-DD');
        const key = propId + from;
        const existingData = this.props.calendars.get(key);
        if (existingData) {
            this.populateWithData(existingData);
        } else {
            this.props.fetchCalendar({
                from: from,
                to: to,
                id: propId
            });
        }
        this.setState({ calendarKey: key });
    }

    populateWithData(data) {
        const baseRate = data.get('rates').filter(r => !(r.getIn(['time_frame', 'lower']) && r.getIn(['time_frame', 'upper']))).first();
        const rates = data.get('rates').filter(r => r.getIn(['time_frame', 'lower']) && r.getIn(['time_frame', 'upper']));
        if (this.props.rates) {
            this.setState({
                rates: rates,
                baseRate: baseRate
            });
        } else {
            this.setState({
                blockings: data.get('blockings'),
                //reservations: data.get('reservations'),
                icals: data.get('ical_events'),
                rates: rates,
                baseRate: baseRate,
                //eventDays: this.getEventDays(data.get('reservations').concat(data.get('blockings'), data.get('ical_events'))),
                eventDays: this.getEventDays(data.get('blockings').concat(data.get('ical_events'))),
                //eventDaysWOIcal: this.getEventDays(data.get('reservations').concat(data.get('blockings')))
                eventDaysWOIcal: this.getEventDays(data.get('blockings'))
            });
        }
    }

    getEventDays(events) {
        const eventsDays = [];
        events.map((event) => {
            const start = moment(event.get('start_date') || event.getIn(['time_frame', 'lower']));
            const end = moment(event.get('end_date') || event.getIn(['time_frame', 'upper'])).subtract(1, 'd');
            let day = moment(start).add(1, 'd');
            while (day.isBetween(start, end, 'day', '[]')) {
                eventsDays.push(moment(day));
                day.add(1, 'day');
            }
        });

        return eventsDays;
    }

    isToday(day) {
        return this.state.today.isSame(day, 'day');
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

    hasEvent(day) {
        return this.state.eventDays.filter((d) => d.isSame(day, 'day')).length > 0;
    }

    hasEventWOIcal(day) {
        return this.state.eventDaysWOIcal.filter((d) => d.isSame(day, 'day')).length > 0;
    }

    isStart(day) {
        return (
            //this.state.reservations && this.state.reservations.filter((d) => moment(d.get('start_date')).isSame(day, 'day')).size > 0 ||
            this.state.blockings && this.state.blockings.filter((d) => moment(d.getIn(['time_frame', 'lower'])).isSame(day, 'day')).size > 0 ||
            this.state.icals && this.state.icals.filter((d) => moment(d.getIn(['time_frame', 'lower'])).isSame(day, 'day')).size > 0
        );
    }

    isEnd(day) {
        return (
            //this.state.reservations && this.state.reservations.filter((d) => moment(d.get('end_date')).isSame(day, 'day')).size > 0 ||
            this.state.blockings && this.state.blockings.filter((d) => moment(d.getIn(['time_frame', 'upper'])).isSame(day, 'day')).size > 0 ||
            this.state.icals && this.state.icals.filter((d) => moment(d.getIn(['time_frame', 'upper'])).isSame(day, 'day')).size > 0
        );
    }

    hasEventInsideSelection(endDay) {
        let day = moment(this.state.selectedRange.from);
        while (day.isBetween(this.state.selectedRange.from, endDay, 'day', '[]')) {
            if (this.hasEventWOIcal(day)) {
                return day;
            }
            day.add(1, 'd');
        }

        return false;
    }

    hasSeasonalRate(day) {
        if (!this.props.rates) { return false; }
        const rate = this.getRateForDay(day);
        return rate ? rate.get('seasonal') : false;
    }

    getClassNameForDay(day) {
        const className = ['day'];

        if (day.month() !== this.state.currentDate.month()) {
            className.push('disabled');
        }
        if (this.isToday(day)) {
            className.push('today');
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
        if (this.isSelected(day)) {
            className.push('selected');
        }
        if (this.isSelectedFirstOrLast(day)) {
            className.push('first-or-last');
        }
        if (this.hasSeasonalRate(day)) {
            className.push('seasonal');
        }

        return className.join(' ');
    }

    canSelect(day) {
        return !this.hasEventWOIcal(day);
    }

    starSelection(day) {
        if (this.state.createEvent) { return; }
        if (this.canSelect(day)) {
            this.setState({
                selectedRange: { from: day, to: null },
                selectionMode: true,
            });
        }
    }

    endSelection() {
        this.setState({ selectionMode: false });
        if (this.state.selectedRange.from && this.state.selectedRange.to) {
            this.setState({
                selectedRate: this.getSelectedRates(),
                createEvent: true
            });
        }
    }

    getSelectedRates() {
        const rates = [];
        let day = moment(this.state.selectedRange.from).add(1, 'd');
        while (day.isBetween(this.state.selectedRange.from, this.state.selectedRange.to, 'day', '[]')) {
            rates.push(this.getRateForDay(day));
            day.add(1, 'day');
        }
        return rates;
    }

    selectDay(day) {
        if (this.state.selectionMode) {
            const from = this.state.selectedRange.from;
            if (this.canSelect(day)) {
                if (from.isSameOrBefore(day)) {
                    this.setState({ selectedRange: { from: from, to: day } });
                } else {
                    const to = this.state.selectedRange.to;
                    this.setState({ selectedRange: { from: day, to: to } });
                }
            }
            const eventDay = this.hasEventInsideSelection(day);
            if (eventDay) {
                this.setState({ selectedRange: { from: from, to: eventDay.subtract(1, 'd') } });
            }
        }
    }

    onSingleDaySelect(day) {
        if (this.state.createEvent) { return; }
        if (this.canSelect(day)) {
            this.setState({
                selectedRange: { from: day, to: day },
                selectedRate: [this.getRateForDay(day)],
                createEvent: true,
            });
        }
    }

    cancelEventCreate() {
        this.setState({
            createEvent: false,
            selected: null,
            unblock: false,
            activeEvent: null,
            selectedRate: [],
            selectedRange: { from: null, to: null },
        });
    }

    getBlockingForDay(day) {
        return this.state.blockings && this.state.blockings.filter(b => moment(b.getIn(['time_frame', 'lower'])).isSame(day, 'd')).first();
    }

    getBlockingOrIcalDuration(blocking) {
        return moment(blocking.get('time_frame').get('upper')).diff(moment(blocking.get('time_frame').get('lower')), 'd');
    }

    getContinuingBlockingOrIcalDuration(blocking, day) {
        return moment(blocking.get('time_frame').get('upper')).diff(moment(day), 'd');
    }

    getBlockingFromContinuingDay(day) {
        if (!this.state.blockings) { return null; }
        let blocking = null;
        this.state.blockings.map(event => {
            if (day.isBetween(moment(event.get('time_frame').get('lower')), moment(event.get('time_frame').get('upper')), '[]', 'day')) {
                blocking = event;
            }
        });

        return blocking;
    }

    getReservationFromStartDay(day) {
        if (!this.state.reservations) { return null; }
        let reservation = null;
        this.state.reservations.map(event => {
            if (moment(event.get('start_date')).isSame(day, 'day')) {
                reservation = new ReservationModel(event);
            }
        });

        return reservation;
    }

    getReservationFromContinuingDay(day) {
        if (!this.state.reservations) { return null; }
        let reservation = null;
        this.state.reservations.map(event => {
            if (day.isBetween(moment(event.get('start_date')), moment(event.get('end_date')), '[]', 'day')) {
                reservation = new ReservationModel(event);
            }
        });

        return reservation;
    }

    getContinuingReservationDuration(reservation, day) {
        return reservation.getEndDate().diff(day, 'd');
    }

    onBlockingClicked(blocking, evt) {
        evt.stopPropagation();
        this.setState({
            unblock: blocking,
            createEvent: true,
            activeEvent: blocking.get('id')
        });
    }

    onIcalClicked(ical) {
        this.setState({ activeEvent: ical.get('id') });
        this.openIcalEvent(ical);
    }

    openIcalEvent(ical) {
        this.props.openIcalEvent({ id: ical.get('id'), open: !ical.get('open'), calendarKey: this.state.calendarKey });
    }

    getIcalsForDay(day) {
        return this.state.icals && this.state.icals
                .filter(b => moment(b.getIn(['time_frame', 'lower'])).isSame(day, 'd'))
                .sort((a, b) => moment(a.getIn(['time_frame', 'upper'])).isBefore(moment(b.getIn(['time_frame', 'upper']))))
                .take(4) || [];
    }

    getIcalsFromContinuingDay(day) {
        if (!this.state.icals) { return []; }
        let icals = [];
        this.state.icals.map(event => {
            if (day.isBetween(moment(event.get('time_frame').get('lower')).add(1, 'd'), moment(event.get('time_frame').get('upper')), '[]', 'day')) {
                if (icals.length < 4) {
                    icals.push(event);
                } else {
                    return;
                }
            }
        });

        return icals.sort((a, b) => moment(a.getIn(['time_frame', 'upper'])).isBefore(moment(b.getIn(['time_frame', 'upper']))));
    }

    getRateForDay(day) {
        if (!this.state.rates) { return null; }
        const seasonal = this.state.rates
            .filter(r => day.isBetween(moment(r.getIn(['time_frame', 'lower'])), moment(r.getIn(['time_frame', 'upper'])), 'day', '[]') && r.get('seasonal'))
            .last();
        const custom = this.state.rates
            .filter(r => day.isBetween(moment(r.getIn(['time_frame', 'lower'])), moment(r.getIn(['time_frame', 'upper'])), 'day', '[]') && !r.get('seasonal'))
            .last();
        const overridden = custom && seasonal ? custom.set('overridden', true) : null;
        return overridden || custom || seasonal || this.state.baseRate;
    }

    getRateValue(rate) {
        return rate ? '$' + parseInt(rate.get('nightly'), 10) : '-';
    }

    setEventsForDays(daysIcalEvents, day, days, index) {
        let events = daysIcalEvents;
        const limit = Math.min(days, 7 - day.day());
        for (let i = 0; i < limit; ++i) {
            if (events[day.day() + i - 1] > events[day.day() + i] + 1) {
                events[day.day() + i] = index + 1;
            } else {
                events[day.day() + i] ++;
            }
        }

        return events;
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
        let year = currentDate.year();
        if (firstDay !== 0) {
            day = previousMonthLastDay - firstDay + 1;
            month = currentDate.month() - 1 < 0 ? 11 : currentDate.month() - 1;
            year = currentDate.month() - 1 < 0 ? currentDate.year() - 1 : year;
        }
        for (let w = 0; w < weeksInMonth; w++) {
            const week = [];
            for (let i = 0; i < 7; i++) {
                week.push(moment({ day: day, month: month, year: year }));
                if (day === previousMonthLastDay && isMonthBefore(month, currentDate.month())) {
                    day = 0;
                    month = currentDate.month();
                    year = currentDate.year();
                }
                if (day === numberOfDaysInMonth && month === currentDate.month()) {
                    day = 0;
                    month = currentDate.month() + 1 < 12 ? currentDate.month() + 1 : 0;
                    year = currentDate.month() + 1 > 11 ? currentDate.year() + 1 : year;
                }
                day++;
            }
            monthDays.push(week);
        }

        return monthDays;
    }

    render() {
        const days = this.generateDays();
        return (
            <div className="monthly-calendar">
                { this.props.loading &&
                    <div className="disabler"><div className="vj-spinner-wrapper"><Spinner/></div></div>
                }
                <div className="header">
                    <div className="left">
                    </div>
                    <div className="center">
                        <MonthPicker day={ this.state.currentDate } onChange={ day => this.setMonth(day) }/>
                    </div>
                    <div className="right">
                        <div className="right-left">
                            <div className="arrows">
                                <div className="arrow arrow-left" onClick={ () => this.prevPeriod() }>
                                    <SVG icon="backArrow"/>
                                </div>
                                <div className="arrow arrow-right" onClick={ () => this.nextPeriod() }>
                                    <SVG icon="backArrow"/>
                                </div>
                            </div>
                            <ButtonNew
                                label="today"
                                className="small green ghost"
                                onClick={ () => this.setToday() }
                            />
                        </div>
                        <div className="right-right">
                            {/*{ !this.props.rates &&*/}
                                {/*<ButtonNew*/}
                                    {/*label="create"*/}
                                    {/*className="small"*/}
                                {/*/>*/}
                            {/*}*/}
                        </div>
                    </div>
                </div>

                <div className="table-calendar">
                    <div className="table-header">
                        <div className="table-header-day">Sun</div>
                        <div className="table-header-day">Mon</div>
                        <div className="table-header-day">Tue</div>
                        <div className="table-header-day">Wed</div>
                        <div className="table-header-day">Thu</div>
                        <div className="table-header-day">Fri</div>
                        <div className="table-header-day">Sat</div>
                    </div>
                    <div className="rows">
                        { days.map((week, weekIndex) => {
                            let daysIcalEvents = [0, 0, 0, 0, 0, 0, 0];
                            return (
                                <div className="row" key={ weekIndex }>
                                    { week.map((day, index) => {
                                        const className = this.getClassNameForDay(day);
                                        //const rate = this.getRateForDay(day);
                                        const blocking = this.getBlockingForDay(day);
                                        const continuingBlocking = blocking || index !== 0 ? null : this.getBlockingFromContinuingDay(day);
                                        //const reservation = this.getReservationFromStartDay(day);
                                        //const continuingReservation = reservation || index !== 0 ? null : this.getReservationFromContinuingDay(day);
                                        const icals = this.getIcalsForDay(day);
                                        const continuingIcals = index !== 0 ? [] : this.getIcalsFromContinuingDay(day);
                                        let icalIndex = daysIcalEvents[day.day()];
                                        return (
                                            <div
                                                key={ day.format('DDMMYY') }
                                                className={ className }
                                                onMouseDown={ () => this.starSelection(day) }
                                                onMouseUp={ () => this.endSelection() }
                                                onMouseEnter={ () => this.selectDay(day) }
                                                onClick={ () => this.onSingleDaySelect(day) }
                                            >
                                                <div className="day-top">
                                                    <div className="day-number">{ day.format('D') } { this.isToday(day) && <span className="today-label">Today</span> }</div>
                                                    {/*{ this.props.rates && <div className="rate-label">{ rate ? rate.get('label') : '' }</div> }*/}
                                                </div>
                                                <div className="day-middle">
                                                    <div className="icals">
                                                        { icals.map((ical, index) => {
                                                            icalIndex++;
                                                            const days = this.getBlockingOrIcalDuration(ical);
                                                            daysIcalEvents = this.setEventsForDays(daysIcalEvents, day, days, icalIndex - 1);
                                                            return (
                                                                <Event
                                                                    index={ icalIndex - 1 }
                                                                    key={ ical.get('id') }
                                                                    icalModel={ ical }
                                                                    active={ this.state.activeEvent === ical.get('id') }
                                                                    hovered={ this.state.hoveredEvent === ical.get('id') }
                                                                    days={ days }
                                                                    label={ day.day() === 6 && index < 2 ? '' : ical.get('name') + (ical.get('open') ? ' - OPENED' : '') }
                                                                    icalOpen={ ical.get('open') }
                                                                    onClick={ () => this.setState({ activeEvent: ical.get('id') }) }
                                                                    onOpenDates={ () => this.onIcalClicked(ical) }
                                                                    eventColor={ ical.get('color') }
                                                                    onClose={ () => this.setState({ activeEvent: null }) }
                                                                    onHover={ () => this.setState({ hoveredEvent: ical.get('id') }) }
                                                                    onHoverOut={ () => this.setState({ hoveredEvent: null }) }
                                                                    week={ weekIndex }
                                                                    ical propertyCalendar/>
                                                            );}
                                                        ) }
                                                        { continuingIcals.map((continuingIcal, index) => {
                                                            const days = this.getContinuingBlockingOrIcalDuration(continuingIcal, day);
                                                            daysIcalEvents = this.setEventsForDays(daysIcalEvents, day, days, icalIndex + index);
                                                            return (
                                                                <Event
                                                                    index={ icalIndex + index }
                                                                    key={ continuingIcal.get('id') }
                                                                    icalModel={ continuingIcal }
                                                                    active={ this.state.activeEvent === continuingIcal.get('id') }
                                                                    hovered={ this.state.hoveredEvent === continuingIcal.get('id') }
                                                                    days={ days }
                                                                    label={ continuingIcal.get('name') + (continuingIcal.get('open') ? ' - OPENED' : '') }
                                                                    icalOpen={ continuingIcal.get('open') }
                                                                    eventColor={ continuingIcal.get('color') }
                                                                    onClick={ () => this.setState({ activeEvent: continuingIcal.get('id') }) }
                                                                    onOpenDates={ () => this.onIcalClicked(continuingIcal) }
                                                                    onClose={ () => this.setState({ activeEvent: null }) }
                                                                    onHover={ () => this.setState({ hoveredEvent: continuingIcal.get('id') }) }
                                                                    onHoverOut={ () => this.setState({ hoveredEvent: null }) }
                                                                    week={ weekIndex }
                                                                    ical propertyCalendar continuing/>
                                                            );}
                                                        ) }
                                                    </div>
                                                    <div className="reservations">
                                                        {/*{ reservation && <Event days={ reservation.getDurationNumber() } active={ false } label={ reservation.getGuestFullName() } propertyCalendar/> }*/}
                                                        {/*{ continuingReservation && <Event days={ this.getContinuingReservationDuration(continuingReservation, day) } active={ false } label={ continuingReservation.getGuestFullName() } reservation propertyCalendar continuing/> }*/}
                                                    </div>
                                                    <div className="blockings">
                                                        { blocking && <Event
                                                            days={ (() => this.getBlockingOrIcalDuration(blocking))() }
                                                            onClick={ (evt) => this.onBlockingClicked(blocking, evt) }
                                                            active={ this.state.activeEvent === blocking.get('id') }
                                                            hovered={ this.state.hoveredEvent === blocking.get('id') }
                                                            onHover={ () => this.setState({ hoveredEvent: blocking.get('id') }) }
                                                            onHoverOut={ () => this.setState({ hoveredEvent: null }) }
                                                            blocking propertyCalendar/> }
                                                        { continuingBlocking && <Event
                                                            days={ (() => this.getContinuingBlockingOrIcalDuration(continuingBlocking, day))() }
                                                            active={ this.state.activeEvent === continuingBlocking.get('id') }
                                                            hovered={ this.state.hoveredEvent === continuingBlocking.get('id') }
                                                            onClick={ (evt) => this.onBlockingClicked(continuingBlocking, evt) }
                                                            onHover={ () => this.setState({ hoveredEvent: continuingBlocking.get('id') }) }
                                                            onHoverOut={ () => this.setState({ hoveredEvent: null }) }
                                                            blocking propertyCalendar continuing/> }
                                                    </div>
                                                </div>
                                                {/*<div className={ 'day-bottom' + (rate && rate.get('overridden') ? ' overridden' : '') }>*/}
                                                <div className="day-bottom">
                                                    <div className="day-nights">
                                                        <div className="day-nights-icon">
                                                            {/*<SVG icon="moonFilled" size="10"/>*/}
                                                        </div>
                                                        {/*<div className="day-nights-number">{ rate ? rate.get('min_stay') : 2 }</div>*/}
                                                        <div className="day-nights-number"/>
                                                    </div>
                                                    {/*<div className="day-price">{ this.getRateValue(rate) }</div>*/}
                                                    <div className="day-price"/>
                                                </div>
                                            </div>
                                        );
                                    }) }
                                </div>
                            );
                        }) }
                    </div>
                </div>
                <CreateEvent
                    open={ this.state.createEvent }
                    showRates={ this.props.rates }
                    rate={ this.state.selectedRate }
                    seasonal={ this.props.seasonal }
                    unblock={ this.state.unblock }
                    calendarKey={ this.state.calendarKey }
                    selected={{ dates: this.state.selectedRange, prop: { id: this.props.property.get('id'), name: this.props.property.get('name'), address: this.props.property.get('address'), image: this.props.property.get('cover_image') } }}
                    onCancel={ () => this.cancelEventCreate() }/>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    calendars: selectPropertyCalendars(),
    loading: makeSelectFetchingCalendar(),
    currentMonth: selectCalendarCurrentDate(),
    windowSize: selectWindowSize()
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchCalendar: (data) => dispatch(fetchReservationsCalendarProperty(data)),
        setCurrentDate: (data) => dispatch(setCalendarCurrentDate(data)),
        openIcalEvent: (data) => dispatch(openIcalEvent(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

