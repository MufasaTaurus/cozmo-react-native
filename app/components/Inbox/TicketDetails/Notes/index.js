import React, {PropTypes} from 'react';
import ConversationEditor from 'components/ConversationEditor';
import Assignee from 'components/Assignee';
import './notes.less';

export class Notes extends React.Component {

    render() {
        return (
            <div className="ticket-details-notes">
                <div className="conversation-field">
                    <Assignee onlyBadge fullName={ this.props.user.get('first_name') }/>
                    <ConversationEditor isNote submitLabel="Add" placeholder="Click here to add a note"/>
                </div>
                <div className="empty-state">There are currently no Notes</div>
            </div>
        );
    }
}

export default Notes;
