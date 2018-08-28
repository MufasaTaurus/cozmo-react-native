import React from 'react';
import moment from 'moment';
import { Grid, ScrollSync, AutoSizer, MultiGrid } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import throttle from 'lodash/throttle';
import chunk from 'lodash/chunk';
import Row from './Row';
import Header from '.././Header';
import Day from './Row/Day';
import PropertyInfo from '.././PropertyInfo';
import Spinner from 'components/Spinner';

export class Rows extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            horizontalDelta: 45,
            verticalDelta: 10 * 66,
            visibleDay: moment().subtract(7, 'd')
        };
        this.fetchingNextPeriod = false;
        this.nextTreshhold = 1860;
        this.currentMonth = moment();

        this.checkScrollHorizontal = throttle(this.checkScrollHorizontal.bind(this), 300);
        this.updateHeader = throttle(this.updateHeader.bind(this), 500);
        //this.checkScrollVertical = throttle(this.checkScrollVertical.bind(this), 300);
    }

    shouldComponentUpdate(nextProps) {
        //console.error('update')
        //console.error(!nextProps.rows.equals(this.props.rows))
        return (
            //nextProps.days.length !== this.props.days.length ||
            //!nextProps.days[nextProps.days.length - 1].isSame(this.props.days[this.props.days.length - 1], 'd') ||
            !nextProps.rows.equals(this.props.rows)
        );
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loading && this.props.loading) {
            this.fetchingNextPeriod = false;
        }
    }

    componentDidMount() {
        const rows = document.getElementById('rows');
        const header = document.getElementById('header');
        //rows.scrollLeft = 5146;
        rows.addEventListener('scroll', () => {
            header.scrollLeft = rows.scrollLeft;
            this.checkScrollHorizontal(rows);
            //this.checkScrollVertical(rows);
            this.updateHeader(rows.scrollLeft);
            this.updateVisible(rows.scrollLeft);
        }, { passive: true });
    }

    checkScrollHorizontal(rows) {
       // const currentDay = this.props.days[Math.floor(rows.scrollLeft / 62)];
       // const lastDay = this.props.days[this.props.days.length - 1];
        // if (lastDay.diff(currentDay, 'd') < this.state.horizontalDelta) {
        //     if (!this.fetchingNextPeriod) {
        //         this.fetchingNextPeriod = true;
        //         this.props.fetchNextPeriod();
        //     }
        // }
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
        if ((this.props.rows.size * 66) - rows.scrollTop < this.state.verticalDelta) {
            this.props.fetchNextPage();
        }
    }

    updateHeader(scroll) {
        const currentDay = moment(this.props.days[Math.floor(scroll / 62)]);
        if (this.currentMonth.month() !== currentDay.month()) {
            this.props.onCurrentMonthChange(currentDay);
            this.currentMonth = currentDay;
        }
    }

    updateVisible(scroll) {
        const currentDay = this.props.days[Math.floor(scroll / 62)];
        if (currentDay.diff(this.state.visibleDay) > 12) {
            this.setState({ visibleDay: currentDay });
        }
    }

    render() {
        // const propertyRenderer = ({ columnIndex, key, rowIndex, style }) => {
        //     return (
        //         <div key={key} style={style} className="row">
        //             <PropertyInfo row={ this.props.rows.get(rowIndex - 1) }/>
        //         </div>
        //     );
        // };
        //
        // const headerRenderer = ({ columnIndex, key, rowIndex, style }) => {
        //     const d = this.props.days[columnIndex - 1];
        //     return d.format('ddd D');
        //     const shouldDisplayMonth = d.date() === 1 || !columnIndex;
        //     const isToday = moment().isSame(d, 'day');
        //     const weekend = this.props.basic && (d.day() === 0 || d.day() === 6);
        //     return (
        //         <div key={key} style={style} className="header">
        //             <div className="days">
        //                 <div className={ 'day' + (shouldDisplayMonth ? ' first' : '') } key={ d.format('DDMMYYYY') }>
        //                     <div className="month">{ shouldDisplayMonth && d.format('MMM YYYY') }</div>
        //                     <div className={ 'day-number' + (isToday ? ' today' : '') + (weekend ? ' weekend' : '') }>
        //                         { isToday && <div className="today-arrow"><div className="arrow">&#9662;</div></div> }
        //                         { this.props.basic ? d.format('D') : d.format('ddd D') }
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     );
        // };
        //
        // const dayRenderer = ({ columnIndex, key, rowIndex, style }) => {
        //     return (
        //         <div key={key} style={style} className="row">
        //             <div className="days">
        //                 <Day
        //                     style={style}
        //                     day={ this.props.days[columnIndex] }
        //                     eventDays={ [] }
        //                     icalDays={ [] }
        //                     //startSelection={ () => this.startSelection(day) }
        //                     //endSelection={ () => this.endSelection() }
        //                     //selectDay={ () => this.selectDay(day) }
        //                     selectDay={ () => {} }
        //                     selectedRange={ { from: null, to: null } }
        //                     row={ this.props.rows.get(rowIndex - 1) }/>
        //             </div>
        //         </div>
        //     );
        // };
        //
        // const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
        //     if (columnIndex === 0 && rowIndex === 0) {
        //         return '';
        //     }
        //     else if (columnIndex === 0) {
        //         return propertyRenderer({ columnIndex, key, rowIndex, style });
        //     } else if (rowIndex === 0) {
        //         return headerRenderer({ columnIndex, key, rowIndex, style });
        //     } else {
        //         return dayRenderer({ columnIndex, key, rowIndex, style });
        //     }
        // };
        //
        // const height = 500;
        // const width = 1716;
        // const rowHeight = 66;
        // const rowCount = this.props.rows.size;
        // const columnCount = this.props.days.length;
        // const overscanColumnCount = 20;
        // const overscanRowCount = 10;
        // const columnWidth = ({ index }) => index === 0 ? 229 : 62;

        return (
            <div className="rows" id="rows" ref={ instance => { this.rowsRef = instance; } }
            >
                {/*{ this.props.loading && <div className="disabler"><Spinner /></div> }*/}
                <Header
                    query={ this.props.query }
                    handleSearchQueryChange={ this.props.handleSearchQueryChange }
                    days={ this.props.days } />
                { this.props.rows.map(row => {
                    return (
                        <Row
                            key={ row.get('id') }
                            row={ row }
                            onEventClick={ this.props.onEventClick }
                            datesFilter={ this.props.datesFilter }
                            visibleDay={ this.state.visibleDay }
                            days={ chunk(this.props.days, 14) }/>
                    );
                }) }
                {/*<ScrollSync>*/}
                    {/*{({*/}
                          {/*clientHeight,*/}
                          {/*clientWidth,*/}
                          {/*onScroll,*/}
                          {/*scrollHeight,*/}
                          {/*scrollLeft,*/}
                          {/*scrollTop,*/}
                          {/*scrollWidth,*/}
                      {/*}) => {*/}
                        {/*const x = scrollLeft / (scrollWidth - clientWidth);*/}
                        {/*const y = scrollTop / (scrollHeight - clientHeight);*/}

                        {/*return (*/}
                            {/*<div*/}
                                {/*//className={styles.GridRow}*/}
                            {/*>*/}
                                {/*<div*/}
                                    {/*className={ 'header' }*/}
                                    {/*style={{*/}
                                        {/*position: 'absolute',*/}
                                        {/*left: 0,*/}
                                        {/*top: 0,*/}
                                    {/*}}>*/}
                                    {/*<Grid*/}
                                        {/*cellRenderer={ headerRenderer }*/}
                                        {/*className={ 'days' }*/}
                                        {/*width={columnWidth}*/}
                                        {/*height={rowHeight}*/}
                                        {/*rowHeight={rowHeight}*/}
                                        {/*columnWidth={columnWidth}*/}
                                        {/*rowCount={1}*/}
                                        {/*columnCount={1}*/}
                                    {/*/>*/}
                                {/*</div>*/}
                                {/*<div*/}
                                    {/*//className={styles.LeftSideGridContainer}*/}
                                    {/*style={{*/}
                                        {/*position: 'absolute',*/}
                                        {/*left: 0,*/}
                                        {/*top: rowHeight,*/}
                                    {/*}}>*/}
                                    {/*<Grid*/}
                                        {/*overscanColumnCount={overscanColumnCount}*/}
                                        {/*overscanRowCount={overscanRowCount}*/}
                                        {/*cellRenderer={ propertyRenderer }*/}
                                        {/*columnWidth={ 229 }*/}
                                        {/*columnCount={ 1 }*/}
                                        {/*//className={styles.LeftSideGrid}*/}
                                        {/*height={ height - scrollbarSize() }*/}
                                        {/*rowHeight={ rowHeight }*/}
                                        {/*rowCount={rowCount}*/}
                                        {/*scrollTop={scrollTop}*/}
                                        {/*width={ 229 }*/}
                                    {/*/>*/}
                                {/*</div>*/}
                                {/*<div*/}
                                    {/*//className={styles.GridColumn}*/}
                                {/*>*/}
                                    {/*<AutoSizer disableHeight>*/}
                                        {/*{({width}) => (*/}
                                            {/*<div>*/}
                                                {/*<div*/}
                                                    {/*style={{*/}
                                                        {/*height: rowHeight,*/}
                                                        {/*width: width - scrollbarSize(),*/}
                                                    {/*}}>*/}
                                                    {/*<Grid*/}
                                                        {/*//className={styles.HeaderGrid}*/}
                                                        {/*columnWidth={ columnWidth }*/}
                                                        {/*columnCount={ columnCount }*/}
                                                        {/*height={rowHeight}*/}
                                                        {/*overscanColumnCount={ 10 }*/}
                                                        {/*cellRenderer={ headerRenderer }*/}
                                                        {/*rowHeight={rowHeight}*/}
                                                        {/*rowCount={ 1 }*/}
                                                        {/*scrollLeft={ scrollLeft }*/}
                                                        {/*width={ width - scrollbarSize() }*/}
                                                    {/*/>*/}
                                                {/*</div>*/}
                                                {/*<div*/}
                                                    {/*style={{*/}
                                                        {/*height,*/}
                                                        {/*width,*/}
                                                    {/*}}>*/}
                                                    {/*<Grid*/}
                                                        {/*//className={styles.BodyGrid}*/}
                                                        {/*columnWidth={ columnWidth }*/}
                                                        {/*columnCount={ columnCount }*/}
                                                        {/*height={ height }*/}
                                                        {/*onScroll={ onScroll }*/}
                                                        {/*overscanColumnCount={ overscanColumnCount }*/}
                                                        {/*overscanRowCount={ overscanRowCount }*/}
                                                        {/*cellRenderer={ dayRenderer }*/}
                                                        {/*rowHeight={rowHeight}*/}
                                                        {/*rowCount={rowCount}*/}
                                                        {/*width={width}*/}
                                                    {/*/>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                        {/*)}*/}
                                    {/*</AutoSizer>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*);*/}
                    {/*}}*/}
                {/*</ScrollSync>*/}
                {/*<MultiGrid*/}
                    {/*fixedColumnCount={ 1 }*/}
                    {/*fixedRowCount={ 1 }*/}
                    {/*cellRenderer={ cellRenderer }*/}
                    {/*columnWidth={ columnWidth }*/}
                    {/*columnCount={columnCount}*/}
                    {/*overscanColumnCount={overscanColumnCount}*/}
                    {/*//enableFixedColumnScroll*/}
                    {/*//enableFixedRowScroll*/}
                    {/*height={ height }*/}
                    {/*rowHeight={ rowHeight }*/}
                    {/*rowCount={ rowCount }*/}
                    {/*//styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}*/}
                    {/*//styleTopLeftGrid={STYLE_TOP_LEFT_GRID}*/}
                    {/*//styleTopRightGrid={STYLE_TOP_RIGHT_GRID}*/}
                    {/*width={width}*/}
                {/*/>*/}
                {/*<div className="header-grid header">*/}
                    {/*<Grid*/}
                        {/*cellRenderer={ headerRenderer }*/}
                        {/*columnCount={ this.props.days.length }*/}
                        {/*columnWidth={ 62 }*/}
                        {/*height={ 66 }*/}
                        {/*rowCount={ 1 }*/}
                        {/*rowHeight={ 66 }*/}
                        {/*width={ width }*/}
                        {/*overscanColumnCount={ 10 }*/}
                        {/*overscanRowCount={ 0 }*/}
                        {/*useDynamicRowHeight={ false }*/}
                        {/*noContentRenderer={ noContentRenderer }*/}
                    {/*/>*/}
                {/*</div>*/}
                {/*<div className="property-info-grid">*/}
                    {/*<Grid*/}
                        {/*cellRenderer={ propertyRenderer }*/}
                        {/*columnCount={ 1 }*/}
                        {/*columnWidth={ 229 }*/}
                        {/*height={ height }*/}
                        {/*rowCount={ 20 }*/}
                        {/*rowHeight={ rowHeight }*/}
                        {/*width={ 229 }*/}
                        {/*overscanColumnCount={ 0 }*/}
                        {/*overscanRowCount={ 3 }*/}
                        {/*useDynamicRowHeight={ false }*/}
                        {/*noContentRenderer={ noContentRenderer }*/}
                        {/*scrollTop={ this.state.scrollTop }*/}
                    {/*/>*/}
                {/*</div>*/}
                {/*<div className="days-grid">*/}
                    {/*<Grid*/}
                        {/*cellRenderer={ dayRenderer }*/}
                        {/*columnCount={ this.props.days.length }*/}
                        {/*columnWidth={ 62 }*/}
                        {/*height={ height }*/}
                        {/*rowCount={ 20 }*/}
                        {/*rowHeight={ rowHeight }*/}
                        {/*width={ width }*/}
                        {/*overscanColumnCount={ 10 }*/}
                        {/*overscanRowCount={ 3 }*/}
                        {/*useDynamicRowHeight={ false }*/}
                        {/*noContentRenderer={ noContentRenderer }*/}
                        {/*onScroll={ onScroll }*/}
                    {/*/>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default Rows;
