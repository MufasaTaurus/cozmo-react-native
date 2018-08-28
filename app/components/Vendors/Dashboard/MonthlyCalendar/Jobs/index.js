import React, { PropTypes } from 'react';
import './jobs.less';

export class Jobs extends React.Component {

    render() {
        const { unassigned, status, number, onSelect, selected } = this.props;
        return (
            <div
                className={ 'calendar-monthly-jobs' + (unassigned ? ' unassigned' : '') + (selected ? ' selected' : '') }
                onClick={ onSelect }
            >
                <div className="status-badge"/>
                <div className="details">
                    <div className="status">{ status }</div>
                    <div className="number">{ number }</div>
                </div>
            </div>
        );
    }
}

Jobs.propTypes = {
    status: PropTypes.string,
    number: PropTypes.number,
    unassigned: PropTypes.bool,
    onSelect: PropTypes.func,
    selected: PropTypes.bool
};

export default Jobs;

