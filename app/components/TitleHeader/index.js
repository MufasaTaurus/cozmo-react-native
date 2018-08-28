import React, { PropTypes } from 'react';
import SVG from 'components/SVG';
import './title-header.less';

export class TitleHeader extends React.Component {

    render() {
        const { title, subtitle, icon, iconSize } = this.props;

        return (
            <div className="title-header">
                <SVG className="title-header-icon" icon={ icon } size={ iconSize }/>
                <span className="title-header-title">{ title }</span>
                <span className="title-header-subtitle">{ subtitle }</span>
            </div>
        );
    }
}

TitleHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    icon: PropTypes.string,
    iconSize: PropTypes.number,
};

TitleHeader.defaultProps = {
    iconSize: 20,
};

export default TitleHeader;
