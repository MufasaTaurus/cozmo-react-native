import React from 'react';
import Helmet from 'react-helmet';
import InboxComponent from 'components/Inbox';

class Templates extends React.Component {

    render() {
        return (
            <article>
                <Helmet
                    title="Inbox"
                    meta={[
                        { name: 'description', content: 'Voyajoy' },
                    ]}
                />
                <InboxComponent
                    id={ this.props.params.id }
                    guestId={ this.props.params.guestId }
                    query={ this.props.location.query }
                />
            </article>
        );
    }
}

export default Templates;
