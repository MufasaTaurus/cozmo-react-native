import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import SVG from 'components/SVG';

export class SideBarSection extends React.Component {

    render() {
        const { title, icon, items, baseUrl } = this.props.section;
        return (
            <div className="side-bar-section">
                <div className="section-title">
                    <SVG className="section-icon" icon={ icon } size={ 18 } />
                    { title }
                </div>
                <div className="section-items">
                    { items.map((item, index) => {
                        if (item.hidden) {
                            return null;
                        } else {
                            return (
                                <Link
                                    className="section-item"
                                    to={ baseUrl + item.url }
                                    key={ index }
                                    onlyActiveOnIndex={ item.onlyActiveOnIndex }
                                    activeClassName={ 'active' }>
                                    <div>{ item.title }</div>
                                </Link>
                            );
                        }
                    }) }
                </div>
            </div>
        );
    }
}

SideBarSection.propTypes = {
    section: PropTypes.object,
};

export default SideBarSection;
