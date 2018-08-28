import React, { PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import moment from 'moment';
import Checkbox from 'components/Checkbox';
import SVG from 'components/SVG';
import './tooltip.less';

export class BlockingTooltip extends React.Component {

    handleClickOutside() {
        if (this.props.visible) {
            this.props.onClose();
            this.props.disableOnClickOutside();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible) {
            this.props.enableOnClickOutside();
        }
    }

    render() {
        const { blocking, visible, onClick, icals = [], onOpenDates, rowIndex, isLeftSide, isRightSide, day } = this.props;
        const eventsCount = (blocking ? 1 : 0) + (icals.length || icals.size || 0);
        const bottom = rowIndex > 15 ? 5 : 'auto';
        const top = rowIndex > 15 ? 'auto' : 32;
        const left = isLeftSide ? 142 : isRightSide ? -142 : 'auto';
        return (
            <div className="calendar-details-tooltip">
                { visible &&
                <div className="wrapper" style={{ bottom: bottom, top: top, left: left }}>
                    <div className="tooltip-content">
                        <div className="tooltip-header">{ eventsCount } event{ eventsCount > 1 ? 's' : '' }</div>
                        { blocking &&
                            <div className="event" onClick={ onClick }>
                                <div className="tooltip-event-name">
                                    <div className="tooltip-event-type"><span className="dot res"/>Blocked</div>
                                    <div className="tooltip-event-content">{ blocking.get('summary') }</div>
                                </div>
                                <div className="dates">
                                    { moment(blocking.getIn(['time_frame', 'lower'])).format('YYYY-MM-DD') + ' - ' +  moment(blocking.getIn(['time_frame', 'upper'])).format('YYYY-MM-DD') }
                                </div>
                            </div>
                        }
                        { icals.map((ical, index) => {
                            return (
                                <div className="event" key={ day.format('DDMMYY') + ical.get('id') + index } onClick={ onClick }>
                                    <div className="tooltip-event-name">
                                        <div className="tooltip-event-type no-space"><span className="dot" style={{ background: ical.get('color') }}/></div>
                                        <div className="tooltip-event-content">{ ical.get('name') }</div>
                                    </div>
                                    <div className="dates">
                                        { moment(ical.getIn(['time_frame', 'lower'])).format('YYYY-MM-DD') + ' - ' +  moment(ical.getIn(['time_frame', 'upper'])).format('YYYY-MM-DD') }
                                    </div>
                                    <div className="open-section" onClick={ (evt) => evt.stopPropagation() }>
                                        <Checkbox
                                            id={ 'open-' + ical.get('id') }
                                            checked={ ical.get('open') }
                                            onChange={ () => { onOpenDates(ical); this.props.onClose(); } }
                                            label={ <span className="open-label">Open dates</span> }
                                        />
                                    </div>
                                </div>
                            );
                        }) }
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default onClickOutside(BlockingTooltip);
