import React from 'react';
import moment from 'moment';

export class Days extends React.Component {

    render() {
        return (
            <div className={ 'days' + (this.props.basic ? ' basic' : '') } >
                { this.props.days.map((d, index) => {
                    const shouldDisplayMonth = d.date() === 1 || (!index && d.date() < d.daysInMonth());
                    const isToday = moment().isSame(d, 'day');
                    const weekend = this.props.basic && (d.day() === 0 || d.day() === 6);
                    const filterStart = d.isSame(this.props.datesFilter.from, 'd');
                    const filterEnd = d.isSame(this.props.datesFilter.to, 'd');
                    return (
                        <div className={ 'day' + (shouldDisplayMonth ? ' first' : '') } key={ d.format('DDMMYYYY') }>
                            <div className="month">{ shouldDisplayMonth && d.format('MMM YYYY') }</div>
                            <div className={ 'day-number' + (isToday ? ' today' : '') + (weekend ? ' weekend' : '') }>
                                { isToday && <div className="today-arrow"><div className="arrow">&#9662;</div></div> }
                                { (filterStart || filterEnd) && <div className={ 'line' + (filterEnd ? ' end' : '') }/> }
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
