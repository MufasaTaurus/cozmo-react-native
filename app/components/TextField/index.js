import React, { PropTypes } from 'react';
import './textField.less';

export class TextField extends React.Component {

    onChange (evt) {
        if (this.props.counter && evt.target.value.length >= this.props.counter + 1) {
            evt.stopPropagation();
            return false;
        }
        this.props.onChange(evt);
    }

    render() {
        const { big, placeholder, hasError, type, value, label, multiLine, id, onBlur, onFocus, counter, addonRight, addonLeft, maxLength, defaultValue, disabled, rows, min, max } = this.props;
        return (
            <div className={ 'text-field-group' + (big ? ' big' : '') }>
                { label && <label className="text-field-label" htmlFor={ id }>{ label }</label> }
                { counter && <span className="text-field-counter" htmlFor={ id }>{ value ? value.length : 0 }/{ counter }</span> }
                { multiLine ?
                    <textarea
                        className={ 'text-field multi-line' + (hasError ? ' has-error' : '') + (disabled ? ' disabled' : '') }
                        id={ id + '' }
                        rows={ rows || 4 }
                        value={ value }
                        defaultValue={ defaultValue }
                        maxLength={ maxLength }
                        placeholder={ placeholder }
                        disabled={ disabled }
                        onBlur={ onBlur }
                        onChange={ (evt) => this.onChange(evt) } />
                    :
                    <span className="input-wrapper">
                        <input
                            className={
                                'text-field one-line' +
                                (hasError ? ' has-error' : '') +
                                (addonRight ? ' has-addon-right' : '') +
                                (addonLeft ? ' has-addon-left' : '') +
                                (disabled ? ' disabled' : '')
                            }
                            type={ type ? type : 'text'}
                            min={ min }
                            max={ max }
                            id={ id }
                            maxLength={ maxLength }
                            disabled={ disabled }
                            value={ value }
                            defaultValue={ defaultValue }
                            placeholder={ placeholder }
                            onBlur={ onBlur }
                            onFocus={ onFocus }
                            onChange={ (evt) => this.onChange(evt) } />
                        { addonLeft && <span className="text-field-addon-left">{ addonLeft }</span> }
                        { addonRight && <span className="text-field-addon-right">{ addonRight }</span> }
                        { hasError &&
                            <div className="text-field-error">
                                <div className="text-field-error-text">{ hasError }</div>
                            </div>
                        }
                    </span>
                }
            </div>

        );
    }
}

TextField.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    big: PropTypes.bool,
    hasError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    maxLength: PropTypes.number,
    rows: PropTypes.number,
    type: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    label: PropTypes.string,
    multiLine: PropTypes.bool,
    disabled: PropTypes.bool,
    counter: PropTypes.number,
    addonRight: PropTypes.any,
    addonLeft: PropTypes.any,
    id: PropTypes.string.isRequired,
};

export default TextField;

