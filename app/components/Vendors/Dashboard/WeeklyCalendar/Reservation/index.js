import React from 'react';
import './reservation.less';

export class Reservation extends React.Component {

    render() {
        const continuing = this.props.continuing || 0;
        const width = (this.props.reservation.getDurationNumber() - continuing) * 128 + (continuing ? 64 : 0);
        return (
            <div className="calendar-reservation">
                <div className={ 'reservation-bar' + (continuing ? ' continuing' : '') } style={{ width: width }}>
                    <div className="name">{ this.props.reservation.getGuestFullName() }</div>
                </div>
            </div>
        );
    }
}

export default Reservation;
