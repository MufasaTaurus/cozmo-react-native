import React from 'react';
import Header from 'components/Dashboard/Header';
import SideMenu from 'components/Dashboard/SideMenu';
import DashboardContent from 'components/Dashboard/Content';
import './dashboard.less';

export class Dashboard extends React.Component {

    render() {
        return (
            <div className="dashboard">
                <Header />
                <div className="dashboard-content-wrapper">
                    <SideMenu />
                    <DashboardContent content={ this.props.content } />
                </div>
            </div>
        );
    }
}

export default Dashboard;
