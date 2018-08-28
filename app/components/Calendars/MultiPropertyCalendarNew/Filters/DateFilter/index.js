import React from 'react';
import Filter from '.././Filter';
import DateRangePicker from './DateRangePicker';
import './dateFilter.less';

export class DateFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dates: props.value
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ dates: nextProps.value });
    }

    onApply() {
        this.props.onChange(this.state.dates);
    }

    render() {
        const from = this.state.dates.from;
        const to = this.state.dates.to;
        const content =
            <div className="form">
                <div className="dates">
                    <span className={ 'date' + (from ? '' : ' active') }>
                        { from ? from.format('YYYY-MM-DD') : 'Check in date' }
                        <div className="border"/>
                    </span>
                    <span className="separator">-</span>
                    <span className={ 'date' + (from && !to ? ' active' : '') }>
                        { to ? to.format('YYYY-MM-DD') : 'Check out date' }
                        <div className="border"/>
                    </span>
                </div>
                <div className="date-range-wrapper">
                    <DateRangePicker
                        onSelect={ (dates) => this.setState({ dates: dates }) }
                        defaultValue={ this.state.dates }
                    />
                </div>
            </div>;
        const name = () => {
            const from = this.props.value.from;
            const to = this.props.value.to;
            if (from && to) {
                return from.format('YYYY-MM-DD') + ' - ' + to.format('YYYY-MM-DD');
            } else {
                return 'Date';
            }
        };
        return (
            <div className="date-filter">
                <Filter
                    name={ name() }
                    isApplied={ this.props.value.from && this.props.value.to }
                    icon="event"
                    content={ content }
                    onApply={ () => this.onApply() }
                    { ...this.props }
                />
            </div>
        );
    }
}

export default DateFilter;
