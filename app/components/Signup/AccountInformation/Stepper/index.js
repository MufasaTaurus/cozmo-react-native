import React from 'react';
import './stepper.less';

export class Stepper extends React.Component {

    render() {
        const activeStep = this.props.step;
        return (
            <div className="stepper">
                <div className="steps">
                    <div className={ 'step' + (activeStep === 1 ? ' active' : '') } onClick={ this.props.onStepClick }>
                        <div className="label">Profile</div>
                        <div className="dot-wrapper">
                            <div className="outer-dot"><div className="inner-dot"/></div>
                        </div>
                    </div>
                    <div className={ 'step' + (activeStep === 2 ? ' active' : '') }>
                        <div className="label">Type</div>
                        <div className="dot-wrapper">
                            <div className="outer-dot"><div className="inner-dot"/></div>
                        </div>
                    </div>
                </div>
                <div className="line"/>
            </div>
        );
    }
}

export default Stepper;
