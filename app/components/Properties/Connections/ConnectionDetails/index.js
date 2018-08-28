import React from 'react';
import moment from 'moment';
import TitleHeader from 'components/TitleHeader';
import Spinner from 'components/Spinner';
import ButtonNew from 'components/ButtonNew';
import StatusLabel from 'components/StatusLabel';
import ActionButton from 'components/ActionButton';
import SegmentedButton from 'components/SegmentedButton';
import Select from 'components/Select';
import TextField from 'components/TextField';
import DisableConnection from './DisableConnection';
import DeleteConnection from './DeleteConnection';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { updateConnection, removeConnection, syncConnection } from 'containers/Properties/actions';
import { selectConnections, selectLoadingConnections } from 'containers/Properties/selectors';
import './connectionDetails.less';

export class ConnectionDetails extends React.Component {

    constructor(props) {
        super(props);
        this.connection = props.connections.filter(c => c.getId() + '' === props.id).first();
        this.state = {
            software: this.connection.getType(),
            code: this.connection.getCode(),
            username: this.connection.getUsername(),
            password: '',
            apiKey: this.connection.getApiKey(),
            clientId: this.connection.getClientId(),
            disabled: !this.connection.isEnabled(),
            properties: this.connection.getProperties(),
            disablePrompt: false,
            deletePrompt: false
        };
    }

    onChange(field, value) {
        this.setState({ [field]: value });
    }

    onDisableChange(value) {
        if (this.state.disabled) {
            this.setState({ disabled: value });
        } else {
            this.setState({ disablePrompt: true });
        }
    }

    deleteConnection() {
        this.setState({ deletePrompt: false });
        this.props.removeConnection(this.props.id);
    }

    saveChanges() {
        let data = {
            id: this.props.id,
            username: this.state.username,
            api_key: this.state.apiKey,
            client_id: this.state.clientId,
            status: this.state.disabled ? 'Disabled' : 'Enabled'
        };
        if (this.state.password) {
            data.password = this.state.password;
        }

        this.props.updateConnection(data);
    }

    render() {
        const history = [
            { date: moment(), props: 12, status: 'Success' },
            { date: moment(), props: 22, status: 'Success' }
        ];
        return (
            <div className="properties-connections-details-wrapper">
                <div className="properties-connections-details-content">
                    <div className="properties-connections-details">
                        <TitleHeader title="Sync Details" icon="sync"/>
                        <div className="connection-details">
                            <div className="section">
                                <div className="section-title">Property Connection</div>
                                <div className="section-content">
                                    <div className="side-by-side">
                                        <div className="narrow">
                                            <Select
                                                label="Software"
                                                disabled
                                                defaultValue={ this.state.software }
                                                options={[
                                                    { name: 'ISI Weblink', value: 'Isi' },
                                                    { name: 'Escapia', value: 'Escapia' },
                                                ]}/>
                                        </div>
                                        <div className="space segmented">
                                            <SegmentedButton
                                                value={ this.state.disabled }
                                                onClick={ (val) => this.onDisableChange(val) }
                                                label="Disabled"
                                                segments={[
                                                    { label: 'Yes', value: true, activeClass: 'off-active' },
                                                    { label: 'No', value: false }
                                                ]}/>
                                        </div>
                                    </div>
                                    { this.state.software === 'Isi' &&
                                    <div className="narrow">
                                        <TextField id="code" label="Code" value={ this.state.code } onChange={ (evt) => this.onChange('code', evt.target.value) }/>
                                    </div>
                                    }
                                    <div className="side-by-side">
                                        <div className="narrow">
                                            <TextField id="username" label="Username" value={ this.state.username } onChange={ (evt) => this.onChange('username', evt.target.value) }/>
                                        </div>
                                        <div className="narrow space">
                                            <TextField id="password" type="password" label="Password" value={ this.state.password } onChange={ (evt) => this.onChange('password', evt.target.value) }/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="section">
                                <div className="section-title">Payment</div>
                                <div className="section-content">
                                    <TextField id="key" label="API Key" value={ this.state.apiKey } onChange={ (evt) => this.onChange('apiKey', evt.target.value) }/>
                                    <TextField id="id" label="Client ID" value={ this.state.clientId } onChange={ (evt) => this.onChange('clientId', evt.target.value) }/>
                                </div>
                            </div>
                            <div className="section">
                                <div className="section-title">Sync History</div>
                                <div className="section-content">
                                    <div className="sync">
                                        <ActionButton
                                            icon="sync"
                                            onClick={ () => this.props.syncConnection(this.props.id) }
                                        />
                                    </div>
                                    <table className="connection-history-table">
                                        <thead>
                                        <tr>
                                            <td>Last Sync</td>
                                            <td className="status">Properties</td>
                                            <td className="status">Status</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        { history.map((history, index) => {
                                            return (
                                                <tr key={ index }>
                                                    <td className="name">
                                                        { history.date.format('MMM D, YYYY hh:mmA') }
                                                        <div className="properties-count">{ history.props + ' properties' }</div>
                                                    </td>
                                                    <td className="events">{ history.props }</td>
                                                    <td><StatusLabel label={ history.status }/></td>
                                                </tr>
                                            );
                                        }) }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        { this.state.disablePrompt &&
                        <DisableConnection
                            properties={ this.state.properties }
                            onSubmit={ () => this.setState({ disablePrompt: false, disabled: true }) }
                            onClose={ () => this.setState({ disablePrompt: false }) }/>
                        }
                        { this.state.deletePrompt &&
                        <DeleteConnection
                            properties={ this.state.properties }
                            onSubmit={ () => this.deleteConnection() }
                            onClose={ () => this.setState({ deletePrompt: false }) }/>
                        }
                    </div>
                </div>
                <div className="footer">
                    <ButtonNew label="Delete" className="red ghost" onClick={ () => this.setState({ deletePrompt: true }) }/>
                    <div>
                        <ButtonNew label="Cancel" className="ghost back-button" onClick={ this.props.goBack }/>
                        <ButtonNew label="Save" className="big" onClick={ () => this.saveChanges() }/>
                    </div>
                </div>
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
        goBack: () => dispatch(push('/properties/connections')),
        updateConnection: (data) => dispatch(updateConnection(data)),
        removeConnection: (id) => dispatch(removeConnection(id)),
        syncConnection: (id) => dispatch(syncConnection(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionDetails);
