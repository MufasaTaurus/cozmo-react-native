import React from 'react';
import moment from 'moment';

export class Days extends React.Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.days.length !== this.props.days.length;
    }

    render() {
        return (
            <div className={ 'days' + (this.props.basic ? ' basic' : '') }>
                { this.props.days.map((d, index) => {
                    const shouldDisplayMonth = d.date() === 1 || (!index && d.date() < d.daysInMonth());
                    const isToday = moment().isSame(d, 'day');
                    const weekend = this.props.basic && (d.day() === 0 || d.day() === 6);
                    return (
                        <div className={ 'day' + (shouldDisplayMonth ? ' first' : '') } key={ d.format('DDMMYYYY') }>
                            <div className="month">{ shouldDisplayMonth && d.format('MMM YYYY') }</div>
                            <div className={ 'day-number' + (isToday ? ' today' : '') + (weekend ? ' weekend' : '') }>
                                { isToday && <div className="today-arrow"><div className="arrow">&#9662;</div></div> }
                                { this.props.basic ? d.format('D') : d.format('ddd D') }
                            </div>
                        </div>
                    );
                }) }
            </div>
        );
    }
}

export default Days;
