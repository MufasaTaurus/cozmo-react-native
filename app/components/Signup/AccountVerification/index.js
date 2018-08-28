import React from 'react';
import ButtonNew from 'components/ButtonNew';
import BoxWithLogo from 'components/BoxWithLogo';
import Spinner from 'components/Spinner';
import { connect } from 'react-redux';
import { accountVerification } from 'containers/Signup/actions';
import { makeSelectVerificationSuccess, makeSelectVerificationError } from 'containers/Signup/selectors';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import './accountVerification.less';

export class AccountVerification extends React.Component {

    componentWillMount() {
        const key = browserHistory.getCurrentLocation().query.key;
        if (key) {
            this.props.dispatch(accountVerification(key));
            browserHistory.push('/signup/account-verification');
        } else {
            browserHistory.push('/');
        }
    }

    renderVerification() {
        const isLoading = !this.props.verificationSuccess && !this.props.verificationError;
        return (
            <div>
                { isLoading && <div className="disabler"><Spinner/></div> }
                <div className="form">
                    <div className="info">
                        { this.props.verificationError ?
                            'Verification failed. Click the link from the email again.'
                            :
                            'We verified your email. Please log in to continue.'
                        }
                    </div>
                    <ButtonNew
                        label="Log In"
                        disabled={ this.props.verificationError }
                        linkTo={ this.props.verificationError ? undefined : '/' }
                        fullWidth={ true }/>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="signup-account-verification">
                <BoxWithLogo
                    title="ACCOUNT VERIFIED"
                    content={ this.renderVerification() }/>
            </div>
        );
    }
}


const mapStateToProps = createStructuredSelector({
    verificationSuccess: makeSelectVerificationSuccess(),
    verificationError: makeSelectVerificationError(),
});

export default connect(mapStateToProps)(AccountVerification);

