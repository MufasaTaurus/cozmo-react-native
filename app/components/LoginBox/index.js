import React from 'react';
import { Link } from 'react-router';
import OrSeparator from 'components/Signup/OrSeparator';
import GoogleButton from 'components/Signup/GoogleButton';
import ButtonNew from 'components/ButtonNew';
import TextField from 'components/TextField';
import Spinner from 'components/Spinner';
import BoxWithLogo from 'components/BoxWithLogo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { login } from 'containers/HomePage/actions';
import { makeSelectLogging, makeSelectLoginError, makeSelectGoogleLoginError } from 'containers/HomePage/selectors';
import './loginBox.less';

export class LoginBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    onSubmitForm() {
        if (this.state.email && this.state.password) {
            this.props.dispatch(login({ username: this.state.email, password: this.state.password }));
        }
    }

    render() {
        const alert = this.props.loginError ? 'Error: ' + this.props.loginError : null;
        return (
            <BoxWithLogo
                title="Welcome Back"
                alert={ alert }
                content={
                <div className="login-box">
                    { this.props.logging &&
                        <div className="loader-wrapper">
                            <div className="loader">
                                <Spinner />
                            </div>
                        </div>
                    }
                    <div className="google-wrapper">
                        <div className="google-error-wrapper"><div className="google-error">{ this.props.googleLoginError }</div></div>
                        <GoogleButton/>
                    </div>
                    <div className="separator">
                        <OrSeparator/>
                    </div>
                    <form onSubmit={ (evt) => evt.preventDefault() }>
                        <div className="form">
                            <TextField
                                big
                                id="email"
                                placeholder="Email"
                                onChange={ evt => this.setState({ email: evt.target.value }) }
                                hasError={ !!this.props.loginError }
                                value={ this.state.email }
                            />
                            <TextField
                                big
                                id="password"
                                placeholder="Password"
                                type="password"
                                onChange={ evt => this.setState({ password: evt.target.value }) }
                                hasError={ !!this.props.loginError }
                                value={ this.state.password }
                            />
                            <div className="forgot link"><Link to="/forgot">Forgot?</Link></div>
                            <ButtonNew
                                label="log in"
                                type="submit"
                                fullWidth
                                onClick={ () => this.onSubmitForm() }
                                disabled={ !(this.state.email && this.state.password) }
                            />
                        </div>
                    </form>
                    <div className="login-with-email">
                        <div>Don't have an account?</div>
                        <Link to="/signup" className="link">Create an account</Link>
                    </div>
                </div>
            }/>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    logging: makeSelectLogging(),
    loginError: makeSelectLoginError(),
    googleLoginError: makeSelectGoogleLoginError()
});

export default connect(mapStateToProps)(LoginBox);
