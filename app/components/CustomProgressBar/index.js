import React, { PropTypes } from 'react';
import './customProgressBar.less';

class CustomProgressBar extends React.Component {

    progressColor(width) {
        if (width < 25) { return 'low'; }
        else if (width < 50) { return 'mid'; }
        else if (width < 75) { return 'high'; }
        else if (width <= 100) { return 'max'; }
    }

    render() {
        const progressClassName = 'custom-progress ' + this.progressColor(this.props.value);
        return (
            <div className="custom-progress-bar">
                <div className={ progressClassName } style={ { width: this.props.value + '%' } }/>
            </div>
        );
    }
}

CustomProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
};

export default CustomProgressBar;
