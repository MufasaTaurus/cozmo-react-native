import React from 'react';
import Modal from 'components/Modal';
import TextField from 'components/TextField';
import { REGEXP_EMAIL, REGEXP_PHONE } from 'utils/const';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAddingOwner } from 'containers/Owners/selectors';
import { addOwner } from 'containers/Owners/actions';
import './addOwner.less';

export class AddOwner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
        };
    }

    onChange(field, value) {
        this.setState({ [field]: value });
    }

    canSubmit() {
        return this.state.first_name &&
            this.state.last_name &&
            REGEXP_PHONE.test(this.state.phone) &&
            REGEXP_EMAIL.test(this.state.email);
    }

    onSubmit() {
        this.props.addOwner(this.state);
    }

    render() {
        const form = (
            <div className="add-owner-form">
                <div className="intro">
                    <div className="title">Add a new Owner!</div>
                    <div className="subtitle">Add property owners to manage their information.</div>
                </div>
                <div className="form">
                    <TextField
                        id="fname"
                        label="First Name"
                        value={ this.state.first_name }
                        onChange={ (evt) => this.onChange('first_name', evt.target.value) }
                    />
                    <TextField
                        id="lname"
                        label="Last Name"
                        value={ this.state.last_name }
                        onChange={ (evt) => this.onChange('last_name', evt.target.value) }
                    />
                    <TextField
                        id="phone"
                        label="Phone Number"
                        value={ this.state.phone }
                        onChange={ (evt) => this.onChange('phone', evt.target.value) }
                    />
                    <TextField
                        id="email"
                        label="Email"
                        value={ this.state.email }
                        //hasError={ emailError }
                        onChange={ (evt) => this.onChange('email', evt.target.value) }
                    />
                </div>
            </div>
        );
        const disabled = !this.canSubmit() || this.props.loading === 'adding';
        return (
            <div className="owners-list-add-owner">
                { this.props.open &&
                    <Modal
                        title="Add Owner"
                        icon="addBox"
                        content={ form }
                        submitLabel="Create"
                        hideCancel
                        className="medium"
                        submitDisabled={ disabled }
                        onClose={ this.props.onClose }
                        onSubmit={ () => this.onSubmit() }
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    loading: selectAddingOwner()
});

export function mapDispatchToProps(dispatch) {
    return {
        addOwner: (data) => dispatch(addOwner(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOwner);
