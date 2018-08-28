import React, { PropTypes } from 'react';
import './tabs.less';

export class Tabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: props.defaultActive || 0
        };
    }

    setActiveTab(index) {
        this.setState({ active: index });
    }

    getClassName(index) {
        let className = 'vj-tabs-tab';
        if (this.state.active > index) {
            className += ' left';
        } else if (this.state.active < index) {
            className += ' right';
        } else {
            className += ' active';
        }
        return className;
    }

    render() {
        return (
            <div className="vj-tabs">
                <div className="vj-tabs-wrapper">
                    { this.props.tabs.map((tab, index) => {
                        return (
                            <div
                                key={ index }
                                className={ this.getClassName(index) }
                                onClick={ () => this.setActiveTab(index) }>
                                <div className="tab-title">{ tab.title }</div>
                            </div>
                        );
                    }) }
                </div>
                <div className="vj-tabs-content">
                    { this.props.tabs.map((tab, index) => {
                        return (
                            <div
                                key={ index }
                                style={{ display: this.state.active === index ? 'block' : 'none' }} >
                                { tab.content }
                            </div>
                        );
                    }) }
                </div>
            </div>
        );
    }
}

Tabs.PropTypes = {
    tabs: PropTypes.array.isRequired,
    defaultActive: PropTypes.number
};

export default Tabs;
