import React, {PropTypes} from 'react';
import './propertyName.less';

function PropertyName({ name, address, image }) {

    return (
        <div className="vj-property-name">
            <img className="vj-property-image" src={ image }/>
            <div className="vj-property-info">
                <div className="vj-property-name">{ name }</div>
                <div className="vj-property-address">{ address }</div>
            </div>
        </div>
    );
}

PropertyName.propTypes = {
    name: PropTypes.string,
    address: PropTypes.string,
    image: PropTypes.string
};

export default PropertyName;


