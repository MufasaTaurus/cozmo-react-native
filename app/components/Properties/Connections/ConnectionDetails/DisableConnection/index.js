import React from 'react';
import Modal from 'components/Modal';
import './disableConnection.less';

export class DisableConnection extends React.Component {

    render() {
        const props = this.props.properties;
        const prompt = (
            <div className="prompt">
                <div className="info">
                    Properties associated with this API will be inactive.
                    Are you sure?
                </div>
                { props > 0 &&
                    <div className="disable">Disable { props } { (props > 1 ? 'Properties' : 'Property') }</div>
                }
            </div>
        );
        return (
            <div className="properties-connections-details-disable">
                <Modal
                    title="Disable Property Connection"
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

export default DisableConnection;
