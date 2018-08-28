import React from 'react';
import IntegrationsList from './IntegrationsList';
import IntegrationDetails from './IntegrationDetails';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectIntegrations} from 'containers/Settings/selectors';
import {fetchMarketplace} from 'containers/Settings/actions';
import './integrations.less';

export class Integrations extends React.Component {

    constructor(props) {
        super(props);
        if (!this.props.integrations.size) {
            this.props.fetchIntegrations();
        }
    }

    render() {
        return (
            <div className="settings-integrations">
                { this.props.subsection ?
                    <IntegrationDetails subsection={ this.props.subsection }/>
                    :
                    <IntegrationsList query={ this.props.query }/>
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    integrations: makeSelectIntegrations(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchIntegrations: () => dispatch(fetchMarketplace()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Integrations);
