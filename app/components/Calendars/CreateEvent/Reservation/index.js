import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { REGEXP_EMAIL, REGEXP_PHONE } from 'utils/const';
import TextField from 'components/TextField';
import Select from 'components/Select';
import SVG from 'components/SVG';
import ButtonNew from 'components/ButtonNew';
import './reservation.less';

export class Reservation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: props.reservationInfo.first_name || '',
            last_name: props.reservationInfo.last_name || '',
            email: props.reservationInfo.email || '',
            phone: props.reservationInfo.phone || '',
            guests_adults: props.reservationInfo.guests_adults || 1,
            guests_children: props.reservationInfo.guests_children || 0,
            source: props.reservationInfo.source || 'airbnb',
            start_date: props.data.dates.from,
            end_date: props.data.dates.to,
            prop: props.data.prop.id,
            errors: {}
        };
        this.options = [
            { name: '1', value: 1 },
            { name: '2', value: 2 },
            { name: '3', value: 3 },
            { name: '4', value: 4 },
            { name: '5', value: 5 },
            { name: '6', value: 6 },
            { name: '7', value: 7 },
            { name: '8', value: 8 },
            { name: '9', value: 9 },
            { name: '10', value: 10 },
        ];
        this.optionsKids = [
            { name: '0', value: 0 },
            { name: '1', value: 1 },
            { name: '2', value: 2 },
            { name: '3', value: 3 },
            { name: '4', value: 4 },
            { name: '5', value: 5 },
            { name: '6', value: 6 },
            { name: '7', value: 7 },
            { name: '8', value: 8 },
            { name: '9', value: 9 },
            { name: '10', value: 10 },
        ];
    }

    validateForm() {
        const errors = {};
        if (!this.state.first_name) { errors.firstName = true; }
        if (!this.state.last_name) { errors.lastName = true; }
        if (!REGEXP_PHONE.test(this.state.phone)) { errors.phone = true; }
        if (!REGEXP_EMAIL.test(this.state.email)) { errors.email = true; }

        if (isEmpty(errors)) {
            this.props.submitReservation(this.state);
        } else {
            this.setState({ errors: errors });
        }
    }

    render() {
        const image = this.props.data.prop.image;
        const name = this.props.data.prop.name;
        const address = this.props.data.prop.address;
        return (
            <div className="calendars-create-new-event-reservation">
                <div className="create-event-header">
                    <div className="create-event-icon clickable" onClick={ this.props.goBack }><SVG icon="backArrow"/></div>
                    <div className="create-event-title">Create New { this.props.isInquiry ? 'Inquiry' : 'Reservation' }</div>
                </div>
                <div className="reservation-content">
                    <section className="section">
                        <div className="vj-subsection-header">Selected Dates</div>
                        <div className="dates">
                            <span className="date">
                                { this.state.start_date.format('YYYY-MM-DD') }
                            </span>
                            <span className="separator">-</span>
                            <span className="date">
                                { this.state.end_date.format('YYYY-MM-DD') }
                            </span>
                        </div>
                    </section>
                    <section className="section">
                        <div className="vj-subsection-header">Basic Info</div>
                        <div className="property">
                            <div className="image" style={{ backgroundImage: `url(${image})` }}/>
                            <div className="text">
                                <div className="name">{ name }</div>
                                <div className="address">{ address }</div>
                            </div>
                        </div>
                        <div className="small">
                            <Select
                                id="source"
                                label="Source"
                                value={ this.state.source }
                                onChange={ (val) => this.setState({ source: val }) }
                                options={[
                                    { name: 'Airbnb', value: 'airbnb' },
                                    { name: 'Booking.com', value: 'booking' },
                                    { name: 'VRBO', value: 'vrbo' },
                                ]}
                            />
                        </div>
                    </section>
                    <section className="section">
                        <div className="vj-subsection-header">Guest Information</div>
                        <div className="side-by-side">
                            <div className="small space">
                                <TextField
                                    id="fname"
                                    label="First Name"
                                    hasError={ this.state.errors.firstName ? 'Required' : false }
                                    value={ this.state.first_name }
                                    onChange={ (evt) => this.setState({ first_name: evt.target.value }) }
                                />
                            </div>
                            <div className="small">
                                <TextField
                                    id="lname"
                                    label="Last Name"
                                    hasError={ this.state.errors.lastName ? 'Required' : false }
                                    value={ this.state.last_name }
                                    onChange={ (evt) => this.setState({ last_name: evt.target.value }) }
                                />
                            </div>
                        </div>
                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                            hasError={ this.state.errors.email ? 'Enter a valid email address' : false }
                            value={ this.state.email }
                            onChange={ (evt) => this.setState({ email: evt.target.value }) }
                        />
                        <TextField
                            id="phone"
                            label="Phone"
                            hasError={ this.state.errors.phone ? 'Enter a valid phone number' : false }
                            value={ this.state.phone }
                            onChange={ (evt) => this.setState({ phone: evt.target.value }) }
                        />
                        <div className="side-by-side">
                            <div className="small space">
                                <Select
                                    id="guest"
                                    label="Guests"
                                    addonRight="Adults"
                                    options={ this.options }
                                    value={ this.state.guests_adults }
                                    onChange={ (val) => this.setState({ guests_adults: val }) }
                                />
                            </div>
                            <div className="small">
                                <Select
                                    id="guest-k"
                                    label="Guests"
                                    addonRight="Kids"
                                    options={ this.optionsKids }
                                    value={ this.state.guests_children }
                                    onChange={ (val) => this.setState({ guests_children: val }) }
                                />
                            </div>
                        </div>
                    </section>
                </div>
                <div className="actions">
                    <ButtonNew label="Cancel" onClick={ this.props.onCancel } className="ghost"/>
                    <ButtonNew label="Next Step" onClick={ () => this.validateForm() }/>
                </div>
            </div>
        );
    }
}

export default Reservation;
