import React from 'react';
import Spinner from 'components/Spinner';
import findKey from 'lodash/findKey';
import isEmpty from 'lodash/isEmpty';
import forOwn from 'lodash/forOwn';
import Assignee from 'components/Assignee';
import Checkbox from 'components/Checkbox';
import ButtonGroup from 'components/ButtonGroup';
import StatusLabel from 'components/StatusLabel';
import Pagination from 'components/Pagination';
import EditTickets from '../EditTickets';
import MergeTickets from '../MergeTickets';
import { push } from 'react-router-redux';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {editTickets, fetchTickets, archiveTickets, mergeTickets} from 'containers/Inbox/actions';
import {selectTickets, selectLoading, selectDisplay, selectFilters, selectPagination} from 'containers/Inbox/selectors';
import './ticketsList.less';

export class TicketsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTickets: {},
            modalOpen: false,
            mergeOpen: false,
        };
    }

    editTickets() {
        this.setState({ modalOpen: true });
    }

    mergeTickets() {
        this.setState({ mergeOpen: true });
    }

    submitTicketEdition(data) {
        this.props.editTickets(data);
        this.setState({ modalOpen: false });
    }

    archiveTickets() {
        this.props.archiveTickets(this.getSelectedTickets().map(t => t.getId()));
    }

    submitMerge(data) {
        this.props.mergeTickets(data);
        this.setState({ mergeOpen: false });
    }

    toggleTicket(id) {
        const tickets = this.props.tickets.map(t => t.getId());
        const selected = this.state.selectedTickets;
        if (id === 'all') {
            const isAll = this.isAllSelected();
            const all = {};
            tickets.map(t => all[t] = !isAll);
            this.setState({ selectedTickets: all });
        } else {
            const isSelected = !!this.state.selectedTickets[id];
            selected[id] = !isSelected;
            this.setState({ selectedTickets: selected });
        }
    }

    getSelectedTickets() {
        const selectedTickets = [];
        const selected = this.state.selectedTickets;

        forOwn(selected, (value, key) => {
            if (value) {
                selectedTickets.push(this.props.tickets.filter(t => t.getId() === parseInt(key)).first());
            }
        });

        return selectedTickets;
    }

    isAllSelected() {
        const tickets = this.props.tickets.map(t => t.getId());
        const selected = this.state.selectedTickets;
        let isAll = true;
        tickets.forEach(t => {
            if (!selected[t]) {
                isAll = false;
                return;
            }
        });

        return !isEmpty(selected) && isAll;
    }

    onTicketClicked(id) {
        this.props.goToTicketDetails(id);
    }

    shouldShowActions() {
        return !!findKey(this.state.selectedTickets, t => t === true);
    }

    render() {
        const checkedAll = this.isAllSelected();
        const showActions = this.shouldShowActions();
        return (
            <div className="tickets-list">
                <div className="table-top">
                    { showActions && <ButtonGroup buttons={[
                        { icon: 'edit', tip: 'Edit', onClick: () => this.editTickets() },
                        { icon: 'del', tip: 'Delete', onClick: () => this.archiveTickets() },
                        { icon: 'merge', tip: 'Merge', onClick: () => this.mergeTickets() },
                    ]}/> }
                </div>
                <div className="table-wrapper">
                    { this.props.loading ? <Spinner/> :
                        <table className="tickets-table">
                            <thead className="tickets-table-header">
                            <tr className="headers">
                                <td className="check"><Checkbox id="all" onChange={ () => this.toggleTicket('all') } checked={ checkedAll }/></td>
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
                                .filter(t => t.shouldFilterTicket(this.props.filters))
                                .sortBy(t => t.getDate())
                                .sortBy(t => -t.getPriority())
                                .map(ticket => {
                                    const id = ticket.getId();
                                    return (
                                        <tr className="ticket" key={ id } onClick={ () => this.onTicketClicked(id) }>
                                            <td onClick={ (evt) => evt.stopPropagation() }>
                                                <Checkbox
                                                    id={ id }
                                                    onChange={ () => this.toggleTicket(id) }
                                                    checked={ this.state.selectedTickets[id] }
                                                />
                                            </td>
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
                    }
                    { !this.props.loading && !this.props.tickets.size && <div className="no-results">No Results</div> }
                    <div className="tickets-pagination">
                        <Pagination pagination={ this.props.pagination } onChange={ this.props.fetchTickets }/>
                    </div>
                </div>
                { this.state.modalOpen && <EditTickets
                    onClose={ () => this.setState({ modalOpen: false }) }
                    onSubmit={ (data) => this.submitTicketEdition(data) }
                    tickets={ (() => this.getSelectedTickets())() }/> }
                { this.state.mergeOpen && <MergeTickets
                    onClose={ () => this.setState({ mergeOpen: false }) }
                    onSubmit={ (data) => this.submitMerge(data) }
                    tickets={ (() => this.getSelectedTickets())() }/> }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    tickets: selectTickets(),
    loading: selectLoading(),
    display: selectDisplay(),
    filters: selectFilters(),
    pagination: selectPagination()
});


export function mapDispatchToProps(dispatch) {
    return {
        goToTicketDetails: (id) => dispatch(push('/inbox/' + id)),
        editTickets: (data) => dispatch(editTickets(data)),
        fetchTickets: () => dispatch(fetchTickets()),
        archiveTickets: (data) => dispatch(archiveTickets(data)),
        mergeTickets: (data) => dispatch(mergeTickets(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketsList);
