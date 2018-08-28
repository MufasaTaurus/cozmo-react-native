import React from 'react';
import Channels from './Channels';
import Integrations from './Integrations';
import Team from './Team';
import Account from './Account';
import Billing from './Billing';

export class SettingsSection extends React.Component {

    renderSection() {
        switch (this.props.section) {
            case 'channels':
                return <Channels/>;
            case 'integrations':
                return <Integrations subsection={ this.props.subsection } query={ this.props.query }/>;
            case 'team':
                return <Team/>;
            case 'account':
                return <Account/>;
            case 'billing':
                return <Billing/>;
            default:
                return <div>Not implemented yet</div>;
        }
    }

    render() {
        return (
            this.renderSection()
        );
    }
}

export default SettingsSection;
