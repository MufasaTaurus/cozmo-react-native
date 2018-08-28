import React from 'react';
//import Tabs from 'components/Tabs';
import PropertyCalendar from 'components/Calendars/PropertyCalendar';
//import PropertyCalendarRates from 'components/Calendars/PropertyCalendar';
//import PropertyCalendarRatesSeasonal from 'components/Calendars/PropertyCalendar';
import './calendar.less';

class Calendar extends React.Component {

    render() {
        return (
            <section className="calendar">
                <PropertyCalendar property={ this.props.property }/>
                {/*<Tabs tabs={[*/}
                    {/*{ title: 'Reservations', content: <PropertyCalendar property={ this.props.property }/> },*/}
                    {/*{ title: 'Rates & Availability', content: <PropertyCalendarRates property={ this.props.property } rates/> },*/}
                    {/*{ title: 'Seasonal Rates & Availability', content: <PropertyCalendarRatesSeasonal property={ this.props.property } rates seasonal/> },*/}
                {/*]}/>*/}
            </section>
        );
    }
}

export default Calendar;
