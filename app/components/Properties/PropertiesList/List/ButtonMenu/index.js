import React from 'react';
import onClickOutside from 'react-onclickoutside';
import { Link } from 'react-router';
import SVG from 'components/SVG';
import ButtonNew from 'components/ButtonNew';
import './buttonMenu.less';

export class ButtonMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleClickOutside() {
        this.setState({ open: false });
    }

    render() {
        return (
            <div className="properties-list-button-menu-group">
                <ButtonNew label="Add" className="small" onClick={ () => this.setState({ open: true }) }/>
                <div className={ 'properties-list-button-menu' + (this.state.open ? ' open' : '') }>
                    <div className="properties-list-menu-options">
                        <div onClick={ this.props.startImport }>
                            <div className="properties-list-menu-item">
                                <div className="properties-list-menu-item-icon">
                                    <SVG icon="import"/>
                                </div>
                                <div className="properties-list-menu-item-text">
                                    <div className="primary">Import Property</div>
                                    <div className="secondary">via import tools</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Link to="/properties/create">
                                <div className="properties-list-menu-item">
                                    <div className="properties-list-menu-item-icon">
                                        <SVG icon="edit"/>
                                    </div>
                                    <div className="properties-list-menu-item-text">
                                        <div className="primary">Create Property</div>
                                        <div className="secondary">from scratch</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default onClickOutside(ButtonMenu);
