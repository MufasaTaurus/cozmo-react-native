import React from 'react';
import Ticket from '../Ticket';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectRecentTickets} from 'containers/Inbox/selectors';

export class RecentTickets extends React.Component {

    render() {
        const isEmpty = this.props.tickets.size === 0;
        const selected = this.props.selected.map(t => t.getId());
        this.props.parent && selected.push(this.props.parent.getId());
        return (
            <div className="find-tickets-search">
                <div className="found-tickets">
                    { isEmpty ?
                        <div className="empty-state">No Results</div>
                        :
                        this.props.tickets
                            .filter(t => selected.indexOf(t.getId()) < 0)
                            .map(t => {
                                return (
                                    <Ticket
                                        key={ t.getId() }
                                        ticket={ t }
                                        canDropToSelected
                                        onDrop={ this.props.onDrop }
                                    />
                                );
                            })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    tickets: selectRecentTickets(),
});

export default connect(mapStateToProps)(RecentTickets);
