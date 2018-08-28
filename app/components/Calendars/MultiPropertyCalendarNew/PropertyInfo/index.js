import React from 'react';
import SVG from 'components/SVG';
import PropertyCard from './PropertyCard';

export class PropertyInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { card: false };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.card !== nextState.card;
    }

    render() {
        const row = this.props.row;
        const bathrooms = Math.max(parseInt(row.get('bathrooms')), parseFloat(row.get('bathrooms')));
        const bedrooms = Math.max(parseInt(row.get('bedrooms')), parseFloat(row.get('bedrooms')));
        return (
            <div className={ 'info' + (this.state.card ? ' active' : '') } id={ 'info' + row.get('id') }>
                <div className="property" onClick={ () => this.setState({ card: true }) }>
                    <div className="content">
                        <div className="name">{ row.get('name') }</div>
                        <div className={ 'rooms' + (this.props.basic ? ' rooms-basic' : '') }>
                            { !this.props.basic &&
                                <span className="br-ba"><SVG className="property-icon" icon="home" size="16"/>{ bedrooms }BR / { bathrooms }BA</span>
                            }
                            <SVG className="property-icon" icon="guests" size="16"/> { row.get('max_guests')}
                        </div>
                    </div>
                </div>
                <PropertyCard
                    property={ row }
                    onClose={ () => this.setState({ card: false }) }
                    index={ this.props.index }
                    visible={ this.state.card }/>
            </div>
        );
    }
}

export default PropertyInfo;
