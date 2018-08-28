import React from 'react';
import Helmet from 'react-helmet';
import ResetPasswordComponent from 'components/Signup/ResetPassword';

class ResetPassword extends React.Component {

    render() {
        return (
            <article>
                <Helmet
                    title="Reset Password"
                    meta={[
                        { name: 'description', content: 'Voyajoy' },
                    ]}
                />
                <ResetPasswordComponent location={ this.props.location }/>
            </article>
        );
    }
}

export default ResetPassword;
