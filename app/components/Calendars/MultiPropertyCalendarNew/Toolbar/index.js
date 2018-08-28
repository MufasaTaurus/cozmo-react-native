import React from 'react';
import moment from 'moment';
import ButtonNew from 'components/ButtonNew';
import MonthPicker from 'components/Calendars/MonthPicker';
import SVG from 'components/SVG';

export class Toolbar extends React.Component {

    render() {
        const showToggle = !(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging');
        return (
            <div className="toolbar">
                <div className="left-side">
                    <span className="number-of-properties">{ this.props.numberOfProperties } properties</span>
                    { showToggle &&
                        <span className="toggle-views" onClick={ this.props.setCalendarView }>
                            { this.props.calendarView === 'basic' ? 'Show Details' : 'Hide Details' }
                        </span>
                    }
                </div>
                <div className="middle">
                    <span className="date">
                        <MonthPicker day={ this.props.currentMonth } onChange={ day => this.props.goToMonth(day.date(1)) }/>
                    </span>
                    <span className="navigation">
                        <span className="arrow prev" onClick={ this.props.prev }>
                            <SVG icon="backArrow"/>
                        </span>
                        <span className="arrow next" onClick={ this.props.next }>
                            <SVG icon="backArrow"/>
                        </span>
                    </span>
                    <ButtonNew label="Today" className="small green ghost" onClick={ this.props.goToToday }/>
                </div>
                <div className="right-side">
                    {/*<ButtonNew label="Create" className="small"/>*/}
                </div>
            </div>
        );
    }
}

export default Toolbar;


