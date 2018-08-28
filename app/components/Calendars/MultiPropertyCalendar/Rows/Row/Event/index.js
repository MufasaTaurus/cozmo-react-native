import React from 'react';
import Tooltip from '../../../../Tooltip';
import EventStart from './EventStartImage';
import EventEnd from './EventEndImage';
import SVG from 'components/SVG';
import './event.less';

export class Event extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tooltip: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.tooltip !== this.state.tooltip;
    }

    toggleTooltip(evt) {
        evt.stopPropagation();
        this.setState({ tooltip: !this.state.tooltip });
    }

    render() {
        const { blocking, propertyCalendar, continuing, reservation, ical, reservationModel, onClick, eventColor, index } = this.props;
        const active = this.state.tooltip;
        let width = this.props.days * (propertyCalendar ? 145 : 62) + 16 + (continuing ? (blocking ? 38 : 95) : 0) - (reservation ? 28 : 0);
        width = index && continuing ? width - index * 28 : width;
        const color = blocking ? '#b0bec5' : ical ? (eventColor ? eventColor : '#FC7C78') : '#1e88e5';
        const shouldDisplayLabel = width > 55;
        return (
            <div className={ 'calendar-event' + (active ? ' active' : '') + (index && !continuing ? ' index-' + index : '') } onClick={ onClick ? onClick : (evt) => this.toggleTooltip(evt) }>
                <div className={ 'event-content' + (continuing ? ' continuing' : '') } style={{ width: width }}>
                    { reservationModel &&
                        <Tooltip
                            reservation={ reservationModel }
                            visible={ this.state.tooltip }
                            onClose={ () => this.setState({ tooltip: false }) }/>
                    }
                    { !continuing && <EventStart className="event-image" color={ color }/> }
                    <div className={ 'event-label' + (blocking ? ' blocking' : '') + (ical ? ' ical' : '') } style={{ background: color }}>
                        { shouldDisplayLabel && blocking && <SVG className="block-icon" icon="block" size="18"/> }
                        { shouldDisplayLabel && (blocking ? 'Blocked' : this.props.label) }
                    </div>
                    <EventEnd className="event-image" color={ color }/>
                </div>
            </div>
        );
    }
}

export default Event;
