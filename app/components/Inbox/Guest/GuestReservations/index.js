import React from 'react';
import Spinner from 'components/Spinner';
import StatusLabel from 'components/StatusLabel';
import './guestReservations.less';

export class GuestReservations extends React.Component {

    render() {
        return (
            <div className="inbox-guest-reservations">
                <table className="reservations-table">
                    <thead className="reservations-table-header">
                    <tr className="headers">
                        <td>Property</td>
                        <td>Status</td>
                        <td>Check In/Out Date</td>
                    </tr>
                    </thead>
                    <tbody className="reservations-table-body">
                    { this.props.reservations
                        //.sortBy(r => r.getStartDate())
                        .map(res => {
                            const id = res.getId();
                            return (
                                <tr className="reservation" key={ id } onClick={ () => this.props.onReservationClick(id) }>
                                    <td className="prop">
                                        <div className="prop-info">
                                            <img className="image" src={ res.getPropertyAvatar() }/>
                                            <div>
                                                <div className="prop-name">{ res.getPropertyName() }</div>
                                                <div className="prop-address">{ res.getPropertyAddress() }</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="status">
                                        <div className="labels">
                                            <StatusLabel label={ 'Reserved' } />
                                            <StatusLabel label={ res.isPaid() } />
                                        </div>
                                    </td>
                                    <td className="dates">
                                        { res.getFromTo() }
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}


export default GuestReservations;
