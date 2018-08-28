import React, { PropTypes } from 'react';
import SVG from 'components/SVG';
import ButtonNew from 'components/ButtonNew';
import './preview.less';

export class Preview extends React.Component {

    render() {
        return (
            <div className="templates-list-preview">
                <div className="templates-list-preview-modal">
                    <div className="preview">
                        <div className="modal-header">
                            <span><SVG className="header-icon" icon="eye"/> Preview</span>
                            <span className="close" onClick={ this.props.onClose }>&times;</span>
                        </div>
                        <div className="template-content-wrapper">
                            <div className="template-content" dangerouslySetInnerHTML={{ __html: this.props.content }}/>
                        </div>
                        <div className="footer">
                            <ButtonNew
                                label="Close"
                                onClick={ this.props.onClose }
                                small/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Preview.PropTypes = {
    content: PropTypes.any.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Preview;
