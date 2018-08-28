import React from 'react';
import MenuItem from './MenuItem';
import SVG from 'components/SVG';
import './sideMenu.less';

class SideMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hidden: props.hidden };
    }

    toggleWidth() {
        this.setState({ hidden: !this.state.hidden });
    }

    shouldDisplay(route) {
        switch (route) {
            case 'owners':
            case 'templates':
            case 'inbox':
            case 'home':
                return !(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging');
            default:
                return true;
        }
    }

    onMenuClicked() {
        if (screen.width < 479) {
            setTimeout(() => this.toggleWidth(), 50);
        }
    }

    render() {
        const isHidden = (route) => !this.shouldDisplay(route);
        return (
            <div className="dashboard-side-menu">
                <SVG
                    className="hamburger-button"
                    icon="hamburger"
                    size={ 20 }
                    onClick={ () => this.toggleWidth() }
                />
                <div className={ 'side-menu' + (this.state.hidden ? ' hidden' : '') } onClick={ () => this.onMenuClicked() }>
                    <div className="top-menu">
                        <MenuItem label={ 'Properties' } icon={ 'town' } linkTo={ '/properties' }/>
                        <MenuItem label={ 'Home' } icon={ 'home' } linkTo={ '/' } hidden={ isHidden('home') }/>
                        <MenuItem label={ 'Inbox' } icon={ 'inbox' } linkTo={ '/inbox' } hidden={ isHidden('inbox') }/>
                        <MenuItem label={ 'Calendars' } icon={ 'eventChecked' } linkTo={ '/calendars' }/>
                        <MenuItem label={ 'Reservations' } icon={ 'laptop' } linkTo={ '/reservations' }/>
                        <MenuItem label={ 'Insights' } icon={ 'pieChart' } linkTo={ '/insights' }/>
                        <MenuItem label={ 'Websites' } icon={ 'web' } linkTo={ '/websites' }/>
                        <MenuItem label={ 'Vendors' } icon={ 'assignment' } linkTo={ '/vendors' }/>
                        <MenuItem label={ 'Templates' } icon={ 'file' } linkTo={ '/templates' } hidden={ isHidden('templates') }/>
                        <MenuItem label={ 'Owners' } icon={ 'face' } linkTo={ '/owners' } hidden={ isHidden('owners') }/>
                    </div>
                    <div className="bottom-menu">
                        <a href="https://help.voyajoy.com/en-us/category/cozmo-vrs-support-1winln2/" target="_blank">
                            <MenuItem label={ 'Help' } icon={ 'help' }/>
                        </a>
                        <MenuItem label={ 'Settings' } icon={ 'settingsBox' } linkTo={ '/settings/account' }/>
                    </div>
                </div>
            </div>
        );
    }
}

SideMenu.defaultProps = {
    hidden: true,
};

export default SideMenu;
