import React, { PropTypes } from 'react';
import './chartCard.less';


export class ChartCard extends React.Component {

    render() {
        return (
            <div className="chart-card">
                <div className="title">{ this.props.title }</div>
                <div className="subtitle">{ this.props.subtitle }</div>
                <div className="chart-wrapper">
                    { this.props.children }
                </div>
            </div>
        );
    }
}

ChartCard.PropTypes = {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
};

export default ChartCard;
