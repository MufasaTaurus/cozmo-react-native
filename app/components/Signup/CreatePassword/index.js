import React from 'react';
import SVG from 'components/SVG';
import ErrorMsgBox from 'components/Signup/ErrorMsgBox';
import TextField from 'components/TextField';
import './createPassword.less';

class CreatePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            focused: false,
        };
        this.REGEXP_PASSWORD_LOWERCASE = new RegExp(/[a-z]/);
        this.REGEXP_PASSWORD_UPPERCASE = new RegExp(/[A-Z]/);
        this.REGEXP_PASSWORD_DIGIT = new RegExp(/[0-9]/);
    }

    getIcon(value) {
        return <span className={ 'icon' + (value ? ' checked' : '') }><SVG icon={ value ? 'done' : 'clear' } size={ value ? '14' : '18' } /></span>;
    }

    render() {
        const password = this.props.password;
        const confirmPassword = this.props.confirmPassword;
        const showErrors = this.props.showErrors;
        const passwordValidation = {
            lowercase: this.REGEXP_PASSWORD_LOWERCASE.test(password),
            uppercase: this.REGEXP_PASSWORD_UPPERCASE.test(password),
            digit: this.REGEXP_PASSWORD_DIGIT.test(password),
            length: password.length > 7,
            same: password === confirmPassword,
        };

        return (
            <div className="create-password">
                { this.state.focused &&
                    <div className="left-popup">
                        <div className="list-title">Password should include:</div>
                        <div className="list-item">{ this.getIcon(passwordValidation.digit) }One or more numerical digits</div>
                        <div className="list-item">{ this.getIcon(passwordValidation.uppercase) }One or more upper-case</div>
                        <div className="list-item">{ this.getIcon(passwordValidation.lowercase) }One or more lower-case letters</div>
                        <div className="list-item">{ this.getIcon(passwordValidation.length) }At least 8 characters long</div>
                    </div>
                }
                { showErrors && !(passwordValidation.lowercase && passwordValidation.uppercase && passwordValidation.digit) &&
                    <ErrorMsgBox text="It doesn’t follow the password rules."/>
                }
                <TextField
                    big
                    id="pass-create"
                    placeholder={ this.props.passwordPlaceholder }
                    onChange={ evt => this.props.handleChange('password', evt.target.value) }
                    type={ 'password' }
                    hasError={ showErrors && !(passwordValidation.lowercase && passwordValidation.uppercase && passwordValidation.digit) }
                    onFocus={ () => this.setState({ focused: true }) }
                    onBlur={ () => this.setState({ focused: false }) }
                    value={ this.props.password }
                />
                { showErrors && !passwordValidation.same &&
                    <ErrorMsgBox text="It doesn't match with your password."/>
                }
                <TextField
                    big
                    id="pass-confirm"
                    placeholder={ this.props.passwordConfirmPlaceholder }
                    onChange={ evt => this.props.handleChange('confirmPassword', evt.target.value) }
                    type={ 'password' }
                    hasError={ showErrors && !passwordValidation.same }
                    value={ this.props.confirmPassword }
                />
            </div>
        );
    }
}

CreatePassword.defaultProps = {
    passwordPlaceholder: 'Create password',
    passwordConfirmPlaceholder: 'Confirm password'
};

export default CreatePassword;
