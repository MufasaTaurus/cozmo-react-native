import React from 'react';
//import Tooltip from '../../../../Tooltip';
import Tooltip from './Tooltip';
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
        return nextState.tooltip !== this.state.tooltip || nextProps.icalOpen !== this.props.icalOpen;
    }

    toggleTooltip(evt) {
        evt.stopPropagation();
        this.setState({ tooltip: !this.state.tooltip });
    }

    render() {
        const { blocking, propertyCalendar, continuing, reservation, ical, reservationModel, onClick, eventColor, index, icalModel, onOpenDates, icalOpen } = this.props;
        const active = this.state.tooltip;
        let width = this.props.days * (propertyCalendar ? 145 : 62) + 16 + (continuing ? (blocking ? 73 : 74) : 0) - (reservation ? 28 : 0);
        width = index && continuing ? width - index * 28 : width;
        const color = blocking ? '#b0bec5' : ical ? (eventColor ? eventColor : '#757575') : '#1e88e5';
        const shouldDisplayLabel = width > 55;
        return (
            <div
                className={ 'calendar-event' + (active ? ' active' : '') + (index && !continuing ? ' index-' + index : '') + (this.state.tooltip ? ' has-tooltip' : '') }
                onClick={ (evt) => { this.toggleTooltip(evt); onClick(evt); } }
            >
                <div
                    className={ 'event-content' + (continuing ? ' continuing' : '') + (icalOpen ? ' open' : '') }
                    style={{ width: width }}>
                    {/*{ reservationModel &&*/}
                        {/*<Tooltip*/}
                            {/*reservation={ reservationModel }*/}
                            {/*visible={ this.state.tooltip }*/}
                            {/*onClose={ () => this.setState({ tooltip: false }) }/>*/}
                    {/*}*/}
                    { icalModel &&
                        <Tooltip
                            event={ icalModel }
                            visible={ this.state.tooltip }
                            onClick={ onOpenDates }
                            color={ color }
                            isOpen={ icalOpen }
                            week={ 1 }
                            isRightSide={ this.props.isRightSide }
                            isLeftSide={ this.props.isLeftSide }
                            onClose={ () => { this.setState({ tooltip: false }); } }/>
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

Event.defaultProps = {
    onClick: () => {}
};

export default Event;
