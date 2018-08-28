import React from 'react';
import { Link } from 'react-router';
import onClickOutside from 'react-onclickoutside';
import SVG from 'components/SVG';
import './profileMenu.less';

export class ProfileMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
        };
    }

    toggleMenu() {
        const isOpen = this.state.menuOpen;
        this.setState({ menuOpen: !isOpen });
        if (isOpen) {
            this.props.disableOnClickOutside();
        } else {
            this.props.enableOnClickOutside();
        }
    }

    handleClickOutside() {
        this.setState({ menuOpen: false });
        this.props.disableOnClickOutside();
    }

    getAvatar(avatar) {
        if (avatar) {
            return (
                <div className="avatar">
                    <div
                        className="avatar-background"
                        style={{ backgroundImage: 'url(' + avatar + ')' }}
                    />
                </div>
            );
        } else {
            return <SVG className="avatar" icon="account" size={ 40 } />;
        }
    }

    render() {
        const { user, logout } = this.props;
        return (
            <div className={ 'profile-menu' + (this.state.menuOpen ? ' active' : '') } onClick={ () => this.toggleMenu() }>
                { this.getAvatar(user.getAvatar()) }
                <div className="profile-text">
                    <div className="welcome">Welcome</div>
                    <div className="name">{ user.getFirstName() }</div>
                </div>
                <SVG className="arrow" icon="triangle" size={ 14 }/>
                <div className={ 'menu' + (this.state.menuOpen ? ' active' : '') }>
                    <div className="profile-menu-item">
                        <Link to="/settings/account">
                            <SVG className="icon" icon="account" size={ 30 } />
                            Profile
                        </Link>
                    </div>
                    <div className="profile-menu-item" onClick={ logout }>
                        <SVG className="icon" icon="standby" size={ 30 } />
                        Log Out
                    </div>
                </div>
            </div>
        );
    }
}

export default onClickOutside(ProfileMenu);
