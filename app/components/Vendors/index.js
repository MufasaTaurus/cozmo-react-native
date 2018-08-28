import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import Spinner from 'components/Spinner';
import SideBar from 'components/SideBar';
import Dashboard from './Dashboard';
import JobDetails from './JobDetails';
import VendorsList from './VendorsList';
import VendorInfo from './VendorInfo';
import Properties from './Properties';
import Payments from './Payments';
import UnderConstruction from 'components/UnderConstruction';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { fetchVendors } from 'containers/Vendors/actions';
import { makeSelectVendors, makeSelectLoading } from 'containers/Vendors/selectors';
import './vendors.less';

export class VendorsComponent extends React.Component {

    componentWillMount() {
        if (!this.props.vendors.size) {
            this.props.fetchVendors();
        }

        if (!this.props.section) {
            this.props.goToDashboard();
        }
    }

    shouldDisplayPlaceholder() {
        return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';
    }

    getSideMenu() {
        return [
            {
                title: 'Management',
                icon: 'settings',
                baseUrl: '/vendors',
                items: [
                    {
                        title: 'Dashboard',
                        url: '/dashboard'
                    },
                    {
                        title: 'Properties',
                        url: '/properties'
                    },
                    {
                        title: 'Cleaning Team',
                        url: '/team'
                    },
                    {
                        title: 'Payments',
                        url: '/payments'
                    }
                ]
            }
        ];
    }

    getSectionToRender() {
        switch (this.props.section) {
            case 'dashboard':
            default:
                return <Dashboard />;
            case 'team':
                return <VendorsList />;
            case 'payments':
                return <Payments />;
            case 'properties':
                return <Properties id={ this.props.id }/>;
        }
    }

    render() {
        const shouldDisplayPlaceholder = this.shouldDisplayPlaceholder();
        const renderContent = () => {
            if (this.props.loading) {
                return <div className="spinner-wrapper"><Spinner size={ 100 }/></div>;
            } else {
                if (this.props.section === 'job') {
                    return <JobDetails id={ this.props.id }/>;
                } else if (this.props.section === 'details' && this.props.id) {
                    return <VendorInfo id={ this.props.id }/>;
                } else {
                    return (
                        <div className="content-wrapper">
                            <Breadcrumbs style={{ zIndex: 2 }} section={ 'Cleaners' } subsection={[{ title: 'Cleaner and maintenance management' }]} />
                            <div className="vendors-section-content">
                                <div className="side-bar-wrapper" style={{ zIndex: 3 }}><SideBar content={ this.getSideMenu() }/></div>
                                <div className="vendors-content">{ this.getSectionToRender() }</div>
                            </div>
                        </div>
                    );
                }
            }
        };

        return (
            shouldDisplayPlaceholder ?
                <UnderConstruction page="Vendors" link="https://voyajoy.com/cozmo-vrs/vendor-management"/>
                :
                <div className="vendors">
                    { renderContent() }
                </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    vendors: makeSelectVendors(),
    loading: makeSelectLoading()
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchVendors: () => dispatch(fetchVendors()),
        goToDashboard: () => dispatch(push('vendors/dashboard')),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorsComponent);
