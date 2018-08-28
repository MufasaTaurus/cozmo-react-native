import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './breadcrumbs.less';

export class Breadcrumbs extends React.Component {

    render() {
        const subsection = (
            this.props.subsection.map((s, index) => {
                return (
                    <span key={ index }>
                        { s.link ?
                            <span>
                                <Link to={ s.link }>{ s.title }</Link>
                            </span>
                            :
                            s.title
                        }
                        { index + 1 < this.props.subsection.length && <span>&nbsp;&gt;&nbsp;</span> }
                    </span>
                );
            })
        );
        return (
            <div className="vj-breadcrumbs">
                <div className="vj-breadcrumbs-content">
                    <div className="vj-breadcrumbs-content-section">{ this.props.section }</div>
                    <div className="vj-breadcrumbs-content-subsection">{ subsection }</div>
                </div>
            </div>
        );
    }
}

Breadcrumbs.PropTypes = {
    section: PropTypes.string.isRequired,
    subsections: PropTypes.array.isRequired
};

export default Breadcrumbs;
