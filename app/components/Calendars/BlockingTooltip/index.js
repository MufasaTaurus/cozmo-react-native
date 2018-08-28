import React, { PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import moment from 'moment';
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
        const { blocking, visible, onClick } = this.props;
        const name = blocking.get('summary');
        const dates = moment(blocking.getIn(['time_frame', 'lower'])).format('YYYY-MM-DD') + ' - ' +  moment(blocking.getIn(['time_frame', 'upper'])).format('YYYY-MM-DD');
        return (
            <div className="calendar-details-tooltip">
                { visible &&
                <div className="wrapper">
                    <div className="tooltip-content">
                        <div className="tooltip-header">1 event</div>
                        <div className="event" onClick={ onClick }>
                            <div className="tooltip-event-name">
                                <div className="tooltip-event-type"><span className="dot res"/>Blocked</div>
                                <div className="tooltip-event-content">{ name }</div>
                            </div>
                            <div className="dates">
                                { dates }
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

BlockingTooltip.propTypes = {
    blocking: PropTypes.object.isRequired,
};

export default onClickOutside(BlockingTooltip);
