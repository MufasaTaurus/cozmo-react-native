import React, { PropTypes } from 'react';
import SideBarSection from './SideBarSection';
import './sideBar.less';

export class SideBar extends React.Component {

    render() {
        return (
            <div className="side-bar">
                { this.props.contentTop }
                { this.props.content.map((section) => {
                    if (section.hidden) {
                        return null;
                    } else {
                        return <SideBarSection
                            key={ section.title }
                            section={ section }/>;
                    }
                }) }
            </div>
        );
    }
}

SideBar.propTypes = {
    content: PropTypes.array.isRequired,
    contentTop: PropTypes.object,
};

export default SideBar;
