import React from 'react';
import SVG from 'components/SVG';
import './errorMsg.less';

class ErrorMsgBox extends React.Component {

    render() {
        return (
            <div className="error-msg-box-group">
                <div className="error-msg-box-wrapper">
                    <div className="error-msg-box">
                        <span className="icon"><SVG icon="warning"/></span>
                        <span className="message">
                            { this.props.text }
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ErrorMsgBox;
