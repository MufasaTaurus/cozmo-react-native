import React, {PropTypes} from 'react';
import ConversationEditor from 'components/ConversationEditor';
import Assignee from 'components/Assignee';
import './conversations.less';

export class Conversations extends React.Component {

    render() {
        return (
            <div className="ticket-details-conversations">
                <div className="conversation-field">
                    <Assignee onlyBadge fullName={ this.props.user.get('first_name') }/>
                    <ConversationEditor placeholder="Click here to reply"/>
                </div>
                <div className="empty-state">There are currently no conversations</div>
            </div>
        );
    }
}

export default Conversations;
