import React from 'react';
import Wizard from './Wizard/index';
import ButtonNew from 'components/ButtonNew';
import Location from 'components/Properties/PropertiesList/List/PropertyInfo/Location';
import BasicDetails from 'components/Properties/PropertiesList/List/PropertyInfo/BasicDetails';
import Rooms from 'components/Properties/PropertiesList/List/PropertyInfo/Rooms';
import Amenities from 'components/Properties/PropertiesList/List/PropertyInfo/Amenities';
import CalSync from 'components/Properties/PropertiesList/List/PropertyInfo/Booking/CalSync';
//import Availability from 'components/Properties/PropertiesList/List/PropertyInfo/Availability';
import Photos from 'components/Properties/PropertiesList/List/PropertyInfo/Photos';
import ThingsToDo from 'components/Properties/PropertiesList/List/PropertyInfo/ThingsToDo';
//import Pricing from 'components/Properties/PropertiesList/List/PropertyInfo/Pricing';
import Review from 'components/Properties/PropertiesList/CreateProperty/Review';
import Breadcrumbs from 'components/Breadcrumbs';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { wizardNextStep, wizardPrevStep, wizardFinish, fetchProperty, selectDraft } from 'containers/Properties/actions';
import { makeSelectNewPropertyCurrentStep, makeSelectNewPropertyLoading, makeSelectNewProperty, makeSelectProperties, selectNewPropertyMaxStep, makeSelectSelectedProperty } from 'containers/Properties/selectors';
import { push } from 'react-router-redux';
import './create-property.less';

export class CreateProperty extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            maxStep: props.maxStep
        };
    }

    componentWillMount() {
        const id = this.props.newProperty.get('id');
        if (id) {
            this.props.fetchProperty(id);
        }
        //this.props.selectDraft(this.props.properties.filter(p => p.get('id') === this.props.newProperty.get('id')).first());
    }

    getStep() {
        switch (this.props.currentStep) {
            case 1:
                return <BasicDetails create={ true }/>;
            case 2:
                return <Rooms create={ true }/>;
            case 3:
                return <Amenities create={ true }/>;
            case 4:
                return <CalSync create={ true }/>;
            case 5:
                return <Photos create={ true }/>;
            // case 5:
            //     return <Pricing create={ true }/>;
            // case 6:
            //     return <Availability create={ true }/>;
            case 6:
                return <ThingsToDo create={ true }/>;
            case 7:
                return <Review/>;
            default:
                return <Location create={ true }/>;
        }
    }

    getNextStepName() {
        switch (this.props.currentStep) {
            case 0:
                return 'Basic Details';
            case 1:
                return 'Bedrooms Details';
            case 2:
                return 'Amenities';
            case 3:
                return 'iCal Sync';
            case 4:
                return 'Photos';
            // case 4:
            //     return 'Pricing';
            // case 5:
            //     return 'Availability';
            case 5:
                return 'Things to do';
            case 6:
                return 'Complete';
        }
    }

    isNextStepDisabled () {
        switch (this.props.currentStep) {
            case 0:
                return !this.props.newProperty.getIn(['coordinates', 'latitude']);
            case 1:
                return !(
                    this.props.newProperty.get('name') &&
                    !!this.props.newProperty.get('bedrooms') &&
                    !!this.props.newProperty.get('bathrooms') &&
                    !!this.props.newProperty.get('max_guests')
                );
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                return false;
            default:
                return true;
        }
    }

    nextStep() {
        this.props.nextStep();
        this.setState({ maxStep: this.props.currentStep + 1 });
    }

    render() {
        const isNextStepDisabled = this.isNextStepDisabled();
        return (
            <div className="create-property">
                <div className="breadcrumbs-wrapper">
                    <Breadcrumbs
                        section={ 'New Property #1 (Draft)' }
                        subsection={[ { title: 'Properties', link: '/properties' }, { title: 'Create' }]} />
                </div>
                <div className="wizard-wrapper">
                    <Wizard maxStep={ this.state.maxStep }/>
                </div>
                <div className="step-wrapper">
                    { this.getStep() }
                </div>
                <div className="footer">
                    { this.props.currentStep > 0 && this.props.currentStep < 7 ?
                        <ButtonNew
                            className="ghost"
                            label={ 'Go back' }
                            onClick={ this.props.prevStep }
                        />
                        : ''
                    }
                    { this.props.currentStep < 7 ?
                        <ButtonNew
                            className="big"
                            label={ 'Next: ' + this.getNextStepName() }
                            onClick={ () => this.nextStep() }
                            disabled={ isNextStepDisabled }
                        />
                        :
                        <ButtonNew
                            className="big"
                            label={ 'Finish' }
                            onClick={ this.props.finish }
                        />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentStep: makeSelectNewPropertyCurrentStep(),
    maxStep: selectNewPropertyMaxStep(),
    loading: makeSelectNewPropertyLoading(),
    newProperty: makeSelectNewProperty(),
    properties: makeSelectProperties(),
    selectedProperty: makeSelectSelectedProperty()
});

export function mapDispatchToProps(dispatch) {
    return {
        nextStep: () => dispatch(wizardNextStep()),
        prevStep: () => dispatch(wizardPrevStep()),
        selectDraft: (property) => dispatch(selectDraft(property)),
        fetchProperty: (id) => dispatch(fetchProperty(id)),
        finish: () => {
            dispatch(wizardFinish());
            dispatch(push('/properties'));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProperty);
