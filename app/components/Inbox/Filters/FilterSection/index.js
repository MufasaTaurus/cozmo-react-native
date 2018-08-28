import React from 'react';
import SVG from 'components/SVG';
import './filterSection.less';

export class FilterSection extends React.Component {

    render() {
        return (
            <div className="filter-section">
                <div className="filter-section-header">
                    <span>
                        <SVG icon={ this.props.icon } size="16"/>
                    </span> { this.props.title }
                </div>
                <div className="filter-section-content">
                    { this.props.content }
                </div>
            </div>
        );
    }
}

export default FilterSection;
