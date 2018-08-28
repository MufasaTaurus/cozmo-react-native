import React, { PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import { Link } from 'react-router';
import SVG from 'components/SVG';
import './tooltip.less';

export class Tooltip extends React.Component {

    handleClickOutside() {
        this.props.onClose();
    }

    render() {
        const { reservation, visible } = this.props;
        return (
            <div className="calendar-details-tooltip">
                { visible &&
                <div className="wrapper">
                    <div className="tooltip-content">
                        <div className="tooltip-header">1 event</div>
                        <Link to={ '/reservations/' + reservation.getId() }>
                            <div className="event">
                                <div className="tooltip-event-name">
                                    <div className="tooltip-event-type"><span className="dot res"/>Booking.com</div>
                                    <div className="tooltip-event-content">{ reservation.getGuestFullName() }</div>
                                </div>
                            </div>
                        </Link>
                        {/*<div className="event">*/}
                        {/*<div className="event-name">*/}
                        {/*<div className="event-type"><span className="dot"/>Booking.com</div>*/}
                        {/*<div className="event-content">Paul Pinkman</div>*/}
                        {/*</div>*/}
                        {/*<div className="dates">1/2/2018 - 1/12/2019</div>*/}
                        {/*</div>*/}
                        <div className="reservation">
                            <div className="check-in-out">
                                <div>
                                    <div className="check">Check-in</div>
                                    <div className="date">{ reservation.getStartDate('YYYY-MM-DD') }</div>
                                </div>
                                <div className="arrow"><SVG icon="backArrow" /></div>
                                <div>
                                    <div className="check">Check-out</div>
                                    <div className="date">{ reservation.getEndDate('YYYY-MM-DD') }</div>
                                </div>
                            </div>
                            <div>
                                <div className="info-row">
                                    <div className="name"><SVG icon="moonFilled" size="16"/> nights</div>
                                    <div className="value">{ reservation.getDuration() }</div>
                                </div>
                                <div className="info-row">
                                    <div className="name"><SVG icon="guests" size="16"/> guests</div>
                                    <div className="value">{ reservation.getNumberOfGuests() }</div>
                                </div>
                                <div className="info-row">
                                    <div className="name"><SVG icon="doneAll" size="16"/> status</div>
                                    <div className="value inq">Inquiries</div>
                                </div>
                                <div className="info-row">
                                    <div className="name"><SVG icon="money" size="16"/> payment</div>
                                    <div className="value">{ reservation.getPrice() }</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

Tooltip.propTypes = {
    reservation: PropTypes.object.isRequired,
};

export default onClickOutside(Tooltip);
