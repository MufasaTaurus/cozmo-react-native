import React from 'react';
import Modal from 'components/Modal';
import './deleteConnection.less';

export class DeleteConnection extends React.Component {

    render() {
        const props = this.props.properties;
        const prompt = (
            <div className="prompt">
                <div className="info">
                    Properties associated with this API will be deleted.
                    Are you sure?
                </div>
                { props > 0 &&
                    <div className="disable">Delete { props } { (props > 1 ? 'Properties' : 'Property') }</div>
                }
            </div>
        );
        return (
            <div className="properties-connections-details-delete">
                <Modal
                    title="Delete Property Connection"
                    icon="info"
                    submitLabel="Yes"
                    content={ prompt }
                    small
                    onClose={ this.props.onClose }
                    onSubmit={ this.props.onSubmit }
                />
            </div>
        );
    }
}

export default DeleteConnection;
