import React from 'react';
import ProfileMenu from './ProfileMenu';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { logout } from 'containers/App/actions';
import { makeSelectUser } from 'containers/App/selectors';
import SVG from 'components/SVG';
import User from 'models/User';
import './header.less';

export class Header extends React.Component {

    render() {
        return (
            <div className="dashboard-header">
                <div className="left-side">
                    <SVG icon={ 'logoV' } size={ 40 } />
                </div>
                <div className="right-side">
                    <ProfileMenu user={ new User(this.props.user) } logout={ this.props.logout }/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
