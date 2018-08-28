import React from 'react';
import moment from 'moment';
import chunk from 'lodash/chunk';
import throttle from 'lodash/throttle';
import Row from './Row';
import Header from '.././Header';
import Spinner from 'components/Spinner';

export class RowsBasic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            horizontalDelta: 60,
            verticalDelta: 10 * 39,
            visibleDay: moment().subtract(7, 'd')
        };
        this.fetchingNextPeriod = false;
        this.currentMonth = moment();
        this.nextTreshhold = 1860;

        //this.checkScrollHorizontal = throttle(this.checkScrollHorizontal.bind(this), 300);
        //this.checkScrollVertical = throttle(this.checkScrollVertical.bind(this), 300);
        //this.updateHeader = throttle(this.updateHeader.bind(this), 250);
        //this.updateVisible = throttle(this.updateVisible.bind(this), 200);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loading && this.props.loading) {
            this.fetchingNextPeriod = false;
        }
    }

    componentDidMount() {
        const rows = document.getElementById('rows-basic');
        const header = document.getElementById('header');
        rows.addEventListener('scroll', () => {
            header.scrollLeft = rows.scrollLeft;
            this.checkScrollHorizontal(rows);
            this.checkScrollVertical(rows);
            this.updateHeader(rows.scrollLeft);
            //this.updateVisible(rows.scrollLeft);
        }, { passive: true });
    }

    shouldComponentUpdate(nextProps) {
        return (
            !nextProps.rows.equals(this.props.rows)
        );
    }

    checkScrollHorizontal(rows) {
        if (Math.floor(rows.scrollLeft) - this.nextTreshhold > 0) {
            if (!this.fetchingNextPeriod) {
                this.fetchingNextPeriod = true;
                //this.nextTreshhold += 1860;
                this.nextTreshhold += 4600;
                this.props.fetchNextPeriod();
            }
        }
    }

    checkScrollVertical(rows) {
        if ((this.props.rows.size * 39) - rows.scrollTop < this.state.verticalDelta) {
            this.props.fetchNextPage();
        }
    }

    updateHeader(scroll) {
        const currentDay = moment(this.props.days[Math.floor(scroll / 22)]);
        if (this.currentMonth.month() !== currentDay.month()) {
            this.props.onCurrentMonthChange(currentDay);
            this.currentMonth = currentDay;
        }
    }

    updateVisible(scroll) {
        const currentDay = this.props.days[Math.floor(scroll / 22)];
        if (Math.abs(currentDay.diff(this.state.visibleDay, 'd')) > 12) {
            this.setState({ visibleDay: currentDay });
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div className="rows basic" id="rows-basic">
                {/*{ this.props.loading && <div className="disabler"><Spinner /></div> }*/}
                <Header
                    basic
                    query={ this.props.query }
                    handleSearchQueryChange={ this.props.handleSearchQueryChange }
                    days={ this.props.days } />
                { this.props.rows.map(row => {
                    return (
                        <Row
                            key={ row.get('id') }
                            row={ row }
                            //visibleDay={ this.state.visibleDay }
                            datesFilter={ this.props.datesFilter }
                            originalDays={ this.props.days }
                            days={ chunk(this.props.days, 14) }/>
                    );
                }) }
            </div>
        );
    }
}

export default RowsBasic;
