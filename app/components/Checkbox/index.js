import React, { PropTypes } from 'react';
import './checkbox.less';

function Checkbox({ id, label, checked, onChange, disabled }) {

    return (
        <div className="vj-checkbox">
            <input
                type="checkbox"
                id={ id }
                checked={ checked }
                disabled={ disabled }
                onChange={ disabled ? () => {} : onChange }
            />
            <label htmlFor={ id }>{ label }</label>
        </div>
    );
}

Checkbox.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.any,
    id: PropTypes.any.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool
};

export default Checkbox;
