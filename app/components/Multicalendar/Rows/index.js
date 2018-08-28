import React from 'react';
import Row from './Row';
import Spinner from 'components/Spinner';


export class Rows extends React.Component {

    render() {
        const filterPredicate = (row) => {
            const query = this.props.query;
            return (
                row.get('name').toLowerCase().indexOf(query.toLowerCase().trim()) > -1 ||
                row.get('street').toLowerCase().indexOf(query.toLowerCase().trim()) > -1
            );
        };
        return (
            <div className="rows">
                { this.props.loading ? <Spinner /> :
                    this.props.rows.filter(row => filterPredicate(row)).map((row, index) => {
                        return (
                                <Row
                                    key={ index }
                                    row={ row }
                                    onEventClick={ this.props.onEventClick }
                                    hideRate={ this.props.hideRate }
                                    days={ this.props.days }/>
                        );
                    })
                }
            </div>
        );
    }
}

export default Rows;


