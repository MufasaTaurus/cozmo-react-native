import React from 'react';
import { REGEXP_PASSWORD } from 'utils/const';
import Modal from 'components/Modal';
import SVG from 'components/SVG';
import TextField from 'components/TextField';
import CreatePassword from 'components/Signup/CreatePassword';
import './changePassword.less';

export class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1,
            oldPassword: '',
            password: '',
            confirmPassword: '',
            loading: false,
            showErrors: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.resettingPassword === 'sending') {
            if (nextProps.resettingPassword === 'success') {
                this.setState({ currentStep: 3, loading: false });
            } else if (nextProps.resettingPassword === 'error') {
                this.setState({ loading: false });
            }
        }
        if (this.props.changingPassword === 'sending') {
            if (nextProps.changingPassword === 'success') {
                this.setState({ currentStep: 4, loading: false });
            } else {
                this.setState({ loading: false });
            }
        }
    }

    handleFormChange(field, value) {
        this.setState({ [field]: value });
    }

    canSubmit() {
        return (
            this.state.oldPassword &&
            this.state.password &&
            this.state.confirmPassword &&
            this.state.oldPassword !== this.state.password
        );
    }

    validate() {
        return (
            this.state.oldPassword &&
            REGEXP_PASSWORD.test(this.state.password) &&
            this.state.password === this.state.confirmPassword
        );
    }

    saveChanges() {
        this.props.updateUser({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            phone: this.state.phone === '' ? null : this.state.phone
        });
    }

    onSubmit() {
        const step = this.state.currentStep;
        if (step === 1) {
            if (this.validate()) {
                this.setState({ showErrors: false, loading: true });
                this.props.changePassword({
                    oldPassword: this.state.oldPassword,
                    newPassword: this.state.password
                });
            } else {
                this.setState({ showErrors: true });
            }
        } else if (step === 2) {
            this.props.resetPassword();
            this.setState({ loading: true });
        } else {
            this.props.onClose();
            this.setState({ currentStep: 1 });
        }
    }

    onForgotPassword() {
        this.setState({ currentStep: 2 });
    }

    onClose() {
        this.props.onClose();
        this.setState({
            currentStep: 1,
            oldPassword: '',
            password: '',
            confirmPassword: ''
        });
    }

    getHeader() {
        switch (this.state.currentStep) {
            case 1:
                return 'CREATE NEW PASSWORD';
            case 2:
                return 'SEND RESET INSTRUCTIONS';
            case 3:
                return 'CHECK YOUR EMAIL';
            case 4:
                return 'SUCCESS';
        }
    }

    getInfo() {
        switch (this.state.currentStep) {
            case 1:
                return '';
            case 2:
                return <span>Email a link to <span className="email">{ this.props.email }</span></span>;
            case 3:
                return <span>We've sent an email to <span className="email">{ this.props.email }</span>. Click the link in the email to reset your password.</span>;
            case 4:
                return 'You successfully changed your password.';
        }
    }

    getSubmitLabel() {
        switch (this.state.currentStep) {
            case 1:
                return 'Change';
            case 2:
                return 'Send';
            case 3:
            case 4:
                return 'Close';
        }
    }

    render() {
        const submitDisabled = this.state.currentStep === 1 && !this.canSubmit();
        const content = (
            <div className="modal-form">
                <div className="form-title">{ this.getHeader() }</div>
                { this.state.currentStep === 1 &&
                    <div className="change-form">
                        { !!this.props.changingPassword.old_password &&
                            <div className="password-alert">
                                <SVG icon="info" size="20" className="alert-icon"/>
                                Error: Invalid password. Please try again.
                            </div>
                        }
                        <TextField
                            id="old"
                            placeholder="Enter your password"
                            value={ this.state.oldPassword }
                            onChange={ (evt) => this.setState({ oldPassword: evt.target.value }) }
                            type="password"
                            hasError={ !!this.props.changingPassword.old_password }
                        />
                        <div className="forgot" onClick={ () => this.onForgotPassword() }>Forgot?</div>
                        <CreatePassword
                            password={ this.state.password }
                            confirmPassword={ this.state.confirmPassword }
                            passwordPlaceholder="New password"
                            passwordConfirmPlaceholder="Confirm new password"
                            handleChange={ (field, value) => this.setState({ [field]: value }) }
                            showErrors={ this.props.changingPassword.new_password2 || this.state.showErrors }
                        />
                    </div>
                }
                <div className="send-email">{ this.getInfo() }</div>
            </div>
        );
        return (
            <div className="settings-account-change-password">
                { this.props.open &&
                    <Modal
                        title="Reset Password"
                        icon="lock"
                        small
                        content={ content }
                        submitLabel={ this.getSubmitLabel() }
                        hideCancel
                        onClose={ () => this.onClose() }
                        onSubmit={ () => this.onSubmit() }
                        submitDisabled={ submitDisabled }
                        loading={ this.state.loading }
                    />
                }
            </div>
        );
    }
}

export default ChangePassword;
