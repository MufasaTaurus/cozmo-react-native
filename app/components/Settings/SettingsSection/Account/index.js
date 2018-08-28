import React from 'react';
import { REGEXP_EMAIL, REGEXP_PHONE } from 'utils/const';
import { StateMonitor } from 'utils/helpers';
import PageFooter from 'components/PageFooter';
import TextField from 'components/TextField';
import TitleHeader from 'components/TitleHeader';
import ChangePassword from './ChangePassword';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateUser } from 'containers/App/actions';
import { resetPassword, changePassword } from 'containers/Settings/actions';
import { makeSelectUser } from 'containers/App/selectors';
import { selectResettingPassword, selectChangingPassword } from 'containers/Settings/selectors';
import './account.less';

export class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: props.user.get('first_name') || '',
            lastName: props.user.get('last_name') || '',
            phone: props.user.get('phone') || '',
            email: props.user.get('email') || '',
            password: '12345678',
            changePassword: false,
        };
        this.stateMonitor = new StateMonitor(this.state);
    }

    handleFormChange(field, value) {
        this.stateMonitor.changeState({});
        this.setState({ [field]: value });
    }

    canSubmit() {
        return (
            this.state.firstName &&
            this.state.lastName &&
            (this.state.phone ? REGEXP_PHONE.test(this.state.phone) : true)
            //REGEXP_EMAIL.test(this.state.email)
        );
    }

    onCancel() {
        this.setState(this.stateMonitor.getOriginalState());
    }

    saveChanges() {
        this.props.updateUser({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            phone: this.state.phone === '' ? null : this.state.phone
        });
    }

    render() {
        const disableSubmit = !this.canSubmit();
        return (
            <div className="settings-account">
                <div className="account-content">
                    <div className="account-card">
                        <TitleHeader title="Account" icon="settingsBox" iconSize={ 22 }/>
                        <div className="card-content">
                            <div className="profile">Profile</div>
                            <div className="form-wrapper">
                                <div className="side-by-side">
                                    <div className="short">
                                        <TextField
                                            id="fname"
                                            label="First Name"
                                            value={ this.state.firstName }
                                            onChange={ (evt) => this.handleFormChange('firstName', evt.target.value) }
                                        />
                                    </div>
                                    <div className="short">
                                        <TextField
                                            id="lname"
                                            label="Last Name"
                                            value={ this.state.lastName }
                                            onChange={ (evt) => this.handleFormChange('lastName', evt.target.value) }
                                        />
                                    </div>
                                </div>
                                <TextField
                                    id="phone"
                                    label="Phone Number"
                                    value={ this.state.phone }
                                    onChange={ (evt) => this.handleFormChange('phone', evt.target.value) }
                                />
                                <TextField
                                    id="email"
                                    label="Email"
                                    value={ this.state.email }
                                    disabled
                                />
                                <div className="password-wrapper">
                                    <TextField
                                        id="password"
                                        label="Password"
                                        type="password"
                                        value={ this.state.password }
                                        disabled
                                    />
                                    <div className="edit-password" onClick={ () => this.setState({ changePassword: true }) }>Edit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ChangePassword
                        open={ this.state.changePassword }
                        email={ this.state.email }
                        onClose={ () => this.setState({ changePassword: false }) }
                        resetPassword={ () => this.props.resetPassword(this.state.email) }
                        changePassword={ this.props.changePassword }
                        resettingPassword={ this.props.resettingPassword }
                        changingPassword={ this.props.changingPassword }
                    />
                </div>
                <div color="account-footer">
                    <PageFooter
                        submitLabel="Save"
                        onCancel={ () => this.onCancel() }
                        onSubmit={ () => this.saveChanges() }
                        submitDisabled={ disableSubmit }
                        hideCancel={ !this.stateMonitor.isChanged() }
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
    resettingPassword: selectResettingPassword(),
    changingPassword: selectChangingPassword()
});

export function mapDispatchToProps(dispatch) {
    return {
        updateUser: (data) => dispatch(updateUser(data)),
        resetPassword: (data) => dispatch(resetPassword(data)),
        changePassword: (data) => dispatch(changePassword(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
