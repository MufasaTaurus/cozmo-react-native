import React from 'react';
import { Link } from 'react-router';
import BoxWithLogo from 'components/BoxWithLogo';
import TextField from 'components/TextField';
import ButtonNew from 'components/ButtonNew';
import { connect } from 'react-redux';
import { REGEXP_EMAIL } from 'utils/const';
import { forgotPasswordEmailChange, forgotPasswordSendEmail } from 'containers/Signup/actions';
import { makeSelectForgotPasswordEmailSent, makeSelectForgotPasswordEmail } from 'containers/Signup/selectors';
import { createStructuredSelector } from 'reselect';
import './forgotPassword.less';

export class ForgotPassword extends React.Component {

    submitForm() {
        if (REGEXP_EMAIL.test(this.props.email)) {
            this.props.dispatch(forgotPasswordSendEmail());
        }
    }

    onEmailChange(evt) {
        this.props.dispatch(forgotPasswordEmailChange({ email: evt.target.value }));
    }

    renderVerification() {
        return (
            <form className="form" onSubmit={ (evt) => evt.preventDefault() }>
                <div className="info">Enter the email you use to login to your account.</div>
                <TextField
                    id="email"
                    placeholder="Email"
                    big
                    onChange={ (evt) => this.onEmailChange(evt) }
                />
                <ButtonNew
                    label="Submit"
                    fullWidth
                    type="submit"
                    onClick={ () => this.submitForm() }
                    disabled={ !REGEXP_EMAIL.test(this.props.email) }
                />
            </form>
        );
    }

    renderVerificationSuccess() {
        return (
            <div className="email-sent-confirmation">
                <div className="info">We have sent <span className="email">{ this.props.email }</span> an email with reset password instructions.</div>
                <Link className="button-new" to="/">Go back</Link>
            </div>
        );
    }

    renderContent() {
        if (this.props.emailSent) {
            return this.renderVerificationSuccess();
        } else {
            return this.renderVerification();
        }
    }

    render() {
        return (
            <div className="forgot-password">
                <BoxWithLogo
                    title={ this.props.emailSent ? 'Success' : 'Reset Password' }
                    content={ this.renderContent() }/>
            </div>
        );
    }
}


const mapStateToProps = createStructuredSelector({
    email: makeSelectForgotPasswordEmail(),
    emailSent: makeSelectForgotPasswordEmailSent()
});

export default connect(mapStateToProps)(ForgotPassword);

