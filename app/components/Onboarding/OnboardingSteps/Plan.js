import React from 'react';
import Button from 'components/Button';
import SVG from 'components/SVG';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectPlan} from 'containers/Onboarding/selectors';
import {selectPlan} from 'containers/Onboarding/actions';

export class Plan extends React.Component {

    render() {
        return (
            <div>
                <h1>You are a:</h1>
                <div className="plans">
                    { item({
                        title: 'Homeowner',
                        icon: 'face',
                        selected: this.props.plan === 'single',
                        onClick: () => this.props.selectPlan('single')})
                    }
                    { item({
                        title: 'Vacation Rental Business',
                        icon: 'town',
                        selected: this.props.plan === 'small',
                        onClick: () => this.props.selectPlan('small') })
                    }
                    { item({
                        title: 'Property Manager',
                        icon: 'city',
                        selected: this.props.plan === 'enterprise',
                        onClick: () => this.props.selectPlan('enterprise') })
                    }
                </div>
                <Button label={ 'Next' } onClick={ this.props.nextStep } disabled={ !this.props.plan }/>
            </div>
        );
    }
}

const item = ({ title, icon, selected, onClick }) => {
    return (
        <div className={ 'item' + (selected ? ' selected' : '') } onClick={ onClick }>
            <SVG icon={ icon } size={ 60 }/>
            <div className="title">{ title }</div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    plan: makeSelectPlan()
});


export function mapDispatchToProps(dispatch) {
    return {
        selectPlan: (id) => dispatch(selectPlan(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan);
