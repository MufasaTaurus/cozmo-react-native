import React from 'react';
import { fromJS } from 'immutable';
import throttle from 'lodash/throttle';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
import Tooltip from '../../../../Tooltip';
import Day from '.././Day';
import ReservationModel from 'models/Reservation';

export class Month extends React.Component {

    shouldComponentUpdate(nextProps) {
        const fromInMonth = nextProps.selectedRange.from && nextProps.selectedRange.from.isBetween(this.props.days[0], this.props.days[this.props.days.length - 1], 'd', '[]');
        const endInMonth = nextProps.selectedRange.to && nextProps.selectedRange.to.isBetween(this.props.days[0], this.props.days[this.props.days.length - 1], 'd', '[]');
        return (
            fromInMonth ||
            endInMonth ||
            !nextProps.selectedRange.from  ||
            !nextProps.selectedRange.to ||
            !isEqual(nextProps.eventDays, this.props.eventDays)
        );
    }
    render() {
        // tylko render jesli zmienia stan render/null
        // if (this.props.row.get('id') === 181) {
        //     console.error('render')
        //     //console.error(this.props.blockingsStarts['030518'])
        //     //console.error(this.props.visibleDay.date())
        //     //console.error(this.props.days[0].isBetween(moment(this.props.visibleDay).subtract(20, 'd'), moment(this.props.visibleDay).add(100, 'd')))
        // }

        return (
            <div className="month">
                { this.props.days.map(day => {
                    const key = day.format('DDMMYY');
                    return (
                        <Day
                            key={ key }
                            day={ day }
                            eventDays={ this.props.eventDays }
                            hasEvent={ this.props.eventDays[key] }
                            isStart={ this.props.reservationsStarts[key] || this.props.blockingsStarts[key] }
                            isEnd={ this.props.reservationsEnds[key] || this.props.blockingsEnds[key]}
                            startSelection={ this.props.startSelection }
                            endSelection={ this.props.endSelection }
                            selectDay={ this.props.selectDay }
                            onSingleDaySelect={ this.props.onSingleDaySelect }
                            selectedRange={ this.props.selectedRange }
                            unblock={ this.props.unblock }
                            row={ this.props.row }/>
                    ); }) }
            </div>
        );
    }
}

export default Month;
