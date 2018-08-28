import React from 'react';
import TextEditor from 'components/TextEditor';
import GridView from 'components/GridView';
import Breadcrumbs from 'components/Breadcrumbs';
import EditGuestDetails from './EditGuestDetails';
import EditReservationDetails from './EditReservationDetails';
import History from './History';
import Card from 'components/Card';
import SVG from 'components/SVG';
import RaisedButton from 'material-ui/RaisedButton';
import CalendarPreview from 'components/CalendarPreview';
import {connect} from 'react-redux';
import {fromJS} from 'immutable';
import {createStructuredSelector} from 'reselect';
import {sendMessage, deleteReservation, editReservation, editGuest, fetchReservation} from 'containers/Reservations/actions';
import {addAlert} from 'containers/App/actions';
import {makeSelectReservations, makeSelectMessageStatus, makeSelectLoading} from 'containers/Reservations/selectors';
import {makeSelectUsername} from 'containers/App/selectors';
import ReservationModel from 'models/Reservation';
import './reservationInfo.less';

export class ReservationInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guestModalOpen: false,
            reservationModalOpen: false,
        };
        const reservation = props.reservations.filter((r) => r.get('id') + '' === props.id).first();
        if (reservation) {
            this.reservation = reservation;
        } else {
            this.props.fetchReservation(props.id);
        }
    }

    sendMessage(id, text, attachments) {
        this.props.sendMessage({
            text: '<div>' + text + '</div>',
            reservation: id,
            files: attachments
        });
    }

    componentWillReceiveProps(nextProps) {
        this.shouldResetContent = false;
        if (this.props.messageStatus === 'sending') {
            if (nextProps.messageStatus === 'success') {
                this.props.addAlert({ message: 'Message sent' });
                this.shouldResetContent = true;
            } else if (nextProps.messageStatus === 'error') {
                this.props.addAlert({ message: 'Message not sent...' });
            }
        }

        if (!nextProps.loading) {
            if (nextProps.reservations.size) {
                const reservation = nextProps.reservations.filter((r) => r.get('id') + '' === nextProps.id).first();
                if (reservation) {
                    this.reservation = reservation;
                }
            }
        }
    }

    onEditReservationSubmit(data) {
        this.props.editReservation(this.props.id, data);
        this.setState({ reservationModalOpen: false });
    }

    onEditGuestSubmit(data) {
        this.props.editGuest(this.props.id, data);
        this.setState({ guestModalOpen: false });
    }

    render() {
        const reservation = new ReservationModel(this.reservation || fromJS({}));
        return (
            <div className="reservation-info">
                { reservation &&
                    <div>
                        <Breadcrumbs
                            section={ reservation.getGuestFullName() }
                            subsection={[
                                { title: 'Reservations', link: '/reservations' },
                                { title: 'Details' }
                            ]} />
                        <div className="content">
                            <GridView items={{ first: [
                                { content:
                                    <Card
                                        icon="account"
                                        title="Guest details"
                                        editable={ true }
                                        onEdit={ () => this.setState({ guestModalOpen: true }) }
                                    >
                                        <div className="guest-details-card">
                                            <div className="avatar">
                                                <img src={ reservation.getGuestAvatar() } />
                                            </div>
                                            <div className="info">
                                                <div className="name">{ reservation.getGuestFullName() }</div>
                                                <div className="email">{ reservation.getGuestEmail() }</div>
                                                <div className="phone">{ reservation.getGuestPhone() }</div>
                                            </div>
                                            <EditGuestDetails
                                                open={ this.state.guestModalOpen }
                                                reservation={ reservation }
                                                onSubmit={ (data) => this.onEditGuestSubmit(data) }
                                                onClose={ () => this.setState({ guestModalOpen: false }) }
                                            />
                                        </div>
                                    </Card> },
                                { content:
                                    <Card
                                        icon="event"
                                        title="Reservation details"
                                        editable={ true }
                                        onEdit={ () => this.setState({ reservationModalOpen: true }) }
                                    >
                                        <div className="reservation-details-card">
                                            <div className="basic-details">
                                                <div className="avatar">
                                                    <img src={ reservation.getPropertyAvatar() } />
                                                </div>
                                                <div className="info">
                                                    <div className="name">{ reservation.getPropertyName() }</div>
                                                    <div className="address">{ reservation.getPropertyAddress() }</div>
                                                </div>
                                            </div>
                                            <div className="details">
                                                <div className="row">
                                                    <span className="name"><SVG icon="goTo" size="18"/> Check-In</span>
                                                    <span>{ reservation.getStartDate('YYYY-MM-DD') }</span>
                                                </div>
                                                <div className="row">
                                                    <span className="name"><SVG icon="goFrom" size="18"/> Check-Out</span>
                                                    <span>{ reservation.getEndDate('YYYY-MM-DD') }</span>
                                                </div>
                                                <div className="row">
                                                    <span className="name"><SVG icon="dates" size="18"/> Nights</span>
                                                    <span>{ reservation.getDuration() }</span>
                                                </div>
                                                <div className="row">
                                                    <span className="name"><SVG icon="people" size="18"/> Guests</span>
                                                    <span>{ reservation.getNumberOfGuests() }</span>
                                                </div>
                                                <div className="row">
                                                    <span className="name"><SVG icon="money" size="18"/> Price</span>
                                                    <span>{ reservation.getPrice() }</span>
                                                </div>
                                            </div>
                                            <CalendarPreview events={ reservation.getReservationEvent() } />
                                            <div className="delete-button">
                                                <RaisedButton
                                                    labelColor="#fff"
                                                    backgroundColor="#FC5830"
                                                    label="Delete reservation"
                                                    onClick={ () => this.props.deleteReservation(this.props.id) }
                                                />
                                            </div>
                                        </div>
                                        <EditReservationDetails
                                            open={ this.state.reservationModalOpen }
                                            reservation={ reservation }
                                            onSubmit={ (data) => this.onEditReservationSubmit(data) }
                                            onClose={ () => this.setState({ reservationModalOpen: false })}
                                        />
                                    </Card> }
                            ],
                                second: [
                                    { content:
                                        reservation.getGuestEmail() ?
                                        <TextEditor
                                            onError={ this.props.addAlert }
                                            shouldResetContent={ this.shouldResetContent }
                                            onSubmit={ (text, attachments) => this.sendMessage(reservation.getId(), text, attachments) }
                                            reservation={ reservation }
                                            username={ this.props.username }
                                        /> : '' },
                                    { content: <History reservation={ reservation } /> }
                                ]
                            }}/>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    reservations: makeSelectReservations(),
    messageStatus: makeSelectMessageStatus(),
    username: makeSelectUsername(),
    loading: makeSelectLoading()
});

export function mapDispatchToProps(dispatch) {
    return {
        sendMessage: (data) => dispatch(sendMessage(data)),
        addAlert: (data) => dispatch(addAlert(data)),
        deleteReservation: (id) => dispatch(deleteReservation(id)),
        editReservation: (id, data) => dispatch(editReservation({ id: id, data: data })),
        editGuest: (id, data) => dispatch(editGuest({ id: id, data: data })),
        fetchReservation: (id) => dispatch(fetchReservation(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationInfo);
