import React from 'react';
import moment from 'moment';
import onClickOutside from 'react-onclickoutside';
import ChooseEvent from './ChooseEvent';
import Reservation from './Reservation';
import Confirmation from './Confirmation';
import Blocking from './Blocking';
import Unblocking from './Unblocking';
import Quote from './Quote';
import Rates from './Rates';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addReservation, fetchQuote, createBlocking, createSeasonalRating, createCustomRating, deleteBlocking } from 'containers/Reservations/actions';
import { selectQuote, selectQuoteFetching, makeSelectAddReservationStatus, selectAddingRate } from 'containers/Reservations/selectors';
import { addAlert } from 'containers/App/actions';
import './createEvent.less';

export class CreateEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            eventType: '',
            confirmation: false,
            reservationInfo: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.creatingReservation === 'loading') {
            if (nextProps.creatingReservation === 'success') {
                this.cancel();
            }
            this.setState({ confirmation: false });
        }

        if (this.props.rateLoading === 'loading') {
            if (nextProps.rateLoading === 'ok') {
                this.cancel();
            }
        }
    }

    handleClickOutside() {
        if (this.props.open) {
            this.cancel();
        }
    }

    getSelectedDates() {
        const to = this.props.selected.dates.to.isSame(this.props.selected.dates.from, 'd') ? moment(this.props.selected.dates.to).add(1, 'd') : this.props.selected.dates.to;
        return {
            from: this.props.selected.dates.from,
            to: to
        };
    }

    chooseEventType(type) {
        this.setState({
            eventType: type,
            currentStep: 1
        });
    }

    submitReservation(data) {
        this.setState({
            currentStep: 2,
            reservationInfo: data
        });
        this.props.fetchQuote({
            prop: data.prop,
            from: data.start_date.format('YYYY-MM-DD'),
            to: data.end_date.format('YYYY-MM-DD'),
            adults: data.guests_adults,
            children: data.guests_children
        });
    }

    submitBlocking(data) {
        const dates = this.getSelectedDates();
        this.setState({ currentStep: 0 });
        this.props.createBlocking({
            summary: data.label,
            time_frame: {
                lower: dates.from.format('YYYY-MM-DD'),
                upper: dates.to.format('YYYY-MM-DD')
            },
            id: this.props.selected.prop.id,
            calendarKey: this.props.calendarKey
        });
        this.cancel();
    }

    deleteBlocking(data) {
        this.props.deleteBlocking({
            blocking: data,
            id: this.props.selected.prop.id,
            calendarKey: this.props.calendarKey
        });
        this.cancel();
    }

    cancel() {
        this.setState({ currentStep: 0, reservationInfo: {} });
        this.props.onCancel();
    }

    showConfirmation() {
        this.setState({ confirmation: true });
    }

    createReservation() {
        this.props.addReservation({
            guest: {
                first_name: this.state.reservationInfo.first_name,
                last_name: this.state.reservationInfo.last_name,
                email: this.state.reservationInfo.email,
                phone: this.state.reservationInfo.phone,
            },
            start_date: this.state.reservationInfo.start_date.format('YYYY-MM-DD'),
            end_date: this.state.reservationInfo.end_date.format('YYYY-MM-DD'),
            guests_adults: this.state.reservationInfo.guests_adults,
            guests_children: this.state.reservationInfo.guests_children,
            prop: this.state.reservationInfo.prop,
            status: this.state.eventType === 'inquiry' ? 'Inquiry' : 'Accepted',
            paid: 0,
            calendarKey: this.props.calendarKey
        });
    }

    submitRating(state) {
        const data = Object.assign(state, { calendarKey: this.props.calendarKey });
        if (this.props.seasonal) {
            this.props.createSeasonalRating(data);
        } else {
            this.props.createRating(data);
        }
    }

    goBack() {
        this.setState({
            currentStep: this.state.currentStep - 1
        });
    }

    renderStep() {
        switch (this.state.currentStep) {
            case 0:
                if (this.props.open && this.props.showRates) {
                    return <Rates
                        seasonal={ this.props.seasonal }
                        rate={ this.props.rate }
                        dates={ this.props.selected.dates }
                        id={ this.props.selected.prop.id }
                        loading={ this.props.rateLoading === 'loading' }
                        onSubmit={ (data) => this.submitRating(data) }
                        onCancel={ () => this.cancel() } />;

                } else if (this.props.open && this.props.unblock) {
                    return <Unblocking blocking={ this.props.unblock } onDelete={ (data) => this.deleteBlocking(data) } onCancel={ this.props.onCancel }/>;
                } else {
                    return <ChooseEvent chooseEvent={ (type) => this.chooseEventType(type) } onCancel={ () => this.cancel() } />;
                }
            case 1:
                if (this.state.eventType === 'reservation' || this.state.eventType === 'inquiry') {
                    return <Reservation
                        data={ this.props.selected }
                        onCancel={ () => this.cancel()}
                        goBack={ () => this.goBack() }
                        isInquiry={ this.state.eventType === 'inquiry' }
                        reservationInfo={ this.state.reservationInfo }
                        submitReservation={ (data) => this.submitReservation(data) }
                    />;
                } else if (this.state.eventType === 'blocking') {
                    const dates = this.getSelectedDates();
                    return <Blocking
                        dates={ dates }
                        onCancel={ () => this.cancel() }
                        goBack={ () => this.goBack() }
                        onSubmit={ (data) => this.submitBlocking(data) }
                    />;
                }
                break;
            case 2:
                return <Quote
                    quote={ this.props.quote }
                    goBack={ () => this.goBack() }
                    isInquiry={ this.state.eventType === 'inquiry' }
                    showConfirmation={ () => this.showConfirmation() }
                    loading={ this.props.quoteLoading }/>;
        }
    }

    render() {
        return (
            <div className={ 'calendars-create-new-event' + (this.props.open ? ' active' : '') }>
                <div className="calendars-create-new-event-content">
                    { this.renderStep() }
                </div>
                { this.state.confirmation &&
                    <Confirmation
                        data={ this.props.selected }
                        info={ this.state.reservationInfo }
                        onCancel={ () => this.setState({ confirmation: false }) }
                        onSubmit={ () => this.createReservation() }
                        isInquiry={ this.state.eventType === 'inquiry' }
                        loading={ this.props.creatingReservation === 'loading' }
                        quote={ this.props.quote }/>
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    quote: selectQuote(),
    quoteLoading: selectQuoteFetching(),
    rateLoading: selectAddingRate(),
    creatingReservation: makeSelectAddReservationStatus(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchQuote: (data) => dispatch(fetchQuote(data)),
        addReservation: (data) => dispatch(addReservation(data)),
        createBlocking: (data) => dispatch(createBlocking(data)),
        addAlert: (data) => dispatch(addAlert(data)),
        createSeasonalRating: (data) => dispatch(createSeasonalRating(data)),
        createRating: (data) => dispatch(createCustomRating(data)),
        deleteBlocking: (data) => dispatch(deleteBlocking(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(CreateEvent));
