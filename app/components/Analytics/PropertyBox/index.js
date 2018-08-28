import React, { PropTypes } from 'react';
import PropertyName from 'components/PropertyName';
import './propertyBox.less';


export class PropertyBox extends React.Component {

    render() {
        return (
            <div className="analytics-property-box">
                <PropertyName
                    name={ this.props.property.get('name', '-') }
                    address={ this.props.property.get('street', '-') }
                    image={ this.props.property.get('cover_image', '//cdn.voyajoy.com/images/preview.jpg') }/>
            </div>
        );
    }
}

PropertyBox.PropTypes = {
    property: React.PropTypes.object,
};

export default PropertyBox;
