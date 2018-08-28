import React, { PropTypes } from 'react';
import SVG from 'components/SVG';
import onClickOutside from 'react-onclickoutside';
import './moreMenu.less';

class MoreMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    toggleOpen() {
        if (this.props.disabled) { return false; }
        const open = this.state.open;
        this.setState({ open: !open });
        open ?
            this.props.disableOnClickOutside() :
            this.props.enableOnClickOutside();
    }

    handleClickInside(click) {
        this.setState({ open: false });
        this.props.disableOnClickOutside();
        click();
    }

    handleClickOutside() {
        this.setState({ open: false });
        this.props.disableOnClickOutside();
    }

    renderInside() {
        if (this.state.open) {
            const buttons = this.props.buttons.map((button, index) => {
                return (
                    <a className="popup-option"
                       key={ index }
                       onClick={ () => this.handleClickInside(button.click) }>
                        { button.label }
                    </a>
                );
            });
            return (
                <div>
                    <SVG icon="moreVertical"
                         className="icon"
                         onClick={ () => this.toggleOpen() }/>
                    <div className='popup-menu'>
                        { buttons }
                    </div>
                </div>
            );
        } else {
            return (
                <SVG icon="moreVertical"
                     className="icon"
                     onClick={ () => this.toggleOpen() }/>
            );
        }
    }

    render() {
        const renderInside = this.renderInside();
        return (
          <div className="more-menu">
              { renderInside }
          </div>
        );
    }
}

MoreMenu.PropTypes = {
    buttons: PropTypes.array.isRequired,
};

export default onClickOutside(MoreMenu);
