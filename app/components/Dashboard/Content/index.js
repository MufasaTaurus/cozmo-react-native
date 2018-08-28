import React from 'react';
import {connect} from 'react-redux';
import './dashboardContent.less';

export class DashboardContent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    render() {
        return (
            <div className="dashboard-content">
                { this.props.content }
            </div>
        );
    }
}

export default connect(null, null)(DashboardContent);
