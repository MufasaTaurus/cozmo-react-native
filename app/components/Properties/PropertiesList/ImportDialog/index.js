import React from 'react';
import ChooseTool from './Steps/ChooseTool';
import Login from './Steps/Login';
import Verification from './Steps/Verification';
import ChoosePhoneNumber from './Steps/ChoosePhoneNumber';
import EnterPin from './Steps/EnterPin';
import Import from './Steps/Import';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {nextStep, prevStep, stopImport} from 'containers/Properties/actions';
import {makeSelectCurrentStep} from 'containers/Properties/selectors';
import './importDialog.less';


export class ImportDialog extends React.Component {

    renderStep() {
        switch (this.props.currentStep) {
            case 0:
            default:
                return <ChooseTool nextStep={ this.props.nextStep } onClose={ this.props.onClose }/>;
            case 1:
                return <Login nextStep={ this.props.nextStep } onClose={ this.props.onClose } onBack={ this.props.onBack }/>;
            case 2:
                return <Verification nextStep={ this.props.nextStep } onClose={ this.props.onClose } onBack={ this.props.onBack }/>;
            case 3:
                return <ChoosePhoneNumber nextStep={ this.props.nextStep } onClose={ this.props.onClose } onBack={ this.props.onBack }/>;
            case 4:
                return <EnterPin nextStep={ this.props.nextStep } onClose={ this.props.onClose } onBack={ this.props.onBack }/>;
            case 5:
                return <Import nextStep={ this.props.nextStep } onClose={ this.props.onClose } onBack={ this.props.onBack }/>;
        }
    }

    render() {
        return (
            <div className="import-dialog-overlay" style={{ zIndex: 100 }}>
                <div className={ 'import-dialog' + (' step-' + this.props.currentStep) }>
                    { this.renderStep() }
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentStep: makeSelectCurrentStep()
});

export function mapDispatchToProps(dispatch) {
    return {
        nextStep: () => dispatch(nextStep()),
        onClose: () => dispatch(stopImport()),
        onBack: () => dispatch(prevStep()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportDialog);
