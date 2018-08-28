import React from 'react';
import TextField from 'components/TextField';
import DropdownInput from 'components/DropdownInput';
import Select from 'components/Select';
import './fee.less';

export class Fee extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: props.fee.getType(),
            name: props.fee.getName(),
            value: props.fee.getValue(),
            isPercentage: props.fee.getIsPercentage()
        };
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
    }

    render() {
        const fee = this.props.fee;
        return (
            <div className="pricing-fees-fee">
                <div>
                    <span className="short">
                        <Select
                            label="Type"
                            value={ this.state.type }
                            onChange={ (val) => {
                                fee.setType(val);
                                this.handleChange('type', val);
                            } }
                            options={[
                                { name: 'Fee', value: 'Other Fee' },
                                { name: 'Tax', value: 'Cleaning Fee' },
                                { name: 'Security Deposit', value: 'Security Deposit' },
                            ]}
                        />
                    </span>
                    <div className="narrow">
                        <TextField
                            id="name"
                            label="Name of Fee"
                            value={ this.state.name }
                            onChange={ (evt) => {
                                fee.setName(evt.target.value);
                                this.handleChange('name', evt.target.value);
                            } }
                        />
                    </div>
                    <div className="side-by-side">
                        <div className="narrow">
                            <DropdownInput
                                id="value"
                                label="Amount"
                                type="number"
                                value={ this.state.value }
                                options={[
                                    { name: '$', value: false },
                                    { name: '%', value: true }
                                ]}
                                onChange={ (evt) => {
                                    fee.setValue(evt.target.value);
                                    this.handleChange('value', evt.target.value);
                                } }
                                onOptionChange={ (val) => {
                                    fee.setIsPercentage(val);
                                    this.handleChange('isPercentage', val);
                                } }
                            />
                        </div>
                        { this.state.isPercentage &&
                            <div className="short second">
                                <Select
                                    label="% of"
                                    //value={ this.state.type }
                                    onChange={ (val) => {
                                        //fee.setType(val);
                                        //this.handleChange('type', val);
                                    } }
                                    options={[
                                        { name: 'Rental fee only', value: '1' },
                                        { name: 'Reservation subtotal', value: '2' },
                                        { name: 'Reservation total', value: 'Security 3' },
                                    ]}
                                />
                            </div>
                        }
                    </div>
                    <div>
                        <div className="narrow">
                            <Select
                                label="Fee per"
                                value={ this.state.type }
                                onChange={ (val) => {
                                    //fee.setType(val);
                                    //this.handleChange('type', val);
                                } }
                                options={[
                                    { name: 'Person - reservation', value: '1' },
                                    { name: 'Person - nightly', value: '2' },
                                    { name: 'Reservation', value: '3' },
                                    { name: 'Nightly', value: '4' },
                                    { name: 'Weekly', value: '5' },
                                    { name: 'Monthly', value: '6' },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Fee;

