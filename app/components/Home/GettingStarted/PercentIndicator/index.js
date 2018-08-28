import React, {PropTypes} from 'react';
import './percentIndicator.less';

function PercentIndicator({ percent }) {

    return (
        <div className="percent-indicator">
            { percent }%
        </div>
    );
}

PercentIndicator.propTypes = {
    percent: PropTypes.number.isRequired
};

export default PercentIndicator;
