import React from 'react';
import SVG from 'components/SVG';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { GOOGLE_CLIENT_ID } from 'utils/const';
import { signupWithGoogle } from 'containers/Signup/actions';
import { loginWithGoogle } from 'containers/HomePage/actions';
import './googleButton.less';

class GoogleButton extends React.Component {

    responseGoogle(response) {
        if (this.props.signup) {
            this.props.dispatch(signupWithGoogle(response));
        } else {
            this.props.dispatch(loginWithGoogle(response));
        }
    }

    render() {
        return (
            <GoogleLogin
                className="google-button"
                style={{ width: '100%' }}
                clientId={ GOOGLE_CLIENT_ID }
                buttonText={
                    <span className="google-button-text">
                        <span className="google-icon-wrapper">
                            <SVG icon={ 'logoGoogle' } size={ 22 } /></span>
                        <span>{ 'Continue with Google' }</span>
                    </span> }
                //uxMode={ 'redirect' }
                tag={ 'div' }
                onSuccess={ (response) => this.responseGoogle(response) }
                onFailure={ (response) => this.responseGoogle(response) }
                prompt="select_account"
            />
        );
    }
}

export default connect(null)(GoogleButton);
