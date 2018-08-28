import React from 'react';
import moment from 'moment';
import InfoTooltip from './InfoTooltip';
import ReservationModel from 'models/Reservation';


export class Row extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tooltips: {} };
    }

    getEventDays(events) {
        const eventsDays = [];
        events.map((event) => {
            const start = moment(event.get('start_date'));
            const end = moment(event.get('end_date')).subtract(1, 'd');
            let day = moment(start).add(1, 'd');
            while (day.isBetween(start, end, 'day', '[]')) {
                eventsDays.push(moment(day));
                day.add(1, 'day');
            }
        });

        return eventsDays;
    }

    hasEvent(day) {
        return this.eventDays.filter((d) => d.isSame(day, 'day')).length > 0;
    }

    isStart(day) {
        const events = this.props.row.get('reservations');
        return (events.filter((d) => moment(d.get('start_date')).isSame(day, 'day'))).size > 0;
    }

    isEnd(day) {
        const events = this.props.row.get('reservations');
        return (events.filter((d) => moment(d.get('end_date')).isSame(day, 'day'))).size > 0;
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

    getClassNameForDay(day) {
        const className = [];

        if (this.hasEvent(day)) {
            className.push('has-event');
        }
        if (this.isStart(day)) {
            className.push('start');
        }
        if (this.isEnd(day)) {
            className.push('end');
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

    getReservationFromContinuingDay(day) {
        const events = this.props.row.get('reservations');
        let reservation = null;
        events.map(event => {
            if (day.isBetween(moment(event.get('start_date')), moment(event.get('end_date')).add(1, 'd'), '[]', 'day')) {
                reservation = new ReservationModel(event);
            }
        });

        return reservation;
    }

    toggleTooltip(day, state) {
        const tooltips = this.state.tooltips;
        tooltips[day.format('DDMM')] = state;
        this.setState({
            tooltips: tooltips
        });
    }

    isTooltipVisible(day) {
        return this.state.tooltips[day.format('DDMM')];
    }

    renderDay(day) {
        const visible = this.isTooltipVisible(day);
        const currentReservation = this.getReservationFromStartDay(day);
        const currentContReservation = this.getReservationFromContinuingDay(day);

        if (this.isEnd(day)) {
            return <div className="event-end" onClick={ () => this.props.onEventClick(currentContReservation.getId()) }/>;
        } else if (this.isStart(day)) {
            const oneNight = this.isEnd(moment(day).add(1, 'd'));
            const width = ((this.getNumberOfDays(day) * 100) + 100) + '%';
            return (
                <div className="event-start"
                     onClick={ () => this.props.onEventClick(currentReservation.getId()) }
                     onMouseEnter={ () => this.toggleTooltip(day, true) }
                     onMouseLeave={ () => this.toggleTooltip(day, false) } >
                    <div className="event-content" style={{ maxWidth: width }}>
                        <img className="image" src="https://cdn.voyajoy.com/images/preview.jpg"/>
                        <span className={ 'name' + (oneNight ? ' short' : '') }>{ currentReservation.getGuestFullName() }</span>
                    </div>
                    <InfoTooltip
                        visible={ visible }
                        propertyName={ this.props.row.get('name') }
                        propertyAddress={ this.props.row.get('street') }
                        propertyAvatar={ this.props.row.get('cover_image') }
                        reservation={ currentReservation }/>
                </div>
            );
        } else if (this.hasEvent(day) && day.isSame(this.props.days[0], 'd')) {
            return (
                <div className="event-continuing"
                     onClick={ () => this.props.onEventClick(currentContReservation.getId()) }
                     onMouseEnter={ () => this.toggleTooltip(day, true) }
                     onMouseLeave={ () => this.toggleTooltip(day, false) }>
                    <div className="event-content">
                        <img className="image" src="https://cdn.voyajoy.com/images/preview.jpg"/>
                        <span className="name">{ currentContReservation.getGuestFullName() }</span>
                    </div>
                    <InfoTooltip
                        visible={ visible }
                        propertyName={ this.props.row.get('name') }
                        propertyAddress={ this.props.row.get('street') }
                        propertyAvatar={ this.props.row.get('cover_image') }
                        reservation={ currentContReservation }/>
                </div>
            );
        } else {
            if (this.hasEvent(day)) {
                return <div className="event-select" onClick={ () => this.props.onEventClick(currentContReservation.getId()) } />;

            } else {
                if (this.props.hideRate) {
                    return '';
                } else {
                    const rates = this.props.row.get('rates');
                    return rates.size ? '$' + parseInt(rates.first().get('nightly'), 10) : '';
                }
            }
        }
    }

    render() {
        this.eventDays = this.getEventDays(this.props.row.get('reservations'));
        const row = this.props.row;
        return (
            <div className="row">
                <div className="info">
                    <div className="property">
                        <div><img className="image" src={ row.get('cover_image') } /></div>
                        <div>
                            <div className="name">{ row.get('name') }</div>
                            <div className="address">{ row.get('street') }</div>
                        </div>
                    </div>
                </div>
                <div className="days">
                    { this.props.days.map((day, index) => {
                        return (
                            <div key={ index } className={ 'day ' + this.getClassNameForDay(day) }>
                                { this.renderDay(day) }
                            </div>
                        );
                    }) }
                </div>
            </div>
        );
    }
}

export default Row;


