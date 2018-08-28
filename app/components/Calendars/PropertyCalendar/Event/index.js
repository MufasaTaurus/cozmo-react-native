import React from 'react';
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
            dayCell: document.getElementsByClassName('day')[0]
        };
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return (
    //             nextState.tooltip !== this.state.tooltip ||
    //             nextProps.active !== this.props.active ||
    //             nextProps.hovered !== this.props.hovered ||
    //             nextProps.icalOpen !== this.props.icalOpen ||
    //             nextState.dayCell !== this.state.dayCell
    //     );
    // }

    componentDidMount() {
        if (!this.dayCell) {
            this.setState({ dayCell: document.getElementsByClassName('day')[0] });
        }
    }

    toggleTooltip() {
        this.setState({ tooltip: !this.state.tooltip });
    }

    onClick(evt) {
        evt.stopPropagation();
        if (this.props.active) {
            this.props.onClose();
        } else {
            if (this.props.onClick) {
                this.props.onClick(evt);
            }
        }
        this.toggleTooltip();
    }

    render() {
        const { blocking, continuing, reservation, ical, active, hovered, eventColor, index, icalModel, onClose, onOpenDates, icalOpen, onHover, onHoverOut, week } = this.props;
        const isMobile = screen.width < 479;
        const dayWidth = isMobile ? (this.state.dayCell ? this.state.dayCell.offsetWidth : 0) : 145;
        //let width = this.props.days * dayWidth + 16 + (continuing ? (blocking ? 38 : 95) : 0) - (reservation ? 28 : 0);
        let width = this.props.days * dayWidth;
        isMobile ? width += (continuing ? dayWidth / 2 : 0) : width += 16 + (continuing ? (blocking ? 38 : 95) : 0);
        width = !isMobile && index && continuing ? width - index * 28 : width;
        const color = blocking ? '#b0bec5' : ical ? (eventColor ? eventColor : '#757575') : '#1e88e5';
        const shouldDisplayLabel = width > 55;
        return (
            <div
                className={ 'calendar-event-property' + (active ? ' active' : '') + (index ? ' index-' + index : '') + (continuing ? ' continuing' : '') + (this.state.tooltip ? ' has-tooltip' : '') }
                onClick={ (evt) => this.onClick(evt) }
                onMouseEnter={ onHover }
                onMouseLeave={ onHoverOut }
            >
                <div
                    className={ 'event-content' + (continuing ? ' continuing' : '') + (icalOpen ? ' open' : '') +  (hovered ? ' hovered' : '') }
                    style={{ width: width }}
                >
                    { icalModel &&
                        <Tooltip
                            event={ icalModel }
                            visible={ this.state.tooltip }
                            onClick={ onOpenDates }
                            color={ color }
                            isOpen={ icalOpen }
                            continuing={ continuing }
                            week={ week }
                            onClose={ () => { this.setState({ tooltip: false }); onClose(); } }/>
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
