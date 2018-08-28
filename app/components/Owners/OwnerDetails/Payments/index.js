import React from 'react';
import venmo from 'assets/images/venmo.png';
import paypal from 'assets/images/paypal.png';
import Select from 'components/Select';
import SVG from 'components/SVG';
import TextField from 'components/TextField';
import Radio from 'components/Radio';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOwners, selectLoading } from 'containers/Owners/selectors';
import { fetchOwners, updateOwner } from 'containers/Owners/actions';
import './payments.less';

export class Payments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            booking: '',
            vrbo: '',
            airbnb: '',
            ta: '',
            payout: 'ach',
            payin: 'ach'
        };
    }

    onChange(field, value) {
        this.setState({ [field]: value });
    }

    render() {
        return (
            <div className="owner-details-payments">
                <div className="step-header">
                    <SVG className="step-header-icon" icon="money"/>
                    <span>Payment</span>
                </div>
                <div className="section">
                    <div className="section-title">Pay-Out Method</div>
                    <div className="section-content">
                        <div className="payment-method">
                            <div className="payment-options">
                                <div className="option">
                                    <Radio
                                        label={ <div className="ach">ACH</div> }
                                        name="a"
                                        id="ach"
                                        onChange={ () => this.onChange('payout', 'ach') }
                                        checked={ this.state.payout === 'ach' }
                                    />
                                </div>
                                <div className="option">
                                    <Radio
                                        label={ <div className="paypal-logo-wrapper">&nbsp;<img className="paypal-logo" width="40" src={ paypal }/></div> }
                                        name="a"
                                        id="pp"
                                        onChange={ () => this.onChange('payout', 'pp') }
                                        checked={ this.state.payout === 'pp' }
                                    />
                                </div>
                                <div className="option">
                                    <Radio
                                        label={ <img width="60" src={ venmo }/> }
                                        name="a"
                                        id="v"
                                        onChange={ () => this.onChange('payout', 'venmo') }
                                        checked={ this.state.payout === 'venmo' }
                                    />
                                </div>
                            </div>
                            <TextField
                                id="account"
                                label="Account Number"
                            />
                            <TextField
                                id="routing"
                                label="Routing Number"
                            />
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="section-title">Pay-In Method</div>
                    <div className="section-content">
                        <div className="payment-method">
                            <div className="payment-options pay-in">
                                <div className="option">
                                    <Radio
                                        label={ <div className="ach">ACH</div> }
                                        name="b"
                                        id="ach2"
                                        onChange={ () => this.onChange('payin', 'ach') }
                                        checked={ this.state.payin === 'ach' }
                                    />
                                </div>
                                <div className="option">
                                    <Radio
                                        label={ <div className="ach cc">Credit Card</div> }
                                        name="b"
                                        id="pp2"
                                        onChange={ () => this.onChange('payin', 'cc') }
                                        checked={ this.state.payin === 'cc' }
                                    />
                                </div>
                                <div className="option"/>
                            </div>
                            <TextField
                                id="account"
                                label="Account Number"
                            />
                            <TextField
                                id="routing"
                                label="Routing Number"
                            />
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="section-title">Payment Frequency</div>
                    <div className="section-content">
                        <div className="routing">
                            <Select
                                placeholder="-"
                                options={[
                                    { name: 'Every Reservation', value: 'r' },
                                    { name: 'Weekly', value: 'w' },
                                    { name: 'Monthly', value: 'm' },
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="section-title">Each Listing - whose bank account goes with the listing</div>
                    <div className="section-content">
                        <div className="payment-method">
                            <Select
                                placeholder="-"
                                options={[
                                    { name: 'Owner', value: 'o' },
                                    { name: 'Voyajoy', value: 'v' }
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="section-title">Payment Timing</div>
                    <div className="section-content">
                        <div>
                            <div className="payment-days-group">
                                <div className="method">
                                    <Select
                                        label="Booking.com"
                                        placeholder="-"
                                        value={ this.state.booking }
                                        options={[
                                            { name: 'Pay immediately after Voyajoy confirms receipt of payment', value: 'o' },
                                            { name: 'Pay prior to payment date', value: 'v' }
                                        ]}
                                        onChange={ (val) => this.onChange('booking', val) }
                                    />
                                </div>
                                <div className="days">
                                    { this.state.booking === 'v' &&
                                        <TextField id="b" type="number" addonRight="Days prior"/>
                                    }
                                </div>
                            </div>
                            <div className="payment-days-group">
                                <div className="method">
                                    <Select
                                        label="VRBO"
                                        placeholder="-"
                                        options={[
                                            { name: 'Pay immediately after Voyajoy confirms receipt of payment', value: 'o' },
                                            { name: 'Pay prior to payment date', value: 'v' }
                                        ]}
                                        onChange={ (val) => this.onChange('vrbo', val) }
                                    />
                                </div>
                                <div className="days">
                                    { this.state.vrbo === 'v' &&
                                        <TextField id="v" type="number" addonRight="Days prior"/>
                                    }
                                </div>
                            </div>
                            <div className="payment-days-group">
                                <div className="method">
                                    <Select
                                        label="Airbnb"
                                        placeholder="-"
                                        options={[
                                            { name: 'Pay immediately after Voyajoy confirms receipt of payment', value: 'o' },
                                            { name: 'Pay prior to payment date', value: 'v' }
                                        ]}
                                        onChange={ (val) => this.onChange('airbnb', val) }
                                    />
                                </div>
                                <div className="days">
                                    { this.state.airbnb === 'v' &&
                                        <TextField id="a" type="number" addonRight="Days prior"/>
                                    }
                                </div>
                            </div>
                            <div className="payment-days-group">
                                <div className="method">
                                    <Select
                                        label="TripAdvisor"
                                        placeholder="-"
                                        options={[
                                            { name: 'Pay immediately after Voyajoy confirms receipt of payment', value: 'o' },
                                            { name: 'Pay prior to payment date', value: 'v' }
                                        ]}
                                        onChange={ (val) => this.onChange('ta', val) }
                                    />
                                </div>
                                <div className="days">
                                    { this.state.ta === 'v' &&
                                        <TextField id="t" type="number" addonRight="Days prior"/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="section-title">Voyajoy Fee Calculation Method</div>
                    <div className="section-content">
                        <div className="wide">
                            <Select
                                placeholder="-"
                                options={[
                                    { name: 'Strictly based on commission %', value: 'o' },
                                    { name: 'Strictly based on buy-sell spread (Voyajoy price minus owner\'s price)', value: 'v' },
                                    { name: 'Take the best of the 2 options above', value: 'v' }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    owners: selectOwners(),
    loading: selectLoading(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchOwners: () => dispatch(fetchOwners()),
        selectOwner: (id) => dispatch(push('/owners/' + id)),
        updateOwner: (data) => dispatch(updateOwner(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
