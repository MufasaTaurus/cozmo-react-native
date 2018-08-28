import React, {PropTypes} from 'react';
import './integrationName.less';

function IntegrationName({ integration }) {

    return (
        <div className="vj-integration-name">
            <img className="vj-integration-image" src={ integration.getImage() }/>
            <div className="vj-integration-info">
                <div className="vj-integration-name">{ integration.getName() }</div>
                <div className="vj-integration-type">{ integration.getType() }</div>
            </div>
        </div>
    );
}

IntegrationName.propTypes = {
    integration: PropTypes.object.isRequired,
};

export default IntegrationName;
