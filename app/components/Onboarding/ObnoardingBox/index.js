import React from 'react';
import SVG from 'components/SVG';
import './onboardingBox.less';

export class OnboardingBox extends React.Component {

    render() {
        return (
            <div className="onboarding-box">
                <div className="logo-wrapper">
                    <SVG icon={ 'logoV' } size={ 60 }/>
                    <div className="title">Onboarding</div>
                </div>
                <div className="content">
                    { this.props.content }
                </div>
            </div>
        );
    }
}

export default OnboardingBox;
