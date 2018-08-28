import React, { PropTypes } from 'react';
import './radio.less';

function Radio({ label, name, checked, id, onChange, disabled }) {

    return (
        <div className="vj-radio-button">
            <input
                type="radio"
                id={ id }
                name={ name }
                checked={ checked }
                disabled={ disabled }
            />
            <label onClick={ disabled? () => {} : onChange } htmlFor={ id }>{ label }</label>
        </div>
    );
}

Radio.propTypes = {
    label: PropTypes.any.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool
};

export default Radio;
