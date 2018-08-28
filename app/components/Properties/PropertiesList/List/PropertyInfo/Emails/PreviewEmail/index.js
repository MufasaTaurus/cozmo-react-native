import React from 'react';
import Modal from 'components/Modal';
import './previewEmial.less';

export class PreviewEmail extends React.Component {

    render() {
        const headline = this.props.template.getHeadline();
        const content = (
            <div>
                <div className="template-content-wrapper">
                    <div className="template-content">
                        { headline && <h1 className="header">{ headline }</h1> }
                        <div dangerouslySetInnerHTML={{ __html: this.props.template.getContent() }}/>
                    </div>
                </div>
            </div>
        );
        return (
            <div className="property-emails-preview-email">
                <Modal
                    title="Email Preview"
                    icon="eye"
                    content={ content }
                    submitLabel="Close"
                    onClose={ this.props.onClose }
                    onSubmit={ this.props.onClose }
                    hideCancel
                />
            </div>
        );
    }
}

export default PreviewEmail;
