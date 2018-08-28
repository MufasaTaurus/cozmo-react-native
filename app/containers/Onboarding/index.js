import React from 'react';
import Helmet from 'react-helmet';
import OnboardingComponent from 'components/Onboarding';

class ResetPassword extends React.Component {

    render() {
        return (
            <article>
                <Helmet
                    title="Onboarding"
                    meta={[
                        { name: 'description', content: 'Voyajoy' },
                    ]}
                />
                <OnboardingComponent />
            </article>
        );
    }
}

export default ResetPassword;
