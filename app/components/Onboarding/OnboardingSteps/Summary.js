import React from 'react';
import Button from 'components/Button';
import SVG from 'components/SVG';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectPlan, makeSelectTeam, makeSelectProperties} from 'containers/Onboarding/selectors';

export class Summary extends React.Component {

    humanizeTeamSize(size) {
        if(size === 1) {
            return 'Just me';
        } else if(size > 1 && size < 20) {
            return size + ' people';
        } else {
            return '20 or more people';
        }
    }

    humanizePropertiesSize(size) {
        if(size === 1) {
            return '1 property';
        } else if(size > 1 && size < 100) {
            return size + ' properties';
        } else {
            return '100 or more properties';
        }
    }

    iconForPlan(plan) {
        if(plan === 'home') {
            return 'face';
        } else if(plan === 'town') {
            return 'town';
        } else {
            return 'city';
        }
    }

    render() {
        return (
            <div className="summary">
                <h1>We've set you up with:</h1>
                <SVG icon={ this.iconForPlan(this.props.plan) } size={ 50 } />
                <div className="plan-info">{ this.props.plan }</div>
                <div className="size-info">{ this.humanizeTeamSize(this.props.team) }</div>
                <div className="size-info">{ this.humanizePropertiesSize(this.props.properties) }</div>
                <div className="disclaimer">
                    Don't worry, this is free to use until the beta or your trial is over, whichever comes last.
                </div>
                <Button label={ 'Next' } onClick={ this.props.nextStep }/>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    plan: makeSelectPlan(),
    team: makeSelectTeam(),
    properties: makeSelectProperties()
});


export default connect(mapStateToProps, null)(Summary);
