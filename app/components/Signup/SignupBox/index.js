import React from 'react';
import { Link } from 'react-router';
import OrSeparator from 'components/Signup/OrSeparator';
import BoxWithLogo from 'components/BoxWithLogo';
import ButtonNew from 'components/ButtonNew';
import TextField from 'components/TextField';
import CreatePassword from 'components/Signup/CreatePassword';
import ErrorMsgBox from 'components/Signup/ErrorMsgBox';
import GoogleButton from 'components/Signup/GoogleButton';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { REGEXP_EMAIL, REGEXP_PASSWORD } from 'utils/const';
import { signup } from 'containers/Signup/actions';
import { makeSelectSignupSuccess, makeSelectSignupError } from 'containers/Signup/selectors';
import './signupBox.less';

export class SignupBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            showErrors: false,
            emailError: false,
        };
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
    }

    submitForm() {
        if (this.validateForm()) {
            this.setState({ showErrors: false, emailError: false });
            this.props.dispatch(signup({
                email: this.state.email,
                password: this.state.password,
            }));
        } else {
            this.setState({ showErrors: true });
        }
    }

    validateForm() {
        let isValid = true;
        this.setState({ emailError: false });

        const email = this.state.email.trim();
        if (!(REGEXP_EMAIL.test(email))) {
            isValid = false;
            this.setState({ emailError: true });
        }

        const password = this.state.password.trim();
        const confirmPassword = this.state.confirmPassword.trim();
        if (!(REGEXP_PASSWORD.test(password) && password !== email) || password !== confirmPassword) {
            isValid = false;
        }

        return isValid;
    }

    renderForm() {
        const showErrors = this.state.showErrors;
        const emailError = this.state.showErrors && this.state.emailError;
        return (
            <form className="form" onSubmit={ (evt) => evt.preventDefault() }>
                { emailError &&
                    <ErrorMsgBox text="It doesn't look like an email address."/>
                }
                { this.props.signupError &&
                    <ErrorMsgBox text="User already exists."/>
                }
                <TextField
                    big
                    id="email"
                    placeholder={ 'Email' }
                    onChange={ evt => this.handleChange('email', evt.target.value) }
                    hasError={ emailError }
                    value={ this.state.email }
                />
                <CreatePassword
                    password={ this.state.password }
                    confirmPassword={ this.state.confirmPassword }
                    handleChange={ (field, value) => this.handleChange(field, value) }
                    showErrors={ showErrors }
                />
                <ButtonNew
                    label={ 'Sign up' }
                    fullWidth={ true }
                    type="submit"
                    onClick={ () => this.submitForm() }
                    disabled={ !this.state.password || !this.state.confirmPassword || !this.state.email }
                />
            </form>
        );
    }

    renderConfirmation() {
        return (
            <div className="confirmation">
                We have sent <span className="email">{ this.state.email }</span> an email with a verification link. Please verify your email.
            </div>
        );
    }

    render() {
        return (
            <div className="signup-box">
                { this.props.signupSuccess ?
                    <BoxWithLogo
                        title="SUCCESS"
                        content={ this.renderConfirmation() }
                    />
                    :
                    <BoxWithLogo
                        title="Join Cozmo Today"
                        content={
                            <div>
                                <GoogleButton signup/>
                                <div className="separator">
                                    <OrSeparator/>
                                </div>
                                { this.renderForm() }
                                <div className="login-with-email">
                                    Have an account?
                                    <div className="link"><Link to="/">Log In</Link></div>
                                </div>
                            </div>
                        }
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    signupSuccess: makeSelectSignupSuccess(),
    signupError: makeSelectSignupError(),
});

export default connect(mapStateToProps)(SignupBox);
