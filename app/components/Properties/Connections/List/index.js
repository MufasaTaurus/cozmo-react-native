import React from 'react';
import TitleHeader from 'components/TitleHeader';
import Spinner from 'components/Spinner';
import SVG from 'components/SVG';
import ButtonNew from 'components/ButtonNew';
import StatusLabel from 'components/StatusLabel';
import ActionButton from 'components/ActionButton';
import AddConnection from '../AddConnection';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { fetchConnections, syncConnection } from 'containers/Properties/actions';
import { selectConnections, selectLoadingConnections } from 'containers/Properties/selectors';
import './connectionsList.less';

export class ConnectionsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addOpen: false,
            popup: []
        };
    }

    togglePopup(index) {
        const popup = this.state.popup;
        popup[index] = !popup[index];
        this.setState({ popup: popup });
    }

    render() {
        return (
            <div className="properties-connections">
                <TitleHeader title="API Connections" icon="cogs"/>
                <div className="connections">
                    { this.props.loading ? <div className="spinner-wrapper"><Spinner/></div>
                        :
                        <div className="connections-table-wrapper">
                            <div className="add-button-wrapper">
                                <ButtonNew
                                    label="Add"
                                    className="small"
                                    onClick={ () => this.setState({ addOpen: true }) }
                                />
                            </div>
                            <table className="connections-table">
                                <thead>
                                <tr>
                                    <td>Software</td>
                                    <td>Code</td>
                                    <td>Properties</td>
                                    <td>Last Date Synced</td>
                                    <td className="status">Status</td>
                                    <td className="action">Sync Now</td>
                                </tr>
                                </thead>
                                <tbody>
                                { this.props.connections.map(con => {
                                    const id = con.getId();
                                    const status = con.isEnabled() ? con.getStatus() : 'Disabled';
                                    return (
                                        <tr key={ id } onClick={ () => this.props.goToConnectionDetails(id) }>
                                            <td className="name">
                                                { con.getName() }
                                                <div className="additional-info">
                                                    <div>{ 'Code: ' + con.getCode() }</div>
                                                    <div>{ con.getProperties() + ' properties' }</div>
                                                    <div className="add-date">{ con.getLastDateSynced() + ' ' + con.getLastTimeSynced() } <StatusLabel label={ status }/></div>
                                                </div>
                                            </td>
                                            <td className="events">{ con.getCode() }</td>
                                            <td className="status">{ con.getProperties() }</td>
                                            <td>{ con.getLastDateSynced() }</td>
                                            <td className="sync-status"><StatusLabel label={ status }/></td>
                                            <td>
                                                <div className="sync-actions">
                                                    <ActionButton
                                                        icon="sync"
                                                        onClick={ (evt) => {
                                                            evt.stopPropagation();
                                                            this.props.syncConnection(id);
                                                        } }
                                                    />
                                                    { con.hasSyncError() &&
                                                    <div className="sync-error-indicator">
                                                        <div
                                                            className="sync-error"
                                                            onMouseEnter={ () => this.togglePopup(id) }
                                                            onMouseLeave={ () => this.togglePopup(id) }
                                                        >
                                                            <SVG className="error-icon" icon="info"/>
                                                            <div className={ 'sync-error-popup' + (this.state.popup[id] ? ' visible' : '') }>
                                                                <div className="info">
                                                                    <div className="title">Sync failure</div>
                                                                    <div className="date">{ con.getLastDateSynced() }</div>
                                                                    <div className="date time">{ con.getLastTimeSynced() }</div>
                                                                </div>
                                                                <div className="error">
                                                                    <SVG className="error-icon" icon="info"/>
                                                                    <div>Unable to find resource</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }) }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
                <AddConnection
                    open={ this.state.addOpen }
                    onClose={ () => this.setState({ addOpen: false }) }
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    connections: selectConnections(),
    loading: selectLoadingConnections()
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchConnections: () => dispatch(fetchConnections()),
        goToConnectionDetails: (id) => dispatch(push('/properties/connections/' + id)),
        syncConnection: (id) => dispatch(syncConnection(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionsList);
