import React from 'react';
import Button from 'components/Button';
import Slider from 'rc-slider';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectProperties} from 'containers/Onboarding/selectors';
import {changeProperties} from 'containers/Onboarding/actions';
import 'rc-slider/assets/index.css';

export class Properties extends React.Component {

    humanizePropertiesSize(size) {
        if(size === 1) {
            return '1 property';
        } else if(size > 1 && size < 100) {
            return size + ' properties';
        } else {
            return '100 or more properties';
        }
    }

    render() {
        return (
            <div>
                <h1>How many properties are you managing?</h1>
                <div className="team-size-info">{ this.humanizePropertiesSize(this.props.properties) }</div>
                <div className="slider-wrapper">
                    <Slider
                        min={ 1 }
                        max={ 100 }
                        marks={ {1: '1', 30: '30', 60: '60', 100: '100+'} }
                        defaultValue={ this.props.properties }
                        onAfterChange={ (value) => this.props.changeProperties(value) }
                    />
                </div>
                <Button label={ 'Next' } onClick={ this.props.nextStep }/>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    properties: makeSelectProperties()
});

export function mapDispatchToProps(dispatch) {
    return {
        changeProperties: (size) => dispatch(changeProperties(size)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Properties);
