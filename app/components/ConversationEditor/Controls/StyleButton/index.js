import React from 'react';
import SVG from 'components/SVG';

class StyleButton extends React.Component {

    constructor(props) {
        super(props);
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }
    render() {
        let className = 'style-button';
        if (this.props.active) {
            className += ' active';
        }
        return (
            <span className={ className } onMouseDown={ this.onToggle }>
                <SVG size="18" icon={ this.props.icon }/>
            </span>
        );
    }
}

export default StyleButton;
