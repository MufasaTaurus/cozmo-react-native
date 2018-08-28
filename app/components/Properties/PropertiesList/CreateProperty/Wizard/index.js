import React from 'react';
import SVG from 'components/SVG';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { wizardSetStep } from 'containers/Properties/actions';
import { makeSelectNewPropertyCurrentStep } from 'containers/Properties/selectors';
import './wizard.less';

export class Wizard extends React.Component {

    constructor(props) {
        super(props);
        this.steps = [
            { icon: 'pin', title: 'Location' },
            { icon: 'puzzle', title: 'Basic details' },
            { icon: 'bedAirplane', title: 'Bedroom details' },
            { icon: 'tv', title: 'Amenities' },
            { icon: 'sync', title: 'iCal Sync' },
            { icon: 'photo', title: 'Photos' },
            // { icon: 'money', title: 'Pricing' },
            // { icon: 'alarm', title: 'Availability' },
            { icon: 'heart', title: 'Things to Do' },
            { icon: 'done', title: 'Complete' },
        ];
    }

    goToStep(step) {
        if (step <= this.props.maxStep) {
            this.props.wizardSetStep(step);
        }
    }

    render() {
        return (
            <div className="wizard">
                <div className="stepper">
                    { this.steps.map((s, index) => {
                        return (
                            <div
                                key={ index }
                                onClick={ () => this.goToStep(index) }
                                className={ 'step' + (index <= this.props.maxStep ? ' active' : '') }
                            >
                                <SVG className="step-icon" icon={ s.icon } size="20"/>
                                <span>{ s.title }</span>
                            </div>
                        );
                    }) }
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentStep: makeSelectNewPropertyCurrentStep()
});

export function mapDispatchToProps(dispatch) {
    return {
        wizardSetStep: (step) => dispatch(wizardSetStep(step))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
