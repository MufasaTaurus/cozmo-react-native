import React from 'react';
import chunk from 'lodash/chunk';
import Row from './Row';
import Header from '.././Header';
import Spinner from 'components/Spinner';

export class RowsBasic extends React.Component {

    render() {
        return (
            <div className="rows basic" id="rows-basic">
                { this.props.loading && <div className="disabler"><Spinner /></div> }
                <Header
                    basic
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
                            originalDays={ this.props.days }
                            openIcalEvent={ this.props.openIcalEvent }
                            days={ chunk(this.props.days, 14) }/>
                    );
                }) }
            </div>
        );
    }
}

export default RowsBasic;
