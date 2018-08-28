import React from 'react';
import Spinner from 'components/Spinner';
import SideBar from 'components/SideBar';
import SettingsSection from './SettingsSection';
import Breadcrumbs from 'components/Breadcrumbs';
import './settings.less';

export class SettingsComponent extends React.Component {

    shouldHideSection(route) {
        switch (route) {
            case 'customer':
            case 'billing':
            case 'team':
                return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';
            default:
                return true;
        }
    }

    getSideMenu() {
        return [
            {
                title: 'Customer',
                icon: 'account',
                hidden: this.shouldHideSection('customer'),
                baseUrl: '/settings',
                items: [
                    {
                        title: 'Templates',
                        url: '/templates'
                    },
                    {
                        title: 'Channels',
                        url: '/channels'
                    },
                    {
                        title: 'Integrations',
                        url: '/integrations'
                    }
                ]
            },
            {
                title: 'Admin',
                icon: 'wrench',
                baseUrl: '/settings',
                items: [
                    {
                        title: 'Billing',
                        url: '/billing',
                        hidden: this.shouldHideSection('billing')
                    },
                    {
                        title: 'Team',
                        url: '/team',
                        hidden: this.shouldHideSection('team')
                    },
                    {
                        title: 'Account',
                        url: '/account'
                    }
                ]
            }
        ];
    }

    getBreadcrumbs() {
        switch (this.props.section) {
            case 'channels':
                return 'Channels';
            case 'integrations':
                return 'Integrations';
            case 'team':
                return 'Team';
            case 'account':
                return 'Account';
            case 'billing':
                return 'Billing';
            default:
                return '';
        }
    }

    render() {
        const renderContent = () => {
            if (this.props.loading) {
                return <div className="spinner-wrapper"><Spinner size={ 100 }/></div>;
            } else {
                return (
                    <div className="settings-loaded">
                        <div className="settings-content">
                            <Breadcrumbs section={ this.getBreadcrumbs() } subsection={[{ title: 'Settings' }]} />
                            <div className="settings-content-content">
                                <div className="side-bar-wrapper">
                                    <SideBar content={ this.getSideMenu() }/>
                                </div>
                                <div className="section-wrapper">
                                <SettingsSection
                                    className="section"
                                    section={ this.props.section }
                                    subsection={ this.props.subsection }
                                    query={ this.props.query }
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        };

        return (
            <div className="settings">
                { renderContent() }
            </div>
        );
    }
}

export default SettingsComponent;
