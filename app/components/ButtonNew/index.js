import React, { PropTypes } from 'react';
import SVG from 'components/SVG';
import { Link } from 'react-router';
import './buttonNew.less';

function ButtonNew({ label, fullWidth, icon, onClick, linkTo, disabled, type, className }) {

    let styles = {};
    if (fullWidth) {
        styles.width = '100%';
    }

    const simpleButton =
        <button
            className={ 'button-new ' + className + (disabled ? ' disabled' : '') }
            style={ styles }
            onClick={ disabled ? () => {} : onClick }
            type={ type ? type : 'button' }
        >
            { icon ? <span className="button-icon-wrapper"><SVG className="button-icon" icon={ icon } size={ 20 }/></span> : '' }
            <span>{ label }</span>
        </button>;

    return (
        linkTo ?
            <Link to={ linkTo }>{ simpleButton }</Link>
            :
            simpleButton
    );
}

ButtonNew.propTypes = {
    handleRoute: PropTypes.func,
    linkTo: PropTypes.string,
    icon: PropTypes.node,
    onClick: PropTypes.func,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
};

export default ButtonNew;
