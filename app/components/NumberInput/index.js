import React, { PropTypes } from 'react';
import SVG from 'components/SVG';
import './numberInput.less';


class NumberInput extends React.Component {

    handleChange(e) {
        const newValue = e.target.value;
        if ((newValue <= this.props.max) &&
            (newValue >= this.props.min)) {
            this.props.onChange(newValue);
        }
    }

    stepUp() {
        if (this.props.disabled) { return null; }
        const newValue = this.props.value + this.props.step;
        if (newValue <= this.props.max) { this.props.onChange(newValue); }
    }

    stepDown() {
        if (this.props.disabled) { return null; }
        const newValue = this.props.value - this.props.step;
        if (newValue >= this.props.min) { this.props.onChange(newValue); }
    }

    render() {
        const wrapperClassName = 'number-input ' + (this.props.disabled ? 'disabled' : '');
        return (
            <div className={ wrapperClassName }>
                <input className="input-box"
                       type="number"
                       min={ this.props.min }
                       max={ this.props.max }
                       value={ this.props.value }
                       disabled={ this.props.disabled }
                       onChange={ (e) => this.handleChange(e) }/>
                <SVG size="14"
                     className="arrow arrow-up"
                     icon="triangle"
                     onClick={ () => this.stepUp() } />
                <SVG size="14"
                     className="arrow arrow-down"
                     icon="triangle"
                     onClick={ () => this.stepDown() } />
            </div>
        );
    }
}

NumberInput.defaultProps = {
    value: 0,
    min: 0,
    max: 100,
    step: 1,
    onChange: () => {},
};

NumberInput.propTypes = {
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

export default NumberInput;
