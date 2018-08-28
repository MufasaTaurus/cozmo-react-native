import React from 'react';
//import isEqual from 'lodash/isEqual';
import Day from '.././Day';

export class Month extends React.Component {

    // shouldComponentUpdate(nextProps) {
    //     const fromInMonth = nextProps.selectedRange.from && nextProps.selectedRange.from.isBetween(this.props.days[0], this.props.days[this.props.days.length - 1], 'd', '[]');
    //     const endInMonth = nextProps.selectedRange.to && nextProps.selectedRange.to.isBetween(this.props.days[0], this.props.days[this.props.days.length - 1], 'd', '[]');
    //     return (
    //         fromInMonth ||
    //         endInMonth ||
    //         !nextProps.selectedRange.from  ||
    //         !nextProps.selectedRange.to ||
    //         !isEqual(nextProps.eventDays, this.props.eventDays)
    //     );
    // }

    render() {
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
                            isStart={ this.props.reservationsStarts[key] || this.props.blockingsStarts[key] || this.props.iCalsStarts[key] }
                            isEnd={ this.props.reservationsEnds[key] || this.props.blockingsEnds[key] || this.props.iCalsEnds[key] }
                            isLeftSide={ day.isBefore(this.props.originalDays[10]) }
                            isRightSide={ day.isAfter(this.props.originalDays[this.props.originalDays.length - 6]) }
                            startSelection={ this.props.startSelection }
                            endSelection={ this.props.endSelection }
                            selectDay={ this.props.selectDay }
                            onSingleDaySelect={ this.props.onSingleDaySelect }
                            selectedRange={ this.props.selectedRange }
                            unblock={ this.props.unblock }
                            hasiCalEvent={ this.props.icalDays[key] }
                            openIcalEvent={ this.props.openIcalEvent }
                            rowIndex={ this.props.rowIndex }
                            row={ this.props.row }/>
                    ); }) }
            </div>
        );
    }
}

export default Month;
