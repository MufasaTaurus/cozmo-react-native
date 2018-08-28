import React from 'react';
import './orSeparator.less';

class OrSeparator extends React.Component {

    render() {
        return (
            <div className="or-separator">
                <div className="line">&nbsp;</div>
                <div className="or">or</div>
                <div className="line">&nbsp;</div>
            </div>
        );
    }
}

export default OrSeparator;
