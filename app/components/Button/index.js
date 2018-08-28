import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import './button.less';

function Button({ label, fullWidth, icon, onClick, linkTo, disabled, type }) {

    let styles = {};
    if (fullWidth) {
        styles.width = '100%';
    }

    const simpleButton =
        <button
            className={ 'button' + (disabled ? ' disabled' : '') }
            style={ styles }
            onClick={ disabled ? () => {} : onClick }
            type={ type ? type : 'button' }
        >
            { icon ? icon : '' }
            <span>{ label }</span>
        </button>;

    return (
        linkTo ?
            <Link to={ linkTo }>{ simpleButton }</Link>
            :
            simpleButton
    );
}

Button.propTypes = {
    handleRoute: PropTypes.func,
    linkTo: PropTypes.string,
    icon: PropTypes.node,
    onClick: PropTypes.func,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    label: PropTypes.string.isRequired,
};

export default Button;
