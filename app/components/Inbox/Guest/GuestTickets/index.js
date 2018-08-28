import React from 'react';
import Spinner from 'components/Spinner';
import StatusLabel from 'components/StatusLabel';
import Assignee from 'components/Assignee';
import Pagination from 'components/Pagination';
import './guestTickets.less';

export class GuestTickets extends React.Component {

    render() {
        return (
            <div className="inbox-guest-tickets">
                <table className="tickets-table">
                    <thead className="tickets-table-header">
                    <tr className="headers">
                        <td>ID</td>
                        <td>Subject</td>
                        <td>Type</td>
                        <td>Status</td>
                        <td>Assignee</td>
                        <td>Date</td>
                    </tr>
                    </thead>
                    <tbody className="tickets-table-body">
                    { this.props.tickets
                        .sortBy(t => t.getDate())
                        .map(ticket => {
                            const id = ticket.getId();
                            return (
                                <tr className="ticket" key={ id } onClick={ () => this.props.onTicketClick(id) }>
                                    <td className="id">
                                        <span className={ 'priority ' + ticket.getPriorityName() }/>#{ id }
                                    </td>
                                    <td className="subject">
                                        <div className="reporter">
                                            { ticket.getRequester() }
                                        </div>
                                        <div className="subject">
                                            { ticket.getTitle() }
                                        </div>
                                    </td>
                                    <td className="type">{ ticket.getType() }</td>
                                    <td className="status"><StatusLabel label={ ticket.getStatus() }/></td>
                                    <td className="assign"><Assignee fullName={ ticket.getAssignee() }/></td>
                                    <td className="date">
                                        <div className="date">{ ticket.getCreationDate() }</div>
                                        <div className="time">{ ticket.getCreationTime() }</div>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
                <div className="tickets-pagination">
                    <Pagination pagination={ this.props.pagination } onChange={ this.props.fetchGuestTickets }/>
                </div>
            </div>
        );
    }
}


export default GuestTickets;
