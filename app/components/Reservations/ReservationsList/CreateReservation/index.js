import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import PropertyPicker from 'components/PropertyPicker';
import {REGEXP_EMAIL} from 'utils/const';
import clone from 'lodash/cloneDeep';
import moment from 'moment';
import './createReservation.less';


export class CreateReservation extends React.Component {

    constructor(props) {
        super(props);
        this.format = 'YYYY-MM-DD';
        this.initialState = {
            prop: null,
            guests_adults: 1,
            guests_children: 0,
            guest: {
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
            },
            price: '',
            paid: '',
            start_date: moment().format(this.format),
            end_date: moment().add(2, 'd').format(this.format)
        };
        this.state = clone(this.initialState);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.status === 'loading' && nextProps.status === 'success') {
            this.props.onClose();
            this.setState(clone(this.initialState));
        }
    }

    handleFormChange(field, value) {
        this.setState({ [field]: value });
    }

    handleFormChangeForGuest(field, value) {
        let guest = this.state.guest;
        guest[field] = value;
        this.setState({ guest: guest });
    }

    canSubmitForm() {
        return (
            this.state.prop &&
            this.state.guests_adults + this.state.guests_children > 0 &&
            this.state.guest.first_name &&
            this.state.guest.last_name &&
            REGEXP_EMAIL.test(this.state.guest.email) &&
            (this.state.guest.phone ? this.state.guest.phone.length > 4 : true) &&
            this.state.price > 0 &&
            this.state.paid <= this.state.price &&
            this.state.start_date &&
            this.state.end_date &&
            moment(this.state.start_date).isSameOrBefore(moment(this.state.end_date)) &&
            this.props.status !== 'loading'
        );
    }

    onSubmit() {
        this.props.onSubmit(this.state);
    }

    render() {
        const canSubmit = this.canSubmitForm();
        return (
            <Dialog
                actions={[
                    <FlatButton
                        label={ 'Cancel' }
                        primary={ true }
                        onTouchTap={ this.props.onClose }
                    />,
                    <FlatButton
                        label={ 'Submit' }
                        primary={ true }
                        disabled={ !canSubmit }
                        onTouchTap={ () => this.onSubmit() }
                    />
                ]}
                modal={ true }
                overlayClassName="new-reservation-modal"
                paperClassName="new-reservation-modal-content"
                onRequestClose={ this.props.onClose }
                open={ this.props.open }
            >
                <div className="header">
                    <div className="title">Add New Reservation</div>
                    <div className="subtitle">Record a new active reservation. Note that reservations will automatically block the calendar.</div>
                </div>
                <div className="property-picker-wrapper">
                    <div className="picker-title">Property</div>
                    <PropertyPicker onSelect={ (property) => this.handleFormChange('prop', property.get('id')) } defaultValue={ this.state.prop }/>
                </div>
                <div className="new-reservation-modal-input-wrapper first">
                    <TextField
                        floatingLabelText="Adults"
                        fullWidth={ true }
                        type="number"
                        min="0"
                        max="99"
                        defaultValue={ this.state.guests_adults }
                        onChange={ (evt) => this.handleFormChange('guests_adults', parseInt(evt.target.value), 10) }
                    />
                </div>
                <div className="new-reservation-modal-input-wrapper second">
                    <TextField
                        floatingLabelText="Children"
                        fullWidth={ true }
                        type="number"
                        min="0"
                        max="99"
                        defaultValue={ this.state.guests_children }
                        onChange={ (evt) => this.handleFormChange('guests_children', parseInt(evt.target.value), 10) }
                    />
                </div>
                <div className="new-reservation-modal-input-wrapper first">
                    <TextField
                        floatingLabelText="First Name"
                        fullWidth={ true }
                        defaultValue={ this.state.guest.first_name }
                        onChange={ (evt) => this.handleFormChangeForGuest('first_name', evt.target.value) }
                    />
                </div>
                <div className="new-reservation-modal-input-wrapper second">
                    <TextField
                        floatingLabelText="Last Name"
                        fullWidth={ true }
                        defaultValue={ this.state.guest.last_name }
                        onChange={ (evt) => this.handleFormChangeForGuest('last_name', evt.target.value) }
                    />
                </div>
                <div className="new-reservation-modal-input-wrapper first">
                    <TextField
                        floatingLabelText="Email"
                        fullWidth={ true }
                        defaultValue={ this.state.guest.email }
                        onChange={ (evt) => this.handleFormChangeForGuest('email', evt.target.value) }
                    />
                </div>
                <div className="new-reservation-modal-input-wrapper second">
                    <TextField
                        floatingLabelText="Phone"
                        fullWidth={ true }
                        defaultValue={ this.state.guest.phone }
                        onChange={ (evt) => this.handleFormChangeForGuest('phone', evt.target.value) }
                    />
                </div>
                <div className="new-reservation-modal-input-wrapper first">
                    <DatePicker
                        floatingLabelText="Check-In date"
                        autoOk={ true }
                        fullWidth={ true }
                        defaultDate={ new Date(this.state.start_date) }
                        onChange={ (evt, date) => this.handleFormChange('start_date', moment(date).format(this.format)) }
                        maxDate={ new Date(this.state.end_date) }
                    />
                </div>
                <div className="new-reservation-modal-input-wrapper second">
                    <DatePicker
                        floatingLabelText="Check-Out date"
                        autoOk={ true }
                        fullWidth={ true }
                        defaultDate={ new Date(this.state.end_date) }
                        onChange={ (evt, date) => this.handleFormChange('end_date', moment(date).format(this.format)) }
                        minDate={ new Date(this.state.start_date) }
                    />
                </div>
                <div className="new-reservation-modal-input-wrapper first">
                    <TextField
                        floatingLabelText="Total Reservation Amount"
                        fullWidth={ true }
                        type="number"
                        min="0"
                        max="9999"
                        defaultValue={ this.state.price }
                        onChange={ (evt) => this.handleFormChange('price', parseInt(evt.target.value), 10) }
                    />
                </div>
                <div className="new-reservation-modal-input-wrapper second">
                    <TextField
                        floatingLabelText="Total Amount Paid"
                        fullWidth={ true }
                        type="number"
                        min="0"
                        max={ this.state.price }
                        defaultValue={ this.state.paid }
                        onChange={ (evt) => this.handleFormChange('paid', parseInt(evt.target.value), 10) }
                    />
                </div>
                <div className="submit-error">{ (this.props.status !== 'loading' && this.props.status !== 'success') ? this.props.status : '' }</div>
            </Dialog>
        );
    }
}

export default CreateReservation;
