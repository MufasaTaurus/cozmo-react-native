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
        const { event, visible, color, continuing, week, isOpen } = this.props;
        const isMobile = screen.width < 479;
        const startDate = moment(event.getIn(['time_frame', 'lower']));
        const getOffset = () => {
            if (isMobile && startDate.day() === 4 && !continuing) {
                return -30;
            } else if (isMobile && startDate.day() === 3 && !continuing) {
                return -10;
            } else if (isMobile && startDate.day() === 5 && !continuing) {
                return -80;
            } else if (!continuing) {
                if (startDate.day() === 6) {
                    return -95;
                } else if (startDate.day() === 5) {
                    return 0;
                }
            } else {
                return 143;
            }
        };
        const name = event.get('name').replace('iCal - ', '');
        const offset =  getOffset();
        const top = (week > 3 || week > 2 && isMobile) ? -124 : undefined;
        const dates = startDate.format('YYYY-MM-DD') + ' - ' +  moment(event.getIn(['time_frame', 'upper'])).format('YYYY-MM-DD');
        return (
            <div className="property-calendar-details-tooltip">
                { visible &&
                <div className="wrapper" style={{ left: offset, top: top }}>
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
