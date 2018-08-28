import React from 'react';
import Image from './Image';
import Modal from 'components/Modal';
import Select from 'components/Select';
import TextField from 'components/TextField';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addConnection, updateConnection } from 'containers/Properties/actions';
import { selectAddingConnection, selectConnectionPropertiesCount } from 'containers/Properties/selectors';
import './addConnection.less';

export class AddConnection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            api_type: '',
            code: '',
            username: '',
            password: '',
            api_key: '',
            client_id: '',
            loading: false,
            import: false,
            error: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.loading === 'adding') {
            if (nextProps.loading === '') {
                this.setState({
                    import: true,
                    loading: false
                });
            } else {
                this.setState({
                    error: true,
                    loading: false
                });
            }
        } else {
            this.setState({ error: false });
        }
    }

    onChange(field, value) {
        this.setState({ [field]: value });
    }

    onSubmit() {
        if (this.state.import) {
            this.props.updateConnection({ status: 'Enabled', id: this.props.propertiesCount.id });
            this.props.onClose();
            this.setState({ import: false });
        } else {
            this.setState({ loading: true });
            this.props.addConnection(this.state);
        }
    }

    canSubmit() {
        return this.state.api_type && this.state.username && this.state.password;
    }

    render() {
        const form = (
            <div className="add-connection-form">
                <div className="modal-section">
                    <div className="section-title">Property Connection</div>
                    <div className="section-content">
                        <div className="narrow">
                            <Select
                                label="Software"
                                placeholder="-"
                                defaultValue={ this.state.api_type }
                                onChange={ (val) => this.onChange('api_type', val) }
                                options={[
                                    { name: 'ISI Weblink', value: 'Isi' },
                                    { name: 'Escapia', value: 'Escapia' },
                                ]}/>
                        </div>
                        { this.state.api_type &&
                            <div>
                                { this.state.api_type === 'Isi' &&
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
                                { this.state.error && <span className="error-msg">Please check the provided credentials</span> }
                            </div>
                        }
                    </div>
                </div>
                { this.state.api_type &&
                    <div className="modal-section">
                        <div className="section-title">Payment</div>
                        <div className="section-content">
                            <TextField id="key" label="API Key" value={ this.state.api_key } onChange={ (evt) => this.onChange('api_key', evt.target.value) }/>
                            <TextField id="id" label="Client ID" value={ this.state.client_id } onChange={ (evt) => this.onChange('client_id', evt.target.value) }/>
                        </div>
                    </div>
                }
            </div>
        );
        const importing = (
            <div className="connection-importing">
                <div>
                    <Image/>
                    <div className="found">{ this.props.propertiesCount.properties } properties are found</div>
                </div>
                <div className="info">
                    Do you want to import <strong>{ this.state.username }’s</strong> properties from <strong>{ this.state.api_type }</strong>?
                </div>
            </div>
        );
        const disableSubmit = !this.canSubmit();
        return (
            <div className="add-connection">
                { this.props.open &&
                    <Modal
                        title="Add Property Connection"
                        icon="addBox"
                        content={ this.state.import ? importing : form }
                        onClose={ this.props.onClose }
                        onSubmit={ () => this.onSubmit() }
                        submitLabel={ this.state.import ? 'Start importing' : 'Next' }
                        submitDisabled={ disableSubmit }
                        loading={ this.state.loading }
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    loading: selectAddingConnection(),
    propertiesCount: selectConnectionPropertiesCount()
});

export function mapDispatchToProps(dispatch) {
    return {
        addConnection: (data) => dispatch(addConnection(data)),
        updateConnection: (data) => dispatch(updateConnection(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddConnection);
