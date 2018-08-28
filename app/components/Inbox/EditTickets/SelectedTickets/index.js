import React, {PropTypes} from 'react';
import Assignee from 'components/Assignee';
import StatusLabel from 'components/StatusLabel';
import './selectedTickets.less';

export class SelectedTickets extends React.Component {

    render() {
        return (
            <div className="selected-tickets">
                <table className="tickets-table">
                    <tbody className="tickets-table-body">
                        { this.props.tickets.map(t => { return ticket(t); }) }
                    </tbody>
                </table>
            </div>
        );
    }
}

const ticket = (ticket) => {
    const id = ticket.getId();
    return (
        <tr className="ticket" key={ id }>
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
            <td><StatusLabel label={ ticket.getStatus() }/></td>
            <td><Assignee fullName={ ticket.getAssignee() }/></td>
            <td className="date">
                <div className="date">{ ticket.getCreationDate() }</div>
                <div className="time">{ ticket.getCreationTime() }</div>
            </td>
        </tr>
    );
};

export default SelectedTickets;
