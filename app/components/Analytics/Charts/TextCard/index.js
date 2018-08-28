import React, { PropTypes } from 'react';
import SVG from 'components/SVG';
import './textCard.less';


export class TextCard extends React.Component {

    render() {
        return (
            <div className="text-card" style={ this.props.style }>
                <div className="icon-wrapper">
                    <SVG icon={ this.props.icon } size="150"/>
                </div>
                <div className="text-wrapper">
                    <div className="title">{ this.props.title }</div>
                    <div className="subtitle">{ this.props.subtitle }</div>
                </div>
            </div>
        );
    }
}

TextCard.PropTypes = {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    icon: React.PropTypes.string,
    style: React.PropTypes.object,
};

export default TextCard;
