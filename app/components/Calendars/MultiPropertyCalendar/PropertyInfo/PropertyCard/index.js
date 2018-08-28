import React from 'react';
import onClickOutside from 'react-onclickoutside';
import { Link } from 'react-router';
import SVG from 'components/SVG';
import './propertyCard.less';

export class PropertyCard extends React.Component {

    handleClickOutside() {
        this.props.onClose();
    }

    render() {
        const property = this.props.property;
        const id = property.get('id');
        const bathrooms = Math.max(parseInt(property.get('bathrooms')), parseFloat(property.get('bathrooms')));
        const bedrooms = Math.max(parseInt(property.get('bedrooms')), parseFloat(property.get('bedrooms')));
        return (
            <div className="calendar-property-card">
                { this.props.visible &&
                    <div className="calendar-property-card-content">
                        <div className="image" style={{ backgroundImage: `url("${ property.get('cover_image') }")` }}/>
                        <div className="info-section">
                            <div className="name">{ property.get('address') }</div>
                            <div className="ba-br detail"><SVG className="property-icon" icon="home" size="16"/> { bedrooms } bedroom / { bathrooms } bathroom</div>
                            <div className="guests detail"><SVG className="property-icon" icon="guests" size="16"/> { property.get('max_guests') } people</div>
                        </div>
                        <div className="actions">
                            <Link className="action" to={ '/properties/' + id + '/details' }>Property</Link>
                            <Link className="action" to={ '/properties/' + id }>Calendar</Link>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default onClickOutside(PropertyCard);
