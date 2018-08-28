import React, {PropTypes} from 'react';
import SVG from 'components/SVG';
import './buttonGroup.less';

function ButtonGroup({ disabled, buttons }) {

    const button = ({ icon, onClick, key, tip }) => {
        return (
            <div key={ key } className="button-group-button" onClick={ disabled ? () => {} : onClick }>
                <SVG size="20" icon={ icon }/>
                <div className="button-group-tooltip-wrapper">
                    <span className="button-group-tooltip">{ tip }</span>
                </div>
            </div>
        );
    };

    return (
        <div className="button-group-wrapper">
            <div className={ 'button-group' + (disabled ? ' disabled' : '') }>
                { buttons.map((b, index) => {
                    return button({ icon: b.icon, onClick: b.onClick, key: index, tip: b.tip });
                }) }
            </div>
        </div>
    );
}

ButtonGroup.propTypes = {
    disabled: PropTypes.bool,
    buttons: PropTypes.array,
};

export default ButtonGroup;
