import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import SideBar from 'components/SideBar';
import DropdownRouter from 'components/DropdownRouter';
import PropertiesList from './PropertiesList';
import Groups from './Groups';
import Connections from './Connections';
import Mapping from './Connections/Mapping';
import './properties.less';

export class PropertiesComponent extends React.Component {

    renderContent() {
        switch (this.props.id) {
            case 'groups':
                return <Groups id={ this.props.section } createEmail={ this.props.subsection === 'create-email' }/>;
            case 'connections':
                if (this.props.section) {
                    if (this.props.subsection) {
                        return <Mapping id={ this.props.section }/>;
                    } else {
                        return <Connections id={ this.props.section }/>;
                    }
                } else {
                    return <Connections/>;
                }
            default:
                return <PropertiesList { ...this.props } />;
        }
    }

    getBreadcrumbsSection() {
        switch (this.props.id) {
            case 'connections':
                if (this.props.section) {
                    switch (this.props.subsection) {
                        case 'mapping':
                            return 'Mapping';
                        default:
                            return 'Sync Details';
                    }
                } else {
                    return 'API Connections';
                }
            case 'groups':
                if (this.props.section) {
                    return 'Group #' + this.props.section;
                }
                return 'Groups';
            default:
                return 'Property List';
        }
    }

    getBreadcrumbsSubsection() {
        const subsections = [{ title: 'Properties' }];
        switch (this.props.id) {
            case 'connections':
                this.props.section ? subsections.push({ title: 'API Connections', link: '/properties/connections' }) : '';
                break;
            case 'groups':
                this.props.section ? subsections.push({ title: 'Groups', link: '/properties/groups' }) : '';
                break;
            default:
                break;
        }

        return subsections;
    }

    getSideBar() {
        if (this.props.id === 'connections' && this.props.section) {
            return [
                {
                    title: 'Management',
                    icon: 'settings',
                    baseUrl: '/properties/connections/' + this.props.section,
                    items: [
                        {
                            title: 'Sync Details',
                            url: '',
                            onlyActiveOnIndex: true
                        },
                        {
                            title: 'Mapping',
                            url: '/mapping'
                        },
                    ]
                }
            ];
        }

        return [
            {
                title: 'Management',
                icon: 'settings',
                baseUrl: '/properties',
                items: [
                    {
                        title: 'Property List',
                        url: '',
                        onlyActiveOnIndex: true
                    },
                    {
                        title: 'Groups',
                        url: '/groups'
                    },
                    {
                        title: 'API Connections',
                        url: '/connections'
                    }
                ]
            }
        ];
    }

    shouldShowSideBar() {
        return !this.props.isCreateNew && (!this.props.id || (this.props.id === 'groups' || this.props.id === 'connections'));
    }

    render() {
        const showSideBar = this.shouldShowSideBar();
        return (
            <div className="properties-section">
                { showSideBar && <Breadcrumbs section={ this.getBreadcrumbsSection() } subsection={ this.getBreadcrumbsSubsection() } /> }
                <div className="properties-content">
                    <div className="side-bar-wrapper" style={{ zIndex: 2 }}>
                        { showSideBar && <SideBar content={ this.getSideBar() }/> }
                    </div>
                    <div className="properties-content-wrapper">
                        { showSideBar && <DropdownRouter content={ this.getSideBar() }/> }
                        { this.renderContent() }
                    </div>
                </div>
            </div>
        );
    }
}

export default PropertiesComponent;
