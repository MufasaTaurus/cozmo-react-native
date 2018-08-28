import React from 'react';
import Button from 'components/Button';
import Slider from 'rc-slider';
import SVG from 'components/SVG';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectTeam} from 'containers/Onboarding/selectors';
import {changeTeam} from 'containers/Onboarding/actions';
import 'rc-slider/assets/index.css';

export class Team extends React.Component {

    humanizeTeamSize(size) {
        if(size === 1) {
            return 'Just me';
        } else if(size > 1 && size < 20) {
            return size + ' people';
        } else {
            return '20 or more people';
        }
    }

    iconForTeamSize(size) {
        if(size > 0 && size < 6) {
            return 'face';
        } else if(size >= 6 && size < 20) {
            return 'town';
        } else {
            return 'city';
        }
    }

    render() {
        return (
            <div>
                <h1>How big is your team?</h1>
                <SVG icon={ this.iconForTeamSize(this.props.team) } size={ 50 } />
                <div className="team-size-info">{ this.humanizeTeamSize(this.props.team) }</div>
                <div className="slider-wrapper">
                    <Slider
                        min={ 1 }
                        max={ 20 }
                        marks={ {1: 'Just me', 20: '20+'} }
                        defaultValue={ this.props.team }
                        onAfterChange={ (value) => this.props.changeTeam(value) }
                    />
                </div>
                <Button label={ 'Next' } onClick={ this.props.nextStep }/>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    team: makeSelectTeam()
});

export function mapDispatchToProps(dispatch) {
    return {
        changeTeam: (size) => dispatch(changeTeam(size)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);
