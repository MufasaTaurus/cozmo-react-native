import React, { PropTypes } from 'react';
import TagTextField from 'components/TagTextField';
import SelectedTickets from './SelectedTickets';
import SVG from 'components/SVG';
import ButtonNew from 'components/ButtonNew';
import PrioritySelect from 'components/Inbox/PrioritySelect';
import BlackStatusSelect from 'components/Inbox/BlackStatusSelect';
import TeamMemberPicker from 'components/TeamMemberPicker';
import TypeSelect from 'components/Inbox/TypeSelect';
import './editTickets.less';

export class EditTickets extends React.Component {

    constructor(props) {
        super(props);
        const firstTicket = this.props.tickets[0];
        this.state = {
            tags: firstTicket.getTags(),
            type: firstTicket.getType(),
            priority: firstTicket.getPriority(),
            assignee: firstTicket.getAssigneeId(),
            status: firstTicket.getStatus(),
            tickets: this.props.tickets.map(t => t.getId())
        };
    }

    addTag(tag) {
        const tags = this.state.tags;
        if (!tags.filter(t => t.get('id') === tag.get('id')).length) {
            tags.push(tag);
        }
        this.setState({ tags: tags });
    }

    deleteTag(tag) {
        const tags = this.state.tags;
        const index = tags.indexOf(tag);
        tags.splice(index, 1);
        this.setState({ tags: tags });
    }

    handleFormChange(field, value) {
        this.setState({ [field]: value });
    }

    submitForm() {
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <div className="inbox-edit-tickets-modal">
                <div className="edit-tickets-modal">
                    <div className="modal-header">
                        <span><SVG className="header-icon" icon="edit"/>Edit Tickets</span>
                        <span className="close" onClick={ this.props.onClose }>&times;</span>
                    </div>
                    <div className="modal-content">
                        { modalSection({
                            title: 'Selected Tickets',
                            content:
                                <div>
                                    <SelectedTickets tickets={ this.props.tickets }/>
                                </div>
                        }) }
                        { modalSection({
                            title: 'Ticket options',
                            content:
                                <div className="ticket-options">
                                    <TeamMemberPicker
                                        label="Assignee"
                                        chooseMe="Take it"
                                        defaultValue={ this.state.assignee }
                                        onChange={ (val) => this.setState({ assignee: val }) }
                                        placeholder="&nbsp;"
                                        small/>
                                    <TypeSelect
                                        label="Type"
                                        defaultValue={ this.state.type }
                                        onChange={ (val) => this.handleFormChange('type', val) }
                                        onlyTypes
                                        small/>
                                    <TagTextField
                                        tags={ this.state.tags }
                                        small
                                        id="tags"
                                        label="Tags"
                                        onDelete={ (tag) => this.deleteTag(tag) }
                                        onChange={ (tag) => this.addTag(tag) }/>
                                    <PrioritySelect
                                        label="Priority"
                                        defaultValue={ this.state.priority }
                                        onChange={ (val) => this.handleFormChange('priority', val) }
                                        onlyPriorities
                                        small/>
                                    <BlackStatusSelect
                                        label="Status"
                                        defaultValue={ this.state.status }
                                        onChange={ (val) => this.handleFormChange('status', val) }/>
                                </div>
                        }) }
                        <div className="submit-section">
                            <ButtonNew onClick={ () => this.submitForm() } label="Done" big/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const modalSection = ({ title, content }) => {
    return (
        <div className="modal-section">
            <div className="section-title">{ title }</div>
            <div className="section-content">{ content }</div>
        </div>
    );
};

export default EditTickets;
