import React from 'react';
import Modal from 'components/Modal';
import './goBack.less';

export class GoBack extends React.Component {

    submitForm() {
        this.props.onSubmit();
        this.props.onClose();
    }

    render() {
        return (
            <div className="vendors-job-details-go-back">
                { this.props.open &&
                    <Modal
                        content={ <div className="prompt">Are you sure not to save change?</div> }
                        submitLabel="Yes"
                        title="Undo Change"
                        icon="error"
                        onClose={ this.props.onClose }
                        onSubmit={ () => this.submitForm() }
                        small
                    />
                }
            </div>
        );
    }
}

export default GoBack;
