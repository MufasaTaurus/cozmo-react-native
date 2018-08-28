import React from 'react';
import Helmet from 'react-helmet';
import SignupBox from 'components/Signup/SignupBox';
import AccountVerification from 'components/Signup/AccountVerification';
import ForgotPassword from 'components/Signup/ForgotPassword';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from 'containers/App/selectors';

class Signup extends React.Component {

    setContent() {
        if (this.props.user.size) {
            browserHistory.push('/');
            return;
        }
        const location = browserHistory.getCurrentLocation().pathname;
        const accountVerification = <AccountVerification />;
        const forgotPassword = <ForgotPassword />;
        const signupBox = <SignupBox isEmail={ false }/>;
        const signupBoxForm = <SignupBox isEmail={ true }/>;
        if ((/account-verification/).test(location)) {
            return accountVerification;
        } else if ((/email/).test(location)) {
            return signupBoxForm;
        } else if ((/forgot/).test(location)) {
            return forgotPassword;
        } else {
            return signupBox;
        }
    }

    render() {
        return (
            <article>
                <Helmet
                    title="Signup"
                    meta={[
                        { name: 'description', content: 'Signup' },
                    ]}
                />
                { this.setContent() }
            </article>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser()
});


export default connect(mapStateToProps)(Signup);
