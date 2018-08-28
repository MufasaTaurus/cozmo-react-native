import React from 'react';
import Spinner from 'components/Spinner';
import TextField from 'components/TextField';
import SVG from 'components/SVG';
import Tabs from 'components/Tabs';
import GuestTickets from './GuestTickets';
import GuestReservations from './GuestReservations';
import ReservationDetails from './ReservationDetails';
import GuestEdit from './GuestEdit';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { fetchGuest, updateGuest, fetchGuestTickets } from 'containers/Inbox/actions';
import { selectGuest, selectLoading } from 'containers/Inbox/selectors';
import './guest.less';

export class Guest extends React.Component {

    constructor(props) {
        super(props);
        if (props.guest.getId() + '' !== props.guestId) {
            props.fetchGuest(props.guestId);
        }
        this.state = {
            noteEditMode: false,
            editModalOpen: false,
            reservation: props.guest.getReservations().first(),
            guest: this.props.guest,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.guest.getId() + '' === nextProps.guestId) {
            this.setState({
                guest: nextProps.guest,
                reservation: nextProps.guest.getReservations().first()
            });
        }
    }

    toggleNoteEdit(state) {
        let editState = state;
        if (state === undefined) {
            editState = !this.state.noteEditMode;
        }
        this.setState({ noteEditMode: editState });
    }

    toggleModal() {
        this.setState({ editModalOpen: !this.state.editModalOpen });
    }

    saveNote(value) {
        if (value !== this.state.note) {
            this.props.updateGuest({
                id: this.props.guestId,
                data: { note: value }
            });
            this.state.guest.setNote(value);
        }
        this.toggleNoteEdit(false);
    }

    guestEditSubmit(data) {
        const guest = this.state.guest;
        this.props.updateGuest({ id: this.props.guest.getId(), data: data });
        guest.setData(data);
    }

    setActiveReservation(id) {
        this.setState({
            reservation: this.props.guest.getReservations().filter(r => r.getId() === id).first()
        });
    }

    render() {
        const guest = this.state.guest;
        return (
            <div className="inbox-guest">
                { this.props.loading ? <div><Spinner/></div> :
                    <div>
                        <div className="first-row">
                            <div className="customer-information">
                                <div className="info-box">
                                    { boxHeader({
                                        icon: 'contact',
                                        title: 'Customer Information',
                                        onEdit: () => this.toggleModal()
                                    }) }
                                    <div className="info-box-content">
                                        <div className="customer-info-wrapper">
                                            <div className="avatar">
                                                <img className="avatar-img" src={ guest.getAvatar() }/>
                                            </div>
                                            <div className="customer">
                                                <div className="name">{ guest.getName() }</div>
                                                <div className="guest">Guest</div>
                                                <div className="contact">
                                                    { guest.getContact().map((c, index) => {
                                                        return (
                                                            <div key={ index }>
                                                                <span className="contact-icon"><SVG icon={ c.icon } size="14"/></span>
                                                                <span>{ c.value }</span>
                                                            </div>
                                                        );
                                                    }) }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="note">
                                <div className="info-box" style={{ background: '#fffbec' }} >
                                    { boxHeader({
                                        icon: 'assignment',
                                        title: 'Note',
                                        onEdit: () => this.toggleNoteEdit()
                                    }) }
                                    <div className="info-box-content">
                                        { this.state.noteEditMode ?
                                            <TextField
                                                id="guest-note"
                                                value={ guest.getNote() }
                                                multiLine
                                                onBlur={ (evt) => this.saveNote(evt.target.value) }
                                            />
                                            :
                                            guest.getNote().split('\n').map((p, index) => <div key={ index }>{ p }</div>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="second-row">
                            <div className="activity">
                                <div className="info-box">
                                    { boxHeader({
                                        icon: 'info',
                                        title: 'Activity'
                                    }) }
                                    <div className="info-box-content">
                                        <Tabs tabs={[
                                            { title: 'Reservations', content:
                                                <GuestReservations
                                                    onReservationClick={ (id) => this.setActiveReservation(id) }
                                                    reservations={ guest.getReservations() }/> },
                                            { title: 'Tickets', content:
                                                <GuestTickets
                                                    pagination={ guest.getTicketsPagination() }
                                                    fetchGuestTickets={ this.props.fetchGuestTickets }
                                                    onTicketClick={ this.props.goToTicket }
                                                    tickets={ guest.getTickets() }/> }
                                        ]}/>
                                    </div>
                                </div>
                            </div>
                            <div className="reservation-details">
                                <div className="info-box">
                                    { boxHeader({
                                        icon: 'event',
                                        title: 'Reservation Details'
                                    }) }
                                    <div className="info-box-content">
                                        <ReservationDetails reservation={ this.state.reservation } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                { this.state.editModalOpen &&
                    <GuestEdit
                        guest={ guest }
                        onClose={ () => this.toggleModal() }
                        onSubmit={ data => this.guestEditSubmit(data) }/>
                }
            </div>
        );
    }
}

const boxHeader = ({ icon, title, onEdit }) => {
    return (
        <div className="info-box-header">
            <div>
                <SVG className="icon" icon={ icon }/>
                <span>{ title }</span>
            </div>
            { onEdit && <div className="edit" onClick={ onEdit }><SVG size="18" icon="edit"/></div> }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    guest: selectGuest(),
    loading: selectLoading(),
});


export function mapDispatchToProps(dispatch) {
    return {
        updateGuest: (data) => dispatch(updateGuest(data)),
        fetchGuest: (id) => dispatch(fetchGuest(id)),
        fetchGuestTickets: (id) => dispatch(fetchGuestTickets(id)),
        goToTicket: (id) => dispatch(push('/inbox/' + id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Guest);
