import React from 'react';
import flatten from 'lodash/flatten';
import clone from 'lodash/cloneDeep';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import onClickOutside from 'react-onclickoutside';
import SVG from 'components/SVG';
import './dropdownRouter.less';

export class Dropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };

        this.routes = flatten(clone(props.content).map(section => section.items.map(item => { item.url = section.baseUrl + item.url; return item; })));
    }

    toggleOpen() {
        const isOpen = this.state.open;
        this.setState({ open: !isOpen });
        if (isOpen) {
            this.props.disableOnClickOutside();
        } else {
            this.props.enableOnClickOutside();
        }
    }

    selectValue() {
        this.setState({ open: false });
    }

    getActiveRoute() {
        const location = browserHistory.getCurrentLocation().pathname;
        const routes = this.routes.filter(route => { const r = new RegExp(route.url); return (r).test(location); });
        const route = routes[routes.length - 1];
        return route ? route.title : '';
    }

    handleClickOutside() {
        this.setState({ open: false });
        this.props.disableOnClickOutside();
    }

    render() {
        const section = this.props.content[0];
        return (
            <div className="dropdown-router">
                <div className="dropdown-router-title">
                    <SVG icon={ section.icon } size={ 19 }/>
                    { section.title }
                </div>
                <div className="dropdown-router-content">
                    <div className="dropdown-selected-value" onClick={ () => this.toggleOpen() }>
                        <span className="value">{ this.getActiveRoute() }</span>
                        <span className="arrow-down">&#9662;</span>
                    </div>
                    { this.state.open &&
                        <div className="dropdown-options">
                            { this.props.content.map((section, index) => {
                                return section.items.map((item, index) => {
                                    return (
                                        <div
                                            key={ index }
                                            className="dropdown-option"
                                            onClick={ () => this.selectValue() }
                                        >
                                            <Link
                                                className="dropdown-option-link"
                                                to={ section.baseUrl + item.url }
                                                activeClassName={ 'active' }
                                                onlyActiveOnIndex={ item.onlyActiveOnIndex }>
                                                { item.title }
                                            </Link>
                                        </div>
                                    );
                                });
                            }) }
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default onClickOutside(Dropdown);
