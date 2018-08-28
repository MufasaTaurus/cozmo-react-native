import React from 'react';
import AccountInformation from 'components/Signup/AccountInformation';
//import OnboardingBox from 'components/Onboarding/ObnoardingBox';
//import OnboardingContent from 'components/Onboarding/OnboardingContent';
//import './onboarding.less';


export class OnboardingComponent extends React.Component {

    render() {
        return <AccountInformation/>;
        // return (
        //     <div className="onboarding">
        //         <OnboardingBox content={
        //             <OnboardingContent title="Welcome!"/>
        //         } />
        //     </div>
        // );
    }
}

export default OnboardingComponent;
