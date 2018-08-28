import React from 'react';
import ReservationsList from './ReservationsList';
import CircularProgress from 'material-ui/CircularProgress';
import ReservationInfo from './ReservationInfo';
import UnderConstruction from 'components/UnderConstruction';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchReservations } from 'containers/Reservations/actions';
import { makeSelectReservations, makeSelectLoading } from 'containers/Reservations/selectors';
import './reservations.less';

export class ReservationsComponent extends React.Component {

    componentWillMount() {
        if (!this.props.reservations.size) {
            this.props.fetchReservations();
        }
    }

    shouldDisplayPlaceholder() {
        return (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') && !this.props.isCalendar;
    }

    render() {
        const renderContent = () => {
            if (this.shouldDisplayPlaceholder()) {
                return <UnderConstruction page="Reservations" link="https://voyajoy.com/cozmo-vrs/reservation-management"/>;
            } else {
                if (this.props.loading) {
                    return <div className="spinner-wrapper"><CircularProgress className="spinner" size={ 150 } thickness={ 6 } /></div>;
                } else {
                    if (this.props.id) {
                        return <ReservationInfo id={ this.props.id }/>;
                    } else {
                        return <ReservationsList fetch={ this.props.fetchReservations } isCalendar={ this.props.isCalendar }/>;
                    }
                }
            }
        };

        return (
            <div className="reservations-component">
                { renderContent() }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    reservations: makeSelectReservations(),
    loading: makeSelectLoading()
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchReservations: () => dispatch(fetchReservations()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsComponent);
