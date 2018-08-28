import React, { PropTypes } from 'react';
import SVG from 'components/SVG';
import './card.less';


export class Card extends React.Component {

    render() {
        return (
            <div className="card">
                { this.props.title ?
                    <div className="header">
                        <SVG icon={ this.props.icon } size={ 20 } />
                        <span className="title">{ this.props.title }</span>
                        { this.props.editable ?
                            <div className="edit" onClick={ this.props.onEdit }>
                                <SVG icon="edit" size={ 18 } />
                            </div> : ''
                        }
                    </div>
                    : '' }
                { this.props.children }
            </div>
        );
    }
}

Card.PropTypes = {
    icon: React.PropTypes.string,
    title: React.PropTypes.string,
    editable: React.PropTypes.bool,
    onEdit: React.PropTypes.func,
};

export default Card;



