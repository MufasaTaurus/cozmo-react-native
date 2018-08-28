import React, {PropTypes} from 'react';
import TextField from 'components/TextField';
import SVG from 'components/SVG';
import TagTextField from 'components/TagTextField';
import ButtonNew from 'components/ButtonNew';
import PrioritySelect from 'components/Inbox/PrioritySelect';
import BlackStatusSelect from 'components/Inbox/BlackStatusSelect';
import TeamMemberPicker from 'components/TeamMemberPicker';
import TypeSelect from 'components/Inbox/TypeSelect';
import './createNewTicket.less';

export class CreateNewTicket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            summary: '',
            tags: [],
            type: 'Task',
            priority: 2,
            assignee: null
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
            <div className="inbox-create-ticket-modal">
                <div className="new-ticket-modal">
                    <div className="modal-header">
                        <span><SVG className="header-icon" icon="addBox"/> Create a Ticket</span>
                        <span className="close" onClick={ this.props.onClose }>&times;</span>
                    </div>
                    <div className="modal-content">
                        { modalSection({
                            title: 'Title',
                            content:
                                <div>
                                    <TextField label="Title" id="title" onChange={ (evt) => this.handleFormChange('title', evt.target.value) }/>
                                    <TextField label="Description" id="desc" onChange={ (evt) => this.handleFormChange('summary', evt.target.value) } multiLine/>
                                </div>
                        }) }
                        { modalSection({
                            title: 'Ticket options',
                            content:
                                <div className="ticket-options">
                                    <TeamMemberPicker
                                        label="Assignee"
                                        chooseMe="Take it"
                                        onChange={ (val) => this.setState({ assignee: val }) }
                                        placeholder="&nbsp;"
                                        small/>
                                    <TypeSelect
                                        label="Type"
                                        defaultValue={ 'Task' }
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
                                        defaultValue={ 2 }
                                        onChange={ (val) => this.handleFormChange('priority', val) }
                                        onlyPriorities
                                        small/>
                                    <BlackStatusSelect
                                        defaultValue="Open"
                                        onChange={ (val) => this.handleFormChange('status', val) }/>
                                </div>
                        }) }
                        {/*{ modalSection({*/}
                            {/*title: 'Requester',*/}
                            {/*content: ''*/}
                        {/*}) }*/}
                        <div className="submit-section">
                            <ButtonNew
                                disabled={ !this.state.title }
                                onClick={ () => this.submitForm() }
                                label="Done"
                                big/>
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

export default CreateNewTicket;
