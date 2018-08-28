import React from 'react';
import Spinner from 'components/Spinner';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectIntegrations, selectLoading, selectfetchingInstallUrl} from 'containers/Settings/selectors';
import {fetchInstallLink} from 'containers/Settings/actions';
import { push } from 'react-router-redux';

export class IntegrationDetails extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (this.props.fetchingInstallUrl && !nextProps.fetchingInstallUrl) {
            window.location.href = this.integration.getInstallUrl();
        }
    }

    getIntegration() {
        if (!this.props.loading) {
            const int =
                this.props.integrations
                    .filter(i => i.getId() + '' === this.props.subsection)
                    .first();
            if (int) {
                this.integration = int;
            } else {
                this.props.goToIntegrationsList();
            }
        }
    }

    render() {
        this.getIntegration();
        return (
            <div>
                <div className="header"/>
                { this.integration ?
                    <div className="integration-details">
                        <div className="info">
                            <img src={ this.integration.getImage() } />
                            <div className="name">{ this.integration.getName() }</div>
                            <div className="type">{ this.integration.getType() }</div>
                            { this.integration.isInstalled() ?
                                <div className="install-button disabled">Installed</div>
                                :
                                <div
                                    className={ 'install-button' + (this.props.fetchingInstallUrl ? ' disabled' : '') }
                                    onClick={ () => this.props.fetchInstallLink(this.integration.getId(), this.integration.getUrl()) }
                                >
                                    { this.props.fetchingInstallUrl ? 'Installing': 'Install' }
                                </div>
                            }
                        </div>
                        <div className="description">
                            { this.integration.getDescription() }
                            { this.integration.getInstallUrl() }
                        </div>
                    </div>
                    :
                    <div><Spinner/></div>  }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    integrations: makeSelectIntegrations(),
    loading: selectLoading(),
    fetchingInstallUrl: selectfetchingInstallUrl()
});

export function mapDispatchToProps(dispatch) {
    return {
        goToIntegrationsList: () => dispatch(push('/settings/integrations')),
        fetchInstallLink: (id, url) => dispatch(fetchInstallLink({ id: id, url: url })),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntegrationDetails);
