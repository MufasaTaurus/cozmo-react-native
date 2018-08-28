import React from 'react';
import Input from 'components/Input';
import ImportHeader from '../ImportHeader';
import ButtonNew from 'components/ButtonNew';
import Spinner from 'components/Spinner';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUsername, makeSelectPassword, makeSelectLoading, makeSelectLoginError, makeSelectTool } from 'containers/Properties/selectors';
import { integrationLogin, changeUsername, changePassword } from 'containers/Properties/actions';
import ImportTool from 'models/ImportTool';
import image from 'assets/images/bg-import-login.jpg';

export class Login extends React.Component {

    onFormSubmit() {
        return () => {
            if (this.validateForm()) {
                this.props.submitForm();
            }
        };
    }

    validateForm() {
        return !!this.props.username.trim().length && !!this.props.password.trim().length;
    }

    render() {
        const importTool = new ImportTool(this.props.tool);
        const top = {
            icon: <div className="logo-wrapper"><img src={ importTool.getLogo() } height="100%"/></div>,
            title: importTool.getName() + ' Import Tool : Login',
        };
        const bottom = {
            image: image,
        };

        return (
            <div className="import-dialog-step">
                <ImportHeader
                    top={ top }
                    bottom={ bottom }
                    onClose={ this.props.onClose }
                    onBack={ this.props.onBack }
                />
                <div className="body">
                    { this.props.loading && <div className="disabler"><Spinner/></div> }
                    <div className="login-logo"><img src={ importTool.getLogo() } height="100%"/></div>
                    <div>Enter your { importTool.getName() } login credentials</div>
                    <form onSubmit={ (evt) => evt.preventDefault() }>
                        <Input placeholder="Username" onChange={ this.props.onUsernameChange } value={ this.props.username }/>
                        <Input placeholder="Password" onChange={ this.props.onPasswordChange } value={ this.props.password } type="password" />
                        <ButtonNew
                            className="big"
                            label="Login"
                            disabled={ !this.validateForm() || this.props.loading }
                            onClick={ this.onFormSubmit() } />
                        {
                            this.props.loginError ?
                                <div className="error-msg"><div>Something went wrong...</div></div>
                                :
                                ''
                        }
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    username: makeSelectUsername(),
    password: makeSelectPassword(),
    loading: makeSelectLoading(),
    loginError: makeSelectLoginError(),
    tool: makeSelectTool()
});


export function mapDispatchToProps(dispatch) {
    return {
        onUsernameChange: (evt) => dispatch(changeUsername(evt.target.value)),
        onPasswordChange: (evt) => dispatch(changePassword(evt.target.value)),
        submitForm: () => dispatch(integrationLogin())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
