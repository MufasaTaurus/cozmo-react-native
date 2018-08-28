import React from 'react';
import { Link } from 'react-router';
import './breadcrumbs.less';

export class Breadcrumbs extends React.Component {

    render() {
        const subsection = this.props.id ?
            <span>
                <Link to="/inbox">Inbox</Link>
                &nbsp;&gt;&nbsp;
                <Link to="/inbox">All tickets</Link>
                &nbsp;&gt;&nbsp;
                <span className="ticket-id">#{ this.props.id }</span>
            </span>
            :
            <Link to="/inbox">Inbox</Link>;
        return (
            <div className="vj-breadcrumbs">
                <div className="vj-breadcrumbs-content">
                    <div className="vj-breadcrumbs-content-section"><Link to="/inbox">Inbox</Link></div>
                    <div className="vj-breadcrumbs-content-subsection">{ subsection }</div>
                </div>
            </div>
        );
    }
}

export default Breadcrumbs;
