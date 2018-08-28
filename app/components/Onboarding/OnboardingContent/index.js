import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import './onboardingContent.less';
import Welcome from 'components/Onboarding/OnboardingSteps/Welcome';
import Plan from 'components/Onboarding/OnboardingSteps/Plan';
import Team from 'components/Onboarding/OnboardingSteps/Team';
import Properties from 'components/Onboarding/OnboardingSteps/Properties';
import Summary from 'components/Onboarding/OnboardingSteps/Summary';
import Thanks from 'components/Onboarding/OnboardingSteps/Thanks';
import {makeSelectCurrentStep, makeSelectFinished, makeSelectAllData} from 'containers/Onboarding/selectors';
import {nextStep, finishOnboarding} from 'containers/Onboarding/actions';
import {updateUserPlan} from 'containers/App/actions';
import { push } from 'react-router-redux';

export class OnboardingContent extends React.Component {

    componentDidUpdate() {
        if (this.props.finished) {
            this.props.goToProperties();
            this.props.updateUserPlan(this.props.plan);
        }
    }

    renderStep() {
        switch (this.props.currentStep) {
            case 0:
            default:
                return <Welcome nextStep={ this.props.nextStep }/>;
            case 1:
                return <Plan nextStep={ this.props.nextStep }/>;
            case 2:
                return <Team nextStep={ this.props.nextStep }/>;
            case 3:
                return <Properties nextStep={ this.props.nextStep }/>;
            case 4:
                return <Summary nextStep={ this.props.nextStep }/>;
            case 5:
                return <Thanks nextStep={ this.props.finishOnboarding }/>;
        }
    }

    render() {
        return (
            this.renderStep()
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentStep: makeSelectCurrentStep(),
    finished: makeSelectFinished(),
    plan: makeSelectAllData()
});

export function mapDispatchToProps(dispatch) {
    return {
        nextStep: () => dispatch(nextStep()),
        finishOnboarding: () => dispatch(finishOnboarding()),
        updateUserPlan: (data) => dispatch(updateUserPlan(data)),
        goToProperties: () => dispatch(push('/properties'))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingContent);
