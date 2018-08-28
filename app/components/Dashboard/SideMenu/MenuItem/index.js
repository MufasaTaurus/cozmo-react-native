import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import SVG from 'components/SVG';
import './menuItem.less';

class MenuItem extends React.Component {

    render() {
        const { linkTo, label, icon, hidden } = this.props;
        const labelClassName = 'label-wrapper' + (hidden ? ' slide-off' : '');
        return (
            hidden ? null :
            <Link
                className="menu-item"
                to={ linkTo }
                activeClassName={ 'active' }
                onlyActiveOnIndex={ false }>
                <div className="icon-wrapper">
                    <SVG icon={ icon } size={ 20 }/>
                </div>
                <div className={ labelClassName }>
                    { label }
                </div>
            </Link>
        );
    }
}

MenuItem.propTypes = {
    linkTo: PropTypes.string,
    icon: PropTypes.string,
    hidden: PropTypes.bool,
    label: PropTypes.string,
};

export default MenuItem;
