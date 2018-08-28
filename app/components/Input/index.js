import React, {PropTypes} from 'react';
import './input.less';

export default function Input({ placeholder, onChange, hasError, type, value }) {
    return (
        <input
            className={ 'input' + (hasError ? ' has-error' : '') }
            type={ type ? type : 'text'}
            defaultValue={ value }
            placeholder={ placeholder }
            onChange={ onChange } />
    );
}

Input.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    hasError: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.string,
};
