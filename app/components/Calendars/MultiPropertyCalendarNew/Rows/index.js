import React from 'react';
import chunk from 'lodash/chunk';
import Row from './Row';
import Header from '.././Header';
import Spinner from 'components/Spinner';

export class Rows extends React.Component {

    // componentWillReceiveProps() {
    //     setTimeout(() => this.canFetch = true, 300);
    // }

    // onScroll(evt) {
    //     if (this.canFetch) {
    //         if (evt.deltaX > 15) {
    //             this.props.fetchNextPeriod();
    //             this.canFetch = false;
    //         } else if (evt.deltaX < -15) {
    //             this.props.fetchPrevPeriod();
    //             this.canFetch = false;
    //         }
    //     }
    // }

    render() {
        return (
            <div className="rows">
                {/*{ this.props.loading && <div className="disabler"><Spinner /></div> }*/}
                <Header
                    datesFilter={ this.props.datesFilter }
                    query={ this.props.query }
                    handleSearchQueryChange={ this.props.handleSearchQueryChange }
                    days={ this.props.days } />
                { this.props.rows.map((row, index) => {
                    return (
                        <Row
                            key={ row.get('id') }
                            row={ row }
                            index={ index }
                            onEventClick={ this.props.onEventClick }
                            openIcalEvent={ this.props.openIcalEvent }
                            originalDays={ this.props.days }
                            firstDay={ this.props.days[0] }
                            days={ chunk(this.props.days, 14) }/>
                    );
                }) }
            </div>
        );
    }
}

export default Rows;
