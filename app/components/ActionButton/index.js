import React, {PropTypes} from 'react';
import SVG from 'components/SVG';
import './actionButton.less';

export class ActionButton extends React.Component {

    render() {
        const { icon, onClick, tip } = this.props;
        return (
            <div className="action-button" onClick={ onClick }>
                <SVG icon={ icon }/>
            </div>

        );
    }
}

ActionButton.propTypes = {
    icon: PropTypes.string,
    onClick: PropTypes.func,
    tip: PropTypes.string,
};

export default ActionButton;
