import React from 'react';
import isObject from 'lodash/isObject';
import ButtonNew from 'components/ButtonNew';
import SVG from 'components/SVG';
import Modal from 'components/Modal';
import Select from 'components/Select';
import TextField from 'components/TextField';
import { REGEXP_EMAIL, REGEXP_PHONE } from 'utils/const';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAddingVendor } from 'containers/Vendors/selectors';
import { addVendor } from 'containers/Vendors/actions';
import './invite.less';

export class Invite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            phone: '',
            email: '',
            first_name: '',
            last_name: '',
            account_type: 'Cleaner'
        };
    }

    closeDialog() {
        this.setState({ dialogOpen: false });
    }

    handleFormChange(field, value) {
        this.setState({ [field]: value });
    }

    canSubmit() {
        return this.state.first_name &&
            this.state.last_name &&
            REGEXP_PHONE.test(this.state.phone) &&
            REGEXP_EMAIL.test(this.state.email);
    }

    submitDialog() {
        this.props.addVendor(this.state);
    }

    render() {
        const emailError = isObject(this.props.loading) ? this.props.loading.email : '';
        const phoneError = isObject(this.props.loading) ? this.props.loading.phone : '';
        const form = (
            <div>
                <div className="info">
                    <div className="title">Invite a new Vendor!</div>
                    <div className="subtitle">We will invite them to add their own profile information</div>
                </div>
                <form className="invite-vendor-form">
                    <TextField
                        id="fname"
                        label="First Name"
                        value={ this.state.first_name }
                        onChange={ (evt) => this.handleFormChange('first_name', evt.target.value) }
                    />
                    <TextField
                        id="lname"
                        label="Last Name"
                        value={ this.state.last_name }
                        onChange={ (evt) => this.handleFormChange('last_name', evt.target.value) }
                    />
                    <TextField
                        id="email"
                        label="Email"
                        value={ this.state.email }
                        hasError={ emailError }
                        onChange={ (evt) => this.handleFormChange('email', evt.target.value) }
                    />
                    <TextField
                        id="phone"
                        label="Phone number"
                        value={ this.state.phone }
                        hasError={ phoneError }
                        onChange={ (evt) => this.handleFormChange('phone', evt.target.value) }
                    />
                    <Select
                        id="type"
                        label="Vendor Type"
                        onChange={ (val) => this.handleFormChange('account_type', val) }
                        options={[
                            { name: 'Cleaner', value: 'Cleaner' },
                            { name: 'Maintainer', value: 'Maintainer' },
                            { name: 'Deliverer', value: 'Deliverer' }
                        ]}
                        value={ this.state.account_type }
                    />
                </form>
            </div>
        );
        const disabled = !this.canSubmit() || this.props.loading === 'adding';
        return (
            <div className="cleaners-invite">
                <div className="invite-box">
                    <div>
                        <div className="header">
                            <div className="hello">Hello!</div>
                            <div><SVG icon="smileNew" size={ 75 }/></div>
                        </div>
                        <div className="text">
                            <p className="title">Invite a new cleaner</p>
                            <p>Your cleaner will be part of our cleaning automation.</p>
                        </div>
                        <ButtonNew
                            label="Invite"
                            className="green"
                            onClick={ () => this.setState({ dialogOpen: true }) }/>
                    </div>
                </div>
                { this.state.dialogOpen &&
                    <Modal
                        title="Invite Vendor"
                        icon="addBox"
                        content={ form }
                        submitDisabled={ disabled }
                        submitLabel="Invite"
                        hideCancel
                        onClose={ () => this.closeDialog() }
                        onSubmit={ () => this.submitDialog() }
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    loading: selectAddingVendor(),
});

export function mapDispatchToProps(dispatch) {
    return {
        addVendor: (data) => dispatch(addVendor(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
