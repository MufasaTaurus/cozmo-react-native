import React from 'react';
import SearchBox from 'components/SearchBox';
import Spinner from 'components/Spinner';
import IntegrationName from 'components/IntegrationName';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {changeIntegrationsDisplay} from 'containers/Settings/actions';
import {makeSelectIntegrations, makeSelectIntegrationsDisplay, selectLoading} from 'containers/Settings/selectors';
import { push } from 'react-router-redux';

export class IntegrationsList extends React.Component {

    constructor(props) {
        super(props);
        this.integrationsTypes = [ 'All', 'Productivity', 'Marketing',  'Smart Home', 'Payments' ];
        this.state = { query: '' };
    }

    handleSearchQueryChange(query) {
        this.setState({ query: query });
        if (query.length && this.props.display !== 'All') {
            this.props.changeIntegrationsDisplay('All');
        }
    }

    render() {
        return (
            <div className="settings-integrations">
                <div className="header">
                    { this.props.query.success ?
                        <div className={ 'install-alert' + (this.props.query.success === '1' ? ' success' : ' error') }>
                            { this.props.query.success === '1' ? 'Integration installed successfully.' : 'Error occurred during integration installation.' }
                        </div>
                        : ''
                    }
                </div>
                <div className="search-bar-section">
                    <div className="search-box-wrapper">
                        <SearchBox
                            placeholder={ 'Search Apps' }
                            onChange={ (evt) => this.handleSearchQueryChange(evt.target.value) }
                            value={ this.state.query }/>
                    </div>
                </div>
                <div className="integrations-section">
                    <div className="integration-type-menu">
                        { this.integrationsTypes.map((t, index) => {
                            return (
                                <div
                                    key={ index }
                                    className={ 'integration-type' + (this.props.display === t ? ' active' : '') }
                                    onClick={ () => this.props.changeIntegrationsDisplay(t) }>
                                    { t }
                                </div>
                            );
                        }) }
                    </div>
                    <div className="integrations-grid">
                        { this.props.loading && <div className="spinner-wrapper"><Spinner/></div> }
                        { this.props.integrations
                            .filter(i => i.filterIntegration(this.props.display, this.state.query))
                            .map((integration, index) => {
                                return (
                                    <div className="integration" key={ index } onClick={ () => this.props.goToIntegration(integration.getId()) }>
                                        <IntegrationName integration={ integration }/>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    integrations: makeSelectIntegrations(),
    display: makeSelectIntegrationsDisplay(),
    loading: selectLoading(),
});

export function mapDispatchToProps(dispatch) {
    return {
        changeIntegrationsDisplay: (type) => dispatch(changeIntegrationsDisplay(type)),
        goToIntegration: (id) => dispatch(push('/settings/integrations/' + id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntegrationsList);
