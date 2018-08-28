import React, { PropTypes } from 'react';
import './propertyName.less';

function PropertyName({ name, address, image, type, city }) {

    return (
        <div className="vj-property-name-new">
            <div className="vj-property-new-image-wrapper">
                <img className="vj-property-new-image" src={ image }/>
            </div>
            <div className="vj-property-new-info">
                <div className="vj-property-new-name">{ name }</div>
                <div className="vj-property-new-address">{ address }</div>
                <div className="vj-property-new-type">{ type }</div>
                <div className="vj-property-new-city">{ city }</div>
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


