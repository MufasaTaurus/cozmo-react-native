import React from 'react';
import Spinner from 'components/Spinner';
import SVG from 'components/SVG';
import CalendarPreview from 'components/CalendarPreview';
import './reservationDetails.less';

export class ReservationDetails extends React.Component {

    render() {
        const res = this.props.reservation;
        const duration = res ? res.getDuration().split(' ') : '';
        return (
            <div className="inbox-guest-reservation-details">
                { res ?
                    <div>
                        <div className="section basic-info">
                            <div className="prop-info">
                                <img className="image" src={ res.getPropertyAvatar() }/>
                                <div>
                                    <div className="prop-name">{ res.getPropertyName() }</div>
                                    <div className="prop-address">{ res.getPropertyAddress() }</div>
                                </div>
                            </div>
                        </div>
                        <div className="section detailed-info">
                            <div className="dates">
                                <div className="date-block">
                                    <div className="title">Check In</div>
                                    <div className="value">{ res.getStartDate('MMM DD, YYYY') }</div>
                                    <div className="sub-value">{ res.getStartDate('hh:MMA') }</div>
                                </div>
                                <div className="date-block">
                                    <div className="title">Check Out</div>
                                    <div className="value">{ res.getEndDate('MMM DD, YYYY') }</div>
                                    <div className="sub-value">{ res.getEndDate('hh:MMA') }</div>
                                </div>
                                <div className="date-block nights">
                                    <div className="title"><SVG icon="dates" size="14"/></div>
                                    <div className="value">{ duration[0] }</div>
                                    <div className="sub-value">{ duration.length > 1 ? duration[1] : '' }</div>
                                </div>
                            </div>
                            <div className="res-info">
                                <div className="info-block">
                                    <div className="name"><SVG className="block-icon" icon="guests" size="18"/> Guests</div>
                                    <div className="value">{ res.getNumberOfGuests() }</div>
                                </div>
                                <div className="info-block">
                                    <div className="name"><SVG className="block-icon" icon="world" size="18"/> Source</div>
                                    <div className="value">{ res.getSource() }</div>
                                </div>
                                <div className="info-block">
                                    <div className="name"><SVG className="block-icon" icon="check" size="18"/> Status</div>
                                    <div className="value">
                                        <span className="reserved">Reserved, </span>
                                        <span className={ res.isPaid().toLowerCase() }>{ res.isPaid() }</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section calendar">
                            <CalendarPreview events={ res.getReservationEvent() }/>
                        </div>
                    </div>
                    :
                    <div className="spinner-wrapper"><Spinner/></div>
                }
            </div>
        );
    }
}


export default ReservationDetails;
