import React from 'react';
import Spinner from 'components/Spinner';
import Tabs from 'components/Tabs';
import SVG from 'components/SVG';
import Conversations from './Conversations';
import Notes from './Notes';
import TagTextField from 'components/TagTextField';
import PrioritySelect from 'components/Inbox/PrioritySelect';
import TeamMemberPicker from 'components/TeamMemberPicker';
import TypeSelect from 'components/Inbox/TypeSelect';
import BlackStatusSelect from 'components/Inbox/BlackStatusSelect';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {createStructuredSelector} from 'reselect';
import {selectTickets, selectLoading} from 'containers/Inbox/selectors';
import {editTickets, fetchTicket, addRecentTicket} from 'containers/Inbox/actions';
import {makeSelectUser} from 'containers/App/selectors';
import './ticketDetails.less';

export class TicketDetails extends React.Component {

    constructor(props) {
        super(props);
        const ticket = props.tickets.filter(t => t.getId() + '' === props.id).first();
        this.state = {
            ticket: ticket,
            tags: ticket ? ticket.getTags() : []
        };
        ticket && this.props.addRecentTicket(ticket);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loading) {
            if (nextProps.tickets.size) {
                const ticket = nextProps.tickets.filter(t => t.getId() + '' === nextProps.id).first();
                if (ticket) {
                    this.setState({
                        ticket: ticket,
                        tags: ticket ? ticket.getTags() : []
                    });
                    this.props.addRecentTicket(ticket);
                } else {
                    this.props.fetchTicket(nextProps.id);
                }
            }
        }
    }

    addTag(tag) {
        const tags = this.state.tags;
        if (!tags.filter(t => t.get('id') === tag.get('id')).length) {
            tags.push(tag);
        }
        this.setState({ tags: tags });
        this.onTicketChange('tags', tags);
    }

    deleteTag(tag) {
        const tags = this.state.tags;
        const index = tags.indexOf(tag);
        tags.splice(index, 1);
        this.setState({ tags: tags });
        this.onTicketChange('tags', tags);
    }

    onTicketChange(field, value) {
        const data = {
            tickets: [ this.state.ticket.getId() ],
            [field]: value
        };
        this.props.editTickets(data);
    }

    render() {
        const ticket = this.state.ticket;
        return (
            <div className="ticket-details">
                { (this.props.loading && !ticket) || !ticket ?
                    <Spinner/>
                    :
                    <div className="ticket-details-elements">
                        <div className="ticket-details-ticket-info">
                            <div className="ticket-info">
                                <div className="title">
                                    <div>
                                        <SVG icon="email" size="20" className="title-icon"/>
                                        { ticket.getTitle() }  #{ ticket.getId() }
                                    </div>
                                    <div>
                                        <BlackStatusSelect
                                            insideLabel={ false }
                                            defaultValue={ ticket.getStatus() }
                                            onChange={ (val) => this.onTicketChange('status', val) }/>
                                    </div>
                                </div>
                                <div className="ticket-options">
                                    <TeamMemberPicker
                                        label="Assignee"
                                        defaultValue={ ticket.getAssigneeId() }
                                        onChange={ (val) => this.onTicketChange('assignee', val) }
                                        small/>
                                    <TypeSelect
                                        label="Type"
                                        defaultValue={ ticket.getType() }
                                        onChange={ (val) => this.onTicketChange('type', val) }
                                        onlyTypes
                                        small/>
                                    <PrioritySelect
                                        label="Priority"
                                        defaultValue={ ticket.getPriority() }
                                        onChange={ (val) => this.onTicketChange('priority', val) }
                                        onlyPriorities
                                        small/>
                                    <TagTextField
                                        tags={ this.state.tags }
                                        small
                                        id="tags-details"
                                        label="Tags"
                                        onDelete={ (tag) => this.deleteTag(tag) }
                                        onChange={ (tag) => this.addTag(tag) }/>
                                </div>
                            </div>
                            <div className="ticket-details-tabs">
                                <Tabs tabs={[
                                    { title: 'All', content: 'Nothing here so far...' },
                                    { title: 'Conversations', content: <Conversations ticket={ ticket } user={ this.props.user }/> },
                                    { title: 'Notes', content: <Notes ticket={ ticket } user={ this.props.user }/> }
                                ]}
                                      defaultActive={ 1 }
                                />
                            </div>
                        </div>

                        { ticket.hasRequester() ?
                            <div className="requester" onClick={ () => this.props.goToGuest(ticket.getId(), ticket.getRequesterId()) }>
                                <div className="header">
                                    <SVG className="icon" icon="contact"/>
                                    <span>Requester Information</span>
                                </div>
                                <div className="content">
                                    <div>
                                        <img className="image" src={ 'https://cdn.voyajoy.com/images/preview.jpg' }/>
                                    </div>
                                    <div>
                                        <span className="name">{ ticket.getRequester() }</span>
                                        <span className="guest"> Guest</span>
                                        <div className="email">{ ticket.getRequesterEmail() }</div>
                                        <div className="phone">{ ticket.getRequesterPhone() }</div>
                                    </div>
                                </div>
                            </div>
                            : '' }
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    tickets: selectTickets(),
    loading: selectLoading(),
    user: makeSelectUser()
});


export function mapDispatchToProps(dispatch) {
    return {
        editTickets: (data) => dispatch(editTickets(data)),
        fetchTicket: (id) => dispatch(fetchTicket(id)),
        addRecentTicket: (id) => dispatch(addRecentTicket(id)),
        goToGuest: (tId, gId) => dispatch(push('/inbox/' + tId + '/' + gId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetails);
