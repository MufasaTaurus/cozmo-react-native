import React from 'react';
import Modal from 'components/Modal';
import './delete.less';

export class Delete extends React.Component {

    submitForm() {
        this.props.onSubmit();
        this.props.onClose();
    }

    render() {
        return (
            <div className="vendors-job-details-delete-job">
                { this.props.open &&
                    <Modal
                        content={
                            <div className="prompt">
                                Are you sure to send notification about job cancellation?
                                <div className="receiver">Receiver: { this.props.receiver }</div>
                            </div>
                        }
                        submitLabel="Yes"
                        title="Send Notification"
                        icon="paperPlane"
                        onClose={ this.props.onClose }
                        onSubmit={ () => this.submitForm() }
                        small
                    />
                }
            </div>
        );
    }
}

export default Delete;
