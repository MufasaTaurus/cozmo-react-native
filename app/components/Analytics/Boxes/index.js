import React, { PropTypes } from 'react';
import { REGEXP_FORMAT_NUMBER } from 'utils/const';
import './boxes.less';


export class Boxes extends React.Component {

    render() {
        return (
            <div className="analytics-boxes">
                { box({ title: 'Projected Revenue', subtitle: 'July, 2017', value: this.props.values.revenue }) }
                { box({ title: 'Projected Profit', subtitle: 'July, 2017', value: this.props.values.profit }) }
                { box({ title: 'Occupancy Rate', subtitle: 'July, 2017', value: this.props.values.occupancy }) }
            </div>
        );
    }
}

const box = ({ title, subtitle, value }) => {
    const type = ((value) => {
        if (value.indexOf('%') > -1) {
            return 'neutral';
        }
        const numericValue = parseInt(value.replace('$', ''), 10);
        if (numericValue > 0) {
            return 'positive';
        } else if (numericValue < 0) {
            return 'negative';
        }
    })(value);
    return (
        <div className={ 'box ' + type }>
            <div className="header">
                <div className="title">{ title }</div>
                <div className="subtitle">{ subtitle }</div>
            </div>
            <div className="value">{ value.replace(REGEXP_FORMAT_NUMBER, '$1 ') }</div>
        </div>
    );
};


Boxes.PropTypes = {
    values: React.PropTypes.object,
};

export default Boxes;
