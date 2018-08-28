import React from 'react';
import moment from 'moment';
import onClickOutside from 'react-onclickoutside';
import Checkbox from 'components/Checkbox';
import './tooltip.less';

export class Tooltip extends React.Component {

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

    onClick(evt) {
        this.props.onClick(evt);
        this.props.onClose();
    }

    render() {
        const { event, visible, color, week, isOpen, isRightSide, isLeftSide } = this.props;
        const isMobile = screen.width < 479;
        const startDate = moment(event.getIn(['time_frame', 'lower']));
        const name = event.get('name').replace('iCal - ', '');
        const top = (week > 3 || week > 2 && isMobile) ? -124 : undefined;
        const left = isLeftSide ? 142 : isRightSide ? -142 : 'auto';
        const dates = startDate.format('YYYY-MM-DD') + ' - ' +  moment(event.getIn(['time_frame', 'upper'])).format('YYYY-MM-DD');
        return (
            <div className="property-calendar-details-tooltip">
                { visible &&
                <div className="wrapper" style={{ left: left, top: top }}>
                    <div className="tooltip-content">
                        <div className="event">
                            <div className="tooltip-event-name">
                                <div className="tooltip-event-type"><span className="dot" style={{ background: color }}/>iCal</div>
                                <div className="tooltip-event-content">{ name }</div>
                            </div>
                            <div className="dates">
                                { dates }
                            </div>
                        </div>
                        <div className="event open" onClick={ (evt) => evt.stopPropagation() }>
                            <Checkbox
                                id="open"
                                checked={ isOpen }
                                onChange={ (evt) => this.onClick(evt) }
                                label={ <span className="open-label">Open dates</span> }
                            />
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default onClickOutside(Tooltip);
